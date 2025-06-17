import React, { useState, useEffect } from "react";
import { Share2, Trash2, CheckCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

const PhotoGridDisplay = ({
  images = [],
  onImageClick,
  onDelete,
  onSelect,
  selectedIndexes = [],
}) => {
  const location = useLocation();
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    setAdmin(
      location.pathname === "/Admin" || location.pathname.startsWith("/Admin/")
    );
  }, [location]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((src, index) => {
        const isSelected = selectedIndexes.includes(index);

        return (
          <div
            key={index}
            onClick={() => {
              if (isAdmin && onSelect) onSelect(index);
              else if (onImageClick) onImageClick(index);
            }}
            className={`relative group rounded-xl overflow-hidden shadow bg-white cursor-pointer transition duration-300 ${
              isSelected ? "ring-4 ring-blue-500" : ""
            }`}
          >
            <img
              src={src}
              alt={`Photo ${index + 1}`}
              className="w-full h-auto object-cover transition hover:scale-105 duration-300"
            />

            {/* Top-right buttons (Delete + Share) */}
            <div className="absolute top-2 right-2 flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
              {isAdmin && (
                <button
                  className="bg-black/60 p-1 rounded hover:bg-black/80 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(index);
                  }}
                >
                  <Trash2 size={16} className="text-orange-500" />
                </button>
              )}
              <button
                className="bg-black/60 p-1 rounded hover:bg-black/80 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  if (navigator.share) {
                    navigator.share({ url: src });
                  } else if (
                    navigator.clipboard &&
                    navigator.clipboard.writeText
                  ) {
                    navigator.clipboard
                      .writeText(src)
                      .then(() => alert("Link copied to clipboard!"))
                      .catch((err) =>
                        alert("Failed to copy: " + err.message)
                      );
                  } else {
                    alert("Clipboard not supported in this browser.");
                  }
                }}
              >
                <Share2 size={16} className="text-white" />
              </button>
            </div>

            {/* Selection checkmark overlay */}
            {isSelected && isAdmin && (
              <div className="absolute top-2 left-2 bg-white/90 rounded-full p-1 z-10">
                <CheckCircle size={18} className="text-blue-600" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PhotoGridDisplay;
