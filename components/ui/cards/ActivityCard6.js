import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHand,
  faLocationDot,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import styles from './ActivityCard6.module.css';
import IconMainBtn from '@/components/ui/buttons/IconMainBtn';

const ActivityCard6 = ({
  member_sid = '',
  title = '',
  count = 0,
  city = '',
  area = '',
  profile = null,
  content= '',
  other_message= null,
  handleVote,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.right_section}>
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
        <IconMainBtn 
        icon={faHand} 
        text="投我一票" 
        clickHandler={handleVote}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.count}>{count}人已投</div>
        <div className={styles.location}>
          <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
          <div className={styles.location_text}>
            {city}
            {area}
          </div>
        </div>
        <div className={styles.description}>{content}</div>
      </div>
    </div>
  );
};

export default ActivityCard6;
