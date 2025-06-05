import React from 'react';

const events = [
  { month: 'MAY', day: '10' },
  { month: 'JULY', day: '10' },
  { month: 'MON', day: 'DD' },
];

export default function Events() {
  return (
    <section className="text-center px-[5vw] mb-20">
      <h2 className="font-bold mb-6 text-[clamp(1.25rem,4vw,1.875rem)]">
        Upcoming Events
      </h2>
      <div className="flex flex-col gap-6">
        {events.map(({ month, day }, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm w-full"
          >
            <div className="bg-[#F48F0F] text-white text-center rounded-xl py-2 px-4 w-20 text-[clamp(1rem,2vw,1.25rem)]">
              {month}
              <br />
              {day}
            </div>
            <div className="text-left mt-4 sm:mt-0 sm:ml-6">
              <strong className="font-semibold text-[clamp(1rem,2vw,1.375rem)]">
                Event name goes here
              </strong>
              <p className="text-[clamp(0.875rem,1.5vw,1rem)] mt-1">
                Event description or details would be displayed here (max 2 lines)
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 bg-[#F48F0F] text-[#292929] py-2 px-6 rounded-full font-semibold text-[clamp(0.875rem,1.5vw,1rem)]">
        View All Events
      </button>
    </section>
  );
}
