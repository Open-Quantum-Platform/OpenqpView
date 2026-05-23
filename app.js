const PERIODIC_SYMBOLS = [
  "", "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne",
  "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar",
  "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn",
  "Ga", "Ge", "As", "Se", "Br", "Kr",
  "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd",
  "In", "Sn", "Sb", "Te", "I", "Xe",
  "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy",
  "Ho", "Er", "Tm", "Yb", "Lu",
  "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg",
  "Tl", "Pb", "Bi", "Po", "At", "Rn",
  "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf",
  "Es", "Fm", "Md", "No", "Lr",
  "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn",
  "Nh", "Fl", "Mc", "Lv", "Ts", "Og"
];

const ELEMENT_GROUPS = {
  alkali: new Set(["Li", "Na", "K", "Rb", "Cs", "Fr"]),
  alkaline: new Set(["Be", "Mg", "Ca", "Sr", "Ba", "Ra"]),
  halogen: new Set(["F", "Cl", "Br", "I", "At", "Ts"]),
  noble: new Set(["He", "Ne", "Ar", "Kr", "Xe", "Rn", "Og"]),
  nonmetal: new Set(["H", "C", "N", "O", "P", "S", "Se"]),
  metalloid: new Set(["B", "Si", "Ge", "As", "Sb", "Te", "Po"]),
  lanthanide: new Set(["La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu"]),
  actinide: new Set(["Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr"]),
  postTransition: new Set(["Al", "Ga", "In", "Sn", "Tl", "Pb", "Bi", "Nh", "Fl", "Mc", "Lv"])
};

const ELEMENT_OVERRIDES = {
  H: { color: "#e7edf1", radius: 0.32, covalent: 0.31, vdw: 1.2 },
  B: { color: "#ffb86c", radius: 0.44, covalent: 0.84, vdw: 1.92 },
  C: { color: "#6f7b84", radius: 0.48, covalent: 0.76, vdw: 1.7 },
  N: { color: "#2f74d6", radius: 0.46, covalent: 0.71, vdw: 1.55 },
  O: { color: "#d93b3f", radius: 0.46, covalent: 0.66, vdw: 1.52 },
  F: { color: "#8de66c", radius: 0.42, covalent: 0.57, vdw: 1.47 },
  P: { color: "#ff9a3c", radius: 0.56, covalent: 1.07, vdw: 1.8 },
  S: { color: "#ffd84d", radius: 0.56, covalent: 1.05, vdw: 1.8 },
  Cl: { color: "#5fd66f", radius: 0.58, covalent: 1.02, vdw: 1.75 },
  Br: { color: "#a66a3f", radius: 0.62, covalent: 1.2, vdw: 1.85 },
  I: { color: "#8d63d6", radius: 0.7, covalent: 1.39, vdw: 1.98 },
  He: { color: "#d9ffff", radius: 0.3, covalent: 0.28, vdw: 1.4 },
  Ne: { color: "#bfefff", radius: 0.35, covalent: 0.58, vdw: 1.54 },
  Ar: { color: "#9bd7ff", radius: 0.55, covalent: 1.06, vdw: 1.88 },
  Fe: { color: "#d07a55", radius: 0.62, covalent: 1.24, vdw: 2.04 },
  Co: { color: "#d88484", radius: 0.6, covalent: 1.18, vdw: 2.0 },
  Ni: { color: "#7fb36a", radius: 0.6, covalent: 1.17, vdw: 1.97 },
  Cu: { color: "#c88745", radius: 0.64, covalent: 1.32, vdw: 1.96 },
  Zn: { color: "#8a99c7", radius: 0.62, covalent: 1.22, vdw: 2.01 },
  Ag: { color: "#c8d4df", radius: 0.72, covalent: 1.45, vdw: 2.11 },
  Au: { color: "#f4c542", radius: 0.72, covalent: 1.36, vdw: 2.14 },
  Hg: { color: "#b8b8d8", radius: 0.66, covalent: 1.32, vdw: 2.23 },
  U: { color: "#4ab16d", radius: 0.78, covalent: 1.96, vdw: 2.4 }
};

function elementDefaults(symbol) {
  if (ELEMENT_OVERRIDES[symbol]) return ELEMENT_OVERRIDES[symbol];
  let profile = { color: "#9aa4b2", covalent: 1.25, vdw: 2.0 };
  if (ELEMENT_GROUPS.alkali.has(symbol)) profile = { color: "#b38cff", covalent: 1.75, vdw: 2.65 };
  else if (ELEMENT_GROUPS.alkaline.has(symbol)) profile = { color: "#6ecbff", covalent: 1.45, vdw: 2.35 };
  else if (ELEMENT_GROUPS.halogen.has(symbol)) profile = { color: "#72dc7a", covalent: 1.15, vdw: 1.9 };
  else if (ELEMENT_GROUPS.noble.has(symbol)) profile = { color: "#8fe7ff", covalent: 1.0, vdw: 2.0 };
  else if (ELEMENT_GROUPS.nonmetal.has(symbol)) profile = { color: "#d7dde8", covalent: 0.95, vdw: 1.8 };
  else if (ELEMENT_GROUPS.metalloid.has(symbol)) profile = { color: "#efb56e", covalent: 1.2, vdw: 2.0 };
  else if (ELEMENT_GROUPS.lanthanide.has(symbol)) profile = { color: "#ff9fd0", covalent: 1.75, vdw: 2.45 };
  else if (ELEMENT_GROUPS.actinide.has(symbol)) profile = { color: "#7bd88f", covalent: 1.8, vdw: 2.45 };
  else if (ELEMENT_GROUPS.postTransition.has(symbol)) profile = { color: "#9ab7c8", covalent: 1.45, vdw: 2.2 };
  return {
    color: profile.color,
    radius: Math.min(0.8, Math.max(0.34, profile.covalent * 0.52)),
    covalent: profile.covalent,
    vdw: profile.vdw
  };
}

const ELEMENTS = Object.fromEntries(
  PERIODIC_SYMBOLS.slice(1).map((symbol) => [symbol, elementDefaults(symbol)])
);

const VDW_SCALE = 1.18;
const DEFAULT_CAMERA_OFFSET = { x: 0.95, y: -1.05, z: 1.1 };

const Z_TO_SYMBOL = Object.fromEntries(
  PERIODIC_SYMBOLS.slice(1).map((symbol, index) => [index + 1, symbol])
);

const BOHR_TO_ANGSTROM = 0.529177210903;

const SAMPLES = [
  {
    name: "Caffeine",
    formula: "C8H10N4O2",
    atoms: [
      ["C", -1.9, 0.2, 0], ["N", -1.1, 1.2, 0.1], ["C", 0.2, 0.9, -0.1], ["N", 0.7, -0.4, 0],
      ["C", -0.4, -1.2, 0.1], ["N", -1.6, -0.9, -0.1], ["C", 1.8, -0.8, 0.2], ["O", 2.7, -0.1, 0.1],
      ["N", 2.0, -2.1, 0.1], ["C", 3.3, -2.8, -0.1], ["C", -2.6, 1.4, 0.3], ["C", -0.8, -2.6, 0.2],
      ["O", -0.2, 2.0, -0.2], ["H", -3.2, 0.1, 0.5], ["H", -2.9, 2.2, -0.2], ["H", -2.8, 1.5, 1.3],
      ["H", -0.1, -3.0, -0.4], ["H", -1.8, -3.0, -0.1], ["H", -0.6, -2.9, 1.2], ["H", 3.9, -2.2, -0.5],
      ["H", 3.1, -3.7, -0.6], ["H", 3.8, -3.0, 0.8], ["H", 1.3, -2.6, 0.5], ["H", 0.9, 1.5, -0.4]
    ],
    bonds: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[3,6],[6,7],[6,8],[8,9],[1,10],[4,11],[2,12],[0,13],[10,14],[10,15],[11,16],[11,17],[11,18],[9,19],[9,20],[9,21],[8,22],[2,23]]
  },
  {
    name: "Water",
    formula: "H2O",
    atoms: [["O", 0, 0, 0], ["H", -0.78, 0.58, 0], ["H", 0.78, 0.58, 0]],
    bonds: [[0, 1], [0, 2]]
  },
  {
    name: "Ethanol",
    formula: "C2H6O",
    atoms: [["C",-1,0,0],["C",0.45,0,0],["O",1.55,0.74,0],["H",-1.38,-1,0],["H",-1.38,0.5,0.88],["H",-1.38,0.5,-0.88],["H",0.74,-0.55,0.88],["H",0.74,-0.55,-0.88],["H",2.32,0.18,0]],
    bonds: [[0,1],[1,2],[0,3],[0,4],[0,5],[1,6],[1,7],[2,8]]
  },
  {
    name: "Benzene",
    formula: "C6H6",
    atoms: [["C",1.4,0,0],["C",0.7,1.21,0],["C",-0.7,1.21,0],["C",-1.4,0,0],["C",-0.7,-1.21,0],["C",0.7,-1.21,0],["H",2.48,0,0],["H",1.24,2.15,0],["H",-1.24,2.15,0],["H",-2.48,0,0],["H",-1.24,-2.15,0],["H",1.24,-2.15,0]],
    bonds: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]]
  }
];

const state = {
  molecule: SAMPLES[0],
  style: "ball-stick",
  labels: true,
  numbering: false,
  axes: false,
  polish: 0,
  light: 0.5,
  zoom: 100,
  spin: true,
  rotX: -0.45,
  rotY: 0.65,
  dragging: false,
  lastX: 0,
  lastY: 0,
  trajectory: [],
  frameIndex: 0,
  sourceFileName: "",
  orbitals: [],
  selectedOrbital: null,
  orbitalRenderSource: "none",
  orbitalSurfaceMode: "transparent",
  volumeData: null,
  volumeRenderer: null,
  moldenBasis: null,
  isovalue: 0.07,
  surfaceSize: 1,
  positiveOpacity: 0.52,
  negativeOpacity: 0.52
};
let structureRenderRequest = 0;
let orbitalRenderRequest = 0;
let logEntries = [];
let activeLogId = null;
let restoringLog = false;

const canvas = document.querySelector("#molCanvas");
const ctx = canvas.getContext("2d");
const editor = document.querySelector("#moleculeEditor");
const statusText = document.querySelector("#statusText");
const logPanel = document.querySelector("#logPanel");
const stepRange = document.querySelector("#stepRange");
const orbitalSelect = document.querySelector("#orbitalSelect");
const volumeHost = document.querySelector("#volumeHost");
const viewerPanel = document.querySelector(".viewer-panel");
const isoRange = document.querySelector("#isoRange");
const surfaceSizeRange = document.querySelector("#surfaceSizeRange");
const positiveOpacity = document.querySelector("#positiveOpacity");
const negativeOpacity = document.querySelector("#negativeOpacity");
let resizeResetFrame = null;

function resizeCanvas(resetPosition = false) {
  const rect = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * scale));
  canvas.height = Math.max(1, Math.floor(rect.height * scale));
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  if (state.volumeRenderer) {
    state.volumeRenderer.resize(resetPosition);
  }
}

function scheduleViewerResizeReset() {
  resizeCanvas(true);
  if (resizeResetFrame) {
    cancelAnimationFrame(resizeResetFrame);
  }
  resizeResetFrame = requestAnimationFrame(() => {
    resizeCanvas(true);
    resizeResetFrame = requestAnimationFrame(() => {
      resizeCanvas(true);
      resizeResetFrame = null;
    });
  });
  window.setTimeout(() => resizeCanvas(true), 120);
}

function rotatePoint(atom) {
  const [, x, y, z] = atom;
  const center = state.molecule.center;
  const px = x - center.x;
  const py = y - center.y;
  const pz = z - center.z;
  const cx = Math.cos(state.rotX);
  const sx = Math.sin(state.rotX);
  const cy = Math.cos(state.rotY);
  const sy = Math.sin(state.rotY);
  const y1 = py * cx - pz * sx;
  const z1 = py * sx + pz * cx;
  const x2 = px * cy + z1 * sy;
  const z2 = -px * sy + z1 * cy;
  return { atom, x: x2, y: y1, z: z2 };
}

function project(point, width, height, extent, center) {
  const depth = 8;
  const fit = Math.min(width, height) / (extent * 1.75);
  const depthScale = depth / (depth - point.z);
  const scale = fit * (state.zoom / 100) * depthScale;
  return {
    ...point,
    sx: width / 2 + (point.x - center.x) * scale,
    sy: height / 2 + (point.y - center.y) * scale,
    scale,
    depthScale
  };
}

function draw() {
  if (state.volumeRenderer || state.volumeData || !volumeHost.hidden) {
    requestAnimationFrame(draw);
    return;
  }
  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  ctx.clearRect(0, 0, width, height);
  drawBackdrop(width, height);

  const rotated = state.molecule.atoms.map(rotatePoint);
  const frameBounds = rotated.reduce(
    (acc, point) => ({
      minX: Math.min(acc.minX, point.x),
      maxX: Math.max(acc.maxX, point.x),
      minY: Math.min(acc.minY, point.y),
      maxY: Math.max(acc.maxY, point.y)
    }),
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
  );
  const frameExtent = Math.max(1.8, frameBounds.maxX - frameBounds.minX, frameBounds.maxY - frameBounds.minY);
  const frameCenter = {
    x: (frameBounds.minX + frameBounds.maxX) / 2,
    y: (frameBounds.minY + frameBounds.maxY) / 2
  };
  const points = rotated.map((point) => project(point, width, height, frameExtent, frameCenter));
  const indexedPoints = points.map((point, index) => ({ ...point, index }));
  const bondWidth = state.style === "wire" ? 2 : 7;

  ctx.lineCap = "round";
  state.molecule.bonds.forEach(([a, b]) => {
    const p1 = points[a];
    const p2 = points[b];
    ctx.strokeStyle = "rgba(232, 238, 255, 0.7)";
    ctx.lineWidth = bondWidth;
    ctx.beginPath();
    ctx.moveTo(p1.sx, p1.sy);
    ctx.lineTo(p2.sx, p2.sy);
    ctx.stroke();
  });

  indexedPoints
    .sort((a, b) => a.z - b.z)
    .forEach((point) => drawAtom(point));
  if (state.axes) {
    drawAxisTriad(width, height);
  }

  if (state.spin) {
    state.rotY += 0.004;
  }
  requestAnimationFrame(draw);
}

