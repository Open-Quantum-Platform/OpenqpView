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


def test_actual_hessian_log_and_matching_molden_sample_exist():
    js = read("app.js")
    for sample in [
        "water-hessian-mo.inp",
        "water-hessian-mo.log",
        "water-hessian-mo.hess.json",
        "water-hessian-mo.freq.molden",
        "water-hessian-mo.molden",
    ]:
        assert (ROOT / "samples" / sample).exists()
    assert 'fetch("samples/water-hessian-mo.log"' in js
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
    set_molecule = js[js.index("function setMolecule("):js.index("function clearVolumeRenderer(")]
    assert "clearVibrationData" in set_molecule
    assert "clearVolumeRenderer" in set_molecule
    assert "state.trajectory = [];" in set_molecule
    assert "state.orbitals = [];" in set_molecule
    assert "state.selectedOrbital = null;" in set_molecule
    assert 'state.orbitalRenderSource = "none";' in set_molecule
    assert "state.moldenBasis = null;" in set_molecule


def test_hessian_assets_are_loaded_before_the_app():
    html = read("index.html")
    pages_workflow = read(".github/workflows/pages.yml")
    assert html.index('src="hessian.js"') < html.index('src="app.js"')
    assert (ROOT / "samples" / "water-hessian.json").exists()
    assert "cp index.html hessian.js app.js" in pages_workflow


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
        test_hessian_assets_are_loaded_before_the_app,
    ]:
        test()
        print(f"PASS {test.__name__}")
