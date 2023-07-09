import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faCalendarDays,faClock,faLocationDot} from '@fortawesome/free-solid-svg-icons';
import styles from './ActivityCard1.module.css';
import ActivityFeature from './ActivityFeature';


const ActivityCard1 = ({
  image='',
  type='',
  name='',
  rating=0,
  date_begin='',
  date_end='',
  time='',
  city='',
  area='',
  address='',
  price=0,
}) => {
  return (
    <div className={styles.card}>
      {/* -------左邊------- */}
      <div className={styles.left}>
        <img
          src={image}
          alt="activity"
          className={styles.image}
        />
        <div className={styles.overlay}>
          <span className={styles.text}>{type}</span>
        </div>
        <div className={styles.icon}></div>
      </div>

      {/* -------右邊------- */}
      <div className={styles.right}>
        <div className={styles.row}>
          <div className={styles.rowTextTitle}>
            <p className={styles.rowTextLarge}>{name}</p>
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
          <ActivityFeature className={styles.feature} feature='專屬攝影師'/>
          <ActivityFeature className={styles.feature} feature='贈寵物沐浴乳乙瓶'/>
        </div>
        <div className={styles.row}>
          <ActivityFeature className={styles.feature} feature='寵物拍貼體驗'/>
          <ActivityFeature className={styles.feature} feature='精美午餐'/>
        </div>
        
        <div className={styles.rowPrice}>
          <p className={styles.rowTextSmall}>${price} (大人) ${price/2} (小孩)</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard1;
