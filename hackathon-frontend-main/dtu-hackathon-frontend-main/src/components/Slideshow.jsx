import React, { useState } from 'react';

const Slideshow = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  return (
    <div className="relative w-full">
      <div className="overflow-hidden w-full">
        <div className="flex" style={{ transform: `translateX(-${currentSlide * 100}%)`, transition: 'transform 0.5s ease' }}>
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img src={slide} alt='hello' className="w-full h-auto object-cover" style={{ maxHeight: '300px' }} />
            </div>
          ))}
        </div>
      </div>
      <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full" onClick={prevSlide}>
        &larr;
      </button>
      <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full" onClick={nextSlide}>
        &rarr;
      </button>
    </div>
  );
};

export default Slideshow;
