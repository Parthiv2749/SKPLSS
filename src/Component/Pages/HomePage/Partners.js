import React from 'react';
import sponsor1 from '../../../assets/sponsor.png';
import sponsor2 from '../../../assets/sponsor2.png';

export default function Partners() {
  return (
        <section className="text-center w-full mb-20">
        <h2 className="text-2xl font-semibold mb-4">Our Partners</h2>
        <div className="flex justify-center gap-4 overflow-x-auto p-4">
            {[sponsor1, sponsor2, sponsor1, sponsor2, sponsor1].map((s, i) => (
            <img key={i} src={s} alt={`Sponsor ${i}`} className="w-80" />
            ))}
        </div>
        </section>

  );
}
