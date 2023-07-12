import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faCalendarDays,faClock,faLocationDot } from '@fortawesome/free-solid-svg-icons';
import styles from './ActivityCard4.module.css';
import ActivityFeature from './ActivityFeature';

const ActivityCard4 = ({
  image='',
  type='',
  title='',
  rating=0,
  date_begin='',
  date_end='',
  time='',
  content='',
  city='',
  area='',
  address='',
  price=0,
}) => {
  return (
    <div className={styles.card}>
      {/* -------右邊------- */}
      <div className={styles.left}>
        <img
          src={image}
          alt="Activity"
          className={styles.image}
        />
        <div className={styles.overlay}>
          <p className={styles.text}>{type}</p>
        </div>
        <div className={styles.icon}></div>
      </div>

      {/* -------左邊------- */}
      <div className={styles.right}>
        <div className={styles.row}>
          <div className={styles.rowTextTitle}>
            <p className={styles.rowTextLarge}>{title}</p>
          </div>
          <div className={styles.review}>
            <FontAwesomeIcon icon={faStar} className={styles.star_icon} />
            <p className={styles.rowTextLarge}>{rating}</p>
          </div>
        </div>

        <div className={styles.row}>
          <FontAwesomeIcon icon={faCalendarDays} className={styles.row_icon} />
          <div>
            <p className={styles.rowTextSmall}>{date_begin}~{date_end}</p>
          </div>
        </div>

        <div className={styles.row}>
          <FontAwesomeIcon icon={faClock} className={styles.row_icon} />
          <div>
            <p className={styles.rowTextSmall}>{time}</p>
          </div>
        </div>

        <div className={styles.row}>
            <FontAwesomeIcon icon={faLocationDot} className={styles.row_icon} />
            <div className={styles.rowTextAddress}>
              <p className={styles.rowTextSmall}>{city}{area}{address}</p>
            </div>
        </div>

        <div className={styles.row}>
          <div className={styles.rowTextIntro}>
            <p className={styles.content}>{content}</p>
          </div>
        </div>

        <div className={styles.row}>
          <ActivityFeature className={styles.feature} feature='專屬攝影師'/>
          <ActivityFeature className={styles.feature} feature='贈寵物沐浴乳乙瓶'/>
        </div>
        <div className={styles.row}>
          <ActivityFeature className={styles.feature} feature='寵物拍貼體驗'/>
          <ActivityFeature className={styles.feature} feature='精美午餐'/>
        </div>
        
        <div>
          <p className={styles.price}>${price} (大人) ${price/2} (小孩)</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard4;
