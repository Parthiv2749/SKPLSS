import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../UI/Footer/Footer';
import img1 from '../../../assets/charity_walk.png';
import img2 from '../../../assets/cook-off.png';
import img3 from '../../../assets/talent.png';

const events = 
[
  {
    title: 'Sports day',
    description:
      'Celebrate Sports Day on June 15 in Seychelles with exciting games, teamwork, and community',
    date: 'June 15, 2025',
    status: 'upcoming',
    image: img1,
    link: 'upcoming_event.html',
  },
  {
    title: 'Navratri',
    description:
      'Celebrate Navratri with vibrant dances, devotion, and cultural unity honoring the divine feminine.',
    date: 'June 25, 2025',
    status: 'completed',
    image: img2,
  },
  {
    title: 'Event heading',
    description: 'event description. Maximum 2 lines.',
    date: 'June 25, 2025',
    status: 'ongoing',
    image: img3,
  },

    {
    title: 'Sports day',
    description:
      'Celebrate Sports Day on June 15 in Seychelles with exciting games, teamwork, and community',
    date: 'June 15, 2025',
    status: 'upcoming',
    image: img1,
    link: 'upcoming_event.html',
  },
  {
    title: 'Navratri',
    description:
      'Celebrate Navratri with vibrant dances, devotion, and cultural unity honoring the divine feminine.',
    date: 'June 25, 2025',
    status: 'completed',
    image: img2,
  },
  {
    title: 'Event heading',
    description: 'event description. Maximum 2 lines.',
    date: 'June 25, 2025',
    status: 'ongoing',
    image: img3,
  },
    {
    title: 'Sports day',
    description:
      'Celebrate Sports Day on June 15 in Seychelles with exciting games, teamwork, and community',
    date: 'June 15, 2025',
    status: 'upcoming',
    image: img1,
    link: 'upcoming_event.html',
  },
  {
    title: 'Navratri',
    description:
      'Celebrate Navratri with vibrant dances, devotion, and cultural unity honoring the divine feminine.',
    date: 'June 25, 2025',
    status: 'completed',
    image: img2,
  },
  {
    title: 'Event heading',
    description: 'event description. Maximum 2 lines.',
    date: 'June 25, 2025',
    status: 'ongoing',
    image: img3,
  },
    {
    title: 'Sports day',
    description:
      'Celebrate Sports Day on June 15 in Seychelles with exciting games, teamwork, and community',
    date: 'June 15, 2025',
    status: 'upcoming',
    image: img1,
    link: 'upcoming_event.html',
  },
  {
    title: 'Navratri',
    description:
      'Celebrate Navratri with vibrant dances, devotion, and cultural unity honoring the divine feminine.',
    date: 'June 25, 2025',
    status: 'completed',
    image: img2,
  },
  {
    title: 'Event heading',
    description: 'event description. Maximum 2 lines.',
    date: 'June 25, 2025',
    status: 'ongoing',
    image: img3,
  },
    {
    title: 'Sports day',
    description:
      'Celebrate Sports Day on June 15 in Seychelles with exciting games, teamwork, and community',
    date: 'June 15, 2025',
    status: 'upcoming',
    image: img1,
    link: 'upcoming_event.html',
  },
  {
    title: 'Navratri',
    description:
      'Celebrate Navratri with vibrant dances, devotion, and cultural unity honoring the divine feminine.',
    date: 'June 25, 2025',
    status: 'completed',
    image: img2,
  },
  {
    title: 'Event heading',
    description: 'event description. Maximum 2 lines.',
    date: 'June 25, 2025',
    status: 'ongoing',
    image: img3,
  },
    {
    title: 'Sports day',
    description:
      'Celebrate Sports Day on June 15 in Seychelles with exciting games, teamwork, and community',
    date: 'June 15, 2025',
    status: 'upcoming',
    image: img1,
    link: 'upcoming_event.html',
  },
  {
    title: 'Navratri',
    description:
      'Celebrate Navratri with vibrant dances, devotion, and cultural unity honoring the divine feminine.',
    date: 'June 25, 2025',
    status: 'completed',
    image: img2,
  },
  {
    title: 'Event heading',
    description: 'event description. Maximum 2 lines.',
    date: 'June 25, 2025',
    status: 'ongoing',
    image: img3,
  },
    {
    title: 'Sports day',
    description:
      'Celebrate Sports Day on June 15 in Seychelles with exciting games, teamwork, and community',
    date: 'June 15, 2025',
    status: 'upcoming',
    image: img1,
    link: 'upcoming_event.html',
  },
  {
    title: 'Navratri',
    description:
      'Celebrate Navratri with vibrant dances, devotion, and cultural unity honoring the divine feminine.',
    date: 'June 25, 2025',
    status: 'completed',
    image: img2,
  },
  {
    title: 'Event heading',
    description: 'event description. Maximum 2 lines.',
    date: 'June 25, 2025',
    status: 'ongoing',
    image: img3,
  },
    {
    title: 'Sports day',
    description:
      'Celebrate Sports Day on June 15 in Seychelles with exciting games, teamwork, and community',
    date: 'June 15, 2025',
    status: 'upcoming',
    image: img1,
    link: 'upcoming_event.html',
  },
  {
    title: 'Navratri',
    description:
      'Celebrate Navratri with vibrant dances, devotion, and cultural unity honoring the divine feminine.',
    date: 'June 25, 2025',
    status: 'completed',
    image: img2,
  },
  {
    title: 'Event heading',
    description: 'event description. Maximum 2 lines.',
    date: 'June 25, 2025',
    status: 'ongoing',
    image: img3,
  },
    {
    title: 'Sports day',
    description:
      'Celebrate Sports Day on June 15 in Seychelles with exciting games, teamwork, and community',
    date: 'June 15, 2025',
    status: 'upcoming',
    image: img1,
    link: 'upcoming_event.html',
  },
  {
    title: 'Navratri',
    description:
      'Celebrate Navratri with vibrant dances, devotion, and cultural unity honoring the divine feminine.',
    date: 'June 25, 2025',
    status: 'completed',
    image: img2,
  },
  {
    title: 'Event heading',
    description: 'event description. Maximum 2 lines.',
    date: 'June 25, 2025',
    status: 'ongoing',
    image: img3,
  },
    {
    title: 'Sports day',
    description:
      'Celebrate Sports Day on June 15 in Seychelles with exciting games, teamwork, and community',
    date: 'June 15, 2025',
    status: 'upcoming',
    image: img1,
    link: 'upcoming_event.html',
  },
  {
    title: 'Navratri',
    description:
      'Celebrate Navratri with vibrant dances, devotion, and cultural unity honoring the divine feminine.',
    date: 'June 25, 2025',
    status: 'completed',
    image: img2,
  },
  {
    title: 'Event heading',
    description: 'event description. Maximum 2 lines.',
    date: 'June 25, 2025',
    status: 'ongoing',
    image: img3,
  },
    {
    title: 'Sports day',
    description:
      'Celebrate Sports Day on June 15 in Seychelles with exciting games, teamwork, and community',
    date: 'June 15, 2025',
    status: 'upcoming',
    image: img1,
    link: 'upcoming_event.html',
  },
  {
    title: 'Navratri',
    description:
      'Celebrate Navratri with vibrant dances, devotion, and cultural unity honoring the divine feminine.',
    date: 'June 25, 2025',
    status: 'completed',
    image: img2,
  },
  {
    title: 'Event heading',
    description: 'event description. Maximum 2 lines.',
    date: 'June 25, 2025',
    status: 'ongoing',
    image: img3,
  },
    {
    title: 'Sports day',
    description:
      'Celebrate Sports Day on June 15 in Seychelles with exciting games, teamwork, and community',
    date: 'June 15, 2025',
    status: 'upcoming',
    image: img1,
    link: 'upcoming_event.html',
  },
  {
    title: 'Navratri',
    description:
      'Celebrate Navratri with vibrant dances, devotion, and cultural unity honoring the divine feminine.',
    date: 'June 25, 2025',
    status: 'completed',
    image: img2,
  },
  {
    title: 'Event heading',
    description: 'event description. Maximum 2 lines.',
    date: 'June 25, 2025',
    status: 'ongoing',
    image: img3,
  },
    {
    title: 'Sports day',
    description:
      'Celebrate Sports Day on June 15 in Seychelles with exciting games, teamwork, and community',
    date: 'June 15, 2025',
    status: 'upcoming',
    image: img1,
    link: 'upcoming_event.html',
  },
  {
    title: 'Navratri',
    description:
      'Celebrate Navratri with vibrant dances, devotion, and cultural unity honoring the divine feminine.',
    date: 'June 25, 2025',
    status: 'completed',
    image: img2,
  },
  {
    title: 'Event heading',
    description: 'event description. Maximum 2 lines.',
    date: 'June 25, 2025',
    status: 'ongoing',
    image: img3,
  },
    {
    title: 'Sports day',
    description:
      'Celebrate Sports Day on June 15 in Seychelles with exciting games, teamwork, and community',
    date: 'June 15, 2025',
    status: 'upcoming',
    image: img1,
    link: 'upcoming_event.html',
  },
  {
    title: 'Navratri',
    description:
      'Celebrate Navratri with vibrant dances, devotion, and cultural unity honoring the divine feminine.',
    date: 'June 25, 2025',
    status: 'completed',
    image: img2,
  },
  {
    title: 'Event heading',
    description: 'event description. Maximum 2 lines.',
    date: 'June 25, 2025',
    status: 'ongoing',
    image: img3,
  },
    {
    title: 'Sports day',
    description:
      'Celebrate Sports Day on June 15 in Seychelles with exciting games, teamwork, and community',
    date: 'June 15, 2025',
    status: 'upcoming',
    image: img1,
    link: 'upcoming_event.html',
  },
  {
    title: 'Navratri',
    description:
      'Celebrate Navratri with vibrant dances, devotion, and cultural unity honoring the divine feminine.',
    date: 'June 25, 2025',
    status: 'completed',
    image: img2,
  },
  {
    title: 'Event heading',
    description: 'event description. Maximum 2 lines.',
    date: 'June 25, 2025',
    status: 'ongoing',
    image: img3,
  },
  // Add more events here...
];

