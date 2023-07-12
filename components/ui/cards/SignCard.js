import React from 'react';
import Styles from './SignCard.module.css';

export default function SignCard({ children, title }) {
  return (
    <>
      <div className={Styles.signCard}>
        <div className={Styles.title}>{title}</div>
        <div>{children}</div>
        <img
          src="/member-center-images/tree.svg"
          alt=""
          className={Styles.drowTree}
        />
        <img
          src="/member-center-images/running-dog.svg"
          alt=""
          className={Styles.drowDog}
        />
      </div>
    </>
  );
}