function drawBackdrop(width, height) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#07102b");
  gradient.addColorStop(0.55, "#030515");
  gradient.addColorStop(1, "#02030b");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(134,183,255,0.06)";
  ctx.lineWidth = 1;
  for (let x = -80; x < width + 80; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + height * 0.34, height);
    ctx.stroke();
  }
}

function drawAxisTriad(width, height) {
  const origin = { x: 46, y: 52 };
  const length = 34;
  const axes = [
    { label: "X", color: "#ff7ab8", vector: rotateVector(1, 0, 0) },
    { label: "Y", color: "#86b7ff", vector: rotateVector(0, 1, 0) },
    { label: "Z", color: "#d7f7ff", vector: rotateVector(0, 0, 1) }
  ].sort((a, b) => a.vector.z - b.vector.z);

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.font = "700 11px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  axes.forEach((axis) => {
    const end = {
      x: origin.x + axis.vector.x * length,
      y: origin.y - axis.vector.y * length
    };
    ctx.strokeStyle = axis.color;
    ctx.fillStyle = axis.color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(end.x, end.y, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillText(axis.label, end.x + Math.sign(axis.vector.x || 0.3) * 11, end.y - Math.sign(axis.vector.y || 0.3) * 11);
  });
  ctx.fillStyle = "rgba(244, 246, 255, 0.65)";
  ctx.beginPath();
  ctx.arc(origin.x, origin.y, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function rotateVector(x, y, z) {
  const cx = Math.cos(state.rotX);
  const sx = Math.sin(state.rotX);
  const cy = Math.cos(state.rotY);
  const sy = Math.sin(state.rotY);
  const y1 = y * cx - z * sx;
  const z1 = y * sx + z * cx;
  return {
    x: x * cy + z1 * sy,
    y: y1,
    z: -x * sy + z1 * cy
  };
}

function drawAtom(point) {
  const [symbol] = point.atom;
  const element = ELEMENTS[symbol] || ELEMENTS.C;
  const baseRadius = state.style === "wire" ? 7 : state.style === "space-fill" ? 18 : 18;
  const radius = Math.max(4, baseRadius * (state.style === "space-fill" ? element.vdw * VDW_SCALE : element.radius) * point.depthScale);

  const gradient = ctx.createRadialGradient(point.sx - radius * 0.35, point.sy - radius * 0.4, 1, point.sx, point.sy, radius);
  gradient.addColorStop(0, state.polish > 0.5 ? "#ffffff" : "#d8deea");
  gradient.addColorStop(0.32 - state.polish * 0.14, element.color);
  gradient.addColorStop(1, "#171b2f");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(point.sx, point.sy, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `rgba(255,255,255,${0.2 + state.polish * 0.14})`;
  ctx.lineWidth = 1;
  ctx.stroke();

  const annotation = state.style === "space-fill" ? "" : atomAnnotation(symbol, point.index);
  if (annotation) {
    ctx.fillStyle = symbol === "H" ? "#11172d" : "#ffffff";
    ctx.font = annotation.length > 2 ? "700 9px system-ui" : "700 11px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(annotation, point.sx, point.sy);
  }
}

function atomAnnotation(symbol, index) {
  const number = Number.isInteger(index) ? String(index + 1) : "";
  if (state.labels && state.numbering) return `${symbol}${number}`;
  if (state.labels) return symbol;
  if (state.numbering) return number;
  return "";
}

function setMolecule(molecule, options = {}) {
  state.molecule = normalizeMolecule(molecule);
  document.querySelector("#moleculeName").textContent = state.molecule.name;
  document.querySelector("#moleculeFormula").textContent = state.molecule.formula;
  document.querySelector("#atomCount").textContent = `${state.molecule.atoms.length} atoms`;
  editor.value = JSON.stringify(state.molecule, null, 2);
  document.querySelectorAll(".sample-card").forEach((button) => {
    button.classList.toggle("active", button.dataset.name === state.molecule.name);
  });
  if (!options.keepTrajectory) {
    clearVolumeRenderer();
    state.trajectory = [];
    state.frameIndex = 0;
    state.orbitals = [];
    state.selectedOrbital = null;
    state.orbitalRenderSource = "none";
    state.moldenBasis = null;
    updateTrajectoryUi();
    updateOrbitalUi();
    document.querySelector("#sourceName").textContent = "Sample library";
    document.querySelector("#sourceMeta").textContent = "Static molecule";
  }
  renderStructureView({ preserveView: options.keepView }).catch((error) => {
    console.error(error);
    viewerPanel.classList.remove("volume-mode");
    volumeHost.hidden = true;
  });
}

function clearVolumeRenderer() {
  state.volumeData = null;
  structureRenderRequest += 1;
  viewerPanel.classList.remove("volume-mode");
  volumeHost.hidden = true;
  if (state.volumeRenderer) {
    state.volumeRenderer.dispose();
    state.volumeRenderer = null;
  }
}

function normalizeMolecule(input) {
  if (!input || !Array.isArray(input.atoms)) {
    throw new Error("Molecule needs an atoms array.");
  }
  const atoms = input.atoms.map((atom, index) => normalizeJsonAtom(atom, index));
  const bonds = Array.isArray(input.bonds) ? normalizeJsonBonds(input.bonds, atoms) : inferBonds(atoms);
  bonds.forEach((bond) => {
    if (!Array.isArray(bond) || bond.length !== 2 || bond.some((index) => index < 0 || index >= atoms.length)) {
      throw new Error("Bonds must reference atom indexes.");
    }
  });
  const bounds = atoms.reduce(
    (acc, [, x, y, z]) => ({
      minX: Math.min(acc.minX, x),
      maxX: Math.max(acc.maxX, x),
      minY: Math.min(acc.minY, y),
      maxY: Math.max(acc.maxY, y),
      minZ: Math.min(acc.minZ, z),
      maxZ: Math.max(acc.maxZ, z)
    }),
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity, minZ: Infinity, maxZ: -Infinity }
  );
  return {
    ...input,
    name: input.name || "Molecule",
    formula: input.formula || formulaFromAtoms(atoms),
    atoms,
    bonds,
    center: {
      x: (bounds.minX + bounds.maxX) / 2,
      y: (bounds.minY + bounds.maxY) / 2,
      z: (bounds.minZ + bounds.maxZ) / 2
    },
    extent: Math.max(1.8, bounds.maxX - bounds.minX, bounds.maxY - bounds.minY, bounds.maxZ - bounds.minZ)
  };
}

function moleculeCenter(molecule) {
  const bounds = moleculeBounds(molecule);
  return {
    x: (bounds.minX + bounds.maxX) / 2,
    y: (bounds.minY + bounds.maxY) / 2,
    z: (bounds.minZ + bounds.maxZ) / 2
  };
}

function moleculeExtent(molecule) {
  const bounds = moleculeBounds(molecule);
  return Math.max(1.8, bounds.maxX - bounds.minX, bounds.maxY - bounds.minY, bounds.maxZ - bounds.minZ);
}

function moleculeBounds(molecule) {
  return molecule.atoms.reduce(
    (acc, [, x, y, z]) => ({
      minX: Math.min(acc.minX, x),
      maxX: Math.max(acc.maxX, x),
      minY: Math.min(acc.minY, y),
      maxY: Math.max(acc.maxY, y),
      minZ: Math.min(acc.minZ, z),
      maxZ: Math.max(acc.maxZ, z)
    }),
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity, minZ: Infinity, maxZ: -Infinity }
  );
}

function inferBonds(atoms) {
  const bonds = [];
  for (let i = 0; i < atoms.length; i += 1) {
    for (let j = i + 1; j < atoms.length; j += 1) {
      const [a, ax, ay, az] = atoms[i];
      const [b, bx, by, bz] = atoms[j];
      const ar = ELEMENTS[a]?.covalent || 0.75;
      const br = ELEMENTS[b]?.covalent || 0.75;
      const dx = ax - bx;
      const dy = ay - by;
      const dz = az - bz;
      const distance = Math.hypot(dx, dy, dz);
      if (distance > 0.35 && distance <= (ar + br) * 1.22) {
        bonds.push([i, j]);
      }
    }
  }
  return bonds;
}

function formulaFromAtoms(atoms) {
  const counts = atoms.reduce((acc, [symbol]) => {
    acc[symbol] = (acc[symbol] || 0) + 1;
    return acc;
  }, {});
  const symbols = Object.keys(counts).sort((a, b) => {
    if (a === "C") return -1;
    if (b === "C") return 1;
    if (a === "H") return b === "C" ? 1 : -1;
    if (b === "H") return a === "C" ? -1 : 1;
    return a.localeCompare(b);
  });
  return symbols.map((symbol) => `${symbol}${counts[symbol] > 1 ? counts[symbol] : ""}`).join("");
}

function setTrajectoryFrame(index) {
  if (!state.trajectory.length) return;
  state.frameIndex = Math.max(0, Math.min(index, state.trajectory.length - 1));
  const frame = state.trajectory[state.frameIndex];
  setMolecule(frame.molecule, { keepTrajectory: true });
  updateTrajectoryUi();
}

function updateTrajectoryUi() {
  const panel = document.querySelector("#trajectoryPanel");
  panel.hidden = state.trajectory.length <= 1;
  if (!state.trajectory.length) return;

  const frame = state.trajectory[state.frameIndex];
  stepRange.max = String(state.trajectory.length - 1);
  stepRange.value = String(state.frameIndex);
  document.querySelector("#stepLabel").textContent = `Step ${frame.step} / ${state.trajectory.length}`;
  document.querySelector("#energyLabel").textContent = frame.energy
    ? `State ${frame.energy.state}: ${frame.energy.value.toFixed(8)} Eh`
    : "Energy unavailable";
  document.querySelector("#convergenceLabel").textContent = frame.convergence
    ? `RMS grad ${frame.convergence.rmsGrad?.value ?? "?"}`
    : "Convergence unavailable";
}

function updateOrbitalUi() {
  orbitalSelect.innerHTML = "";
  const empty = document.createElement("option");
  empty.value = "";
  empty.textContent = state.orbitals.length ? "Choose orbital" : "No volumetric orbital loaded";
  orbitalSelect.appendChild(empty);

  state.orbitals.forEach((orbital, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    const spin = orbital.spin ? `${orbital.spin} ` : "";
    const occupancy = orbital.occupancy === null || orbital.occupancy === undefined ? "" : ` occ ${orbital.occupancy.toFixed(1)}`;
    option.textContent = `${spin}MO ${orbital.index}: ${orbital.energy.toFixed(6)} Eh${occupancy}`;
    orbitalSelect.appendChild(option);
  });

  orbitalSelect.disabled = false;
  document.querySelector("#orbitalStatus").textContent = state.orbitals.length
    ? orbitalStatusText()
    : "Load a cube volumetric grid for true MO isosurfaces, or load Molden/log files for structure and MO metadata.";
}

function orbitalStatusText() {
  if (state.orbitalRenderSource === "cube") {
    return "Cube grid loaded as true positive/negative marching-cubes isosurfaces.";
  }
  if (state.orbitalRenderSource === "molden") {
    return "Molden orbitals loaded. Select an MO to evaluate it on a 3D grid and render marching-cubes isosurfaces.";
  }
  if (state.orbitalRenderSource === "metadata") {
    return "This file contains MO metadata but no volumetric grid. Export/upload a .cube/.cub orbital grid to render the true surface.";
  }
  return "Load a cube volumetric grid for true MO isosurfaces.";
}

