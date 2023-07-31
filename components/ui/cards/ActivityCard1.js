import React , { useState, useEffect }from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faCalendarDays,
  faClock,
  faLocationDot,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import styles from './ActivityCard1.module.css';
import ActivityFeature from './ActivityFeature';
import { Row } from 'antd';
import Link from 'next/link';

const ActivityCard1 = ({
  activity_sid = '', //link要用
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
  features = [],
  price = 0,
  isInLikeList = false,
  handleLikeClick,
}) => {

  const [isLiked, setIsLiked] = useState(isInLikeList);

  useEffect(() => {
    setIsLiked(isInLikeList);
  }, [isInLikeList]);


  const handleLikeIconClick = (e) => {
    e.preventDefault();
    if (isLiked) {
      removeItemFromLikeList();
    } else {
      addItemToLikeList();
    }
  };

  const addItemToLikeList = () => {
    setIsLiked(true);
    handleLikeClick(activity_sid, true); 
  };

  const removeItemFromLikeList = () => {
    setIsLiked(false);
    handleLikeClick(activity_sid, false); 
  };

  return (
    <Link href={`http://localhost:3000/activity/${activity_sid}`}>
      <div className={styles.card}>
        {/* -------左邊------- */}
        <div className={styles.left}>
          <img src={image} alt="activity" className={styles.image} />
          <div className={styles.overlay}>
            <span className={styles.text}>{type}</span>
          </div>
          <div className={styles.icon}></div>
        </div>

        <FontAwesomeIcon
              onClick={handleLikeIconClick}
              icon={faHeart}
              className={isLiked ? styles.heart_icon_liked : styles.heart_icon}
            />

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
            <FontAwesomeIcon
              icon={faCalendarDays}
              className={styles.row_icon}
            />
            <div>
              <p>
                {date_begin}~{date_end}
              </p>
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
              <p>
                {city}
                {area}
                {address}
              </p>
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
            <p className={styles.row_price}>
              ${price} (大人) ${price / 2} (小孩)
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard1;
