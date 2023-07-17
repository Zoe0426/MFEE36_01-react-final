import React from 'react';
import style from './cartTab.module.css';

export default function CartTab({
  type = '',
  text = '',
  checkoutType = '',
  clickHandler = () => {},
}) {
  return (
    <div
      onClick={clickHandler}
      className={`${checkoutType === type ? style.typeSelected : style.type}`}
    >
      {text}
    </div>
  );
}
