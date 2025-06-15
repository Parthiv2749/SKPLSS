import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import events from "../../../assets/eventsarray"; // Simulated event JSON


const GalleryEvent = () => {
  const { Id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = events.find((event) => event.event_id === Number(Id));
    setEventData(data);
    setIsLoading(false);
  }, [Id]);

  if (isLoading) return <div>Loading...</div>;

  if (!eventData)
    return <div className="text-center text-red-500">Event not found</div>;

  return (
    <div className="bg-[#FDF8F3] min-h-screen px-4 sm:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-4">
        {eventData.title}
      </h1>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
        {eventData.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        
        {Array.from({ length: eventData.photoCount }).map((_, index) => (
          <img
            key={index}
            src={`/${eventData.FolderPath}${index + 1}.png`}  // → "/gallery/navratri/1.png"
            alt={`Photo ${index + 1}`}
            className="rounded-xl shadow hover:scale-105 transition duration-300 object-cover w-full h-auto"
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryEvent;
