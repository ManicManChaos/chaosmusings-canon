"use client";

const MODES = ["RECOMP", "BULK", "LEANING", "BOOKED"];

const WORKOUT_TYPES = ["UPPER", "LOWER", "FULL BODY", "ISOLATION"];

const CARDIO_TYPES = [
  "OUTDOOR WALK",
  "OUTDOOR RUN",
  "PILATES",
  "RUN CLUB",
  "POLE DANCE CLASS",
  "CROSSFIT",
  "CYCLE",
  "YOGA"
];

// Libido status (explicit/snarky, but still usable + not graphic)
const LIBIDO = [
  "SELECT…",
  "AWAKE. DANGEROUS. POLITE ABOUT IT.",
  "ACTIVE & DISTRACTED — STILL SHOWING UP.",
  "HIGH VOLTAGE — DO NOT TEXT EXES.",
  "ON SIGHT (CONSENSUAL).",
  "FLIRTY BUT FOCUSED — BOUNDARIES ON.",
  "TOUCH-STARVED, ACTING NORMAL.",
  "NEEDS A KISS, NOT A CONVERSATION.",
  "HUNGRY. HYDRATED. UNAPOLOGETIC.",
  "SILENTLY PLOTTING A GOOD TIME.",
  "OFFLINE — NO ONE DESERVES ACCESS TODAY.",
  "LOW BATTERY — BODY’S CLOSED FOR MAINTENANCE.",
  "NEUTRAL — GYM FIRST, EVERYTHING ELSE LATER."
];

