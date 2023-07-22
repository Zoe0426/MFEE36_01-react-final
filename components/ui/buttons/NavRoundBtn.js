import React from 'react';
import styles from './NavRoundBtn.module.css';

export default function NavRoundBtn({ icon = '', clickHandler = () => {} }) {
  return (
    <div className={styles.roundBtn} onClick={clickHandler}>
      <img src={icon} className={styles.rbIcon} alt="" />
    </div>
  );
}
