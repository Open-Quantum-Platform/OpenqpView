const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const hessian = require(path.join(__dirname, "..", "hessian.js"));

const sample = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "samples", "water-hessian.json"), "utf8"));
const parsed = hessian.extractVibrations(sample);

assert.equal(parsed.modes.length, 3);
assert.equal(parsed.modes[0].index, 1);
assert.equal(parsed.modes[0].frequency, 1725.252845);
assert.equal(parsed.modes[0].ir, 4.095247);
assert.equal(parsed.units.ir, "km/mol");
assert.equal(parsed.modes[0].vectors.length, 3);
assert.ok(Math.abs(Math.max(...parsed.modes[0].vectors.map((vector) => Math.hypot(vector.x, vector.y, vector.z))) - 1) < 1e-12);

const logSample = fs.readFileSync(path.join(__dirname, "..", "samples", "water-hessian-mo.log"), "utf8");
const parsedLog = hessian.extractVibrationsFromLog(logSample, 3);
assert.equal(parsedLog.modes.length, 3);
assert.equal(parsedLog.modes[0].frequency, 1577.29);
assert.equal(parsedLog.modes[0].ir, 3.389761);
assert.equal(parsedLog.modes[0].raman, 89.794824);
assert.equal(parsedLog.modes[0].vectors.length, 3);
assert.ok(Math.abs(Math.max(...parsedLog.modes[0].vectors.map((vector) => Math.hypot(vector.x, vector.y, vector.z))) - 1) < 1e-12);

const aliases = hessian.extractVibrations({
  atoms: [8, 1],
  coord: [0, 0, 0, 0, 0, 2],
  freqs: ["412.5i", "1000.0"],
  modes: [
    [0, 0, 0.1, 0, 0, -0.1],
    [0, 0, -0.2, 0, 0, 0.2]
  ]
});
assert.equal(aliases.modes[0].frequency, -412.5);
assert.equal(aliases.modes[0].imaginary, true);
assert.equal(aliases.modes[1].vectors.length, 2);

assert.equal(Number.isNaN(hessian.numericValue(null)), true);
assert.equal(Number.isNaN(hessian.numericValue(undefined)), true);
assert.equal(Number.isNaN(hessian.numericValue("")), true);
assert.equal(Number.isNaN(hessian.numericValue({})), true);

const nullValues = hessian.extractVibrations({
  atoms: [8],
  coord: [0, 0, 0],
  freqs: [null, 500],
  infrared_intensities: [null, null],
  raman_activities: [null, null],
  modes: [[], []]
});
assert.equal(nullValues.modes.length, 1);
assert.equal(nullValues.modes[0].frequency, 500);
assert.equal(nullValues.modes[0].ir, null);
assert.equal(nullValues.modes[0].raman, null);

const unmatchedVectors = hessian.extractVibrationsFromLog(`
Mode Frequency(cm-1) IR(km/mol) Raman(activity)
1 100.0 1.0 2.0
2 200.0 3.0 4.0
Normal mode eigenvectors (Cartesian, mass-unweighted)
2
Frequencies -- 200.0
Atom AN X Y Z
1 1 H 0.1 0.0 0.0
`, 1);
assert.equal(unmatchedVectors.modes[0].frequency, 100);
assert.equal(unmatchedVectors.modes[0].vectors.length, 0);
assert.equal(unmatchedVectors.modes[1].frequency, 200);
assert.equal(unmatchedVectors.modes[1].vectors.length, 1);

const summary = hessian.extractHessianSummary({
  hessian: [[2, -1], [-1, 3]],
  hessian_metadata: { backend: "test" }
});
assert.deepEqual(summary, {
  dimension: 2,
  maxAbs: 3,
  trace: 5,
  metadata: { backend: "test" }
});

console.log("PASS Hessian JSON/log parsing, aliases, intensities, imaginary frequencies, and mode normalization");
