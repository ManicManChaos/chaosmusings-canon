// lib/mmocStore.js
// Canon local store (LOCKED): single source of truth for daily data.
// - Persists to localStorage (fast, iPad-safe)
// - Shape is stable so we can add Supabase syncing later without breaking UI.

const KEY = "chaosmusings_canon_v1";

export const getTodayISO = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const safeParse = (raw, fallback) => {
  try {
    const v = JSON.parse(raw);
    return v && typeof v === "object" ? v : fallback;
  } catch {
    return fallback;
  }
};

const readDB = () => {
  if (typeof window === "undefined") return { daily: {}, meta: { eraByMonth: {} } };
  const raw = window.localStorage.getItem(KEY);
  return raw ? safeParse(raw, { daily: {}, meta: { eraByMonth: {} } }) : { daily: {}, meta: { eraByMonth: {} } };
};

const writeDB = (db) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(db));
};

export const ensureDay = (existing, dayISO) => {
  const base = existing && typeof existing === "object" ? existing : {};
  return {
    dayISO,
    assessment: {
      title: base.assessment?.title || "",
      location: base.assessment?.location || "",
      mood: base.assessment?.mood || "",
      wordOfDay: base.assessment?.wordOfDay || "",
      era: base.assessment?.era || "",
      single: base.assessment?.single || "",
      headHummer: base.assessment?.headHummer || ""
    },
    intake: {
      mode: base.intake?.mode || "",
      macroGoal: {
        calories: base.intake?.macroGoal?.calories ?? "",
        protein: base.intake?.macroGoal?.protein ?? "",
        carbs: base.intake?.macroGoal?.carbs ?? "",
        fats: base.intake?.macroGoal?.fats ?? ""
      },
      waterGoalOz: base.intake?.waterGoalOz ?? "128",
      waterOz: base.intake?.waterOz ?? "",
      meals: Array.isArray(base.intake?.meals) ? base.intake.meals : [],
      cheat: base.intake?.cheat || {
        wed: { happened: false, damage: "" },
        sat: { happened: false, damage: "" }
      }
    },
    moments: Array.isArray(base.moments) ? base.moments : [],
    roidboy: {
      mode: base.roidboy?.mode || "",
      arrival: base.roidboy?.arrival || "",
      durationMin: base.roidboy?.durationMin || "",
      gymLocation: base.roidboy?.gymLocation || "",
      workoutType: base.roidboy?.workoutType || "",
      exercises: Array.isArray(base.roidboy?.exercises) ? base.roidboy.exercises : [],
      cardioType: base.roidboy?.cardioType || "",
      cardioLocation: base.roidboy?.cardioLocation || "",
      cardioArrival: base.roidboy?.cardioArrival || "",
      cardioDurationMin: base.roidboy?.cardioDurationMin || "",
      photos: Array.isArray(base.roidboy?.photos) ? base.roidboy.photos : [],
      notes: base.roidboy?.notes || "",
      libido: base.roidboy?.libido || ""
    },
    ps: Array.isArray(base.ps) ? base.ps : [],
    summation: {
      text: base.summation?.text || ""
    }
  };
};

export const loadDay = (dayISO) => {
  const db = readDB();
  const found = db.daily?.[dayISO];
  return found ? ensureDay(found, dayISO) : ensureDay(null, dayISO);
};

export const saveDay = (dayISO, dayObj) => {
  const db = readDB();
  db.daily = db.daily || {};
  db.daily[dayISO] = ensureDay(dayObj, dayISO);
  writeDB(db);
};

export const saveDayPartial = (dayISO, partial) => {
  const db = readDB();
  const current = db.daily?.[dayISO] || {};
  const merged = {
    ...current,
    ...partial,
    assessment: { ...(current.assessment || {}), ...(partial.assessment || {}) },
    intake: { ...(current.intake || {}), ...(partial.intake || {}) },
    roidboy: { ...(current.roidboy || {}), ...(partial.roidboy || {}) },
    summation: { ...(current.summation || {}), ...(partial.summation || {}) }
  };
  db.daily = db.daily || {};
  db.daily[dayISO] = ensureDay(merged, dayISO);
  writeDB(db);
};

export const listDays = () => {
  const db = readDB();
  const keys = Object.keys(db.daily || {});
  keys.sort((a, b) => (b || "").localeCompare(a || ""));
  return keys;
};

export const getMonthKey = (iso) => (iso || "").slice(0, 7); // YYYY-MM

export const getEraForMonth = (monthKey) => {
  const db = readDB();
  return db.meta?.eraByMonth?.[monthKey] || "";
};

export const setEraForMonth = (monthKey, era) => {
  const db = readDB();
  db.meta = db.meta || {};
  db.meta.eraByMonth = db.meta.eraByMonth || {};
  db.meta.eraByMonth[monthKey] = String(era || "");
  writeDB(db);
};
