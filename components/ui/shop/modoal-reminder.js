import React from 'react';
import Image from 'next/image';
import styles from './modal-reminder.module.css';
import stars from '@/assets/stars.svg';

export default function ModoalReminder({ text = '' }) {
  return (
    <div className={styles.modal_box}>
      <p className={styles.txt}>{text}</p>
      <span className={styles.left}>
        {' '}
        <Image src={stars} alt="stars" width={50} />
      </span>
      <span className={styles.right}>
        {' '}
        <Image src={stars} alt="stars" width={50} />
      </span>
    </div>
  );
}
