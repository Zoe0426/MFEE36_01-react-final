import React from 'react';
import balloon from '@/assets/balloon.svg';
import cloud from '@/assets/cloud_white.svg';
import Image from 'next/image';
import styles from './balloom.module.css';
export default function Balloom() {
  return (
    <div className={styles.balloon_box}>
      <div>
        <div className={styles.left_cloud2}>
          <Image src={cloud} alt="cloud" />
        </div>
      </div>
      <div>
        <div className={styles.left_cloud}>
          <Image src={cloud} alt="cloud" />
        </div>
      </div>

      <div>
        <div className={styles.right_cloud2}>
          <Image src={cloud} alt="cloud" />
        </div>
      </div>
      <div>
        <div className={styles.right_cloud}>
          <Image src={cloud} alt="cloud" />
        </div>
      </div>

      <div className={styles.left_box}>
        <div className={styles.balloon_left2}>
          <Image src={balloon} alt="balloon" />
        </div>
        <div className={styles.balloon_left}>
          <Image src={balloon} alt="balloon" />
        </div>
        <div className={styles.balloon_left3}>
          <Image src={balloon} alt="balloon" />
        </div>
      </div>
      <div className={styles.right_box}>
        <div className={styles.balloon_right2}>
          <Image src={balloon} alt="balloon" />
        </div>
        <div className={styles.balloon_right}>
          <Image src={balloon} alt="balloon" />
        </div>
        <div className={styles.balloon_right3}>
          <Image src={balloon} alt="balloon" />
        </div>
      </div>
    </div>
  );
}
