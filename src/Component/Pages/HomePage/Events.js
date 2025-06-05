import React from 'react';

const events = [
  { month: 'MAY', day: '10' },
  { month: 'JULY', day: '10' },
  { month: 'MON', day: 'DD' },
];

export default function Events() {
  return (
        <section className="text-center w-full mb-20">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <div className="flex flex-col items-center gap-4 w-full">
            {events.map((event, index) => (
            <div key={index} className="flex items-center bg-white p-6 rounded-2xl w-[95%] shadow-md max-w-4xl">
                <div className="bg-[#F48F0F] text-white px-4 py-2 rounded-lg text-center w-16">
                <div>{event.month}</div>
                <div>{event.day}</div>
                </div>
                <div className="text-left ml-20">
                <strong className="block text-lg">Event name goes here</strong>
                <p className="text-sm">Event description or details would be displayed here (max 2 lines)</p>
                </div>
            </div>
            ))}
        </div>
        <button className="bg-[#F48F0F] text-[#292929] py-2 px-4 rounded-full font-semibold mt-4">View All Events</button>
        </section>

  );
}

