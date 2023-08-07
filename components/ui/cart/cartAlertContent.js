import React from 'react';
import style from './cartAlertContent.module.css';

export default function CartAlertContent({ h2title = '', content = '' }) {
  return (
    <div className={style.box}>
      <img src="/home-images/h-logo.png" alt="logo" className={style.img} />
      <div className={style.message}>
        <h2 className={style.h2title}>{h2title}</h2>
        <p className={style.content}>{content}</p>
      </div>
    </div>
  );
}
