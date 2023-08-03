import React, { useState, useEffect } from 'react';
import style from '@/components/ui/home/homeEventPhoto.module.css'; // 假設 CSS 檔案是 YourComponent.module.css

const images = [
  '/activity_img/1.jpg',
  '/activity_img/2.jpg',
  '/activity_img/3.jpg',
]; // 輪播的圖片陣列

const YourComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 定義定時器，在 3000 毫秒（3 秒）後更新圖片索引
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    // 記得在組件卸載時清除定時器
    return () => clearInterval(interval);
  }, []);
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };
  return (
    <div className={style.svgclipPhoto}>
      <svg viewBox="0 0 863 673">
        <image
          width="1100"
          clipPath="url(#shape)"
          href={images[currentIndex]} // 使用目前索引對應的圖片
        />
        <defs>
          <clipPath id="shape">
            <path
              fill="none"
              d="M773.236 39.3274C847.313 71.5559 863.071 201.242 862.252 273.107C861.432 344.973 857.75 481.583 820.237 586.251C762.477 699.694 572.379 669.918 526.444 667.584C480.508 665.249 348.571 647.25 189.172 633.718C29.7733 620.187 14.6036 544.288 4.70193 488.894C-5.19977 433.5 7.07733 280.473 8.30705 172.576C26.0508 7.05816 190.551 20.8328 300.223 16.4515C409.895 12.0702 619.731 -27.4581 773.236 39.3274Z"
            />
          </clipPath>
        </defs>
      </svg>
      <div className={style.dotsContainer}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${style.dot} ${
              index === currentIndex ? style.activeDot : ''
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default YourComponent;
