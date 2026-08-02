# OpenqpView

OpenqpView is a browser-based molecular viewer for Open Quantum Platform workflows. It is designed as a GUI-style web experience for inspecting optimized structures, OpenQP log/JSON output, Molden molecular orbitals, cube volumetric grids, and simple XYZ geometries.

## Live Webpage

Use OpenqpView in the browser at:

https://open-quantum-platform.github.io/OpenqpView/

This link is active when GitHub Pages is enabled for the repository from the `main` branch and repository root.

## Installation

Clone the repository:

```sh
git clone https://github.com/Open-Quantum-Platform/OpenqpView.git
cd OpenqpView
```

OpenqpView is a static web app. It does not require a build step or a backend server.

## Run Locally

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

If you have Node/npm available, `npm run start` runs the same command. Because the current app is static, it can also be served by any basic web server.

## Usage

1. Start the local web server.
2. Open `http://localhost:4173` in a browser.
3. Use **Input Data** to choose or drag and drop a molecular data file. The bundled buttons open actual Hessian/MO and MRSF-EKT Dyson calculations as log, JSON, or Molden data.
4. Rotate with mouse drag or touch drag.
5. Zoom with the mouse wheel or trackpad scroll.
6. Use **Style** to switch between Ball & Stick, VDW, and Wire.
7. Use **Labels**, **Numbers**, and **Axis** to control annotations.
8. Use **Light** and **Polish** to adjust the rendering appearance.
9. Hover over a bond to show the bond length.
10. Use **Generate XYZ from current geometry** to save the displayed structure as an XYZ file.

## Supported Files

Use the `Input Data` chooser in the right panel, or drop a `.log`, `.json`, `.molden`, `.cube`, `.cub`, or `.xyz` file onto it. Current OpenQP JSON files contain a portable basis plus AO-ordered SCF and MRSF-EKT Dyson orbitals, while Hessian JSON also carries frequencies, displacement vectors, IR/Raman data, and Hessian metadata. Current OpenQP Molden output combines `[Atoms]`, `[GTO]`, `[MO]`, `[FREQ]`, standard one-value-per-mode `[INT]`, optional `[RAMAN]`, `[FR-COORD]`, and `[FR-NORM-COORD]` sections in one file. OpenqpView therefore keeps MO/Dyson surfaces and normal-mode controls available from the same JSON or Molden result.

| File type | Purpose |
| --- | --- |
| `.log`, `.out`, `.txt` | OpenQP geometry trajectory, basis and MO coefficients, frequencies, IR/Raman values, and normal modes |
| `.hess.json` | Geometry, portable basis/MOs, frequencies, normal modes, IR/Raman intensities, and Hessian metadata |
| `.json` | Geometry, portable basis/MOs, and state-specific MRSF-EKT IP/EA Dyson orbitals |
| `.molden` | Standard Molden geometry/basis/MOs plus optional Dyson orbitals and frequency sections |
| `.cube`, `.cub` | Direct volumetric scalar grid for true MO isosurfaces |
| `.xyz` | Simple molecular geometry |

## Molecular Orbitals

OpenqpView can populate the MO selector from OpenQP logs, OpenQP JSON, Molden files, and cube files. True isosurface rendering needs volumetric scalar data or enough basis information to generate a grid:

- `.cube`/`.cub` files render directly.
- `.molden` and portable OpenQP `.json` files with Cartesian S–G basis functions provide basis and AO coefficients, so OpenqpView evaluates selected orbitals on a 3D grid and renders marching-cubes surfaces. Pure spherical D/F/G and H shells remain metadata-only rather than producing a scientifically incomplete surface.
- Current OpenQP `.log` files provide basis details and AO-resolved MO coefficients, so OpenqpView can generate Cartesian S–G MO surfaces directly from the log without a Molden sidecar. Alpha and Beta orbitals remain separate for unrestricted calculations.
- MRSF-EKT JSON and Molden results add one selector entry per IP/EA Dyson state. Each entry retains its state number, electron binding energy, pole strength, and AO coefficients.

For optimization logs, direct MO coefficients are associated with the final geometry that produced them. Moving the optimization slider to another geometry clears the MO surface and temporarily disables the selector; returning to the matching final step enables it again. Frequency rows and normal-mode data remain available while inspecting trajectory steps.

The orbital controls include transparent, solid, and wire surface modes, adjustable isovalue, MO size, and separate blue/pink opacity controls.

