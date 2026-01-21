"use client";

export default function SealView() {
  return (
    <section className="card">
      <div className="view">
        <div className="pageHeader">
          <div className="pageTitle">
            <img className="peacockIcon" src="/ui/png/seal-book-infinity.png" alt="" />
            <span>SEAL</span>
          </div>
        </div>

        <div className="zone">
          <div className="zoneHead">
            <div className="zoneTitle">SEALS</div>
          </div>

          <div className="sealGrid">
            <img className="sealImg" src="/ui/png/seal-chalice.png" alt="" />
            <img className="sealImg" src="/ui/png/seal-aries.png" alt="" />
            <img className="sealImg" src="/ui/png/seal-spiral.png" alt="" />
            <img className="sealImg" src="/ui/png/seal-prayer.png" alt="" />
            <img className="sealImg" src="/ui/png/sigil-sword.png" alt="" />
            <img className="sealImg" src="/ui/png/seal-book-infinity.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