function parseOpenQpLog(text, fileName = "OpenQP log") {
  const lines = text.split(/\r?\n/);
  const frames = [];
  const finalEnergies = [];
  const convergences = [];
  let currentStep = 0;
  let natom = 0;

  for (let i = 0; i < lines.length; i += 1) {
    const stepMatch = lines[i].match(/Geometry Optimization Step\s+(\d+)/);
    if (stepMatch) currentStep = Number(stepMatch[1]);

    const natomMatch = lines[i].match(/PyOQP natom:\s+(\d+)/);
    if (natomMatch && !natom) natom = Number(natomMatch[1]);

    if (lines[i].includes("Cartesian Coordinate in Angstrom")) {
      const atoms = [];
      i += 1;
      while (i < lines.length && !/^\s*-{5,}/.test(lines[i])) i += 1;
      i += 1;
      while (i < lines.length) {
        const coord = lines[i].match(/^\s*\d+\s+(\d+(?:\.\d+)?)\s+([-+0-9.Ee]+)\s+([-+0-9.Ee]+)\s+([-+0-9.Ee]+)/);
        if (!coord) break;
        const symbol = Z_TO_SYMBOL[Math.round(Number(coord[1]))] || "C";
        atoms.push([symbol, Number(coord[2]), Number(coord[3]), Number(coord[4])]);
        i += 1;
      }
      if (atoms.length) {
        const molecule = {
          name: fileName.replace(/\.(log|out|txt|molden)$/i, ""),
          formula: formulaFromAtoms(atoms),
          atoms,
          bonds: inferBonds(atoms)
        };
        frames.push({ step: currentStep || frames.length + 1, molecule });
      }
    }

    if (lines[i]?.includes("PyOQP: Final Energy")) {
      let energy = null;
      for (let j = i + 1; j < Math.min(lines.length, i + 18); j += 1) {
        const stateEnergy = lines[j].match(/PyOQP state\s+(\d+)\s+([-+0-9.Ee]+)/);
        if (stateEnergy) {
          energy = { state: Number(stateEnergy[1]), value: Number(stateEnergy[2]) };
        }
      }
      if (energy) finalEnergies.push(energy);
    }

    const convergenceMatch = lines[i].match(/Geometry Optimization Convergence\s+(\d+)/);
    if (convergenceMatch) {
      const convergence = { step: Number(convergenceMatch[1]) };
      for (let j = i + 1; j < Math.min(lines.length, i + 14); j += 1) {
        const metric = lines[j].match(/PyOQP (energy shift|rmsd step|max step|rmsd grad|max grad):\s+([-+0-9.Ee]+)/);
        if (metric) {
          const key = metric[1].replace(/\s+(\w)/g, (_, letter) => letter.toUpperCase());
          convergence[key] = { value: Number(metric[2]) };
        }
      }
      convergences.push(convergence);
    }
  }

  frames.forEach((frame, index) => {
    frame.energy = finalEnergies[index] || null;
    frame.convergence = convergences[index] || null;
  });

  const orbitals = parseLastOrbitalBlock(lines, frames.at(-1)?.molecule.atoms.length || natom);
  if (!frames.length) {
    throw new Error("No OpenQP Cartesian coordinate blocks were found.");
  }
  return { frames, orbitals };
}

function parseLastOrbitalBlock(lines, atomCount) {
  const start = lines.map((line, index) => line.includes("Molecular Orbitals and Energies") ? index : -1).filter((index) => index >= 0).at(-1);
  if (start === undefined) return [];

  const orbitals = new Map();
  for (let i = start; i < lines.length; i += 1) {
    if (i > start + 2 && lines[i].includes("MODULE:")) break;
    const header = lines[i].match(/^\s+(\d+(?:\s+\d+)*)\s*$/);
    if (!header) continue;

    const indices = header[1].trim().split(/\s+/).map(Number);
    const energies = (lines[i + 1] || "").trim().split(/\s+/).map(Number).filter((value) => Number.isFinite(value));
    if (energies.length !== indices.length) continue;

    indices.forEach((orbitalIndex, column) => {
      if (!orbitals.has(orbitalIndex)) {
        orbitals.set(orbitalIndex, {
          index: orbitalIndex,
          energy: energies[column],
          source: "OpenQP log",
          atomWeights: Array(atomCount).fill(0),
          atomSigned: Array(atomCount).fill(0)
        });
      }
    });

    for (let j = i + 2; j < lines.length; j += 1) {
      const row = lines[j].match(/^\s*\d+\s+[A-Za-z]+\s+(\d+)\s+\S+\s+(.+)$/);
      if (!row) break;
      const atomIndex = Number(row[1]) - 1;
      const values = row[2].trim().split(/\s+/).map(Number);
      indices.forEach((orbitalIndex, column) => {
        const orbital = orbitals.get(orbitalIndex);
        const coefficient = values[column];
        if (orbital && atomIndex >= 0 && atomIndex < atomCount && Number.isFinite(coefficient)) {
          orbital.atomWeights[atomIndex] += coefficient * coefficient;
          orbital.atomSigned[atomIndex] += coefficient;
        }
      });
    }
  }

  return Array.from(orbitals.values()).map((orbital) => {
    const max = Math.max(...orbital.atomWeights, 0);
    const atomPhases = orbital.atomSigned.map((value) => (value < 0 ? -1 : 1));
    return {
      ...orbital,
      atomWeights: max > 0 ? orbital.atomWeights.map((value) => value / max) : orbital.atomWeights,
      atomPhases
    };
  });
}

function parseMolden(text, fileName = "Molden file") {
  const lines = text.split(/\r?\n/);
  const atomsInfo = parseMoldenAtoms(lines);
  if (!atomsInfo.atoms.length) {
    throw new Error("No Molden [Atoms] section was found.");
  }
  const basis = parseMoldenBasis(lines, atomsInfo.atoms.length);
  const orbitals = parseMoldenOrbitals(lines, atomsInfo.atoms.length, basis.aoToAtom);
  const molecule = {
    name: fileName.replace(/\.(molden|mol)$/i, ""),
    formula: formulaFromAtoms(atomsInfo.atoms),
    atoms: atomsInfo.atoms,
    bonds: inferBonds(atomsInfo.atoms)
  };
  return { molecule, orbitals, basis, atomUnit: atomsInfo.unit };
}

function parseMoldenAtoms(lines) {
  const start = lines.findIndex((line) => /^\[Atoms\]/i.test(line.trim()));
  if (start < 0) return { atoms: [], unit: "Angs" };
  const unit = lines[start].match(/\]\s*(\S+)/)?.[1] || "Angs";
  const factor = /^AU$/i.test(unit) ? BOHR_TO_ANGSTROM : 1;
  const atoms = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    if (/^\s*\[/.test(lines[i])) break;
    const parts = lines[i].trim().split(/\s+/);
    if (parts.length < 6) continue;
    const symbol = parts[0];
    const x = Number(parts[3]) * factor;
    const y = Number(parts[4]) * factor;
    const z = Number(parts[5]) * factor;
    if (ELEMENTS[symbol] && [x, y, z].every(Number.isFinite)) {
      atoms.push([symbol, x, y, z]);
    }
  }
  return { atoms, unit };
}

function parseMoldenBasis(lines, atomCount) {
  const start = lines.findIndex((line) => /^\[GTO\]/i.test(line.trim()));
  if (start < 0) return { aoToAtom: [], basisFunctions: [] };
  const aoToAtom = [];
  const basisFunctions = [];
  let currentAtom = null;

  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (/^\[/.test(line)) break;
    if (!line) continue;

    const atomLine = line.match(/^(\d+)\s*$/);
    if (atomLine) {
      currentAtom = Number(atomLine[1]) - 1;
      continue;
    }

    const shellLine = line.match(/^([spdfgh])\s+(\d+)/i);
    if (shellLine && currentAtom !== null && currentAtom >= 0 && currentAtom < atomCount) {
      const shell = shellLine[1].toLowerCase();
      const primitiveCount = Number(shellLine[2]);
      const primitives = [];
      for (let p = 0; p < primitiveCount; p += 1) {
        const primitive = lines[i + 1 + p].trim().split(/\s+/).map(Number);
        if (primitive.length >= 2 && primitive.every(Number.isFinite)) {
          primitives.push({ exponent: primitive[0], coefficient: primitive[1] });
        }
      }
      const components = cartesianShellPowers(shell);
      components.forEach((powers) => {
        aoToAtom.push(currentAtom);
        basisFunctions.push({ atomIndex: currentAtom, powers, primitives });
      });
      i += primitiveCount;
    }
  }
  return { aoToAtom, basisFunctions };
}

function cartesianShellPowers(shell) {
  const powers = {
    s: [[0, 0, 0]],
    p: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
    d: [[2, 0, 0], [0, 2, 0], [0, 0, 2], [1, 1, 0], [1, 0, 1], [0, 1, 1]],
    f: [[3, 0, 0], [0, 3, 0], [0, 0, 3], [2, 1, 0], [2, 0, 1], [1, 2, 0], [0, 2, 1], [1, 0, 2], [0, 1, 2], [1, 1, 1]]
  };
  return powers[shell] || powers.s;
}

function parseMoldenOrbitals(lines, atomCount, aoToAtom) {
  const start = lines.findIndex((line) => /^\[MO\]/i.test(line.trim()));
  if (start < 0) return [];
  const orbitals = [];
  let current = null;

  function finishOrbital() {
    if (!current) return;
    const max = Math.max(...current.atomWeights, 0);
    orbitals.push({
      ...current,
      atomWeights: max > 0 ? current.atomWeights.map((value) => value / max) : current.atomWeights,
      atomPhases: current.atomSigned.map((value) => (value < 0 ? -1 : 1))
    });
  }

  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (/^\[/.test(line)) break;
    if (!line) continue;

    const energy = line.match(/^Ene=\s*([-+0-9.Ee]+)/i);
    if (energy) {
      finishOrbital();
      current = {
        index: orbitals.length + 1,
        energy: Number(energy[1]),
        spin: "Unknown",
        occupancy: null,
        source: "Molden",
        atomWeights: Array(atomCount).fill(0),
        atomSigned: Array(atomCount).fill(0),
        coefficients: new Float32Array(aoToAtom.length)
      };
      continue;
    }

    if (!current) continue;
    const spin = line.match(/^Spin=\s*(\S+)/i);
    if (spin) {
      current.spin = spin[1];
      continue;
    }
    const occupancy = line.match(/^Occup=\s*([-+0-9.Ee]+)/i);
    if (occupancy) {
      current.occupancy = Number(occupancy[1]);
      continue;
    }

    const coefficient = line.match(/^(\d+)\s+([-+0-9.Ee]+)/);
    if (coefficient) {
      const aoIndex = Number(coefficient[1]) - 1;
      const atomIndex = aoToAtom[aoIndex];
      const value = Number(coefficient[2]);
      if (atomIndex !== undefined && Number.isFinite(value)) {
        current.coefficients[aoIndex] = value;
        current.atomWeights[atomIndex] += value * value;
        current.atomSigned[atomIndex] += value;
      }
    }
  }
  finishOrbital();
  return orbitals;
}

function loadOpenQpLogText(text, fileName) {
  clearVolumeRenderer();
  const parsed = parseOpenQpLog(text, fileName);
  state.trajectory = parsed.frames;
  state.frameIndex = parsed.frames.length - 1;
  state.orbitals = parsed.orbitals;
  state.selectedOrbital = null;
  state.orbitalRenderSource = parsed.orbitals.length ? "metadata" : "none";
  setTrajectoryFrame(state.frameIndex);
  updateOrbitalUi();
  document.querySelector("#sourceName").textContent = fileName;
  state.sourceFileName = fileName;
  document.querySelector("#sourceMeta").textContent = `Log metadata: ${parsed.frames.length} steps, ${parsed.orbitals.length} orbitals`;
  setStatus(`Loaded ${fileName}. This is log metadata only; choose the .molden file to generate MO surfaces.`);
}

