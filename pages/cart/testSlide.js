import React, { useState, useRef, useEffect } from 'react';
import HomeForumCard from '@/components/ui/home/homeforumCard';
import style from '@/styles/home.module.css';

export default function Slider() {
  const slideContainerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleCardClick = () => {
    // 跳轉到相應的頁面，你可以在這裡使用路由或其他跳頁的方法
    console.log('Card clicked');
  };

  const handleSlide = () => {
    // 如果滑鼠在元件上或是點擊元件時，不執行滑動
    if (isHovering) return;

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    const slideWidth = slideContainerRef.current.clientWidth;
    const slideDistance = -nextIndex * slideWidth;

    slideContainerRef.current.style.transition = 'transform 10s ease-in-out';
    slideContainerRef.current.style.transform = `translateX(${slideDistance}px)`;
  };

  const handleTransitionEnd = () => {
    const slideWidth = slideContainerRef.current.clientWidth;
    const lastIndex = 6 - 1;

    if (currentIndex === lastIndex) {
      slideContainerRef.current.style.transition = 'none';
      slideContainerRef.current.style.transform = `translateX(0)`;
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    slideContainerRef.current.addEventListener(
      'transitionend',
      handleTransitionEnd
    );

    const intervalId = setInterval(handleSlide, 3000); // 每3秒自動滑動一次
    return () => {
      clearInterval(intervalId);
      slideContainerRef.current.removeEventListener(
        'transitionend',
        handleTransitionEnd
      );
    };
  }, [currentIndex]);

  return (
    <div
      className={style.forumSlider}
      ref={slideContainerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <HomeForumCard
        rotate="left"
        img="/forum_img/post_img/Post011.jpeg"
        boardName="醫療板"
        title="推薦新北市寵物友善景點-八里左岸河濱公園！"
        content="我們最近去了一個很棒的寵物友善景點，大家一定要去看看！
就在新北市的「八里左岸河濱公園」！ 位於新北市八里區，擁有寬闊的河濱綠地，提供了許多活動和休憩空間，非常適合您和寵物一同享受戶外活動。"
      />
      <HomeForumCard
        img="/forum_img/post_img/Post011.jpeg"
        boardName="狗貓聚板"
        title="推薦新北市寵物友善景點-八里左岸河濱公園！"
        content="我們最近去了一個很棒的寵物友善景點，大家一定要去看看！
就在新北市的「八里左岸河濱公園」！ 位於新北市八里區，擁有寬闊的河濱綠地，提供了許多活動和休憩空間，非常適合您和寵物一同享受戶外活動。"
      />
      <HomeForumCard
        rotate="right"
        img="/forum_img/post_img/Post011.jpeg"
        boardName="毛孩日記板"
        title="推薦新北市寵物友善景點-八里左岸河濱公園！"
        content="我們最近去了一個很棒的寵物友善景點，大家一定要去看看！
就在新北市的「八里左岸河濱公園」！ 位於新北市八里區，擁有寬闊的河濱綠地，提供了許多活動和休憩空間，非常適合您和寵物一同享受戶外活動。"
      />
      <HomeForumCard
        rotate="left"
        img="/forum_img/post_img/Post011.jpeg"
        boardName="醫療板"
        title="推薦新北市寵物友善景點-八里左岸河濱公園！"
        content="我們最近去了一個很棒的寵物友善景點，大家一定要去看看！
就在新北市的「八里左岸河濱公園」！ 位於新北市八里區，擁有寬闊的河濱綠地，提供了許多活動和休憩空間，非常適合您和寵物一同享受戶外活動。"
      />
      <HomeForumCard
        img="/forum_img/post_img/Post011.jpeg"
        boardName="狗貓聚板"
        title="推薦新北市寵物友善景點-八里左岸河濱公園！"
        content="我們最近去了一個很棒的寵物友善景點，大家一定要去看看！
就在新北市的「八里左岸河濱公園」！ 位於新北市八里區，擁有寬闊的河濱綠地，提供了許多活動和休憩空間，非常適合您和寵物一同享受戶外活動。"
      />
      <HomeForumCard
        rotate="right"
        img="/forum_img/post_img/Post011.jpeg"
        boardName="毛孩日記板"
        title="推薦新北市寵物友善景點-八里左岸河濱公園！"
        content="我們最近去了一個很棒的寵物友善景點，大家一定要去看看！
就在新北市的「八里左岸河濱公園」！ 位於新北市八里區，擁有寬闊的河濱綠地，提供了許多活動和休憩空間，非常適合您和寵物一同享受戶外活動。"
      />
      {/* {slideData.map((data, index) => (
        <div key={index}>
          <HomeForumCard
            rotate={data.rotate}
            img={data.img}
            boardName={data.boardName}
            title={data.title}
            content={data.content}
            onClick={handleCardClick}
          />
        </div>
      ))} */}
    </div>
  );
}
