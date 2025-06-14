import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaFilter, FaCog } from "react-icons/fa";
import SidebarLayout from "./SidebarLayout";
import CustomTable from "./reusable/CustomTable";
import events from "../../assets/eventsarray";

const ManageEvents = () => {
  const [Events] = useState(events);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleColumns, setVisibleColumns] = useState({
    title: true,
    date: true,
    type: true,
    status: true,
  });

  const [showSettings, setShowSettings] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    fromDate: "",
    toDate: "",
  });

  const filteredEvents = Events.filter((event) => {
    const matchTitle = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus = filters.status ? event.status === filters.status : true;
    const matchType = filters.type ? event.type === filters.type : true;

    const eventDate = new Date(event.date);
    const fromDate = filters.fromDate ? new Date(filters.fromDate) : null;
    const toDate = filters.toDate ? new Date(filters.toDate) : null;

    const matchDate =
      (!fromDate || eventDate >= fromDate) && (!toDate || eventDate <= toDate);

    return matchTitle && matchStatus && matchType && matchDate;
  });

  // Get unique options
  const statusOptions = [...new Set(events.map((e) => e.status))];
  const typeOptions = [...new Set(events.map((e) => e.type))];
  const dateOptions = [...new Set(events.map((e) => e.date))];

  return (
    <SidebarLayout>
      <div className="w-full bg-[#FDF8F3] p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Event Management</h1>
          <button className="bg-[#F48F0F] text-white md:px-4 px-2 py-1 md:py-2 rounded-xl hover:opacity-90">
            Schedule a new event
          </button>
        </div>

        {/* Search + Icons */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 relative">
          {/* Search Input */}
          <div className="flex items-center bg-white rounded-full px-4 py-2 w-full sm:max-w-md border border-gray-300">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by Event Name"
              className="outline-none w-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 self-end sm:self-auto">
            <div className="relative">
              <FaFilter
                className="text-[#F48F0F] cursor-pointer text-xl  hover:opacity-70"
                onClick={() => setShowFilters(!showFilters)}
              />
              {showFilters && (
                <div className="absolute top-10 right-0 w-72 max-w-[90vw] bg-white shadow-lg rounded-md p-4 z-20 border border-gray-200 flex flex-col gap-4">
                  {/* Status Filter */}
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1">
                      Status
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      value={filters.status}
                      onChange={(e) =>
                        setFilters({ ...filters, status: e.target.value })
                      }
                    >
                      <option value="">All</option>
                      {statusOptions.map((status, i) => (
                        <option key={i} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date Range Filter */}
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1">
                      Date Range
                    </label>
                    <input
                      type="date"
                      className="border border-gray-300 rounded px-2 py-1 text-sm mb-2"
                      value={filters.fromDate || ""}
                      onChange={(e) =>
                        setFilters({ ...filters, fromDate: e.target.value })
                      }
                    />
                    <h2 className="text-center">to</h2>
                    <input
                      type="date"
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                      value={filters.toDate || ""}
                      onChange={(e) =>
                        setFilters({ ...filters, toDate: e.target.value })
                      }
                    />
                  </div>

                  {/* Type Filter */}
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium mb-1">
                      Category
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      value={filters.type}
                      onChange={(e) =>
                        setFilters({ ...filters, type: e.target.value })
                      }
                    >
                      <option value="">All</option>
                      {typeOptions.map((type, i) => (
                        <option key={i} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Settings Icon */}
            <div className="relative">
              <FaCog
                className="text-[#F48F0F] cursor-pointer text-xl hover:opacity-70"
                onClick={() => setShowSettings(!showSettings)}
              />
              {showSettings && (
                <div className="absolute top-8 right-0 bg-white shadow-lg rounded-md p-4 z-20 border border-gray-200">
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
          </div>
        </div>

        {/* Table */}
        <CustomTable
          cols={[
            {
              key: "title",
              label: "Event Name",
            },
            {
              key: "date",
              label: "Date",
            },
            {
              key: "type",
              label: "Category",
            },
            {
              key: "status",
              label: "Status",
            },
          ]}
          rows={filteredEvents.map((event) => ({
            ...event,
            actions: (
              <>
                <FaEdit className="text-[#F48F0F] cursor-pointer" />
                <FaTrash className="text-[#F48F0F] cursor-pointer" />
              </>
            ),
          }))}
          visibleCols={visibleColumns}
        />
      </div>
    </SidebarLayout>
  );
};

export default ManageEvents;