async function autoLoadMatchingMoldenForMetadata(selectedIndex) {
  const sampleUrl = matchingMoldenUrl(state.sourceFileName);
  if (!sampleUrl) {
    setOrbitalStatus("This log has MO metadata only. Load the matching .molden file to generate the MO grid.", { log: true });
    return;
  }
  setStatus("Loading matching Molden data for MO surface...");
  const response = await fetch(sampleUrl, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Could not load matching Molden data: ${response.status}`);
  }
  loadMoldenText(await response.text(), "thymine-s0.molden", { preserveView: true });
  const nextIndex = Math.min(selectedIndex, state.orbitals.length - 1);
  orbitalSelect.value = String(nextIndex);
  state.selectedOrbital = state.orbitals[nextIndex];
  await renderMoldenOrbital(state.selectedOrbital);
}

function matchingMoldenUrl(fileName) {
  if (/^S[01]\.(log|json)$/i.test(fileName) || /thymine/i.test(fileName)) {
    return "samples/thymine-s0.molden";
  }
  return "";
}

function loadMoldenText(text, fileName, options = {}) {
  if (!options.preserveView) {
    clearVolumeRenderer();
  }
  const parsed = parseMolden(text, fileName);
  state.trajectory = [];
  state.frameIndex = 0;
  state.moldenBasis = parsed.basis;
  state.orbitals = parsed.orbitals;
  state.selectedOrbital = null;
  state.orbitalRenderSource = parsed.orbitals.length ? "molden" : "none";
  setMolecule(parsed.molecule, { keepTrajectory: true, keepView: options.preserveView });
  updateTrajectoryUi();
  updateOrbitalUi();
  document.querySelector("#sourceName").textContent = fileName;
  state.sourceFileName = fileName;
  document.querySelector("#sourceMeta").textContent = `Molden ${parsed.atomUnit}, ${parsed.orbitals.length} orbitals`;
  setStatus(`Loaded Molden geometry and ${parsed.orbitals.length} orbitals from ${fileName}.`);
}

async function loadMoleculeJsonText(text, fileName) {
  const parsed = JSON.parse(text);
  const molecule = await moleculeFromJson(parsed, fileName);
  const orbitals = parseOpenQpJsonOrbitals(jsonMoleculeSource(parsed), molecule.atoms.length);
  setMolecule(molecule);
  state.trajectory = [];
  state.frameIndex = 0;
  state.orbitals = orbitals;
  state.selectedOrbital = null;
  state.orbitalRenderSource = orbitals.length ? "metadata" : "none";
  updateTrajectoryUi();
  updateOrbitalUi();
  document.querySelector("#sourceName").textContent = fileName;
  state.sourceFileName = fileName;
  document.querySelector("#sourceMeta").textContent = isOpenQpJson(parsed)
    ? `OpenQP JSON geometry, ${orbitals.length} orbitals`
    : "Molecule JSON";
  setStatus(`Loaded molecule JSON from ${fileName}${orbitals.length ? ` with ${orbitals.length} orbitals` : ""}.`);
}

async function moleculeFromJson(input, fileName = "molecule.json") {
  const source = jsonMoleculeSource(input);
  const openQpMolecule = moleculeFromOpenQpJson(source, fileName);
  if (openQpMolecule) return openQpMolecule;
  const rawAtoms = jsonAtomList(source);
  if (!source || !rawAtoms) {
    if (isOpenQpJson(source)) {
      const xyzUrl = matchingXyzUrl(fileName);
      if (xyzUrl) {
        const response = await fetch(xyzUrl, { cache: "no-store" });
        if (response.ok) {
          return parseXyz(await response.text(), fileName.replace(/\.json$/i, ".xyz"));
        }
      }
      throw new Error("OpenQP JSON does not contain geometry. Upload the matching .xyz, .log, or .molden file to show the structure.");
    }
    throw new Error("Molecule JSON needs an atoms array, or an OpenQP JSON file with matching geometry available.");
  }
  const atoms = rawAtoms.map((atom, index) => normalizeJsonAtom(atom, index));
  const bonds = Array.isArray(source.bonds) ? normalizeJsonBonds(source.bonds, atoms) : inferBonds(atoms);
  return {
    name: source.name || fileName.replace(/\.json$/i, ""),
    formula: source.formula || formulaFromAtoms(atoms),
    atoms,
    bonds
  };
}

function moleculeFromOpenQpJson(source, fileName) {
  if (
    !source ||
    !Array.isArray(source.atoms) ||
    !Array.isArray(source.coord) ||
    source.coord.length < source.atoms.length * 3
  ) {
    return null;
  }
  const atoms = source.atoms.map((atomicNumber, index) => {
    const symbol = symbolFromJsonValue(atomicNumber, { allowAtomicNumber: true });
    if (!symbol) {
      throw new Error(`OpenQP JSON atom ${index + 1} has unsupported atomic number ${atomicNumber}.`);
    }
    return [
      symbol,
      Number(source.coord[index * 3]) * BOHR_TO_ANGSTROM,
      Number(source.coord[index * 3 + 1]) * BOHR_TO_ANGSTROM,
      Number(source.coord[index * 3 + 2]) * BOHR_TO_ANGSTROM
    ];
  });
  if (atoms.some((atom) => atom.slice(1).some((value) => !Number.isFinite(value)))) {
    throw new Error("OpenQP JSON coord array contains invalid coordinates.");
  }
  return {
    name: fileName.replace(/\.json$/i, ""),
    formula: formulaFromAtoms(atoms),
    atoms,
    bonds: inferBonds(atoms)
  };
}

function parseOpenQpJsonOrbitals(source, atomCount) {
  if (!source || typeof source !== "object") return [];
  const alpha = parseOpenQpJsonSpinOrbitals(source["OQP::E_MO_A"] || source.E_MO_A, source["OQP::VEC_MO_A"] || source.VEC_MO_A, "Alpha", atomCount);
  const beta = parseOpenQpJsonSpinOrbitals(source["OQP::E_MO_B"] || source.E_MO_B, source["OQP::VEC_MO_B"] || source.VEC_MO_B, "Beta", atomCount);
  return [...alpha, ...beta];
}

function parseOpenQpJsonSpinOrbitals(energies, vectors, spin, atomCount) {
  if (!Array.isArray(energies) || !Array.isArray(vectors)) return [];
  const orbitals = [];
  const orbitalCount = energies.length;
  const vectorLength = Array.isArray(vectors[0]) ? vectors[0].length : Math.floor(vectors.length / Math.max(orbitalCount, 1));
  for (let i = 0; i < orbitalCount; i += 1) {
    const energy = Number(energies[i]);
    const vector = Array.isArray(vectors[i])
      ? vectors[i]
      : vectors.slice(i * vectorLength, (i + 1) * vectorLength);
    if (!Number.isFinite(energy) || !Array.isArray(vector) || !vector.length) continue;
    const coefficients = Float32Array.from(vector.map((value) => Number(value) || 0));
    orbitals.push({
      index: i + 1,
      energy,
      spin,
      occupancy: null,
      source: "OpenQP JSON",
      atomWeights: approximateAtomWeightsFromCoefficients(coefficients, atomCount),
      atomPhases: approximateAtomPhasesFromCoefficients(coefficients, atomCount),
      coefficients
    });
  }
  return orbitals;
}

function approximateAtomWeightsFromCoefficients(coefficients, atomCount) {
  if (!atomCount || !coefficients.length) return [];
  const weights = Array(atomCount).fill(0);
  coefficients.forEach((value, index) => {
    weights[index % atomCount] += value * value;
  });
  const max = Math.max(...weights, 0);
  return max > 0 ? weights.map((value) => value / max) : weights;
}

function approximateAtomPhasesFromCoefficients(coefficients, atomCount) {
  if (!atomCount || !coefficients.length) return [];
  const signed = Array(atomCount).fill(0);
  coefficients.forEach((value, index) => {
    signed[index % atomCount] += value;
  });
  return signed.map((value) => (value < 0 ? -1 : 1));
}

function jsonMoleculeSource(input) {
  if (Array.isArray(input)) return { atoms: input };
  if (!input || typeof input !== "object") return input;
  return input.molecule || input.geometry || input.structure || input;
}

function isOpenQpJson(source) {
  return Boolean(source && Object.keys(source).some((key) => key.startsWith("OQP::")));
}

function matchingXyzUrl(fileName) {
  if (/^(S0|S1)\.json$/i.test(fileName) || /thymine/i.test(fileName)) {
    return "samples/thymine.xyz";
  }
  return "";
}

function jsonAtomList(source) {
  if (!source || typeof source !== "object") return null;
  const directAtoms = Array.isArray(source.atoms) ? source.atoms : null;
  const atomBlock = !directAtoms && source.atoms && typeof source.atoms === "object" ? source.atoms : source;
  const symbols = atomBlock.symbols || atomBlock.elements || atomBlock.element || atomBlock.atomSymbols || atomBlock.atom_names || atomBlock.names || atomBlock.atomic_numbers || atomBlock.atomicNumbers;
  const coords = atomBlock.coordinates || atomBlock.coords || atomBlock.coord || atomBlock.xyz || atomBlock.positions || atomBlock.position;
  if (directAtoms) {
    if (
      Array.isArray(coords) &&
      coords.length >= directAtoms.length * 3 &&
      directAtoms.every((value) => symbolFromJsonValue(value, { allowAtomicNumber: true })) &&
      coords.every((value) => Number.isFinite(Number(value)))
    ) {
      const unit = jsonCoordinateUnitFactor(source, coords);
      return directAtoms.map((symbol, index) => [
        symbol,
        Number(coords[index * 3]) * unit,
        Number(coords[index * 3 + 1]) * unit,
        Number(coords[index * 3 + 2]) * unit
      ]);
    }
    if (Array.isArray(symbols) && symbols.length === directAtoms.length) {
      const merged = directAtoms.map((atom, index) => {
        const atomCoords = coordsFromJsonAtom(atom);
        if (atomCoords) return [symbols[index], ...atomCoords];
        if (jsonAtomHasElement(atom)) return atom;
        return null;
      });
      if (merged.every((atom) => atom !== null)) return merged;
    }
    if (Array.isArray(symbols) && directAtoms.length >= symbols.length * 3 && directAtoms.every((value) => Number.isFinite(Number(value)))) {
      return symbols.map((symbol, index) => [symbol, directAtoms[index * 3], directAtoms[index * 3 + 1], directAtoms[index * 3 + 2]]);
    }
    return directAtoms;
  }
  if (!Array.isArray(symbols) || !Array.isArray(coords)) return null;
  const unit = jsonCoordinateUnitFactor(source, coords);
  if (coords.length === symbols.length && Array.isArray(coords[0])) {
    return symbols.map((symbol, index) => [symbol, ...coords[index].slice(0, 3).map((value) => Number(value) * unit)]);
  }
  if (coords.length >= symbols.length * 3) {
    return symbols.map((symbol, index) => [
      symbol,
      Number(coords[index * 3]) * unit,
      Number(coords[index * 3 + 1]) * unit,
      Number(coords[index * 3 + 2]) * unit
    ]);
  }
  return null;
}

function jsonCoordinateUnitFactor(source, coords) {
  const unit = String(source?.unit || source?.units || source?.coord_unit || source?.coordUnit || "").toLowerCase();
  if (unit.includes("bohr") || unit.includes("au") || unit.includes("a.u")) return BOHR_TO_ANGSTROM;
  if (unit.includes("ang")) return 1;
  return isOpenQpJson(source) && Array.isArray(source?.coord) && source.coord === coords ? BOHR_TO_ANGSTROM : 1;
}

function jsonAtomHasElement(atom) {
  if (Array.isArray(atom)) {
    return Boolean(symbolFromJsonValue(atom[0], { allowAtomicNumber: atom.length >= 4 }) || symbolFromJsonValue(atom[3], { allowAtomicNumber: false }) || (atom.length >= 5 && symbolFromJsonValue(atom[1], { allowAtomicNumber: false })));
  }
  if (atom && typeof atom === "object") {
    return Boolean(symbolFromJsonAtomObject(atom));
  }
  return false;
}

function coordsFromJsonAtom(atom) {
  if (Array.isArray(atom)) {
    const vector = Array.isArray(atom[0]) ? atom[0] : atom;
    const coords = vector.slice(0, 3).map(Number);
    return coords.every(Number.isFinite) ? coords : null;
  }
  if (atom && typeof atom === "object") {
    const vector = atom.coordinates || atom.coordinate || atom.coords || atom.coord || atom.xyz || atom.position || atom.pos || atom.r;
    const coords = Array.isArray(vector)
      ? vector.slice(0, 3).map(Number)
      : [atom.x ?? atom.X, atom.y ?? atom.Y, atom.z ?? atom.Z].map(Number);
    return coords.every(Number.isFinite) ? coords : null;
  }
  return null;
}

function normalizeJsonAtom(atom, index) {
  if (Array.isArray(atom) && atom.length >= 4) {
    const leadingSymbol = symbolFromJsonValue(atom[0], { allowAtomicNumber: true });
    const trailingSymbol = symbolFromJsonValue(atom[3], { allowAtomicNumber: false });
    if (leadingSymbol && Array.isArray(atom[1])) {
      const coords = atom[1].slice(0, 3).map(Number);
      if (coords.every(Number.isFinite)) return [leadingSymbol, coords[0], coords[1], coords[2]];
    }
    if (leadingSymbol) {
      const coords = atom.slice(1, 4).map(Number);
      if (coords.every(Number.isFinite)) return [leadingSymbol, coords[0], coords[1], coords[2]];
    }
    if (trailingSymbol) {
      const coords = atom.slice(0, 3).map(Number);
      if (coords.every(Number.isFinite)) return [trailingSymbol, coords[0], coords[1], coords[2]];
    }
    const indexedSymbol = symbolFromJsonValue(atom[1], { allowAtomicNumber: false });
    if (indexedSymbol && atom.length >= 5) {
      const coords = atom.slice(2, 5).map(Number);
      if (coords.every(Number.isFinite)) return [indexedSymbol, coords[0], coords[1], coords[2]];
    }
  }
  if (Array.isArray(atom) && atom.length >= 2 && Array.isArray(atom[1])) {
    const symbol = symbolFromJsonValue(atom[0], { allowAtomicNumber: true });
    const coords = atom[1].slice(0, 3).map(Number);
    if (symbol && coords.every(Number.isFinite)) {
      return [symbol, coords[0], coords[1], coords[2]];
    }
  }
  if (atom && typeof atom === "object") {
    const symbol = symbolFromJsonAtomObject(atom);
    const vector = atom.coordinates || atom.coordinate || atom.coords || atom.coord || atom.xyz || atom.position || atom.pos || atom.r;
    const coords = Array.isArray(vector)
      ? vector.slice(0, 3).map(Number)
      : [atom.x ?? atom.X, atom.y ?? atom.Y, atom.z ?? atom.Z].map(Number);
    if (ELEMENTS[symbol] && coords.every(Number.isFinite)) {
      return [symbol, coords[0], coords[1], coords[2]];
    }
  }
  throw new Error(`Molecule JSON atom ${index + 1} must have an element and x/y/z coordinates.`);
}

function symbolFromJsonAtomObject(atom) {
  const hasUppercaseCoordinates = "X" in atom && "Y" in atom && "Z" in atom;
  return symbolFromJsonValue(
    atom.symbol ||
    atom.element ||
    atom.atom ||
    atom.name ||
    atom.label ||
    atom.type ||
    atom.atomicNumber ||
    atom.atomic_number ||
    atom.number ||
    atom.znum ||
    (hasUppercaseCoordinates ? undefined : atom.Z)
  );
}

function symbolFromJsonValue(value, options = {}) {
  if (value === null || value === undefined) return "";
  if (options.allowAtomicNumber !== false && (typeof value === "number" || /^\d+$/.test(String(value).trim()))) {
    return Z_TO_SYMBOL[Number(value)] || "";
  }
  if (typeof value === "number") return "";
  const match = String(value).trim().match(/[A-Za-z]{1,2}/);
  const symbol = normalizeElementSymbol(match ? match[0] : value);
  return ELEMENTS[symbol] ? symbol : "";
}

function normalizeJsonBonds(bonds, atoms) {
  const atomCount = atoms.length;
  const parsed = adjacencyMatrixBonds(bonds, atomCount) || pairListBonds(bonds, atomCount);
  if (!parsed?.length) return inferBonds(atoms);
  const unique = uniqueBonds(parsed);
  return bondSetLooksChemical(unique, atoms) ? unique : inferBonds(atoms);
}

function adjacencyMatrixBonds(bonds, atomCount) {
  if (
    bonds.length !== atomCount ||
    !bonds.every((row) => Array.isArray(row) && row.length === atomCount && row.every((value) => Number.isFinite(Number(value))))
  ) {
    return null;
  }
  const parsed = [];
  for (let i = 0; i < atomCount; i += 1) {
    for (let j = i + 1; j < atomCount; j += 1) {
      if (Number(bonds[i][j]) !== 0 || Number(bonds[j][i]) !== 0) {
        parsed.push([i, j]);
      }
    }
  }
  return parsed;
}

function pairListBonds(bonds, atomCount) {
  const pairs = [];
  for (const bond of bonds) {
    if (Array.isArray(bond)) {
      const indexes = bond.slice(0, 2).map((value) => Number(value));
      if (indexes.every(Number.isInteger)) {
        pairs.push(indexes);
        continue;
      }
    }
    if (bond && typeof bond === "object") {
      const indexes = [
        bond.a ?? bond.from ?? bond.i ?? bond.atom1 ?? bond.begin,
        bond.b ?? bond.to ?? bond.j ?? bond.atom2 ?? bond.end
      ].map((value) => Number(value));
      if (indexes.every(Number.isInteger)) {
        pairs.push(indexes);
        continue;
      }
    }
    return null;
  }
  if (!pairs.length) return null;
  const hasZero = pairs.some((pair) => pair.includes(0));
  const normalized = hasZero ? pairs : pairs.map(([a, b]) => [a - 1, b - 1]);
  return normalized.every(([a, b]) => a !== b && a >= 0 && b >= 0 && a < atomCount && b < atomCount)
    ? normalized
    : null;
}

function uniqueBonds(bonds) {
  const seen = new Set();
  const unique = [];
  bonds.forEach(([a, b]) => {
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    const key = `${lo}:${hi}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push([lo, hi]);
    }
  });
  return unique;
}

