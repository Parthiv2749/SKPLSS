import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import events from "../../../assets/eventsarray"; // Simulated event JSON
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Back from "../../UI/Back_button/Back";
import LoadingSpinner from "../../UI/LoadingSpiner/LoadingSpinner";
import PhotoGridDisplay from "../../UI/PhotoGrid/PhotoGridDisplay"


const GalleryEvent = () => {
  const { Id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const data = events.find((event) => event.event_id === Number(Id));
    setEventData(data);
    setIsLoading(false);
  }, [Id]);

  if (isLoading) return <LoadingSpinner />;
  if (!eventData)
    return <div className="text-center text-red-500">Event not found</div>;

  const images = Array.from({ length: eventData.photoCount }).map(
    (_, index) => `${eventData.FolderPath}${index + 1}.png`
  );

  return (
    <div className="bg-[#FDF8F3] min-h-screen px-4 sm:px-8 py-5">
      <Back />
      <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-4">
        {eventData.title}
      </h1>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
        {eventData.description}
      </p>

      <PhotoGridDisplay
        images={images}
        onImageClick={(index) => {
          setPhotoIndex(index);
          setIsOpen(true);
        }}
      />

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
};

export default GalleryEvent;
