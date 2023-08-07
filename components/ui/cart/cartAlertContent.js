import React from 'react';
import style from './cartAlertContent.module.css';

export default function CartAlertContent({ contentP1 = '', contentP2 = '' }) {
  return (
    <div className={style.box}>
      <div className={style.message}>
        <img src="/home-images/h-logo.png" alt="logo" className={style.img} />
        <div className={style.textArea}>
          <p className={style.content}>{contentP1}</p>
          <p className={style.content}>{contentP2}</p>
        </div>
      </div>
    </div>
  );
}
