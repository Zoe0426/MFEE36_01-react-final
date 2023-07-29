import React from 'react';
import Styles from './MainBtn.module.css';

export default function MainBtn({
  text = 'mainBtn',
  clickHandler = () => {},
  htmltype = 'button',
  disable = '',
}) {
  return (
    <>
      <button
        className={Styles.main_btn}
        onClick={clickHandler}
        type={htmltype}
        disabled={disable}
      >
        {text}
      </button>
    </>
  );
}
