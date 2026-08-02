from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read(name: str) -> str:
    return (ROOT / name).read_text()


def test_unified_input_panel_controls_exist():
    html = read("index.html")
    assert 'id="fileDrop"' in html
    assert 'class="data-input-panel file-drop"' in html
    assert 'id="logFileInput"' in html
    assert 'id="pasteDataInput"' in html
    assert 'id="loadPastedData"' in html
    assert 'id="clearPastedData"' in html
    assert 'id="loadHessianLogSample"' in html
    assert 'aria-label="Paste molecular data"' in html
    assert 'aria-label="Optimization step"' in html
    assert "or drop/paste OpenQP log, Hessian JSON, XYZ, Molden, or cube data" in html


def test_paste_loader_reuses_file_parsing_order():
    js = read("app.js")
    assert "function loadTextByFormat" in js
    assert "function loadPastedData" in js
    assert "pasteDataInput" in js
    for marker in ["loadCubeText", "loadMoleculeJsonText", "loadXyzText", "loadMoldenText", "loadOpenQpLogText"]:
        assert marker in js


def test_paste_controls_have_styles():
    css = read("styles.css")
    assert ".paste-data-input" in css
    assert ".paste-actions" in css
    assert ".paste-hint" in css
    assert ".data-input-panel" in css
    assert ".file-picker-button" in css


def test_auto_spin_controls_volume_renderer():
    js = read("app.js")
    assert "setAutoSpin(enabled)" in js
    assert "controls.autoRotate = Boolean(enabled);" in js
    assert "state.volumeRenderer?.setAutoSpin(state.spin);" in js


def test_hessian_frequency_and_animation_controls_exist():
    html = read("index.html")
    js = read("app.js")
    parser = read("hessian.js")
    for marker in ["vibrationPanel", "frequencyRows", "vibrationPlay", "vibrationAmplitude", "vibrationSpeed", "modeVectorToggle"]:
        assert f'id="{marker}"' in html
    for marker in ["selectVibrationMode", "animateVibration", "applyVibrationFrame", "syncNormalModeRenderer"]:
        assert f"function {marker}" in js
    assert "frequency_modes" in parser
    assert "normal_mode_eigenvectors" in parser
    assert "infrared_intensities" in parser
    assert "raman_activities" in parser
    assert "extractVibrationsFromLog" in parser
    assert "Normal mode eigenvectors" in parser
    assert "keepVibrations: true" in js
    assert "if (!mode?.vectors?.length)" in js
    assert "state.molecule = normalizeMolecule(cloneMolecule(base));" in js


def test_actual_hessian_log_and_matching_molden_sample_exist():
    html = read("index.html")
    js = read("app.js")
    for sample in [
        "water-hessian-mo.inp",
        "water-hessian-mo.log",
        "water-hessian-mo.hess.json",
        "water-hessian-mo.freq.molden",
        "water-hessian-mo.molden",
        "water-ekt-dyson.json",
        "water-ekt-dyson.molden",
    ]:
        assert (ROOT / "samples" / sample).exists()
    assert 'loadHessianLogSample: "samples/water-hessian-mo.log"' in js
    assert 'loadDysonJsonSample: "samples/water-ekt-dyson.json"' in js
    assert 'href="samples/water-hessian-mo.log"' in html
    assert 'download="water-hessian-mo.log"' in html
    assert "function parseOpenQpLogBasis" in js
    assert 'orbitalRenderSource = hasLogOrbitalGridData' in js
    assert '"log-basis"' in js
    assert "orbital.coefficients[aoIndex] = coefficient" in js
    assert "OpenQP log basis and MO coefficients" in js


def test_initial_threejs_lighting_has_camera_fill():
    html = read("index.html")
    js = read("app.js")
    assert 'id="lightRange" type="range" min="0" max="100" value="68"' in html
    assert "new THREE.AmbientLight" in js
    assert "cameraFill.position.copy(camera.position)" in js
    assert "cameraFill.target.position.copy(controls.target)" in js


def test_molden_basis_is_evaluated_in_bohr():
    js = read("app.js")
    assert "const angstromToBohr = 1 / BOHR_TO_ANGSTROM;" in js
    assert "(x - atom[1]) * angstromToBohr" in js


def test_molecule_style_does_not_rebuild_mo_volume():
    js = read("app.js")
    assert "updateMoleculeStyle(molecule)" in js
    assert "state.volumeRenderer.updateMoleculeStyle(state.molecule);" in js


def test_new_molecule_resets_previous_calculation_data():
    js = read("app.js")
    set_molecule = js[js.index("async function setMolecule("):js.index("function clearVolumeData(")]
    assert "clearVibrationData" in set_molecule
    assert "clearVolumeData" in set_molecule
    assert "state.trajectory = [];" in set_molecule
    assert "state.orbitals = [];" in set_molecule
    assert "state.selectedOrbital = null;" in set_molecule
    assert 'state.orbitalRenderSource = "none";' in set_molecule
    assert "state.moldenBasis = null;" in set_molecule


