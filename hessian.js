(function exposeOpenQpHessian(globalScope) {
  "use strict";

  function firstNonEmptyArray(...values) {
    return values.find((value) => Array.isArray(value) && value.length)
      || values.find(Array.isArray)
      || null;
  }

  function numericValue(value) {
    if (typeof value === "number") return Number.isFinite(value) ? value : NaN;
    if (typeof value !== "string") return Number(value);
    const normalized = value.trim().replace(/[dD]/g, "E");
    if (/i$/i.test(normalized)) {
      const imaginary = Number(normalized.slice(0, -1));
      return Number.isFinite(imaginary) ? -Math.abs(imaginary) : NaN;
    }
    return Number(normalized);
  }

  function atomCountFromSource(source) {
    if (!source || typeof source !== "object") return 0;
    if (Array.isArray(source.atoms)) return source.atoms.length;
    if (Array.isArray(source.coord)) return Math.floor(source.coord.length / 3);
    for (const nested of [source.molecule, source.geometry, source.structure]) {
      const count = atomCountFromSource(nested);
      if (count) return count;
    }
    return 0;
  }

  function rawVectorComponents(rawMode) {
    if (!Array.isArray(rawMode) || !rawMode.length) return [];
    if (rawMode.every((vector) => vector && typeof vector === "object" && !Array.isArray(vector))) {
      return rawMode.flatMap((vector) => [vector.x, vector.y, vector.z].map(numericValue));
    }
    return rawMode.flat(Infinity).map(numericValue);
  }

  function normalizeModeVectors(rawMode, atomCount) {
    if (!atomCount) return [];
    const flat = rawVectorComponents(rawMode);
    if (flat.length < atomCount * 3) return [];
    const vectors = [];
    for (let index = 0; index < atomCount; index += 1) {
      const x = flat[index * 3];
      const y = flat[index * 3 + 1];
      const z = flat[index * 3 + 2];
      vectors.push({
        x: Number.isFinite(x) ? x : 0,
        y: Number.isFinite(y) ? y : 0,
        z: Number.isFinite(z) ? z : 0
      });
    }
    const maxLength = Math.max(...vectors.map((vector) => Math.hypot(vector.x, vector.y, vector.z)), 0);
    if (!maxLength) return [];
    return vectors.map((vector) => ({
      x: vector.x / maxLength,
      y: vector.y / maxLength,
      z: vector.z / maxLength
    }));
  }

  function modeRowsFromSource(source) {
    const rows = source?.vibrations?.modes;
    return Array.isArray(rows) && rows.some((row) => row && typeof row === "object" && !Array.isArray(row))
      ? rows
      : [];
  }

  function extractVibrations(source, explicitAtomCount) {
    if (!source || typeof source !== "object") {
      return { modes: [], units: { frequency: "cm-1", ir: "km/mol", raman: "a.u." }, metadata: {} };
    }
    const rows = modeRowsFromSource(source);
    const frequencies = firstNonEmptyArray(
      source.freqs,
      source.frequencies,
      source.frequency_modes?.["frequencies_cm-1"],
      source.vibrations?.frequencies,
      rows.length ? rows.map((row) => row.frequency ?? row.freq) : null
    );
    const rawModes = firstNonEmptyArray(
      source.modes,
      source.normal_modes,
      source.frequency_modes?.normal_mode_eigenvectors,
      rows.length ? rows.map((row) => row.vectors ?? row.vector ?? row.displacements ?? []) : source.vibrations?.modes
    );
    const infrared = firstNonEmptyArray(
      source.infrared_intensities,
      source.ir_intensities,
      source.vibrations?.ir,
      rows.length ? rows.map((row) => row.ir ?? row.infrared_intensity) : null
    );
    const raman = firstNonEmptyArray(
      source.raman_activities,
      source.vibrations?.raman,
      rows.length ? rows.map((row) => row.raman ?? row.raman_activity) : null
    );
    const atomCount = explicitAtomCount || atomCountFromSource(source);
    const modes = (frequencies || []).map((rawFrequency, index) => {
      const frequency = numericValue(rawFrequency);
      const ir = numericValue(infrared?.[index]);
      const ramanActivity = numericValue(raman?.[index]);
      return {
        index: Number(rows[index]?.index ?? rows[index]?.mode ?? index + 1),
        frequency,
        imaginary: frequency < 0,
        ir: Number.isFinite(ir) ? ir : null,
        raman: Number.isFinite(ramanActivity) ? ramanActivity : null,
        vectors: normalizeModeVectors(rawModes?.[index] ?? [], atomCount)
      };
    }).filter((mode) => Number.isFinite(mode.frequency));
    const metadata = source.vibrational_intensity_metadata || source.vibrations?.metadata || {};
    return {
      modes,
      units: {
        frequency: "cm-1",
        ir: metadata.ir_units || source.vibrations?.units?.ir || "km/mol",
        raman: metadata.raman_units || source.vibrations?.units?.raman || "a.u."
      },
      metadata
    };
  }

  function extractHessianSummary(source) {
    if (!Array.isArray(source?.hessian)) return null;
    const dimension = source.hessian.length;
    let maxAbs = 0;
    let trace = 0;
    source.hessian.forEach((row, rowIndex) => {
      if (!Array.isArray(row)) return;
      row.forEach((value) => {
        const numeric = numericValue(value);
        if (Number.isFinite(numeric)) maxAbs = Math.max(maxAbs, Math.abs(numeric));
      });
      const diagonal = numericValue(row[rowIndex]);
      if (Number.isFinite(diagonal)) trace += diagonal;
    });
    return {
      dimension,
      maxAbs,
      trace,
      metadata: source.hessian_metadata || {}
    };
  }

  const api = {
    atomCountFromSource,
    extractHessianSummary,
    extractVibrations,
    normalizeModeVectors,
    numericValue
  };

  globalScope.OpenQPHessian = api;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
}(typeof globalThis !== "undefined" ? globalThis : this));
