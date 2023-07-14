import React from 'react'
import style from './cartTab.module.css'

export default function CartTab(props) {
    const text = props.text;
    const checkoutType = props.checkoutType;
    const setCheckoutType = props.setCheckoutType;

  return (
    <div
      onClick={() => {
        setCheckoutType;
      }}
      className={`${checkoutType === type} ? style.typeSelected : style.type}`}
    >
      {text}
    </div>
  );
}
