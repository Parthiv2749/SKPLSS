import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PhotoGridDisplay from "../../UI/PhotoGrid/PhotoGridDisplay";
import events from "../../../assets/eventsarray";
import SidebarLayout from "../reusable/SidebarLayout";

const ManagePhotos = () => {
  const { Id } = useParams();
  const [photos, setPhotos] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // renamed from "event"

  useEffect(() => {
    const foundEvent = events.find((e) => e.event_id.toString() === Id);
    setSelectedEvent(foundEvent);
    console.log("Found Event:", foundEvent);

    if (foundEvent && foundEvent.FolderPath && foundEvent.photoCount) {
      const folder = foundEvent.FolderPath.endsWith("/")
        ? foundEvent.FolderPath
        : `${foundEvent.FolderPath}/`;
      const loadedPhotos = Array.from(
        { length: foundEvent.photoCount },
        (_, i) => `${folder}${i + 1}.png`
      );
      console.log("Loaded Photos:", loadedPhotos); // ✅
      setPhotos(loadedPhotos);
    } else {
      console.log("No photos loaded.");
      setPhotos([]);
    }
  }, [Id]);

  const handleAddPhotos = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => URL.createObjectURL(file));
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const handleDelete = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-[#FdF8F3] text-[#292929] p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">
            {selectedEvent ? selectedEvent.title : "Unknown Title"}
          </h1>

          <label className="bg-green-500 hover:bg-green-600 text-white px-6 md:py-2 text-center rounded-md cursor-pointer">
            Add photos
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleAddPhotos}
            />
          </label>
        </div>

        <PhotoGridDisplay images={photos} onDelete={handleDelete} />
      </div>
    </SidebarLayout>
  );
};

export default ManagePhotos;
