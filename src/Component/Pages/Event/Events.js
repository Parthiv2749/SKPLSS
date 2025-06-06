

import React from "react";

const EventsPage = () => {
  return (
    <div className="bg-[#ffffff] text-gray-800 font-sans">
      {/* Back Button */}
      <div className="p-6">
        <button
          className="border rounded-full px-4 py-1 text-sm hover:bg-gray-100"
          onClick={() => history.back()}
        >
          ⬅ Back To Home
        </button>
      </div>

      {/* Events Header */}
      <section className="text-center">
        <h2 className="text-4xl font-bold mb-2">Our Events</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6 px-4">
          Stay connected with our vibrant community. Discover celebrations,
          gatherings, and learning opportunities.
        </p>

        {/* Category Filters */}
        <div className="flex justify-center gap-6 mb-10">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm">
            All
          </button>
          <button className="text-gray-700 text-sm">Upcoming</button>
          <button className="text-gray-700 text-sm">Past</button>
        </div>

        {/* Event Cards Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {/* Example Event Card - Upcoming */}
          <a
            className="bg-white rounded shadow p-4 text-left"
            href="upcoming_event.html"
          >
            <img
              src="assets/sports.png"
              alt="Event"
              className="rounded mb-4 w-full h-40 object-cover"
            />
            <h3 className="font-bold text-sm">Sports day</h3>
            <p className="text-sm text-gray-600">
              Celebrate Sports Day on June 15 in Seychelles with exciting games,
              teamwork, and community
            </p>
            <div className="flex justify-between items-center text-xs mt-3">
              <span className="flex items-center gap-1">📅 June 15, 2025</span>
              <span className="bg-blue-100 text-blue-500 px-2 py-0.5 rounded">
                upcoming
              </span>
            </div>
          </a>

          {/* Completed Event Card */}
          <div className="bg-white rounded shadow p-4 text-left">
            <img
              src="assets/deafult.png"
              alt="Event"
              className="rounded mb-4 w-full h-40 object-cover"
            />
            <h3 className="font-bold text-sm">Navratri</h3>
            <p className="text-sm text-gray-600">
              Celebrate Navratri with vibrant dances, devotion, and cultural unity honoring the divine feminine.
            </p>
            <div className="flex justify-between items-center text-xs mt-3">
              <span className="flex items-center gap-1">📅 June 25, 2025</span>
              <span className="bg-orange-100 text-orange-500 px-2 py-0.5 rounded">
                Completed
              </span>
            </div>
          </div>

          {/* Ongoing Event Card */}
          <div className="bg-white rounded shadow p-4 text-left">
            <img
              src="assets/deafult.png"
              alt="Event"
              className="rounded mb-4 w-full h-40 object-cover"
            />
            <h3 className="font-bold text-sm">Event heading</h3>
            <p className="text-sm text-gray-600">
              event description<br />maximum 2 lines
            </p>
            <div className="flex justify-between items-center text-xs mt-3">
              <span className="flex items-center gap-1">📅 June 25, 2025</span>
              <span className="bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded">
                Ongoing
              </span>
            </div>
          </div>

          {/* More cards... */}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex justify-center gap-2">
          <button className="px-3 py-1 border rounded">1</button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">3</button>
          <button className="px-3 py-1 border rounded">4</button>
          <span className="px-3 py-1">...</span>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