function bondSetLooksChemical(bonds, atoms) {
  if (!bonds.length || bonds.length > atoms.length * 2.2) return false;
  let unreasonable = 0;
  bonds.forEach(([a, b]) => {
    const atomA = atoms[a];
    const atomB = atoms[b];
    const ar = ELEMENTS[atomA[0]]?.covalent || 0.75;
    const br = ELEMENTS[atomB[0]]?.covalent || 0.75;
    const distance = Math.hypot(atomA[1] - atomB[1], atomA[2] - atomB[2], atomA[3] - atomB[3]);
    if (distance <= 0.35 || distance > (ar + br) * 1.5) unreasonable += 1;
  });
  return unreasonable / bonds.length <= 0.15;
}

function loadXyzText(text, fileName) {
  const molecule = parseXyz(text, fileName);
  setMolecule(molecule);
  document.querySelector("#sourceName").textContent = fileName;
  state.sourceFileName = fileName;
  document.querySelector("#sourceMeta").textContent = `XYZ geometry: ${molecule.atoms.length} atoms`;
  setStatus(`Loaded XYZ geometry from ${fileName}.`);
}

function moleculeToXyz(molecule) {
  const title = `${molecule.name || "Molecule"} generated by MolView`;
  const lines = [
    String(molecule.atoms.length),
    title,
    ...molecule.atoms.map(([symbol, x, y, z]) =>
      `${symbol.padEnd(2, " ")} ${formatXyzCoordinate(x)} ${formatXyzCoordinate(y)} ${formatXyzCoordinate(z)}`
    )
  ];
  return `${lines.join("\n")}\n`;
}

function formatXyzCoordinate(value) {
  return Number(value).toFixed(12).padStart(18, " ");
}

function safeFileStem(name) {
  return String(name || "molecule")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "molecule";
}

function downloadTextFile(text, fileName, type = "text/plain") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

async function saveTextFile(text, fileName, type = "text/plain", description = "Text file") {
  if (window.showSaveFilePicker) {
    const extension = fileName.includes(".") ? `.${fileName.split(".").pop()}` : ".txt";
    const handle = await window.showSaveFilePicker({
      suggestedName: fileName,
      types: [{
        description,
        accept: { [type]: [extension] }
      }]
    });
    const writable = await handle.createWritable();
    await writable.write(new Blob([text], { type }));
    await writable.close();
    return "saved";
  }
  downloadTextFile(text, fileName, type);
  return "downloaded";
}

function parseXyz(text, fileName = "molecule.xyz") {
  const lines = text.trim().split(/\r?\n/);
  const atomCount = Number(lines[0]?.trim());
  if (!Number.isInteger(atomCount) || atomCount <= 0) {
    throw new Error("XYZ file must start with the atom count.");
  }
  const title = lines[1]?.trim() || fileName.replace(/\.xyz$/i, "");
  const atoms = [];
  for (let i = 0; i < atomCount; i += 1) {
    const parts = lines[i + 2]?.trim().split(/\s+/) || [];
    if (parts.length < 4) {
      throw new Error(`XYZ atom line ${i + 3} is incomplete.`);
    }
    const symbol = normalizeElementSymbol(parts[0]);
    const coords = parts.slice(1, 4).map(Number);
    if (!ELEMENTS[symbol] || coords.some((value) => !Number.isFinite(value))) {
      throw new Error(`XYZ atom line ${i + 3} has an unsupported element or invalid coordinate.`);
    }
    atoms.push([symbol, coords[0], coords[1], coords[2]]);
  }
  return {
    name: title,
    formula: formulaFromAtoms(atoms),
    atoms,
    bonds: inferBonds(atoms)
  };
}

function normalizeElementSymbol(symbol) {
  const trimmed = String(symbol || "").trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

function parseCube(text, fileName = "cube volume") {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 7) {
    throw new Error("Cube file is too short.");
  }
  const title = lines[0]?.trim() || fileName;
  const originLine = lines[2].trim().split(/\s+/).map(Number);
  const rawAtomCount = originLine[0];
  const atomCount = Math.abs(rawAtomCount);
  const unitFactor = rawAtomCount < 0 ? 1 : BOHR_TO_ANGSTROM;
  const origin = {
    x: originLine[1] * unitFactor,
    y: originLine[2] * unitFactor,
    z: originLine[3] * unitFactor
  };
  const axes = [3, 4, 5].map((lineIndex) => {
    const parts = lines[lineIndex].trim().split(/\s+/).map(Number);
    return {
      count: Math.abs(parts[0]),
      vector: {
        x: parts[1] * unitFactor,
        y: parts[2] * unitFactor,
        z: parts[3] * unitFactor
      }
    };
  });

  const atoms = [];
  for (let i = 0; i < atomCount; i += 1) {
    const parts = lines[6 + i].trim().split(/\s+/).map(Number);
    const symbol = Z_TO_SYMBOL[Math.round(parts[0])] || "C";
    atoms.push([symbol, parts[2] * unitFactor, parts[3] * unitFactor, parts[4] * unitFactor]);
  }

  const values = lines.slice(6 + atomCount).join(" ").trim().split(/\s+/).map(Number).filter(Number.isFinite);
  const expected = axes[0].count * axes[1].count * axes[2].count;
  if (values.length < expected) {
    throw new Error(`Cube grid is incomplete: expected ${expected} values, found ${values.length}.`);
  }

  return {
    name: fileName.replace(/\.(cube|cub)$/i, ""),
    title,
    origin,
    axes,
    atoms,
    values: values.slice(0, expected),
    maxAbs: Math.max(...values.slice(0, expected).map((value) => Math.abs(value)), 0)
  };
}

async function loadCubeText(text, fileName) {
  const cube = parseCube(text, fileName);
  const molecule = {
    name: cube.name,
    formula: formulaFromAtoms(cube.atoms),
    atoms: cube.atoms,
    bonds: inferBonds(cube.atoms)
  };
  state.trajectory = [];
  state.frameIndex = 0;
  state.orbitals = [{
    index: 1,
    energy: 0,
    source: "Cube volumetric grid",
    atomWeights: Array(cube.atoms.length).fill(0),
    atomPhases: Array(cube.atoms.length).fill(1)
  }];
  state.selectedOrbital = state.orbitals[0];
  state.orbitalRenderSource = "cube";
  setMolecule(molecule, { keepTrajectory: true });
  updateTrajectoryUi();
  updateOrbitalUi();
  orbitalSelect.value = "0";
  state.volumeData = cube;
  await renderCubeVolume(cube, { preserveView: false });
  document.querySelector("#sourceName").textContent = fileName;
  state.sourceFileName = fileName;
  document.querySelector("#sourceMeta").textContent = `${cube.axes.map((axis) => axis.count).join(" x ")} cube grid`;
  setOrbitalStatus("Cube grid loaded as true positive/negative marching-cubes isosurfaces.", { log: true });
  setStatus(`Loaded volumetric cube grid from ${fileName}.`);
}

async function renderCubeVolume(cube, options = {}) {
  structureRenderRequest += 1;
  viewerPanel.classList.add("volume-mode");
  volumeHost.hidden = false;
  const hadRenderer = Boolean(state.volumeRenderer);
  if (!state.volumeRenderer) {
    state.volumeRenderer = await createVolumeRenderer(volumeHost);
  }
  state.volumeRenderer.setVolume(cube, volumeOptions(), {
    preserveView: options.preserveView ?? hadRenderer
  });
}

async function renderStructureView(options = {}) {
  if (state.volumeData) return;
  const requestId = ++structureRenderRequest;
  viewerPanel.classList.add("volume-mode");
  volumeHost.hidden = false;
  if (!state.volumeRenderer) {
    state.volumeRenderer = await createVolumeRenderer(volumeHost);
  }
  if (requestId !== structureRenderRequest || state.volumeData) return;
  state.volumeRenderer.setMolecule(state.molecule, {
    preserveView: Boolean(options.preserveView),
    framePadding: 2.2
  });
}

async function renderMoldenOrbital(orbital) {
  const requestId = ++orbitalRenderRequest;
  if (!state.moldenBasis?.basisFunctions?.length || !orbital?.coefficients?.length) {
    setOrbitalStatus("This orbital has metadata only. Upload a cube grid or a Molden file with [GTO] and [MO] sections.", { log: true });
    return;
  }
  setOrbitalStatus(`Evaluating ${orbital.spin || ""} MO ${orbital.index} on a 3D grid...`);
  await new Promise((resolve) => requestAnimationFrame(resolve));
  const cube = buildMoldenOrbitalVolume(state.molecule, state.moldenBasis.basisFunctions, orbital);
  if (!cube.maxAbs || cube.maxAbs <= 0) {
    throw new Error("The selected Molden orbital evaluated to an empty grid. Try a different MO or check basis normalization.");
  }
  if (requestId !== orbitalRenderRequest || state.selectedOrbital !== orbital) {
    return;
  }
  state.volumeData = cube;
  await renderCubeVolume(cube, { preserveView: true });
  if (requestId !== orbitalRenderRequest || state.selectedOrbital !== orbital) {
    state.volumeRenderer?.clearSurfaces();
    return;
  }
  document.querySelector("#sourceMeta").textContent = `${cube.axes.map((axis) => axis.count).join(" x ")} generated MO grid`;
  setOrbitalStatus(`${orbital.spin || ""} MO ${orbital.index} rendered from Molden coefficients with marching cubes.`, { log: true });
}

function buildMoldenOrbitalVolume(molecule, basisFunctions, orbital) {
  const resolution = 72;
  const margin = 4.5;
  const bounds = molecule.atoms.reduce(
    (acc, [, x, y, z]) => ({
      minX: Math.min(acc.minX, x),
      maxX: Math.max(acc.maxX, x),
      minY: Math.min(acc.minY, y),
      maxY: Math.max(acc.maxY, y),
      minZ: Math.min(acc.minZ, z),
      maxZ: Math.max(acc.maxZ, z)
    }),
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity, minZ: Infinity, maxZ: -Infinity }
  );
  const min = { x: bounds.minX - margin, y: bounds.minY - margin, z: bounds.minZ - margin };
  const span = {
    x: Math.max(1, bounds.maxX - bounds.minX + margin * 2),
    y: Math.max(1, bounds.maxY - bounds.minY + margin * 2),
    z: Math.max(1, bounds.maxZ - bounds.minZ + margin * 2)
  };
  const step = {
    x: span.x / (resolution - 1),
    y: span.y / (resolution - 1),
    z: span.z / (resolution - 1)
  };
  const values = new Float32Array(resolution * resolution * resolution);
  let maxAbs = 0;
  let pointer = 0;

  for (let ix = 0; ix < resolution; ix += 1) {
    const x = min.x + ix * step.x;
    for (let iy = 0; iy < resolution; iy += 1) {
      const y = min.y + iy * step.y;
      for (let iz = 0; iz < resolution; iz += 1) {
        const z = min.z + iz * step.z;
        const value = evaluateMoldenOrbitalAt(x, y, z, molecule.atoms, basisFunctions, orbital.coefficients);
        values[pointer] = value;
        maxAbs = Math.max(maxAbs, Math.abs(value));
        pointer += 1;
      }
    }
  }

  return {
    name: `${molecule.name}-MO-${orbital.index}`,
    title: `${orbital.spin || ""} MO ${orbital.index}`,
    origin: min,
    axes: [
      { count: resolution, vector: { x: step.x, y: 0, z: 0 } },
      { count: resolution, vector: { x: 0, y: step.y, z: 0 } },
      { count: resolution, vector: { x: 0, y: 0, z: step.z } }
    ],
    atoms: molecule.atoms,
    values,
    maxAbs
  };
}

