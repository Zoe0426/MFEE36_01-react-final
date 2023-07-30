import React from 'react';
import Style from './homeforumCard.module.css';

export default function HomeForumCard({
  rotate = 'none',
  img = '',
  boardName = '',
  bc = '',
  title = '',
  content = '',
  clickHandler = () => {},
}) {
  switch (boardName) {
    case '醫療板':
      bc = '#B5DDA4';
      break;
    case '住宿板':
      bc = '#587D71';
      break;
    case '景點板':
      bc = '#FFD1BA';
      break;
    case '美容板':
      bc = '#A6CFD5';
      break;
    case '狗貓聚板':
      bc = '#EFBCD5';
      break;
    case '毛孩日記板':
      bc = '#92B4A7';
      break;
    case '學校板':
      bc = '#BE97C6';
      break;
    case '餐廳板':
      bc = '#FFE381';
      break;
    case '好物板':
      bc = '#6F8695';
      break;
    case '幼犬貓板':
      bc = '#BDDBD0';
      break;
    case '老犬貓板':
      bc = '#F4B393';
      break;
  }

  return (
    <div
      className={`${
        rotate === 2 ? Style.boxLeft : rotate === 1 ? Style.boxRight : Style.box
      }`}
      onClick={clickHandler}
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
