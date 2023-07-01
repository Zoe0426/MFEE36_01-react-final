import React from 'react';
import Styles from './SignCard.module.css';

export default function SignCard() {
  return (
    <>
      <div className={Styles.signCard}>
        <div className="h1">會員登入</div>
        <img
          src="/sign-images/drow-tree.png"
          alt=""
          className={Styles.drowTree}
        />
        <img
          src="/sign-images/drow-dog.png"
          alt=""
          className={Styles.drowDog}
        />
      </div>
    </>
  );
}
