# MolView

MolView is a browser-based molecular viewer for Open Quantum Platform workflows. It is designed as a GUI-style web experience for inspecting optimized structures, OpenQP log/JSON output, Molden molecular orbitals, cube volumetric grids, and simple XYZ geometries.

## Live Webpage

Use MolView in the browser at:

https://open-quantum-platform.github.io/MolView/

This link is active when GitHub Pages is enabled for the repository from the `main` branch and repository root.

## Installation

Clone the repository:

```sh
git clone https://github.com/Open-Quantum-Platform/MolView.git
cd MolView
```

MolView is a static web app. It does not require a build step or a backend server.

## Run Locally

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

If you have Node/npm available, `npm run start` runs the same command. Because the current app is static, it can also be served by any basic web server.

## Usage

1. Start the local web server.
2. Open `http://localhost:4173` in a browser.
3. Use **Input Data** to choose or drag and drop a molecular data file.
4. Rotate with mouse drag or touch drag.
5. Zoom with the mouse wheel or trackpad scroll.
6. Use **Style** to switch between Ball & Stick, VDW, and Wire.
7. Use **Labels**, **Numbers**, and **Axis** to control annotations.
8. Use **Light** and **Polish** to adjust the rendering appearance.
9. Hover over a bond to show the bond length.
10. Use **Generate XYZ from current geometry** to save the displayed structure as an XYZ file.

## Supported Files

Use the `Input Data` chooser in the right panel, or drop a `.log`, `.json`, `.molden`, `.cube`, `.cub`, or `.xyz` file onto it. For OpenQP logs, the browser parses repeated `Cartesian Coordinate in Angstrom` blocks as an optimization trajectory and reads orbital metadata when present. For OpenQP JSON files, it reads `atoms`/`coord` geometry and `OQP::E_MO_A/B` plus `OQP::VEC_MO_A/B` orbital data. For Molden files, it reads `[Atoms]`, `[GTO]`, and `[MO]` sections, evaluates selected orbitals onto a 3D scalar grid, and renders positive/negative marching-cubes isosurfaces. For cube files, it parses the volumetric scalar grid directly and renders true positive and negative isosurfaces with WebGL marching cubes.

| File type | Purpose |
| --- | --- |
| `.log`, `.out`, `.txt` | OpenQP geometry optimization trajectory and orbital metadata |
| `.json` | OpenQP JSON geometry, MO energies, and MO coefficient vectors |
| `.molden` | Geometry, basis information, and MO coefficients for generated MO surfaces |
| `.cube`, `.cub` | Direct volumetric scalar grid for true MO isosurfaces |
| `.xyz` | Simple molecular geometry |

## Molecular Orbitals

MolView can populate the MO selector from OpenQP logs, OpenQP JSON, Molden files, and cube files. True isosurface rendering needs volumetric scalar data or enough basis information to generate a grid:

- `.cube`/`.cub` files render directly.
- `.molden` files provide basis and MO coefficients, so MolView evaluates the orbital on a 3D grid and renders marching-cubes surfaces.
- OpenQP `.log` and `.json` files provide orbital metadata and coefficients; if a matching Molden sample is available, MolView can use it to generate the surface.

The orbital controls include transparent, solid, and wire surface modes, adjustable isovalue, MO size, and separate blue/pink opacity controls.

## Export

The **Generate XYZ from current geometry** button exports the currently displayed geometry. For trajectory files, this means the currently selected optimization step. Browsers that support the File System Access API open a save dialog so you can choose the filename and destination; other browsers fall back to a normal download.

## Deployment

MolView can be hosted by any static web server.

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
- Direct OpenQP `.log` import for geometry optimization trajectories.
- Direct OpenQP `.json` import for geometry, MO energies, and MO coefficient vectors.
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

Supported elements are `H`, `C`, `N`, `O`, `S`, `P`, and `Cl`.

## Next Milestones

- Import common molecule formats such as MOL, SDF, and PDB.
- Add bond-order rendering and a 2D sketcher.
- Add angle and torsion measurement tools.
- Improve Molden basis normalization and add higher angular momentum shell coverage.
- Add local project save/load and shareable web links.
- Bundle Three.js locally for fully offline MO rendering.
