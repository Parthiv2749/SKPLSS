import React from 'react';
import sponsor1 from '../../../assets/sponsor.png';
import sponsor2 from '../../../assets/sponsor2.png';

export default function Partners() {
  return (
      <section className="text-center px-[5vw] mb-20">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Our Partners</h2>
        <div className="flex justify-center flex-wrap gap-4">
          {[1, 2, 3, 4, 5].map(i => (
            <img
              key={i}
              src={i % 2 === 0 ? sponsor1 : sponsor2}
              alt={`Sponsor ${i}`}
              className="w-[40vw] max-w-[200px]"
            />
          ))}
        </div>
      </section>


  );
}
