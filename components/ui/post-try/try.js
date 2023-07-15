import React, { useEffect, useState } from 'react';
import Style from './try.module.css';

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    <img src='/forum_img/chris-smith-vCPF8e_-JPg-unsplash.jpg' />,
    <img src='/forum_img/chris-smith-vCPF8e_-JPg-unsplash.jpg' />,
    <img src='/forum_img/chris-smith-vCPF8e_-JPg-unsplash.jpg' />
  ];

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(nextImage, 3000);
    return () => clearInterval(timer);
  }, []);

  const showImage = (index) => {
    setCurrentIndex(index);
  };

  const renderDots = () => {
    return images.map((image, index) => (
      <span
        key={index}
        className={`${Style.dot} ${index === currentIndex ? Style.active : ''}`}
        onClick={() => showImage(index)}
      ></span>
    ));
  };

  return (
    <div className={Style.carousel}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className={index === currentIndex ? 'active' : ''}
        />
      ))}
      <div className={Style['carousel-dots']}>
        {renderDots()}
      </div>
    </div>
  );
}

export default Carousel;