def test_log_loading_preserves_webgl_until_parsing_succeeds():
    js = read("app.js")
    loader = js[js.index("async function loadOpenQpLogText("):js.index("async function autoLoadMatchingMoldenForMetadata(")]
    clear_volume = js[js.index("function clearVolumeData("):js.index("function normalizeMolecule(")]
    text_router = js[js.index("async function loadTextByFormat("):js.index("function looksLikeCube(")]
    assert loader.index("const parsed = parseOpenQpLog") < loader.index("clearVolumeData();")
    assert "await setTrajectoryFrame(state.frameIndex, { keepVibrations: false, preserveView: false });" in loader
    assert "state.volumeRenderer.clearSurfaces();" in clear_volume
    assert ".dispose()" not in clear_volume
    assert 'viewerPanel.classList.remove("volume-mode")' not in clear_volume
    assert "await loadOpenQpLogText" in text_router
    assert "lines[i]?.match(/Geometry Optimization Convergence" in js


def test_webgl_vdw_uses_element_radii_without_bonds():
    js = read("app.js")
    molecule_scene = js[js.index("function addMoleculeToScene("):js.index("function updateBondObject(")]
    assert "element.vdw * VDW_SCALE" in molecule_scene
    assert 'if (style !== "space-fill")' in molecule_scene
    assert "function moleculeStyleFrameRadius" in js
    assert "baseExtent + maxVdwRadius * 2" in js
    assert "state.volumeRenderer.setMolecule(state.molecule, { preserveView: false" in js


def test_log_orbitals_preserve_spin_and_supported_basis_accuracy():
    js = read("app.js")
    assert 'const orbitalKey = `${activeSpin}:${orbitalIndex}`;' in js
    assert "spin: activeSpin" in js
    assert "cartesianComponentNormalizationScale(powers)" in js
    assert "basis.normalizationScale || 1" in js
    assert "return powers[shell] || [];" in js
    assert "unsupportedShells.add(shell.toUpperCase())" in js
    assert "parsed.basis.supported !== false" in js


def test_molden_rejects_unsupported_shells_and_stale_matching_fetches():
    js = read("app.js")
    molden_basis = js[js.index("function parseMoldenBasis("):js.index("function cartesianShellPowers(")]
    auto_load = js[js.index("async function autoLoadMatchingMoldenForMetadata("):js.index("function matchingMoldenUrl(")]
    assert "unsupportedShells.add(shell.toUpperCase())" in molden_basis
    assert "supported: false" in molden_basis
    assert 'parsed.basis.supported === false ? "metadata" : "molden"' in js
    assert "const requestedFrameIndex = state.frameIndex;" in auto_load
    assert "state.trajectory !== requestedTrajectory" in auto_load
    assert "state.frameIndex !== requestedFrameIndex" in auto_load
    assert "requestId !== orbitalRenderRequest" in auto_load
    assert "orbitalFrameIndex: requestedOrbitalFrameIndex" in auto_load


def test_trajectory_keeps_modes_and_limits_mo_to_matching_frame():
    js = read("app.js")
    trajectory = js[js.index("async function setTrajectoryFrame("):js.index("function updateTrajectoryUi(")]
    assert "keepVibrations" in trajectory
    assert "clearVolumeData();" in trajectory
    assert "state.vibrationBaseMolecule = cloneMolecule(state.molecule);" in trajectory
    assert "isOrbitalFrameActive()" in trajectory
    assert "orbitalFrameIndex" in js
    assert "orbitalSelect.disabled = !isOrbitalFrameActive();" in js
    assert "This MO belongs to trajectory step" in js
    assert "if (frameChanged)" in trajectory
    assert "orbitalRenderRequest += 1;" in trajectory
    render_orbital = js[js.index("async function renderBasisOrbital("):js.index("function buildBasisOrbitalVolume(")]
    after_yield = render_orbital[render_orbital.index("await new Promise((resolve) => requestAnimationFrame(resolve));"):]
    assert after_yield.index("requestId !== orbitalRenderRequest") < after_yield.index("buildBasisOrbitalVolume(")


def test_hessian_assets_are_loaded_before_the_app():
    html = read("index.html")
    pages_workflow = read(".github/workflows/pages.yml")
    assert html.index('src="hessian.js"') < html.index('src="app.js"')
    assert (ROOT / "samples" / "water-hessian.json").exists()
    assert "cp index.html hessian.js app.js" in pages_workflow
    assert "- `hessian.js`" in read("README.md")


if __name__ == "__main__":
    for test in [
        test_unified_input_panel_controls_exist,
        test_paste_loader_reuses_file_parsing_order,
        test_paste_controls_have_styles,
        test_auto_spin_controls_volume_renderer,
        test_hessian_frequency_and_animation_controls_exist,
        test_actual_hessian_log_and_matching_molden_sample_exist,
        test_initial_threejs_lighting_has_camera_fill,
        test_molden_basis_is_evaluated_in_bohr,
        test_molecule_style_does_not_rebuild_mo_volume,
        test_new_molecule_resets_previous_calculation_data,
        test_log_loading_preserves_webgl_until_parsing_succeeds,
        test_webgl_vdw_uses_element_radii_without_bonds,
        test_log_orbitals_preserve_spin_and_supported_basis_accuracy,
        test_molden_rejects_unsupported_shells_and_stale_matching_fetches,
        test_trajectory_keeps_modes_and_limits_mo_to_matching_frame,
        test_hessian_assets_are_loaded_before_the_app,
    ]:
        test()
        print(f"PASS {test.__name__}")
