// lib/mmocStore.js
// Canon local day-store (LOCKED):
// - iPad-first, offline-safe.
// - No helper text. No UI concerns here.
// - Persists per-day objects keyed by ISO date (YYYY-MM-DD).
//
// This is intentionally simple: views provide full nested objects when updating,
// so we do a shallow merge at the top level.

const KEY = "mmoc:days:v1";

// ---- date helpers ----
export function isoToday() {
  // local date, not UTC (CST doctrine handled by device locale)
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function monthKey(iso) {
  // "JAN 2026"
  if (!iso || typeof iso !== "string") return "";
  const [y, m] = iso.split("-");
  const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const mi = Math.max(1, Math.min(12, Number(m || 1)));
  return `${MONTHS[mi - 1]} ${y}`;
}

// ---- storage core ----
function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readAll() {
  if (!canUseStorage()) return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const obj = JSON.parse(raw);
    return obj && typeof obj === "object" ? obj : {};
  } catch {
    return {};
  }
}

function writeAll(all) {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(all || {}));
  } catch {
    // ignore quota / private mode errors
  }
}

// ---- public API ----
export function readDay(iso) {
  const all = readAll();
  const day = all?.[iso];
  return day && typeof day === "object" ? day : {};
}

export function updateDay(iso, patch) {
  const all = readAll();
  const prev = all?.[iso] && typeof all[iso] === "object" ? all[iso] : {};
  const next = {
    ...prev,
    ...(patch && typeof patch === "object" ? patch : {}),
    __meta: {
      ...(prev.__meta && typeof prev.__meta === "object" ? prev.__meta : {}),
      updatedAt: new Date().toISOString(),
    },
  };
  all[iso] = next;
  writeAll(all);
  return next;
}

export function listDays() {
  const all = readAll();
  return Object.keys(all)
    .filter((k) => /^\d{4}-\d{2}-\d{2}$/.test(k))
    .sort((a, b) => (a < b ? 1 : -1)); // newest first
}
