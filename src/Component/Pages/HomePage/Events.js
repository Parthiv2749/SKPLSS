import React from 'react';

const events = [
  { month: 'MAY', day: '10' },
  { month: 'JULY', day: '10' },
  { month: 'MON', day: 'DD' },
];

export default function Events() {
  return (
        <section className="text-center w-full mb-16 px-4">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">Upcoming Events</h2>
        <div className="flex flex-col gap-4 w-full">
            {events.map((event, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-4 sm:p-6 rounded-2xl shadow-md w-full">
                <div className="bg-[#F48F0F] text-white px-4 py-2 rounded-lg text-center w-16 mb-2 sm:mb-0 sm:mr-6">
                <div>{event.month}</div>
                <div>{event.day}</div>
                </div>
                <div className="text-left sm:ml-6">
                <strong className="block text-lg">Event name goes here</strong>
                <p className="text-sm">Event description or details would be displayed here</p>
                </div>
            </div>
            ))}
        </div>
        <button className="bg-[#F48F0F] text-[#292929] py-2 px-4 rounded-full font-semibold mt-4">View All Events</button>
        </section>

  );
}

