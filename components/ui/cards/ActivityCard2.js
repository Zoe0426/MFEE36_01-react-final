import React from 'react';
import styles from './ActivityCard2.module.css';
import ActivitySecondaryBtn from '@/components/ui/buttons/ActivitySecondaryBtn';

const ActivityCard2 = ({
  city='',
}) => {
  return (
    <div className={styles.card}>
      <img className={styles.image}  src={`/activity_img/${city}.jpg`} alt='' />
      <div className={styles.overlay}></div> {/* 新增的覆盖层 */}
      <div className={styles.content}>
        <p className={styles.city}>{city}</p>
        <div className={styles.btnContainer}>
          <ActivitySecondaryBtn text='更多活動' />
        </div>
      </div>
    </div>
  )
}

export default ActivityCard2
