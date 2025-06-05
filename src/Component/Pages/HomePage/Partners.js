import React from 'react';
import sponsor1 from '../../../assets/sponsor.png';
import sponsor2 from '../../../assets/sponsor2.png';

export default function Partners() {
  return (
        <section className="text-center w-full mb-16 px-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Our Partners</h2>
        <div className="flex gap-4 overflow-x-auto p-2">
            {[sponsor1, sponsor2, sponsor1, sponsor2].map((s, i) => (
            <img key={i} src={s} alt={`Sponsor ${i}`} className="w-64 min-w-[12rem]" />
            ))}
        </div>
        </section>


  );
}
