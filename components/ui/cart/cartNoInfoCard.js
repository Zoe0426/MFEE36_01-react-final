import React from 'react';
import style from './cartNoInfoCard.module.css';
export default function CartNoInfoCard({ text = '' }) {
  return (
    <div className={style.cardBox}>
      <img
        src="/cart_img/no-found.svg"
        alt="sorry"
        className={style.sorryImg}
      />
      <p>{text}</p>
    </div>
  );
}
