import React from 'react';
import subBtn from '@/assets/subBtn.svg';
import Image from 'next/image';
import styles from './subBtn.module.css';

export default function SubBtn({
  img = '',
  text = '',
  subBtnHandler = () => {},
}) {
  return (
    <>
      <div className={styles.subBtn} onClick={subBtnHandler}>
        <Image
          className={styles.subBtn_outline}
          src={subBtn}
          alt="subBtn"
        ></Image>
        <img className={styles.icon} src={img} alt="icon" />
        <p className={styles.text}>{text}</p>
      </div>
    </>
  );
}