export default function RoidBoyView({ day, onPatch }) {
  const rb = day?.roidboy || {};
  const exercises = Array.isArray(rb.exercises) ? rb.exercises : [];
  const photos = Array.isArray(rb.photos) ? rb.photos : [];

  const set = (partial) => onPatch({ roidboy: { ...rb, ...partial } });

  const patchExercise = (ix, p) => set({ exercises: exercises.map((e, i) => (i === ix ? { ...e, ...p } : e)) });

  const addExercise = () =>
    set({
      exercises: [...exercises, { name: "", sets: "", weight: "", reps: "" }]
    });

  const delExercise = (ix) => set({ exercises: exercises.filter((_, i) => i !== ix) });

  const addPhoto = () => set({ photos: [...photos, ""] });
  const patchPhoto = (ix, v) => set({ photos: photos.map((p, i) => (i === ix ? v : p)) });
  const delPhoto = (ix) => set({ photos: photos.filter((_, i) => i !== ix) });

  return (
    <div className="container">
      <section className="card">
        <div className="view">
          <div className="pageHeader">
            <div className="pageTitle">ROID BOY</div>
          </div>

          <div className="grid2">
            <div className="field">
              <label>MODE</label>
              <select value={rb.mode || ""} onChange={(e) => set({ mode: e.target.value })}>
                <option value="">SELECT…</option>
                {MODES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>LIBIDO STATUS</label>
              <select value={rb.libido || ""} onChange={(e) => set({ libido: e.target.value })}>
                {LIBIDO.map((t, i) => (
                  <option key={i} value={i === 0 ? "" : t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>TIME OF ARRIVAL</label>
              <input value={rb.arrival || ""} onChange={(e) => set({ arrival: e.target.value })} placeholder="e.g., 6:12 PM" />
            </div>

            <div className="field">
              <label>SESSION DURATION (MIN)</label>
              <input value={rb.durationMin || ""} onChange={(e) => set({ durationMin: e.target.value })} inputMode="numeric" />
            </div>

            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <label>GYM LOCATION</label>
              <input value={rb.gymLocation || ""} onChange={(e) => set({ gymLocation: e.target.value })} placeholder="gym / address / note" />
            </div>

            <div className="field">
              <label>WORKOUT TYPE</label>
              <select value={rb.workoutType || ""} onChange={(e) => set({ workoutType: e.target.value })}>
                <option value="">SELECT…</option>
                {WORKOUT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="zone" style={{ marginTop: 12 }}>
            <div className="zoneHead">
              <div className="zoneTitle">EXERCISE LOG</div>
              <div className="floatTools">
                <button className="glyphBtn" type="button" onClick={addExercise} aria-label="Add exercise">
                  +
                </button>
              </div>
            </div>

            {exercises.length === 0 ? (
              <div className="list">NO EXERCISES YET.</div>
            ) : (
              <div className="list">
                {exercises.map((ex, ix) => (
                  <div key={ix} className="momentCard">
                    <div className="grid2">
                      <div className="field" style={{ gridColumn: "1 / -1" }}>
                        <label>NAME OF EXERCISE</label>
                        <input value={ex.name || ""} onChange={(e) => patchExercise(ix, { name: e.target.value })} />
                      </div>
                      <div className="field">
                        <label>SETS</label>
                        <input value={ex.sets ?? ""} onChange={(e) => patchExercise(ix, { sets: e.target.value })} inputMode="numeric" />
                      </div>
                      <div className="field">
                        <label>WEIGHT</label>
                        <input value={ex.weight ?? ""} onChange={(e) => patchExercise(ix, { weight: e.target.value })} inputMode="decimal" />
                      </div>
                      <div className="field">
                        <label>REPS</label>
                        <input value={ex.reps ?? ""} onChange={(e) => patchExercise(ix, { reps: e.target.value })} inputMode="numeric" />
                      </div>
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <button className="btn danger" type="button" onClick={() => delExercise(ix)}>
                        DELETE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="zone" style={{ marginTop: 12 }}>
            <div className="zoneHead">
              <div className="zoneTitle">CARDIO</div>
            </div>

            <div className="grid2">
              <div className="field">
                <label>TYPE</label>
                <select value={rb.cardioType || ""} onChange={(e) => set({ cardioType: e.target.value })}>
                  <option value="">SELECT…</option>
                  {CARDIO_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>LOCATION (NOTE)</label>
                <input value={rb.cardioLocation || ""} onChange={(e) => set({ cardioLocation: e.target.value })} placeholder="studio / route / note" />
              </div>

              <div className="field">
                <label>ARRIVAL</label>
                <input value={rb.cardioArrival || ""} onChange={(e) => set({ cardioArrival: e.target.value })} placeholder="e.g., 7:40 PM" />
              </div>

              <div className="field">
                <label>DURATION (MIN)</label>
                <input value={rb.cardioDurationMin || ""} onChange={(e) => set({ cardioDurationMin: e.target.value })} inputMode="numeric" />
              </div>
            </div>
          </div>

          <div className="zone" style={{ marginTop: 12 }}>
            <div className="zoneHead">
              <div className="zoneTitle">PHOTOS (URL OPTIONAL)</div>
              <div className="floatTools">
                <button className="glyphBtn" type="button" onClick={addPhoto} aria-label="Add photo">
                  +
                </button>
              </div>
            </div>

            {photos.length === 0 ? (
              <div className="list">NO PHOTOS.</div>
            ) : (
              <div className="list">
                {photos.map((p, ix) => (
                  <div key={ix} className="momentCard">
                    <div className="field">
                      <label>PHOTO URL</label>
                      <input value={p || ""} onChange={(e) => patchPhoto(ix, e.target.value)} placeholder="paste image url" />
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <button className="btn danger" type="button" onClick={() => delPhoto(ix)}>
                        DELETE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="zone" style={{ marginTop: 12 }}>
            <div className="zoneHead">
              <div className="zoneTitle">TRAINING NOTES</div>
              <div className="zoneSub">CBUM / MR. OLYMPIA CODED.</div>
            </div>

            <div className="field">
              <label>NOTES</label>
              <textarea rows={6} value={rb.notes || ""} onChange={(e) => set({ notes: e.target.value })} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
