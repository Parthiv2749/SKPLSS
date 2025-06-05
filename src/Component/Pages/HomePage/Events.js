import React from 'react';

const events = [
  { month: 'MAY', day: '10' },
  { month: 'JULY', day: '10' },
  { month: 'MON', day: 'DD' },
];

export default function Events() {
  return (
    <section className="text-center px-[5vw] mb-20 max-w-[90vw] mx-auto">
      <h2 className="mb-8 text-[clamp(2rem,5vw,2.75rem)] font-extrabold text-[#292929] tracking-tight">
        Upcoming <span className="text-[#F48F0F]">Events</span>
      </h2>

      <div className="flex flex-col gap-8">
        {events.map(({ month, day }, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-6 rounded-2xl shadow-md border border-[#e4e4e4] hover:shadow-xl transition-shadow duration-300"
          >
            <div className="bg-[#F48F0F] text-white text-center rounded-xl py-3 px-4 w-28 sm:w-24 flex-shrink-0 text-[clamp(1rem,2vw,1.25rem)] font-bold leading-tight">
              <span className="block">{month}</span>
              <span className="block text-[clamp(1.5rem,3vw,2rem)]">{day}</span>
            </div>

            <div className="text-left mt-4 sm:mt-0 sm:ml-6 flex-1 min-w-0">
              <strong className="font-semibold text-[clamp(1.125rem,2.2vw,1.5rem)] text-[#292929] block truncate">
                Event name goes here
              </strong>
              <p className="text-[clamp(0.95rem,1.7vw,1.05rem)] mt-2 text-[#444] leading-snug line-clamp-2">
                Event description or details would be displayed here (max 2 lines)
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-10 bg-[#F48F0F] text-[#292929] py-3 px-7 rounded-full font-bold tracking-wide text-[clamp(1rem,1.8vw,1.15rem)] uppercase shadow-md hover:shadow-lg transition duration-300 ease-in-out w-full sm:w-auto max-w-xs mx-auto">
        View All Events
      </button>
    </section>
  );
}
