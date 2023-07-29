import React from 'react';
import Style from './homeforumCard.module.css';

export default function HomeForumCard({
  rotate = 'none',
  img = '',
  boardName = '',
  bc = '',
  title = '',
  content = '',
}) {
  switch (boardName) {
    case '醫療版':
      bc = '#B5DDA4';
      break;
    case '住宿版':
      bc = '#587D71';
      break;
    case '景點版':
      bc = '#FFD1BA';
      break;
    case '美容版':
      bc = '#A6CFD5';
      break;
    case '狗貓聚版':
      bc = '#EFBCD5';
      break;
    case '毛孩日記版':
      bc = '#92B4A7';
      break;
    case '學校版':
      bc = '#BE97C6';
      break;
    case '餐廳版':
      bc = '#FFE381';
      break;
    case '好物版':
      bc = '#6F8695';
      break;
    case '幼犬貓版':
      bc = '#BDDBD0';
      break;
    case '老犬貓版':
      bc = '#F4B393';
      break;
  }
  return (
    <div
      className={`${
        rotate === 'left'
          ? Style.boxLeft
          : rotate === 'right'
          ? Style.boxRight
          : Style.box
      }`}
    >
      <div className={Style.card}>
        <div className={Style.sticker}></div>
        <img className={Style.img} src={img} alt="img" />
        <span className={Style.boardName} style={{ background: `${bc}` }}>
          #&nbsp;{boardName}
        </span>
        <div className={Style.title}>{title}</div>
        <div className={Style.content}>{content}</div>
      </div>
    </div>
  );
}
