import React from 'react';
import style from './cartSectionTitle.module.css';
export default function CartSectionTitle({ text = '' }) {
  return <p className={style.title}>{text}</p>;
}
