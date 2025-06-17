import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEdit, FaTrash, FaFilter, FaCog } from "react-icons/fa";
import SidebarLayout from "./SidebarLayout";
import CustomTable from "./reusable/CustomTable";
import events from "../../assets/eventsarray";
import DeleteConfirmation from "../UI/DeleteModel/DeleteConfirmation";

const ManageEvents = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(events);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCols, setVisibleCols] = useState({
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

  const [deleteId, setDeleteId] = useState(null);
  const settingsRef = useRef();
  const filtersRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showSettings &&
        settingsRef.current &&
        !settingsRef.current.contains(e.target)
      ) {
        setShowSettings(false);
      }
      if (
        showFilters &&
        filtersRef.current &&
        !filtersRef.current.contains(e.target)
      ) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSettings, showFilters]);

  const confirmDelete = (id) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);

  const handleDeleteConfirmed = () => {
    setEventData((prev) => prev.filter((e) => e.event_id !== deleteId));
    setDeleteId(null);
  };

  const filteredEvents = eventData.filter((event) => {
    const matchTitle = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus = filters.status ? event.status === filters.status : true;
    const matchType = filters.type ? event.type === filters.type : true;

    const eventDate = new Date(event.date);
    const from = filters.fromDate ? new Date(filters.fromDate) : null;
    const to = filters.toDate ? new Date(filters.toDate) : null;
    const matchDate = (!from || eventDate >= from) && (!to || eventDate <= to);

    return matchTitle && matchStatus && matchType && matchDate;
  });

  const statusOptions = [...new Set(events.map((e) => e.status))];
  const typeOptions = [...new Set(events.map((e) => e.type))];

  return (
    <SidebarLayout>
      <div className="w-full bg-[#FDF8F3] p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Gallery Management</h1>
        </div>

        {/* Search and Icon Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center bg-white rounded-full px-4 py-2 border border-gray-300 w-full sm:max-w-md">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by Event Name"
              className="outline-none w-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-4 self-end sm:self-auto">
            {/* Filter */}
            <div className="relative" ref={filtersRef}>
              <FaFilter
                className="text-[#F48F0F] text-xl cursor-pointer hover:opacity-70"
                onClick={() => setShowFilters((prev) => !prev)}
              />
              {showFilters && (
                <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md p-4 z-20 w-72 max-w-[90vw] border border-gray-200 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Status
                    </label>
                    <select
                      className="w-full border px-2 py-1 rounded text-sm"
                      value={filters.status}
                      onChange={(e) =>
                        setFilters({ ...filters, status: e.target.value })
                      }
                    >
                      <option value="">All</option>
                      {statusOptions.map((s, i) => (
                        <option key={i} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Date Range
                    </label>
                    <input
                      type="date"
                      className="w-full border px-2 py-1 rounded text-sm mb-1"
                      value={filters.fromDate}
                      onChange={(e) =>
                        setFilters({ ...filters, fromDate: e.target.value })
                      }
                    />
                    <h2 className="text-center text-sm">to</h2>
                    <input
                      type="date"
                      className="w-full border px-2 py-1 rounded text-sm"
                      value={filters.toDate}
                      onChange={(e) =>
                        setFilters({ ...filters, toDate: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Category
                    </label>
                    <select
                      className="w-full border px-2 py-1 rounded text-sm"
                      value={filters.type}
                      onChange={(e) =>
                        setFilters({ ...filters, type: e.target.value })
                      }
                    >
                      <option value="">All</option>
                      {typeOptions.map((t, i) => (
                        <option key={i} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Column Settings */}
            <div className="relative" ref={settingsRef}>
              <FaCog
                className="text-[#F48F0F] text-xl cursor-pointer hover:opacity-70"
                onClick={() => setShowSettings((prev) => !prev)}
              />
              {showSettings && (
                <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md p-4 z-20 border border-gray-200">
                  {Object.keys(visibleCols).map((key) => (
                    <label key={key} className="block text-sm mb-2">
                      <input
                        type="checkbox"
                        checked={visibleCols[key]}
                        onChange={() =>
                          setVisibleCols({
                            ...visibleCols,
                            [key]: !visibleCols[key],
                          })
                        }
                        className="mr-2"
                      />
                      Show {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Event Table */}
        <CustomTable
          cols={[
            { key: "title", label: "Event Name" },
            { key: "fromDate", label: "From" },
            { key: "toDate", label: "To" },
            { key: "status", label: "Status" },
          ]}
          rows={filteredEvents.map((event) => ({
            ...event,
            actions: (
              <>
                <FaEdit
                  className="text-[#F48F0F] cursor-pointer"
                  onClick={() =>
                    navigate(`/Admin/Edit-Gallery/${event.event_id}`)
                  }
                />
                <FaTrash
                  className="text-[#F48F0F] cursor-pointer ml-4"
                  onClick={() => confirmDelete(event.event_id)}
                />
              </>
            ),
          }))}
          visibleCols={visibleCols}
        />

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <DeleteConfirmation
            onCancel={cancelDelete}
            onConfirm={handleDeleteConfirmed}
            title="Delete Event"
            message="Are you sure you want to delete this event?"
          />
        )}
      </div>
    </SidebarLayout>
  );
};

export default ManageEvents;
