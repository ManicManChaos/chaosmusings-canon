"use client";

const KEY = "mmoc_daylog_v1";

export function isoToday() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function readAll() {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    const obj = raw ? JSON.parse(raw) : {};
    return obj && typeof obj === "object" ? obj : {};
  } catch {
    return {};
  }
}

export function writeAll(obj) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(obj || {}));
}

export function readDay(dateISO) {
  const all = readAll();
  return all?.[dateISO] || {};
}

export function updateDay(dateISO, patch) {
  const all = readAll();
  const prev = all?.[dateISO] || {};
  const next = { ...prev, ...patch, updatedAt: Date.now() };
  const out = { ...all, [dateISO]: next };
  writeAll(out);
  return next;
}

export function listDays() {
  const all = readAll();
  return Object.keys(all).sort((a,b)=>b.localeCompare(a));
}

export function monthKey(dateISO) {
  const d = new Date(dateISO + "T00:00:00");
  const y = d.getFullYear();
  const m = d.toLocaleDateString(undefined, { month: "long" }).toUpperCase();
  return `${m} ${y}`;
}
