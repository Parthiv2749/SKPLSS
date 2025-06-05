import React from 'react';

const events = [
  { month: 'MAY', day: '10' },
  { month: 'JULY', day: '10' },
  { month: 'MON', day: 'DD' },
];

export default function Events() {
  return (
    <section className="section">
      <h2>Upcoming Events</h2>
      <div className="events">
        {events.map((event, i) => (
          <div className="event-card" key={i}>
            <div className="event-date">
              <div>{event.month}</div>
              <div>{event.day}</div>
            </div>
            <div className="text">
              <strong>Event name goes here</strong>
              <p>Event description or details would be displayed here (max 2 lines)</p>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-primary" style={{ marginTop: '1rem' }}>View All Events</button>
    </section>
  );
}