const statusClasses = {
  upcoming: 'bg-blue-100 text-blue-500',
  completed: 'bg-orange-100 text-orange-500',
  ongoing: 'bg-yellow-100 text-yellow-600',
};

const ITEMS_PER_PAGE = 6;

function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = [];

  if (currentPage > 2) pages.push(1);
  if (currentPage > 3) pages.push('left-ellipsis');

  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) pages.push('right-ellipsis');
  if (currentPage < totalPages - 1) pages.push(totalPages);

  return pages;
}

const LoadingSpinner = () => (
  <div className="flex justify-center my-20" aria-label="Loading">
    <svg
      className="animate-spin h-8 w-8 text-orange-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  </div>
);

const EventsPage = () => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  // Filter and search events
  const filteredEvents = useMemo(() => {
    const term = search.toLowerCase();
    return events.filter((ev) => {
      if (filter === 'Upcoming' && ev.status !== 'upcoming') return false;
      if (filter === 'Past' && ev.status !== 'completed') return false;

      if (
        term &&
        !(
          ev.title.toLowerCase().includes(term) ||
          ev.description.toLowerCase().includes(term)
        )
      )
        return false;

      return true;
    });
  }, [filter, search]);

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const pagedEvents = filteredEvents.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const pageNumbers = getPageNumbers(page, totalPages);

  // When filter/search/page changes, simulate loading & fade
  useEffect(() => {
    setLoading(true);
    setFadeIn(false);

    const timer = setTimeout(() => {
      setLoading(false);
      setFadeIn(true);
    }, 300); // short delay to simulate loading & allow fade-in

    return () => clearTimeout(timer);
  }, [filter, search, page]);

  // Reset page on filter/search change
  useEffect(() => {
    setPage(1);
  }, [filter, search]);

  return (
    <>
      <div className="bg-white text-gray-800 font-sans min-h-screen mb-12">
        <div className="p-6">
          <button
            className="border rounded-full px-4 py-1 text-sm hover:bg-gray-100 transition"
            onClick={() => navigate(-1)}
          >
            ⬅ Back To Home
          </button>
        </div>

        <section className="text-center px-4 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">Our Events</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Stay connected with our vibrant community. Discover celebrations,
            gatherings, and learning opportunities.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
            <input
              type="search"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              aria-label="Search events"
            />
            <div className="flex gap-3">
              {['All', 'Upcoming', 'Past'].map((label) => (
                <button
                  key={label}
                  onClick={() => setFilter(label)}
                  className={`px-4 py-2 rounded-full text-sm transition ${
                    filter === label
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-pressed={filter === label}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading spinner or events grid */}
          {loading ? (
            <LoadingSpinner />
          ) : pagedEvents.length > 0 ? (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-opacity duration-500 ${
                fadeIn ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {pagedEvents.map((event, idx) => {
                const StatusTag = (
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      statusClasses[event.status] || ''
                    }`}
                  >
                    {event.status.charAt(0).toUpperCase() +
                      event.status.slice(1)}
                  </span>
                );

                const CardContent = (
                  <div
                    className="bg-white rounded shadow p-4 text-left cursor-pointer hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
                    style={{
                      minHeight: '220px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${event.title}`}
                    onClick={() => {
                      if (event.link) {
                        window.location.href = event.link;
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && event.link) {
                        window.location.href = event.link;
                      }
                    }}
                  >
                    <img
                      src={event.image}
                      alt={`Event: ${event.title}`}
                      className="rounded mb-4 w-full h-40 object-cover flex-shrink-0"
                    />
                    <h3 className="font-bold text-sm mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-600 flex-grow">
                      {event.description}
                    </p>
                    <div className="flex justify-between items-center text-xs mt-3">
                      <span className="flex items-center gap-1">
                        📅 {event.date}
                      </span>
                      {StatusTag}
                    </div>
                  </div>
                );

                return <div key={idx}>{CardContent}</div>;
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 italic mt-20">
              No events found matching your criteria.
            </p>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="mt-10 flex justify-center items-center gap-2 flex-wrap select-none">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-100 transition"
                aria-label="Previous page"
              >
                &lt;
              </button>

              {pageNumbers.map((num, idx) => {
                if (num === 'left-ellipsis' || num === 'right-ellipsis') {
                  return (
                    <span key={idx} className="px-3 py-1 select-none">
                      ...
                    </span>
                  );
                }
                return (
                  <button
                    key={idx}
                    onClick={() => setPage(num)}
                    aria-current={page === num ? 'page' : undefined}
                    className={`px-3 py-1 border rounded transition ${
                      page === num
                        ? 'bg-orange-500 text-white cursor-default'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {num}
                  </button>
                );
              })}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-100 transition"
                aria-label="Next page"
              >
                &gt;
              </button>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default EventsPage;
