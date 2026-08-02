const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

require(path.join(__dirname, "..", "hessian.js"));
const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");

function functionSource(name) {
  const start = appSource.indexOf(`function ${name}(`);
  assert(start >= 0, `Missing function ${name}`);
  const parametersStart = appSource.indexOf("(", start);
  let parameterDepth = 0;
  let bodyStart = -1;
  for (let index = parametersStart; index < appSource.length; index += 1) {
    if (appSource[index] === "(") parameterDepth += 1;
    if (appSource[index] === ")") parameterDepth -= 1;
    if (parameterDepth === 0) {
      bodyStart = appSource.indexOf("{", index);
      break;
    }
  }
  assert(bodyStart >= 0, `Missing body for ${name}`);
  let depth = 0;
  for (let index = bodyStart; index < appSource.length; index += 1) {
    if (appSource[index] === "{") depth += 1;
    if (appSource[index] === "}") depth -= 1;
    if (depth === 0) return appSource.slice(start, index + 1);
  }
  throw new Error(`Unterminated function ${name}`);
}

[
  "cartesianComponentNormalizationScale",
  "factorial",
  "moldenCartesianShellPowers",
  "parseMoldenBasis",
  "parseMoldenOrbitals",
  "moldenNumericRows",
  "moldenNumericSection",
  "parseMoldenVibrations",
  "parseOpenQpJsonBasis",
  "approximateAtomWeightsFromCoefficients",
  "approximateAtomPhasesFromCoefficients",
  "orbitalAtomData",
  "buildJsonOrbital",
  "parsePortableJsonSpinOrbitals",
  "parseOpenQpJsonDysonOrbitals",
  "parseOpenQpJsonSpinOrbitals",
  "parseOpenQpJsonOrbitals"
].forEach((name) => vm.runInThisContext(functionSource(name)));

const moldenLines = `
[Molden Format]
[Atoms] AU
H 1 1 0 0 0
[GTO]
1
s 1
1.0 1.0
[MO]
Ene= -0.5
Spin= Alpha
Occup= 1.0
1 1.0
Sym= Dyson-IP-state-2
Ene= -0.4
Spin= Alpha
Occup= 0.75
1 -0.8
[N_FREQ]
1
[NATOM]
1
[FREQ]
1234.5
[FR-NORM-COORD]
vibration 1
0.1 0.2 0.3
`.trim().split(/\r?\n/);

const moldenBasis = parseMoldenBasis(moldenLines, 1);
assert.strictEqual(moldenBasis.supported, true);
assert.strictEqual(moldenBasis.basisFunctions.length, 1);
const moldenOrbitals = parseMoldenOrbitals(moldenLines, 1, moldenBasis.aoToAtom);
assert.strictEqual(moldenOrbitals.length, 2);
assert.strictEqual(moldenOrbitals[1].kind, "dyson");
assert.strictEqual(moldenOrbitals[1].label, "Dyson IP state 2");
assert.strictEqual(moldenOrbitals[1].poleStrength, 0.75);
const moldenVibrations = parseMoldenVibrations(moldenLines, 1);
assert.strictEqual(moldenVibrations.modes.length, 1);
assert.strictEqual(moldenVibrations.modes[0].frequency, 1234.5);
assert.strictEqual(moldenVibrations.modes[0].vectors.length, 1);

const portableJson = {
  basis_set: {
    format: "OpenQP portable basis v1",
    spherical_harmonics: false,
    nbf: 1,
    shells: [{ atom_index: 0, shell: "s", exponents: [1], coefficients: [1] }]
  },
  molecular_orbitals: {
    alpha: { energies_hartree: [-0.5], occupancies: [2], coefficients: [[1]] }
  },
  dyson_orbitals: {
    states: [{
      kind: "EA",
      state_index: 3,
      label: "Dyson EA state 3",
      eigenvalue_hartree: -0.2,
      electron_binding_energy_ev: 5.4423,
      pole_strength: 0.61,
      coefficients: [[-0.9]]
    }]
  }
};
const jsonBasis = parseOpenQpJsonBasis(portableJson, 1);
assert.strictEqual(jsonBasis.supported, true);
const jsonOrbitals = parseOpenQpJsonOrbitals(portableJson, 1, jsonBasis.aoToAtom);
assert.strictEqual(jsonOrbitals.length, 2);
assert.strictEqual(jsonOrbitals[1].label, "Dyson EA state 3");
assert(Math.abs(jsonOrbitals[1].coefficients[0] + 0.9) < 1e-6);

const actualHessianJson = JSON.parse(fs.readFileSync(
  path.join(__dirname, "..", "samples", "water-hessian-mo.hess.json"), "utf8"
));
const actualHessianBasis = parseOpenQpJsonBasis(actualHessianJson, 3);
const actualHessianOrbitals = parseOpenQpJsonOrbitals(actualHessianJson, 3, actualHessianBasis.aoToAtom);
const actualHessianVibrations = globalThis.OpenQPHessian.extractVibrations(actualHessianJson, 3);
assert.strictEqual(actualHessianBasis.supported, true);
assert.strictEqual(actualHessianBasis.basisFunctions.length, 19);
assert.strictEqual(actualHessianOrbitals.length, 19);
assert.strictEqual(actualHessianVibrations.modes.length, 3);

const actualCombinedMolden = fs.readFileSync(
  path.join(__dirname, "..", "samples", "water-hessian-mo.freq.molden"), "utf8"
).split(/\r?\n/);
const actualMoldenBasis = parseMoldenBasis(actualCombinedMolden, 3);
assert.strictEqual(parseMoldenOrbitals(actualCombinedMolden, 3, actualMoldenBasis.aoToAtom).length, 19);
const actualMoldenVibrations = parseMoldenVibrations(actualCombinedMolden, 3);
assert.strictEqual(actualMoldenVibrations.modes.length, 3);
assert(Math.abs(actualMoldenVibrations.modes[0].ir - 3.38976112) < 1e-8);
assert(Math.abs(actualMoldenVibrations.modes[0].raman - 89.79482377) < 1e-8);
assert(Math.abs(actualMoldenVibrations.modes[1].ir - 0.07655595) < 1e-8);
assert(Math.abs(actualMoldenVibrations.modes[1].raman - 910.20024097) < 1e-8);
assert(Math.abs(actualMoldenVibrations.modes[2].ir - 1.09464762) < 1e-8);
assert(Math.abs(actualMoldenVibrations.modes[2].raman - 423.26163083) < 1e-8);

const actualDysonJson = JSON.parse(fs.readFileSync(
  path.join(__dirname, "..", "samples", "water-ekt-dyson.json"), "utf8"
));
const actualDysonBasis = parseOpenQpJsonBasis(actualDysonJson, 3);
const actualDysonOrbitals = parseOpenQpJsonOrbitals(actualDysonJson, 3, actualDysonBasis.aoToAtom);
assert.strictEqual(actualDysonOrbitals.filter((orbital) => orbital.kind === "dyson").length, 5);
assert.strictEqual(actualDysonOrbitals.at(-1).label, "Dyson IP state 5");

console.log("PASS combined Molden MO/frequency and portable JSON state-specific Dyson parsing");
