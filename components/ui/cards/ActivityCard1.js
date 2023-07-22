import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faCalendarDays,faClock,faLocationDot} from '@fortawesome/free-solid-svg-icons';
import styles from './ActivityCard1.module.css';
import ActivityFeature from './ActivityFeature';
import { Row } from 'antd';


const ActivityCard1 = ({
  activity_sid='', //link要用
  image='',
  type='',
  title='',
  rating=0,
  date_begin='',
  date_end='',
  time='',
  city='',
  area='',
  address='',
  features = [],
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
            <p>{date_begin}~{date_end}</p>
          </div>
        </div>

        <div className={styles.row}>
          <FontAwesomeIcon icon={faClock} className={styles.row_icon} />
          <div>
            <p>{time}</p>
          </div>
        </div>

        <div className={styles.row}>
          <FontAwesomeIcon icon={faLocationDot} className={styles.row_icon} />
          <div className={styles.rowTextAddress}>
            <p>{city}{area}{address}</p>
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
          <p className={styles.row_price}>${price} (大人) ${price/2} (小孩)</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard1;
