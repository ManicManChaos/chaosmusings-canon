"use client";

import styles from "./Sidebar.module.css";

export default function Sidebar({ open, onClose, routes, active, onSelect }) {
  return (
    <>
      {/* Scrim */}
      <div
        className={`${styles.scrim} ${open ? styles.isOn : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />

      {/* Drawer */}
      <aside className={`${styles.drawer} ${open ? styles.isOn : ""}`} aria-label="Navigation">
        <div className={styles.inner}>
          {routes.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`${styles.item} ${active === r.id ? styles.active : ""}`}
              onClick={() => onSelect?.(r.id)}
              aria-label={r.label}
            >
              <img className={styles.icon} src={r.icon} alt="" draggable="false" />
              <span className={styles.label}>{r.label}</span>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
