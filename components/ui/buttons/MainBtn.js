import React from 'react';
import Styles from './MainBtn.module.css';

export default function MainBtn({ text = '', clickHandler = () => {} }) {
  return (
    <>
      <button className={Styles.main_btn} onClick={clickHandler}>
        {text}
      </button>
    </>
  );
}
