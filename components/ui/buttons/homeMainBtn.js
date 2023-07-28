import React from 'react';
import style from './homeMainBtn.module.css';

export default function HomeMainBtn({ src = '', margintop = '' }) {
  return (
    <div
      className={`${style.hMainBtn} ${
        margintop === 'mainBtn1'
          ? style.mainBtn1
          : margintop === 'mainBtn2'
          ? style.mainBtn2
          : margintop === 'mainBtn3'
          ? style.mainBtn3
          : margintop === 'mainBtn4'
          ? style.mainBtn4
          : ''
      }`}
    >
      <img src={src} className={style.hMBtnimg} alt="" />
    </div>
  );
}