function evaluateMoldenOrbitalAt(x, y, z, atoms, basisFunctions, coefficients) {
  let value = 0;
  for (let i = 0; i < basisFunctions.length; i += 1) {
    const coefficient = coefficients[i];
    if (!coefficient) continue;
    const basis = basisFunctions[i];
    const atom = atoms[basis.atomIndex];
    if (!atom) continue;
    const dx = x - atom[1];
    const dy = y - atom[2];
    const dz = z - atom[3];
    const r2 = dx * dx + dy * dy + dz * dz;
    const polynomial = Math.pow(dx, basis.powers[0]) * Math.pow(dy, basis.powers[1]) * Math.pow(dz, basis.powers[2]);
    let contracted = 0;
    basis.primitives.forEach((primitive) => {
      contracted += primitive.coefficient * Math.exp(-primitive.exponent * r2);
    });
    value += coefficient * polynomial * contracted;
  }
  return value;
}

async function createVolumeRenderer(host) {
  let THREE;
  let OrbitControls;
  let MarchingCubes;
  try {
    THREE = await import("https://esm.sh/three@0.164.1");
    ({ OrbitControls } = await import("https://esm.sh/three@0.164.1/examples/jsm/controls/OrbitControls.js"));
    ({ MarchingCubes } = await import("https://esm.sh/three@0.164.1/examples/jsm/objects/MarchingCubes.js"));
  } catch (error) {
    throw new Error(`Could not load Three.js MarchingCubes modules: ${error.message}`);
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.localClippingEnabled = true;
  host.replaceChildren(renderer.domElement);
  const hoverTooltip = document.createElement("div");
  hoverTooltip.className = "bond-hover-tooltip";
  hoverTooltip.hidden = true;
  host.append(hoverTooltip);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x030515);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
  camera.position.set(0, 0, 12);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.rotateSpeed = 0.78;
  controls.zoomSpeed = 0.7;

  const hemisphere = new THREE.HemisphereLight(0xdcefff, 0x10151a, 1);
  scene.add(hemisphere);
  const key = new THREE.DirectionalLight(0xffffff, 0.96);
  key.position.set(4, 7, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x8fb8ff, 0.24);
  rim.position.set(-6, 3, -5);
  scene.add(rim);

  function updateLighting(light = state.light) {
    const t = Math.min(1, Math.max(0, Number(light) || 0));
    renderer.toneMappingExposure = mix(0.58, 1.18, t);
    hemisphere.intensity = mix(0.85, 2.15, t);
    key.intensity = mix(0.58, 1.65, t);
    rim.intensity = mix(0.1, 0.58, t);
  }

  const atomGroup = new THREE.Group();
  const annotationGroup = new THREE.Group();
  const axesGroup = new THREE.Group();
  const surfaceGroup = new THREE.Group();
  scene.add(surfaceGroup);
  scene.add(atomGroup);
  scene.add(annotationGroup);
  scene.add(axesGroup);

  let animationFrame = null;
  let positiveSurface = null;
  let negativeSurface = null;
  let currentView = null;
  let currentMolecule = null;

  function hideBondTooltip() {
    hoverTooltip.hidden = true;
  }

  function updateBondTooltip(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    if (!rect.width || !rect.height) return hideBondTooltip();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster
      .intersectObjects(atomGroup.children, true)
      .find((intersection) => intersection.object.userData.materialKind === "bond");
    if (!hit) return hideBondTooltip();
    const { bondLength, bondLabel } = hit.object.userData;
    if (!Number.isFinite(bondLength)) return hideBondTooltip();
    hoverTooltip.textContent = `${bondLabel || "Bond"} ${bondLength.toFixed(3)} Å`;
    hoverTooltip.style.left = `${event.clientX - rect.left + 12}px`;
    hoverTooltip.style.top = `${event.clientY - rect.top + 12}px`;
    hoverTooltip.hidden = false;
  }

  function resetCameraToCurrentView() {
    if (!currentView) return;
    const { center, radius } = currentView;
    controls.target.set(center.x, center.y, center.z);
    camera.position.set(
      center.x + radius * DEFAULT_CAMERA_OFFSET.x,
      center.y + radius * DEFAULT_CAMERA_OFFSET.y,
      center.z + radius * DEFAULT_CAMERA_OFFSET.z
    );
    camera.near = Math.max(0.01, radius / 200);
    camera.far = radius * 18;
    camera.updateProjectionMatrix();
    controls.update();
  }

  function recenterCameraToCurrentView() {
    if (!currentView) return;
    const { center, radius } = currentView;
    const offset = camera.position.clone().sub(controls.target);
    controls.target.set(center.x, center.y, center.z);
    if (offset.lengthSq() > 0) {
      camera.position.set(center.x + offset.x, center.y + offset.y, center.z + offset.z);
    } else {
      camera.position.set(
        center.x + radius * DEFAULT_CAMERA_OFFSET.x,
        center.y + radius * DEFAULT_CAMERA_OFFSET.y,
        center.z + radius * DEFAULT_CAMERA_OFFSET.z
      );
    }
    camera.near = Math.max(0.01, radius / 200);
    camera.far = radius * 18;
    camera.updateProjectionMatrix();
    controls.update();
  }

  function setMoleculeScene(molecule, viewOptions = {}) {
    const previousOffset = currentView
      ? camera.position.clone().sub(controls.target)
      : null;
    clearGroup(atomGroup);
    clearGroup(annotationGroup);
    clearGroup(axesGroup);
    currentMolecule = molecule;
    addMoleculeToScene(THREE, atomGroup, molecule);
    addAtomAnnotationsToScene(THREE, annotationGroup, molecule, {
      labels: state.labels,
      numbering: state.numbering
    });
    const center = molecule.center || moleculeCenter(molecule);
    const baseExtent = molecule.extent || moleculeExtent(molecule);
    const radius = Math.max(baseExtent + (viewOptions.framePadding ?? 0), 4);
    currentView = { center, radius };
    updateAxesHelper(THREE, axesGroup, {
      center,
      radius,
      visible: state.axes
    });
    if (viewOptions.preserveView && previousOffset && previousOffset.lengthSq() > 0) {
      controls.target.set(center.x, center.y, center.z);
      camera.position.set(center.x + previousOffset.x, center.y + previousOffset.y, center.z + previousOffset.z);
      camera.near = Math.max(0.01, radius / 200);
      camera.far = radius * 18;
      camera.updateProjectionMatrix();
      controls.update();
    } else {
      resetCameraToCurrentView();
    }
  }

  const api = {
    resize(resetPosition = false) {
      const rect = host.getBoundingClientRect();
      renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height), false);
      camera.aspect = Math.max(1, rect.width) / Math.max(1, rect.height);
      camera.updateProjectionMatrix();
      if (resetPosition) {
        recenterCameraToCurrentView();
      }
    },
    resetView() {
      resetCameraToCurrentView();
    },
    setMolecule(molecule, viewOptions = {}) {
      clearGroup(surfaceGroup);
      positiveSurface = null;
      negativeSurface = null;
      setMoleculeScene(molecule, viewOptions);
      api.resize();
    },
    clearSurfaces() {
      clearGroup(surfaceGroup);
      positiveSurface = null;
      negativeSurface = null;
    },
    setVolume(cube, options, viewOptions = {}) {
      clearGroup(surfaceGroup);
      const molecule = {
        atoms: cube.atoms,
        bonds: inferBonds(cube.atoms),
        ...normalizeMolecule({
          name: cube.name || "Volume",
          formula: formulaFromAtoms(cube.atoms),
          atoms: cube.atoms,
          bonds: inferBonds(cube.atoms)
        })
      };

      const resolution = Math.min(128, Math.max(48, cube.axes[0].count, cube.axes[1].count, cube.axes[2].count));
      const sampled = resampleCube(cube, resolution);
      const extent = cubeExtent(cube);
      const center = cubeCenter(cube);
      const isolation = Math.max(options.isovalue / Math.max(options.surfaceSize, 0.02), cube.maxAbs * 0.0025);
      if (!Number.isFinite(isolation) || isolation <= 0) {
        throw new Error("Invalid isovalue for this volume.");
      }

      positiveSurface = buildMarchingSurface(THREE, MarchingCubes, resolution, sampled, isolation, 0x4f8fdc, options, false);
      negativeSurface = buildMarchingSurface(THREE, MarchingCubes, resolution, sampled.map((value) => -value), isolation, 0xff9fbe, options, true);
      [positiveSurface, negativeSurface].forEach((surface) => {
        surface.position.set(center.x, center.y, center.z);
        surface.scale.set(extent.x / 2, extent.y / 2, extent.z / 2);
        surfaceGroup.add(surface);
      });

      const radius = Math.max(extent.x, extent.y, extent.z, 4);
      setMoleculeScene({ ...molecule, center, extent: radius }, viewOptions);
      api.resize();
    },
    updateSurfaceStyle(options) {
      [positiveSurface, negativeSurface].forEach((surface, index) => {
        if (!surface) return;
        const opacity = index === 0 ? options.positiveOpacity : options.negativeOpacity;
        applySurfacePolish(surface.material, options.polish);
        surface.material.transparent = options.mode !== "solid" || opacity < 1;
        surface.material.opacity = options.mode === "solid" ? Math.max(0.9, opacity) : opacity;
        surface.material.wireframe = options.mode === "wireframe";
        surface.material.depthWrite = options.mode === "solid";
        surface.material.needsUpdate = true;
      });
    },
    updateAtomAnnotations(options) {
      clearGroup(annotationGroup);
      if (currentMolecule) {
        addAtomAnnotationsToScene(THREE, annotationGroup, currentMolecule, options);
      }
    },
    updateAxes(visible) {
      axesGroup.visible = visible;
    },
    updatePolish(polish) {
      [positiveSurface, negativeSurface].forEach((surface) => {
        if (surface) applySurfacePolish(surface.material, polish);
      });
      atomGroup.traverse((child) => {
        if (!child.material) return;
        applyMoleculePolish(child.material, polish, child.userData.materialKind);
      });
    },
    updateLighting(light) {
      updateLighting(light);
    },
    dispose() {
      cancelAnimationFrame(animationFrame);
      renderer.domElement.removeEventListener("pointermove", updateBondTooltip);
      renderer.domElement.removeEventListener("pointerleave", hideBondTooltip);
      controls.dispose();
      renderer.dispose();
      clearGroup(atomGroup);
      clearGroup(annotationGroup);
      clearGroup(axesGroup);
      clearGroup(surfaceGroup);
      host.replaceChildren();
    }
  };

  function animate() {
    controls.update();
    renderer.render(scene, camera);
    animationFrame = requestAnimationFrame(animate);
  }
  api.resize();
  updateLighting(state.light);
  renderer.domElement.addEventListener("pointermove", updateBondTooltip);
  renderer.domElement.addEventListener("pointerleave", hideBondTooltip);
  animate();
  return api;
}

function buildMarchingSurface(THREE, MarchingCubes, resolution, field, isolation, color, options, negativePhase) {
  const material = new THREE.MeshPhysicalMaterial({
    color,
    ...surfaceMaterialPolish(options.polish),
    transmission: 0,
    transparent: options.mode !== "solid",
    opacity: options.mode === "solid" ? Math.max(0.9, negativePhase ? options.negativeOpacity : options.positiveOpacity) : (negativePhase ? options.negativeOpacity : options.positiveOpacity),
    side: THREE.DoubleSide,
    depthWrite: options.mode === "solid",
    wireframe: options.mode === "wireframe"
  });
  const surface = new MarchingCubes(resolution, material, false, false, Math.max(120000, resolution * resolution * 36));
  surface.enableUvs = false;
  surface.enableColors = false;
  surface.field.set(field);
  surface.isolation = isolation;
  surface.update();
  if (surface.geometry) {
    surface.geometry.computeVertexNormals();
    smoothGeometryNormals(surface.geometry);
    if (!surface.geometry.attributes.position || surface.geometry.attributes.position.count === 0) {
      console.warn("Marching cubes produced no vertices for one phase. Try lowering the isovalue.");
    }
  }
  surface.renderOrder = negativePhase ? 2 : 1;
  return surface;
}

function surfaceMaterialPolish(polish) {
  return {
    roughness: mix(0.72, 0.38, polish),
    metalness: mix(0, 0.02, polish),
    clearcoat: mix(0.08, 0.45, polish),
    clearcoatRoughness: mix(0.82, 0.36, polish)
  };
}

function moleculeMaterialPolish(polish, kind = "atom") {
  if (kind === "bond") {
    return { roughness: mix(0.74, 0.44, polish), metalness: mix(0, 0.04, polish) };
  }
  return { roughness: mix(0.84, 0.5, polish), metalness: mix(0, 0.01, polish) };
}

function applySurfacePolish(material, polish) {
  Object.assign(material, surfaceMaterialPolish(polish));
  material.needsUpdate = true;
}

function applyMoleculePolish(material, polish, kind) {
  Object.assign(material, moleculeMaterialPolish(polish, kind));
  material.needsUpdate = true;
}

function mix(a, b, amount) {
  const t = Math.min(1, Math.max(0, Number(amount) || 0));
  return a + (b - a) * t;
}

function smoothGeometryNormals(geometry) {
  const position = geometry.attributes.position;
  const normal = geometry.attributes.normal;
  if (!position || !normal) return;
  const buckets = new Map();
  for (let i = 0; i < position.count; i += 1) {
    const key = `${position.getX(i).toFixed(3)},${position.getY(i).toFixed(3)},${position.getZ(i).toFixed(3)}`;
    const entry = buckets.get(key) || { x: 0, y: 0, z: 0, indexes: [] };
    entry.x += normal.getX(i);
    entry.y += normal.getY(i);
    entry.z += normal.getZ(i);
    entry.indexes.push(i);
    buckets.set(key, entry);
  }
  buckets.forEach((entry) => {
    const length = Math.hypot(entry.x, entry.y, entry.z) || 1;
    entry.indexes.forEach((index) => {
      normal.setXYZ(index, entry.x / length, entry.y / length, entry.z / length);
    });
  });
  normal.needsUpdate = true;
}

