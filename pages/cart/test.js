import React from 'react';
import HomeForumCard from '@/components/ui/home/homeforumCard';

export default function test() {
  return (
    <div
      style={{
        border: '1px solid red',
        padding: '20px',
        background: '#fff6f6',
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      <HomeForumCard
        img="/forum_img/post_img/Post011.jpeg"
        boardName="醫療板"
        title="推薦新北市寵物友善景點-八里左岸河濱公園！"
        content="我們最近去了一個很棒的寵物友善景點，大家一定要去看看！
就在新北市的「八里左岸河濱公園」！ 位於新北市八里區，擁有寬闊的河濱綠地，提供了許多活動和休憩空間，非常適合您和寵物一同享受戶外活動。"
      />
      <HomeForumCard
        rotate="left"
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
    </div>
  );
}
