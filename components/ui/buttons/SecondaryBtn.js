import React from 'react';
import Styles from './SecondaryBtn.module.css';

export default function SecondaryBtn({ text = '', clickHandler = () => {} }) {
  return (
    <>
      <button className={Styles.secondary_btn} onClick={clickHandler}>
        {text}
      </button>
    </>
  );
}
