import React from 'react';
import Image from 'next/image';
import styles from './not-find-card.module.css';
import sorry from '@/assets/no-found.svg';

export default function NotFindCard({
  textForCat = '非常抱歉!',
  textForDog = '想跟你說.....',
}) {
  return (
    <div className={styles.not_found_box}>
      <div className={styles.not_found_txt}>
        <div>
          <p>{textForCat}</p>
        </div>
        <div className={styles.circle1}></div>
        <div className={styles.circle3}></div>
      </div>

      <div className={styles.not_found_img}>
        <Image src={sorry} alt="cannot-found" />
      </div>
      <div className={styles.not_found_txt}>
        <div className={styles.circle3}></div>
        <div className={styles.circle2}></div>
        <div>
          <p>{textForDog}</p>
        </div>
      </div>
      <div className={styles.for_mobile}>
        <p>{textForDog}</p>
      </div>
    </div>
  );
}
