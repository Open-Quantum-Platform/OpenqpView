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
3. Use **Input Data** to choose or drag and drop a molecular data file, including an OpenQP Hessian `.log` or `.hess.json` result. The bundled actual water calculation can be opened with one click.
4. Rotate with mouse drag or touch drag.
5. Zoom with the mouse wheel or trackpad scroll.
6. Use **Style** to switch between Ball & Stick, VDW, and Wire.
7. Use **Labels**, **Numbers**, and **Axis** to control annotations.
8. Use **Light** and **Polish** to adjust the rendering appearance.
9. Hover over a bond to show the bond length.
10. Use **Generate XYZ from current geometry** to save the displayed structure as an XYZ file.

## Supported Files

Use the `Input Data` chooser in the right panel, or drop a `.log`, `.json`, `.molden`, `.cube`, `.cub`, or `.xyz` file onto it. OpenQP `.hess.json` sidecars provide geometry, frequencies, normal-mode displacement vectors, IR intensities, and Raman activities. For current OpenQP logs, the browser parses repeated `Cartesian Coordinate in Angstrom` blocks as an optimization trajectory, reads basis details and AO-resolved MO coefficients for direct MO surfaces, and recognizes the frequency/intensity table plus `Normal mode eigenvectors` blocks when present. For other OpenQP JSON files, it reads `atoms`/`coord` geometry and `OQP::E_MO_A/B` plus `OQP::VEC_MO_A/B` orbital data. For Molden files, it reads `[Atoms]`, `[GTO]`, and `[MO]` sections, evaluates selected orbitals onto a 3D scalar grid, and renders positive/negative marching-cubes isosurfaces. For cube files, it parses the volumetric scalar grid directly and renders true positive and negative isosurfaces with WebGL marching cubes.

| File type | Purpose |
| --- | --- |
| `.log`, `.out`, `.txt` | OpenQP geometry trajectory, basis and MO coefficients, frequencies, IR/Raman values, and normal modes |
| `.hess.json` | OpenQP frequencies, normal modes, IR/Raman intensities, and Hessian metadata |
| `.json` | OpenQP JSON geometry, MO energies, and MO coefficient vectors |
| `.molden` | Geometry, basis information, and MO coefficients for generated MO surfaces |
| `.cube`, `.cub` | Direct volumetric scalar grid for true MO isosurfaces |
| `.xyz` | Simple molecular geometry |

## Molecular Orbitals

OpenqpView can populate the MO selector from OpenQP logs, OpenQP JSON, Molden files, and cube files. True isosurface rendering needs volumetric scalar data or enough basis information to generate a grid:

- `.cube`/`.cub` files render directly.
- `.molden` files provide basis and MO coefficients, so OpenqpView evaluates the orbital on a 3D grid and renders marching-cubes surfaces.
- Current OpenQP `.log` files provide basis details and AO-resolved MO coefficients, so OpenqpView can generate the MO surface directly from the log without a Molden sidecar. Older logs that omit basis details still load as MO metadata.

The orbital controls include transparent, solid, and wire surface modes, adjustable isovalue, MO size, and separate blue/pink opacity controls.

## Frequencies and Normal Modes

Load an OpenQP Hessian `.log` or `.hess.json` sidecar to open the frequency table. OpenqpView reads the current OpenQP log table/eigenvector format and recognizes the same JSON aliases used by `openqp-app`: `freqs`/`modes`, `frequency_modes.frequencies_cm-1`/`normal_mode_eigenvectors`, and nested `vibrations` data. Select any row to inspect its frequency, IR intensity, and Raman activity. Modes with displacement vectors can be played or paused, returned to the equilibrium geometry, scaled with the amplitude control, sped up or slowed down, and displayed with normal-mode direction arrows. Negative frequencies are shown as imaginary values with an `i` suffix.

Click **Open actual water Hessian + MO example**, or open `?load=samples/water-hessian-mo.log`. This is an actual OpenQP RHF-PBE/6-31G* Hessian log. The frequency panel, normal-mode animation, basis set, and AO-resolved MO coefficients all come from that one log; selecting an MO generates its surface without loading a Molden sidecar. The calculation input, `.hess.json`, and frequency Molden output are also kept in `samples/` for provenance.

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
- Improve Molden basis normalization and add higher angular momentum shell coverage.
- Add local project save/load and shareable web links.
- Bundle Three.js locally for fully offline MO rendering.
