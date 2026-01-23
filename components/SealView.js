"use client";

const SEALS = [
  { id: "seal-chalice", src: "/ui/png/seal-chalice.png" },
  { id: "seal-aries", src: "/ui/png/seal-aries.png" },
  { id: "seal-book-infinity", src: "/ui/png/seal-book-infinity.png" },
  { id: "seal-prayer", src: "/ui/png/seal-prayer.png" },
  { id: "seal-spiral", src: "/ui/png/seal-spiral.png" },
  { id: "seal-scales", src: "/ui/png/seal-scales.png" },
  { id: "seal-lexicon-az", src: "/ui/png/seal-lexicon-az.png" }
];

export default function SealView({ day, onPatch }) {
  const seal = day?.seal || { selected: "", note: "", complete: false };

  const set = (p) => onPatch({ seal: { ...seal, ...p } });

  return (
    <div className="container">
      <section className="card">
        <div className="view">
          <div className="pageHeader">
            <div className="pageTitle">SEAL</div>
            <button className={`btn ${seal.complete ? "ghost" : ""}`} type="button" onClick={() => set({ complete: !seal.complete })}>
              {seal.complete ? "MARK UNDONE" : "MARK COMPLETE"}
            </button>
          </div>

          <div className="gridSeal">
            {SEALS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`sealTile ${seal.selected === s.id ? "isActive" : ""}`}
                onClick={() => set({ selected: s.id })}
                aria-label={s.id}
              >
                <img src={s.src} alt="" className="sealImg" />
              </button>
            ))}
          </div>

          <div className="field" style={{ marginTop: 12 }}>
            <label>NOTE</label>
            <textarea rows={4} value={seal.note || ""} onChange={(e) => set({ note: e.target.value })} />
          </div>
        </div>
      </section>
    </div>
  );
}
