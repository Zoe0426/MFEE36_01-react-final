import React, { useState, useRef, useEffect } from 'react';
import HomeForumCard from '@/components/ui/home/homeforumCard';
import style from '@/styles/home.module.css';

export default function Slider() {
  const [index, setIndex] = useState(0);
  const ref = useRef();

  useEffect(() => {
    // 定時器，每秒移動一個元件
    setInterval(() => {
      setIndex((i) => (i + 1) % 3);
    }, 1000);
  }, [ref]);

  // 滑鼠 hover 時，停止移動
  useEffect(() => {
    ref.current.addEventListener('mouseover', () => {
      clearInterval(ref.current.timer);
    });

    // 滑鼠離開時，繼續移動
    ref.current.addEventListener('mouseleave', () => {
      setInterval(() => {
        setIndex((i) => (i + 1) % 3);
      }, 1000);
    });
  }, [ref]);

  // 點擊元件時，跳頁
  useEffect(() => {
    ref.current.addEventListener('click', () => {
      setIndex((i) => (i + 1) % 3);
    });
  }, [ref]);

  return (
    <div className={style.forumSlide}>
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

      {/* {forumCards.map((card, i) => (
        <HomeForumCard
          key={i}
          rotate={card.rotate}
          img={card.img}
          boardName={card.boardName}
          title={card.title}
          content={card.content}
        />
      ))} */}
    </div>
  );
}
