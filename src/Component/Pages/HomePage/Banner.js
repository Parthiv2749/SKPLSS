import React, { useRef, useState, useEffect } from 'react';
import banner1 from '../../../assets/banner.png';
import banner2 from '../../../assets/banner.png';
import banner3 from '../../../assets/banner.png';
import "./Banner.css"

const banners = [banner1, banner2, banner3];

export default function BannerSlider() {
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);

  // Scroll handler to update current active slide index on manual scroll
  const onScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const width = containerRef.current.clientWidth;
    const index = Math.round(scrollLeft / width);
    setCurrent(index);
  };

  // Scroll to slide when current changes (e.g. on dot click)
  const scrollToSlide = (index) => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    containerRef.current.scrollTo({
      left: width * index,
      behavior: 'smooth',
    });
    setCurrent(index);
  };

  return (
    <div className="relative w-full my-2 p-8 pt-2 pb-2">
      {/* Scrollable container */}
      <div
        ref={containerRef}
        onScroll={onScroll}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {banners.map((img, idx) => (
          <div
            key={idx}
            className="snap-start flex-shrink-0 w-full min-h-[70vh]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <img
              src={img}
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSlide(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === current ? 'bg-[#F48F0F]' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
