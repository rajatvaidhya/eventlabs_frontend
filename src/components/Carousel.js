import React, { useState, useEffect } from 'react';
import './Carousel.css'

const Carousel = ({ slides, slideInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const slideTimer = setInterval(() => {
      nextSlide();
    }, slideInterval);

    return () => {
      clearInterval(slideTimer);
    };
  }, [currentIndex, slideInterval]);

  return (
    <div className="carousel-container">
      <div className="carousel" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <img src={slide.image} alt={slide.caption} />
          </div>
        ))}
      </div>
      <button className="prev-button" onClick={prevSlide}><i className="fas fa-chevron-left"></i></button>
      <button className="next-button" onClick={nextSlide}><i className="fas fa-chevron-right"></i></button>
    </div>
  );
};

export default Carousel;
