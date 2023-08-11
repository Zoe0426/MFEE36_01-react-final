import React, { useState, useEffect } from 'react';
import style from './homeEventPhoto.module.css';

export default function HomeEventPhoto({
  images = [],
  currentActPic = 0,
  setCurrentActPic = () => {},
}) {
  useEffect(() => {
    const actPicinterval = setInterval(() => {
      setCurrentActPic((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    // 記得在組件卸載時清除定時器
    return () => clearInterval(actPicinterval);
  }, []);

  const actDotClickHandler = (index) => {
    setCurrentActPic(index);
  };
  return (
    <div className={style.photobox}>
      <img
        src="/home-images/h-shapeClip.svg"
        alt="background"
        className={style.bg}
      />
      <div className={style.svgclipPhoto}>
        <svg viewBox="0 0 863 673">
          {images.map((v, i) => (
            <image
              key={i}
              width="1100"
              clipPath="url(#shape)"
              href={`${process.env.WEB}/activity_img/${images[currentActPic]}`}
              style={{
                opacity: i === currentActPic ? 1 : 0.9,
                transform: `translateX(${(i - currentActPic) * 863}px)`, // 計算圖片的位置
                transition: 'opacity .3s ease-in', // 添加過渡效果，透明度變化會有淡入淡出的效果
              }}
            />
          ))}

          <defs>
            <clipPath id="shape">
              <path
                fill="none"
                d="M773.236 39.3274C847.313 71.5559 863.071 201.242 862.252 273.107C861.432 344.973 857.75 481.583 820.237 586.251C762.477 699.694 572.379 669.918 526.444 667.584C480.508 665.249 348.571 647.25 189.172 633.718C29.7733 620.187 14.6036 544.288 4.70193 488.894C-5.19977 433.5 7.07733 280.473 8.30705 172.576C26.0508 7.05816 190.551 20.8328 300.223 16.4515C409.895 12.0702 619.731 -27.4581 773.236 39.3274Z"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <img
        src="/home-images/h-tree.png"
        alt="background"
        className={style.tree1}
      />
      <img
        src="/home-images/h-tree.png"
        alt="background"
        className={style.tree2}
      />
      <div className={style.dotsContainer}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${style.dot} ${
              index === currentActPic ? style.activeDot : ''
            }`}
            onClick={() => actDotClickHandler(index)}
          />
        ))}
      </div>
    </div>
  );
}