function addMoleculeToScene(THREE, group, molecule) {
  const style = state.style;
  const atomGeometry = new THREE.SphereGeometry(1, style === "space-fill" ? 96 : 40, style === "space-fill" ? 48 : 20);
  molecule.atoms.forEach(([symbol, x, y, z]) => {
    const element = ELEMENTS[symbol] || ELEMENTS.C;
    const material = new THREE.MeshStandardMaterial({ color: element.color, ...moleculeMaterialPolish(state.polish, "atom") });
    const atom = new THREE.Mesh(atomGeometry, material);
    atom.userData.materialKind = "atom";
    atom.position.set(x, y, z);
    const atomScale = style === "space-fill" ? element.vdw * VDW_SCALE : style === "wire" ? element.radius * 0.18 : element.radius * 0.5;
    atom.scale.setScalar(Math.max(style === "ball-stick" ? 0.19 : 0.12, atomScale));
    group.add(atom);
  });
  if (style !== "space-fill") {
    molecule.bonds.forEach(([a, b]) => {
      const start = molecule.atoms[a];
      const end = molecule.atoms[b];
      if (!start || !end) return;
      const bondInfo = bondHoverInfo(start, end, a, b);
      if (style === "ball-stick") {
        createColoredBond(THREE, start, end, 0.032).forEach((bond) => {
          Object.assign(bond.userData, bondInfo);
          group.add(bond);
        });
      } else {
        const bondMaterial = new THREE.MeshStandardMaterial({ color: 0xd9e3df, ...moleculeMaterialPolish(state.polish, "bond") });
        const bond = createBondCylinder(THREE, start, end, bondMaterial, 0.025);
        Object.assign(bond.userData, { materialKind: "bond" }, bondInfo);
        group.add(bond);
      }
      group.add(createBondHitbox(THREE, start, end, bondInfo));
    });
  }
}

function bondHoverInfo(start, end, startIndex, endIndex) {
  const length = Math.hypot(start[1] - end[1], start[2] - end[2], start[3] - end[3]);
  return {
    bondLength: length,
    bondLabel: `${start[0]}${startIndex + 1}-${end[0]}${endIndex + 1}`
  };
}

function addAtomAnnotationsToScene(THREE, group, molecule, options) {
  if (state.style === "space-fill") return;
  if (!options.labels && !options.numbering) return;
  molecule.atoms.forEach(([symbol, x, y, z], index) => {
    let text = "";
    if (options.labels && options.numbering) text = `${symbol}${index + 1}`;
    else if (options.labels) text = symbol;
    else if (options.numbering) text = String(index + 1);
    if (!text) return;
    const sprite = createTextSprite(THREE, text);
    sprite.position.set(x, y, z);
    sprite.scale.setScalar(text.length > 2 ? 0.34 : 0.28);
    sprite.renderOrder = 50;
    group.add(sprite);
  });
}

function updateAxesHelper(THREE, group, options) {
  clearGroup(group);
  group.visible = options.visible;
  const length = Math.max(1.2, options.radius * 0.22);
  const origin = {
    x: options.center.x - options.radius * 0.42,
    y: options.center.y - options.radius * 0.42,
    z: options.center.z - options.radius * 0.42
  };
  [
    { label: "X", color: 0xff7ab8, end: [length, 0, 0] },
    { label: "Y", color: 0x86b7ff, end: [0, length, 0] },
    { label: "Z", color: 0xd7f7ff, end: [0, 0, length] }
  ].forEach((axis) => {
    const material = new THREE.LineBasicMaterial({ color: axis.color, linewidth: 2 });
    const points = [
      new THREE.Vector3(origin.x, origin.y, origin.z),
      new THREE.Vector3(origin.x + axis.end[0], origin.y + axis.end[1], origin.z + axis.end[2])
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    group.add(new THREE.Line(geometry, material));
    const sprite = createTextSprite(THREE, axis.label);
    sprite.position.set(origin.x + axis.end[0] * 1.12, origin.y + axis.end[1] * 1.12, origin.z + axis.end[2] * 1.12);
    sprite.scale.setScalar(length * 0.18);
    group.add(sprite);
  });
}

function createTextSprite(THREE, text) {
  const canvas = document.createElement("canvas");
  const size = 128;
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, size, size);
  context.font = text.length > 2 ? "700 38px system-ui" : "700 48px system-ui";
  context.textAlign = "center";
  context.textBaseline = "middle";
  const width = Math.min(size - 14, context.measureText(text).width + 22);
  const x = (size - width) / 2;
  context.fillStyle = "rgba(7, 10, 24, 0.72)";
  roundRect(context, x, 35, width, 58, 14);
  context.fill();
  context.strokeStyle = "rgba(244, 246, 255, 0.38)";
  context.lineWidth = 2;
  context.stroke();
  context.fillStyle = "#f4f6ff";
  context.fillText(text, size / 2, size / 2 + 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    depthWrite: false
  });
  return new THREE.Sprite(material);
}

function roundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function createBondCylinder(THREE, start, end, material, radius = 0.055) {
  const a = new THREE.Vector3(start[1], start[2], start[3]);
  const b = new THREE.Vector3(end[1], end[2], end[3]);
  const midpoint = a.clone().add(b).multiplyScalar(0.5);
  const direction = b.clone().sub(a);
  const geometry = new THREE.CylinderGeometry(radius, radius, direction.length(), 24, 1);
  const cylinder = new THREE.Mesh(geometry, material);
  cylinder.position.copy(midpoint);
  cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  return cylinder;
}

function createBondHitbox(THREE, start, end, bondInfo) {
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    depthWrite: false
  });
  const hitbox = createBondCylinder(THREE, start, end, material, 0.12);
  Object.assign(hitbox.userData, { materialKind: "bond" }, bondInfo);
  return hitbox;
}

function createColoredBond(THREE, start, end, radius) {
  const a = new THREE.Vector3(start[1], start[2], start[3]);
  const b = new THREE.Vector3(end[1], end[2], end[3]);
  const midpoint = a.clone().add(b).multiplyScalar(0.5);
  const startMaterial = new THREE.MeshStandardMaterial({
    color: (ELEMENTS[start[0]] || ELEMENTS.C).color,
    ...moleculeMaterialPolish(state.polish, "bond")
  });
  const endMaterial = new THREE.MeshStandardMaterial({
    color: (ELEMENTS[end[0]] || ELEMENTS.C).color,
    ...moleculeMaterialPolish(state.polish, "bond")
  });
  const first = createBondCylinderBetween(THREE, a, midpoint, startMaterial, radius);
  const second = createBondCylinderBetween(THREE, midpoint, b, endMaterial, radius);
  first.userData.materialKind = "bond";
  second.userData.materialKind = "bond";
  return [first, second];
}

function createBondCylinderBetween(THREE, a, b, material, radius) {
  const midpoint = a.clone().add(b).multiplyScalar(0.5);
  const direction = b.clone().sub(a);
  const geometry = new THREE.CylinderGeometry(radius, radius, direction.length(), 24, 1);
  const cylinder = new THREE.Mesh(geometry, material);
  cylinder.position.copy(midpoint);
  cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  return cylinder;
}

function clearGroup(group) {
  while (group.children.length) {
    const child = group.children.pop();
    child.geometry?.dispose();
    if (Array.isArray(child.material)) {
      child.material.forEach((material) => {
        material.map?.dispose?.();
        material.dispose?.();
      });
    } else {
      child.material?.map?.dispose?.();
      child.material?.dispose?.();
    }
  }
}

function cubeExtent(cube) {
  return {
    x: Math.hypot(cube.axes[0].vector.x, cube.axes[0].vector.y, cube.axes[0].vector.z) * (cube.axes[0].count - 1),
    y: Math.hypot(cube.axes[1].vector.x, cube.axes[1].vector.y, cube.axes[1].vector.z) * (cube.axes[1].count - 1),
    z: Math.hypot(cube.axes[2].vector.x, cube.axes[2].vector.y, cube.axes[2].vector.z) * (cube.axes[2].count - 1)
  };
}

function cubeCenter(cube) {
  const end = cube.axes.reduce(
    (acc, axis) => ({
      x: acc.x + axis.vector.x * (axis.count - 1),
      y: acc.y + axis.vector.y * (axis.count - 1),
      z: acc.z + axis.vector.z * (axis.count - 1)
    }),
    { ...cube.origin }
  );
  return {
    x: (cube.origin.x + end.x) / 2,
    y: (cube.origin.y + end.y) / 2,
    z: (cube.origin.z + end.z) / 2
  };
}

function resampleCube(cube, resolution) {
  const [nx, ny, nz] = cube.axes.map((axis) => axis.count);
  const output = new Float32Array(resolution * resolution * resolution);
  let pointer = 0;
  for (let z = 0; z < resolution; z += 1) {
    const gz = (z / (resolution - 1)) * (nz - 1);
    for (let y = 0; y < resolution; y += 1) {
      const gy = (y / (resolution - 1)) * (ny - 1);
      for (let x = 0; x < resolution; x += 1) {
        const gx = (x / (resolution - 1)) * (nx - 1);
        output[pointer] = sampleCubeValue(cube.values, nx, ny, nz, gx, gy, gz);
        pointer += 1;
      }
    }
  }
  return output;
}

function sampleCubeValue(values, nx, ny, nz, x, y, z) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const z0 = Math.floor(z);
  const x1 = Math.min(nx - 1, x0 + 1);
  const y1 = Math.min(ny - 1, y0 + 1);
  const z1 = Math.min(nz - 1, z0 + 1);
  const tx = x - x0;
  const ty = y - y0;
  const tz = z - z0;
  const c000 = cubeAt(values, nx, ny, nz, x0, y0, z0);
  const c100 = cubeAt(values, nx, ny, nz, x1, y0, z0);
  const c010 = cubeAt(values, nx, ny, nz, x0, y1, z0);
  const c110 = cubeAt(values, nx, ny, nz, x1, y1, z0);
  const c001 = cubeAt(values, nx, ny, nz, x0, y0, z1);
  const c101 = cubeAt(values, nx, ny, nz, x1, y0, z1);
  const c011 = cubeAt(values, nx, ny, nz, x0, y1, z1);
  const c111 = cubeAt(values, nx, ny, nz, x1, y1, z1);
  const c00 = c000 * (1 - tx) + c100 * tx;
  const c10 = c010 * (1 - tx) + c110 * tx;
  const c01 = c001 * (1 - tx) + c101 * tx;
  const c11 = c011 * (1 - tx) + c111 * tx;
  const c0 = c00 * (1 - ty) + c10 * ty;
  const c1 = c01 * (1 - ty) + c11 * ty;
  return c0 * (1 - tz) + c1 * tz;
}

function cubeAt(values, nx, ny, nz, x, y, z) {
  return values[((x * ny) + y) * nz + z] ?? 0;
}

function buildSampleButtons() {
  const grid = document.querySelector("#sampleGrid");
  SAMPLES.forEach((sample) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "sample-card";
    button.dataset.name = sample.name;
    button.innerHTML = `<strong>${sample.name}</strong><span>${sample.formula}</span>`;
    button.addEventListener("click", () => {
      setMolecule(sample);
      setStatus("Loaded sample molecule.");
    });
    grid.appendChild(button);
  });
}

function setStatus(message, isError = false) {
  statusText.textContent = message;
  statusText.classList.toggle("error", isError);
  addLogEntry(message, { isError });
}

function setOrbitalStatus(message, options = {}) {
  document.querySelector("#orbitalStatus").textContent = message;
  if (options.log) {
    addLogEntry(message, { isError: Boolean(options.isError) });
  }
}

function addLogEntry(message, options = {}) {
  if (restoringLog || !logPanel || !message) return;
  const entry = {
    id: Date.now() + Math.random(),
    message,
    isError: Boolean(options.isError),
    snapshot: options.snapshot === false ? null : createLogSnapshot()
  };
  logEntries = [...logEntries, entry].slice(-60);
  activeLogId = entry.id;
  renderLogPanel();
}

function createLogSnapshot() {
  return {
    molecule: cloneMolecule(state.molecule),
    trajectory: state.trajectory,
    frameIndex: state.frameIndex,
    orbitals: state.orbitals,
    selectedOrbital: state.selectedOrbital,
    orbitalRenderSource: state.orbitalRenderSource,
    moldenBasis: state.moldenBasis,
    volumeData: state.volumeData,
    sourceFileName: state.sourceFileName,
    sourceName: document.querySelector("#sourceName")?.textContent || "",
    sourceMeta: document.querySelector("#sourceMeta")?.textContent || "",
    orbitalStatus: document.querySelector("#orbitalStatus")?.textContent || "",
    style: state.style,
    labels: state.labels,
    numbering: state.numbering,
    axes: state.axes,
    polish: state.polish,
    isovalue: state.isovalue,
    surfaceSize: state.surfaceSize,
    positiveOpacity: state.positiveOpacity,
    negativeOpacity: state.negativeOpacity,
    orbitalSurfaceMode: state.orbitalSurfaceMode
  };
}

function cloneMolecule(molecule) {
  return {
    ...molecule,
    atoms: molecule.atoms.map((atom) => [...atom]),
    bonds: molecule.bonds.map((bond) => [...bond]),
    center: molecule.center ? { ...molecule.center } : undefined
  };
}

