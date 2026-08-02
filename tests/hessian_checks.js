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
assert.equal(parsedLog.modes[0].frequency, 1577.2894);
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
