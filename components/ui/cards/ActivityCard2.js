import React from 'react';
import styles from './ActivityCard2.module.css';
import ActivitySecondaryBtn from '@/components/ui/buttons/ActivitySecondaryBtn';
import Link from 'next/link';

const ActivityCard2 = ({
  city='',
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.image_gradient}></div>
      <img className={styles.image}  src={`/activity_img/${city}.jpg`} alt='' />
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <p className={styles.city}>{city}</p>
        <div className={styles.btnContainer}>
        <Link href={`${process.env.WEB}/activity/list?city=${city}`}>
          <ActivitySecondaryBtn text='更多活動' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ActivityCard2