function renderLogPanel() {
  logPanel.replaceChildren();
  logEntries.forEach((entry) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "log-entry";
    button.classList.toggle("active", entry.id === activeLogId);
    button.classList.toggle("error", entry.isError);
    button.textContent = entry.message;
    button.disabled = !entry.snapshot;
    button.addEventListener("click", () => restoreLogEntry(entry.id));
    logPanel.appendChild(button);
  });
  logPanel.scrollTop = logPanel.scrollHeight;
}

function restoreLogEntry(id) {
  const entry = logEntries.find((item) => item.id === id);
  if (!entry?.snapshot) return;
  restoringLog = true;
  activeLogId = id;
  restoreLogSnapshot(entry.snapshot).catch((error) => {
    console.error(error);
    setStatus(error.message, true);
  }).finally(() => {
    restoringLog = false;
    renderLogPanel();
  });
}

async function restoreLogSnapshot(snapshot) {
  Object.assign(state, {
    molecule: normalizeMolecule(cloneMolecule(snapshot.molecule)),
    trajectory: snapshot.trajectory,
    frameIndex: snapshot.frameIndex,
    orbitals: snapshot.orbitals,
    selectedOrbital: snapshot.selectedOrbital,
    orbitalRenderSource: snapshot.orbitalRenderSource,
    moldenBasis: snapshot.moldenBasis,
    volumeData: snapshot.volumeData,
    sourceFileName: snapshot.sourceFileName,
    style: snapshot.style,
    labels: snapshot.labels,
    numbering: snapshot.numbering,
    axes: snapshot.axes,
    polish: snapshot.polish,
    isovalue: snapshot.isovalue,
    surfaceSize: snapshot.surfaceSize,
    positiveOpacity: snapshot.positiveOpacity,
    negativeOpacity: snapshot.negativeOpacity,
    orbitalSurfaceMode: snapshot.orbitalSurfaceMode
  });
  updateSnapshotControls();
  updateMoleculeHud();
  updateTrajectoryUi();
  updateOrbitalUi();
  const selectedIndex = state.selectedOrbital ? state.orbitals.indexOf(state.selectedOrbital) : -1;
  orbitalSelect.value = selectedIndex >= 0 ? String(selectedIndex) : "";
  document.querySelector("#sourceName").textContent = snapshot.sourceName;
  document.querySelector("#sourceMeta").textContent = snapshot.sourceMeta;
  document.querySelector("#orbitalStatus").textContent = snapshot.orbitalStatus;
  if (snapshot.volumeData) {
    await renderCubeVolume(snapshot.volumeData, { preserveView: false });
  } else {
    state.volumeRenderer?.clearSurfaces();
    await renderStructureView({ preserveView: false });
  }
}

function updateMoleculeHud() {
  document.querySelector("#moleculeName").textContent = state.molecule.name;
  document.querySelector("#moleculeFormula").textContent = state.molecule.formula;
  document.querySelector("#atomCount").textContent = `${state.molecule.atoms.length} atoms`;
  editor.value = JSON.stringify(state.molecule, null, 2);
}

function updateSnapshotControls() {
  document.querySelectorAll(".style-choice").forEach((choice) => {
    choice.classList.toggle("active", choice.dataset.style === state.style);
  });
  document.querySelectorAll(".surface-choice").forEach((choice) => {
    choice.classList.toggle("active", choice.dataset.surface === state.orbitalSurfaceMode);
  });
  document.querySelector("#labelToggle").checked = state.labels;
  document.querySelector("#numberToggle").checked = state.numbering;
  document.querySelector("#axisToggle").checked = state.axes;
  document.querySelector("#polishRange").value = String(Math.round(state.polish * 100));
  isoRange.value = String(Math.round(state.isovalue * 1000));
  surfaceSizeRange.value = String(Math.round(state.surfaceSize * 100));
  positiveOpacity.value = String(Math.round(state.positiveOpacity * 100));
  negativeOpacity.value = String(Math.round(state.negativeOpacity * 100));
}

function attachEvents() {
  canvas.addEventListener("pointerdown", (event) => {
    state.dragging = true;
    state.spin = false;
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
    document.querySelector("#toggleSpin").classList.remove("active");
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!state.dragging) return;
    const dx = event.clientX - state.lastX;
    const dy = event.clientY - state.lastY;
    state.rotY += dx * 0.008;
    state.rotX += dy * 0.008;
    state.lastX = event.clientX;
    state.lastY = event.clientY;
  });

  canvas.addEventListener("pointerup", () => {
    state.dragging = false;
  });

  canvas.addEventListener("wheel", (event) => {
    if (state.volumeData) return;
    event.preventDefault();
    const direction = event.deltaY > 0 ? -1 : 1;
    const step = event.ctrlKey ? 4 : 8;
    state.zoom = Math.min(180, Math.max(40, state.zoom + direction * step));
  }, { passive: false });

  document.querySelector("#resetView").addEventListener("click", () => {
    state.rotX = -0.45;
    state.rotY = 0.65;
    state.zoom = 100;
    if (state.volumeRenderer) {
      state.volumeRenderer.resetView();
    }
    setStatus("View reset.");
  });

  document.querySelector("#toggleSpin").addEventListener("click", (event) => {
    state.spin = !state.spin;
    event.currentTarget.classList.toggle("active", state.spin);
    setStatus(state.spin ? "Auto spin on." : "Auto spin off.");
  });

  document.querySelectorAll(".style-choice").forEach((button) => {
    button.addEventListener("click", () => {
      state.style = button.dataset.style;
      document.querySelectorAll(".style-choice").forEach((choice) => choice.classList.toggle("active", choice === button));
      if (state.volumeRenderer) {
        if (state.volumeData) {
          renderCubeVolume(state.volumeData).catch((error) => setStatus(error.message, true));
        } else {
          state.volumeRenderer.setMolecule(state.molecule, { preserveView: true, framePadding: 2.2 });
        }
      }
    });
  });

  document.querySelectorAll(".surface-choice").forEach((button) => {
    button.addEventListener("click", () => {
      state.orbitalSurfaceMode = button.dataset.surface;
      document.querySelectorAll(".surface-choice").forEach((choice) => choice.classList.toggle("active", choice === button));
      if (state.volumeData && state.volumeRenderer) {
        state.volumeRenderer.updateSurfaceStyle(volumeOptions());
      }
    });
  });

  isoRange.addEventListener("input", (event) => {
    state.isovalue = Number(event.target.value) / 1000;
    if (state.volumeData) {
      renderCubeVolume(state.volumeData).catch((error) => setStatus(error.message, true));
    }
  });

  surfaceSizeRange.addEventListener("input", (event) => {
    state.surfaceSize = Number(event.target.value) / 100;
    if (state.volumeData) {
      renderCubeVolume(state.volumeData).catch((error) => setStatus(error.message, true));
    }
  });

  positiveOpacity.addEventListener("input", (event) => {
    state.positiveOpacity = Number(event.target.value) / 100;
    if (state.volumeRenderer) {
      state.volumeRenderer.updateSurfaceStyle(volumeOptions());
    }
  });

  negativeOpacity.addEventListener("input", (event) => {
    state.negativeOpacity = Number(event.target.value) / 100;
    if (state.volumeRenderer) {
      state.volumeRenderer.updateSurfaceStyle(volumeOptions());
    }
  });

  document.querySelector("#labelToggle").addEventListener("change", (event) => {
    state.labels = event.target.checked;
    state.volumeRenderer?.updateAtomAnnotations({
      labels: state.labels,
      numbering: state.numbering
    });
  });

  document.querySelector("#numberToggle").addEventListener("change", (event) => {
    state.numbering = event.target.checked;
    state.volumeRenderer?.updateAtomAnnotations({
      labels: state.labels,
      numbering: state.numbering
    });
  });

  document.querySelector("#axisToggle").addEventListener("change", (event) => {
    state.axes = event.target.checked;
    state.volumeRenderer?.updateAxes(state.axes);
  });

  document.querySelector("#polishRange").addEventListener("input", (event) => {
    state.polish = Number(event.target.value) / 100;
    state.volumeRenderer?.updatePolish(state.polish);
    if (state.volumeRenderer) {
      state.volumeRenderer.updateSurfaceStyle(volumeOptions());
    }
  });

  document.querySelector("#lightRange").addEventListener("input", (event) => {
    state.light = Number(event.target.value) / 100;
    state.volumeRenderer?.updateLighting(state.light);
  });

  stepRange.addEventListener("input", (event) => {
    setTrajectoryFrame(Number(event.target.value));
  });
  stepRange.addEventListener("change", () => {
    if (state.trajectory.length) {
      addLogEntry(`Optimization step ${state.frameIndex + 1} restored.`);
    }
  });

  orbitalSelect.addEventListener("change", (event) => {
    const index = event.target.value === "" ? null : Number(event.target.value);
    state.selectedOrbital = index === null ? null : state.orbitals[index];
    if (!state.selectedOrbital) {
      setOrbitalStatus(orbitalStatusText());
      return;
    }
    if (state.orbitalRenderSource === "cube") {
      setOrbitalStatus(`${state.selectedOrbital.spin || ""} MO ${state.selectedOrbital.index} selected. Rendering cube-grid positive/negative isosurfaces.`, { log: true });
    } else if (state.orbitalRenderSource === "molden") {
      renderMoldenOrbital(state.selectedOrbital).catch((error) => {
        console.error(error);
        setOrbitalStatus(error.message, { log: true, isError: true });
        setStatus(error.message, true);
      });
    } else {
      setOrbitalStatus(`${state.selectedOrbital.spin || ""} MO ${state.selectedOrbital.index} selected from log metadata. Loading matching Molden data...`, { log: true });
      autoLoadMatchingMoldenForMetadata(index).catch((error) => {
        console.error(error);
        setOrbitalStatus(error.message, { log: true, isError: true });
        setStatus(error.message, true);
      });
    }
  });

  document.querySelector("#clearOrbital").addEventListener("click", () => {
    orbitalRenderRequest += 1;
    state.selectedOrbital = null;
    state.volumeData = null;
    state.volumeRenderer?.clearSurfaces();
    orbitalSelect.value = "";
    renderStructureView({ preserveView: true }).catch((error) => setStatus(error.message, true));
    updateOrbitalUi();
    setOrbitalStatus("Orbital surface cleared.", { log: true });
  });

  const logFileInput = document.querySelector("#logFileInput");
  const fileDrop = document.querySelector("#fileDrop");
  logFileInput.addEventListener("change", () => {
    if (logFileInput.files?.[0]) {
      readLogFile(logFileInput.files[0]);
    }
  });
  fileDrop.addEventListener("dragover", (event) => {
    event.preventDefault();
    fileDrop.classList.add("dragging");
  });
  fileDrop.addEventListener("dragleave", () => {
    fileDrop.classList.remove("dragging");
  });
  fileDrop.addEventListener("drop", (event) => {
    event.preventDefault();
    fileDrop.classList.remove("dragging");
    if (event.dataTransfer.files?.[0]) {
      readLogFile(event.dataTransfer.files[0]);
    }
  });

  document.querySelector("#applyMolecule").addEventListener("click", () => {
    try {
      setMolecule(JSON.parse(editor.value));
      setStatus("Custom molecule applied.");
    } catch (error) {
      setStatus(error.message, true);
    }
  });

  document.querySelector("#exportMolecule").addEventListener("click", async () => {
    downloadTextFile(editor.value, `${safeFileStem(state.molecule.name)}.json`, "application/json");
    setStatus("Molecule JSON exported.");
  });

  document.querySelector("#exportXyz").addEventListener("click", async () => {
    try {
      const result = await saveTextFile(moleculeToXyz(state.molecule), `${safeFileStem(state.molecule.name)}.xyz`, "chemical/x-xyz", "XYZ geometry");
      setStatus(result === "saved" ? "XYZ geometry saved." : "XYZ geometry downloaded.");
    } catch (error) {
      if (error.name !== "AbortError") {
        setStatus(error.message, true);
      }
    }
  });

  window.addEventListener("resize", scheduleViewerResizeReset);
  window.visualViewport?.addEventListener("resize", scheduleViewerResizeReset);
  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(scheduleViewerResizeReset);
    resizeObserver.observe(viewerPanel);
  }
}

function readLogFile(file) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const text = String(reader.result || "");
      if (/\.(cube|cub)$/i.test(file.name)) {
        loadCubeText(text, file.name).catch((error) => setStatus(error.message, true));
      } else if (/\.json$/i.test(file.name) || /^\s*\{/.test(text)) {
        loadMoleculeJsonText(text, file.name).catch((error) => setStatus(error.message, true));
      } else if (/\.xyz$/i.test(file.name) || /^\s*\d+\s*\r?\n/.test(text)) {
        loadXyzText(text, file.name);
      } else if (/^\s*\[Molden Format\]/i.test(text) || /\[MO\]/i.test(text)) {
        loadMoldenText(text, file.name);
      } else {
        loadOpenQpLogText(text, file.name);
      }
    } catch (error) {
      setStatus(error.message, true);
    } finally {
      document.querySelector("#logFileInput").value = "";
    }
  });
  reader.addEventListener("error", () => {
    setStatus(`Could not read ${file.name}.`, true);
  });
  reader.readAsText(file);
}

function volumeOptions() {
  return {
    isovalue: state.volumeData ? state.volumeData.maxAbs * state.isovalue : state.isovalue,
    surfaceSize: state.surfaceSize,
    mode: state.orbitalSurfaceMode,
    positiveOpacity: state.positiveOpacity,
    negativeOpacity: state.negativeOpacity,
    polish: state.polish
  };
}

buildSampleButtons();
attachEvents();
resizeCanvas();
setMolecule(SAMPLES[0]);
draw();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").then((registration) => registration.update()).catch(() => {});
  });
}
