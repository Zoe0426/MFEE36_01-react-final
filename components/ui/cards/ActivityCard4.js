import React, { useState, useEffect } from 'react';
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
import RateStarPill from '../rateStar/RateStarPill';
import ActivityAlertModal from '@/components/ui/cards/ActivityAlertModal';

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
  isInLikeList = false,
  handleLikeClick,
  singinHandler = () => {},
  token = '',
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
    <>
     {token ? (
      <FontAwesomeIcon
        onClick={handleLikeIconClick}
        icon={faHeart}
        className={isLiked ? styles.heart_icon_liked : styles.heart_icon}
      />
      ) : (
        <ActivityAlertModal
          btnType="heart"
          title="貼心提醒"
          content="收藏活動"
          mainBtnText="前往登入"
          subBtnText="暫時不要"
          confirmHandler={singinHandler}
        />
      )}

      <Link href={`${process.env.WEB}/activity/${activity_sid}`}>
        <div className={styles.card}>
          {/* -------右邊------- */}
          <div className={styles.left}>
            <img src={image} alt="Activity" className={styles.image} />
            <div className={styles.overlay}>
              <p className={styles.text}>{type}</p>
            </div>
          </div>

          {/* -------左邊------- */}
          <div className={styles.right}>
            <div className={styles.row}>
              <div className={styles.rowTextTitle}>
                <p className={styles.rowTextLarge}>{title}</p>
              </div>
              <div className={styles.review}>
              {rating && <RateStarPill score={rating} />}
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
              <FontAwesomeIcon
                icon={faLocationDot}
                className={styles.row_icon}
              />
              <div>
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
                  <ActivityFeature
                    className={styles.feature}
                    feature={feature}
                  />
                </div>
              ))}
            </Row>
            <div>
              <p className={styles.price}>
                ${price.toLocaleString()} (大人) ${(price / 2).toLocaleString()}{' '}
                (小孩)
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ActivityCard4;
