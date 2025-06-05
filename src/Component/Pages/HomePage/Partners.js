import React from 'react';
import sponsor1 from '../../../../assets/sponsor.png';
import sponsor2 from '../../../../assets/sponsor2.png';

export default function Partners() {
  return (
    <section className="section">
      <h2 style={{ marginBottom: '1rem' }}>Our Partners</h2>
      <div className="partners">
        {[sponsor1, sponsor2, sponsor1, sponsor2, sponsor1].map((s, i) => (
          <img src={s} className="sponsor" alt={`Sponsor ${i + 1}`} key={i} />
        ))}
      </div>
    </section>
  );
}
