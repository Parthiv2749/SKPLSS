import React, { useState, useMemo, useEffect } from "react";
import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../../UI/Footer/Footer";
import events from "../../../assets/eventsarray";
import LoadingSpinner from "../../UI/LoadingSpiner/LoadingSpinner";

function Gallary() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const ITEMS_PER_PAGE = 6;

  const categories = [
    "All",
    "Youth",
    "Events",
    "Cultural",
    "Com_service",
    "other",
  ];

  const filteredEvents = useMemo(() => {
    if (categoryFilter === "All") return events;
    return events.filter((event) => event.type === categoryFilter);
  }, [categoryFilter]);

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);

  const pagedEvents = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEvents, page]);

  useEffect(() => {
    setPage(1);
  }, [categoryFilter]);

  useEffect(() => {
    setLoading(true);
    setFadeIn(false);
    const timer = setTimeout(() => {
      setLoading(false);
      setFadeIn(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [categoryFilter, page]);

  return (
    <>
      <Navbar />
      <section className="text-center px-4 max-w-7xl mx-auto my-4">
        <h2 className="text-3xl font-bold mb-2">Moments Captured!!</h2>
        <p className="text-gray-600 mb-6">
          Explore the vibrant memories from our events and activities
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                categoryFilter === cat
                  ? "bg-[#F48F0F] text-white"
                  : "text-black hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
            <LoadingSpinner />
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-500 ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
          >
            {pagedEvents.map((event, index) => (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onClick={() =>
                  (window.location.href = `/Gallery/${
                    event.event_id
                  }/${encodeURIComponent(event.title.replace(/\s+/g, "_"))}`)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    window.location.href =
                      "/Gallery/" + encodeURIComponent(event.title);
                }}
                className="rounded-xl shadow bg-white overflow-hidden hover:shadow-lg transform hover:scale-[1.03] transition duration-300 ease-in-out cursor-pointer"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-600">
                    {event.description || "No description"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-100 transition"
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`px-3 py-1 border rounded ${
                  page === num ? "bg-[#F48F0F] text-white" : "hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-100 transition"
            >
              &gt;
            </button>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

export default Gallary;
