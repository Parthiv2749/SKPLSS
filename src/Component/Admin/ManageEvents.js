import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaFilter, FaCog } from "react-icons/fa";

const initialEvents = [
  {
    name: "Charity Walk",
    date: "June 12,2025",
    category: "Youth Activities",
    status: "Upcoming",
  },
  {
    name: "Talent Show",
    date: "May 15,2025",
    category: "Youth Activities",
    status: "Past",
  },
  {
    name: "Bhim Agiyaras",
    date: "June 7,2025",
    category: "Festival",
    status: "Ongoing",
  },
];

const ManageEvents = () => {
  const [events] = useState(initialEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    date: true,
    category: true,
    status: true,
  });
  const [showSettings, setShowSettings] = useState(false);

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-[#FDF8F3] p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Event Management</h1>
        <button className="bg-[#F48F0F] text-white px-4 py-2 rounded-full hover:opacity-90">
          Schedule a new event
        </button>
      </div>

      {/* Search + Icons */}
      <div className="flex items-center gap-4 mb-4 relative">
        <div className="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-md border border-gray-300">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="search by Event Name"
            className="outline-none w-full text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <FaFilter className="text-[#F48F0F] cursor-pointer text-xl" />
        <FaCog
          className="text-[#F48F0F] cursor-pointer text-xl"
          onClick={() => setShowSettings(!showSettings)}
        />

        {/* Settings dropdown */}
        {showSettings && (
          <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md p-4 z-10 border border-gray-200">
            {Object.keys(visibleColumns).map((col) => (
              <label key={col} className="block text-sm mb-2">
                <input
                  type="checkbox"
                  checked={visibleColumns[col]}
                  onChange={() =>
                    setVisibleColumns({
                      ...visibleColumns,
                      [col]: !visibleColumns[col],
                    })
                  }
                  className="mr-2"
                />
                Show {col.charAt(0).toUpperCase() + col.slice(1)}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-gray-200 rounded-md">
          <thead>
            <tr className="bg-[#E1D5C9] text-[#292929]">
              {visibleColumns.name && <th className="px-4 py-3">Event Name</th>}
              {visibleColumns.date && <th className="px-4 py-3">Date</th>}
              {visibleColumns.category && <th className="px-4 py-3">Category</th>}
              {visibleColumns.status && <th className="px-4 py-3">Status</th>}
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-[#F5EFEB]"}
              >
                {visibleColumns.name && (
                  <td className="px-4 py-3">{event.name}</td>
                )}
                {visibleColumns.date && (
                  <td className="px-4 py-3">{event.date}</td>
                )}
                {visibleColumns.category && (
                  <td className="px-4 py-3">{event.category}</td>
                )}
                {visibleColumns.status && (
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        event.status === "Upcoming"
                          ? "bg-green-200 text-green-800"
                          : event.status === "Past"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                )}
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <FaEdit className="text-[#F48F0F] cursor-pointer" />
                    <FaTrash className="text-[#F48F0F] cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
            {/* Placeholder empty rows */}
            {[...Array(6)].map((_, i) => (
              <tr
                key={`empty-${i}`}
                className={(filteredEvents.length + i) % 2 === 0 ? "bg-white" : "bg-[#F5EFEB]"}
              >
                {visibleColumns.name && (
                  <td className="px-4 py-3 text-gray-400">Event Name</td>
                )}
                {visibleColumns.date && (
                  <td className="px-4 py-3 text-gray-400">Date</td>
                )}
                {visibleColumns.category && (
                  <td className="px-4 py-3 text-gray-400">Category</td>
                )}
                {visibleColumns.status && (
                  <td className="px-4 py-3 text-gray-400">Status</td>
                )}
                <td className="px-4 py-3 text-gray-400">
                  <div className="flex gap-3">
                    <FaEdit />
                    <FaTrash />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEvents;
