import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faCalendarDays,
  faClock,
  faLocationDot,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import styles from './ActivityCard4.module.css';
import ActivityFeature from './ActivityFeature';
import { Row, Col } from 'antd';
import Link from 'next/link';

const ActivityCard4 = ({
  activity_sid = '', //link要用的
  image = '',
  type = '',
  title = '',
  rating = 0,
  date_begin = '',
  date_end = '',
  time = '',
  city = '',
  area = '',
  address = '',
  content = '',
  features = [],
  price = 0,
}) => {
  return (
    <>
      <Link 
        className={styles.card}
        href={`http://localhost:3000/activity/${activity_sid}`}
      >
        {/* -------右邊------- */}
        <div className={styles.left}>
          <img src={image} alt="Activity" className={styles.image} />
          <div className={styles.overlay}>
            <p className={styles.text}>{type}</p>
            
          </div>
          <FontAwesomeIcon icon={faHeart} className={styles.heart_icon} />
          
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
            <FontAwesomeIcon
              icon={faCalendarDays}
              className={styles.row_icon}
            />
            <div>
              <p className={styles.rowTextSmall}>
                {date_begin}~{date_end}
              </p>
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
              <p className={styles.rowTextSmall}>
                {city}
                {area}
                {address}
              </p>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.rowTextIntro}>
              <p className={styles.content}>{content}</p>
            </div>
          </div>

          <Row>
            {features.map((feature, i) => (
              <div className={styles.row} key={i}>
                <ActivityFeature className={styles.feature} feature={feature} />
              </div>
            ))}
          </Row>
          <div>
            <p className={styles.price}>
              ${price} (大人) ${price / 2} (小孩)
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ActivityCard4;