## Frequencies and Normal Modes

Load an OpenQP Hessian `.log`, `.hess.json`, or combined `.molden` file to open the frequency table. OpenqpView reads the log table/eigenvectors, portable JSON aliases, and Molden `[FREQ]`/`[INT]`/`[RAMAN]`/`[FR-NORM-COORD]` sections. Select any row to inspect its frequency, IR intensity, and Raman activity. Modes with displacement vectors can be played or paused, returned to equilibrium, scaled, sped up or slowed down, and displayed with direction arrows. Negative frequencies are shown with an `i` suffix.

Use the example buttons, or open these URLs directly:

- `?load=samples/water-hessian-mo.log` — actual OpenQP RHF-PBE/6-31G* Hessian log.
- `?load=samples/water-hessian-mo.hess.json` — the same geometry with portable basis/MOs and all three normal modes.
- `?load=samples/water-hessian-mo.freq.molden` — one standards-oriented Molden file containing geometry, GTOs, 19 MOs, frequencies, IR/Raman intensities, and normal coordinates.
- `?load=samples/water-ekt-dyson.json` and `?load=samples/water-ekt-dyson.molden` — actual ROHF-BHHLYP/6-31G MRSF-EKT IP results with five state-specific Dyson orbitals.

The OpenQP Molden writer emits the legacy atom/shell placeholders and scale fields used by strict third-party readers, a complete `Sym` record for every orbital, and standard frequency sections. The bundled files are also validated with an independent Molden parser.

## Export

The **Generate XYZ from current geometry** button exports the currently displayed geometry. For trajectory files, this means the currently selected optimization step. Browsers that support the File System Access API open a save dialog so you can choose the filename and destination; other browsers fall back to a normal download.

## Deployment

OpenqpView can be hosted by any static web server. This repository includes a GitHub Pages workflow at `.github/workflows/pages.yml` that deploys the static app whenever changes are pushed to `main`.

Common options:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Apache or nginx
- Any institutional static web hosting

Upload these files and directories:

- `index.html`
- `hessian.js`
- `app.js`
- `styles.css`
- `sw.js`
- `manifest.json`
- `icons/`
- `samples/`

At the moment, MO rendering imports Three.js from `https://esm.sh`, so internet access is required for that part unless Three.js is bundled locally in a future version.

## Current Features

- Responsive molecule viewer with mouse, trackpad, and touch rotation.
- Direct OpenQP `.log` import for geometry trajectories, orbital metadata, frequencies, IR/Raman values, and normal-mode eigenvectors.
- Direct OpenQP `.json` import for geometry, MO energies, and MO coefficient vectors.
- OpenQP `.hess.json` frequency tables with IR and Raman values.
- Selectable normal-mode vectors with play/pause, equilibrium stop, amplitude, speed, and direction-arrow controls.
- XYZ import and XYZ export from the currently displayed geometry.
- Optional Molden import for geometry, molecular orbitals, and generated MO scalar grids.
- Volumetric cube import with WebGL marching-cubes positive/negative phase isosurfaces.
- Optimization step slider with parsed energies and convergence metrics when present.
- Ball & Stick, VDW, and wire rendering modes.
- Molecular orbital controls with transparent, solid, and wireframe surface modes, isovalue, MO size, and separate blue/pink opacity controls.
- Light and polish sliders for renderer appearance.
- Atom labels, numbering, axis toggle, and bond-length hover readout.
- Log/history panel with clickable snapshots.
- Offline-ready PWA manifest and service worker for browser installs.

## Molecule Format

```json
{
  "name": "Water",
  "formula": "H2O",
  "atoms": [["O", 0, 0, 0], ["H", -0.78, 0.58, 0], ["H", 0.78, 0.58, 0]],
  "bonds": [[0, 1], [0, 2]]
}
```

OpenqpView recognizes all currently named elements from `H` through `Og`. Common organic elements use tuned CPK-style colors and radii; the rest use periodic-group defaults for color, covalent radius, and VDW radius.

## Next Milestones

- Import common molecule formats such as MOL, SDF, and PDB.
- Add bond-order rendering and a 2D sketcher.
- Add angle and torsion measurement tools.
- Add direct G/H-shell orbital evaluation for OpenQP logs and improve Molden normalization coverage.
- Add local project save/load and shareable web links.
- Bundle Three.js locally for fully offline MO rendering.
