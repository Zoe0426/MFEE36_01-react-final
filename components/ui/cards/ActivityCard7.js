import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHand,
  faLocationDot,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import styles from './ActivityCard7.module.css';
import IconMainBtn from '@/components/ui/buttons/IconMainBtn';

const ActivityCard7 = ({
  member_sid = '',
  title = '',
  count = 0,
  city = '',
  area = '',
  profile = null,
  content = '',
}) => {
  return (
    <div className={styles.card}>
      <div>
        {profile ? (
          <img
            className={styles.image}
            src={`${process.env.API_SERVER}/img/${profile}`}
            alt={profile}
          />
        ) : (
          <FontAwesomeIcon className={styles.image} icon={faUser} />
        )}
      </div>

      <div className={styles.card_bottom}>
        <div className={styles.title}>{title}</div>

        <div className={styles.count}>{count}人已投</div>

        <div className={styles.location}>
          <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />

          {city}
          {area}
        </div>

        <div className={styles.content}>{content}</div>

        <IconMainBtn icon={faHand} text="投我一票" />
      </div>
    </div>
  );
};

export default ActivityCard7;
