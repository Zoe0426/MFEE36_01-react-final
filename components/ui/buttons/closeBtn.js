import React from 'react';
import style from './closeBtn.module.css';

export default function CloseBtn({ closeHandler = () => {} }) {
  return <div className={style.closeBtn} onClick={closeHandler}></div>;
}
