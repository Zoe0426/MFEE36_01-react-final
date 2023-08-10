import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHand,
  faLocationDot,
  faUser,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import styles from './ActivityCard6.module.css';
import ActivityIconMainBtn from '@/components/ui/buttons/ActivityIconMainBtn';

const ActivityCard6 = ({
  activity_wish_sid = '',
  title = '',
  city = '',
  area = '',
  profile = null,
  content = '',
  count = 0,
  onVoteClick,
  hasVoted,
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
        <ActivityIconMainBtn
          icon={hasVoted ?  faCheck : faHand}
          text={hasVoted ? '已投票' : '投我一票'}
          clickHandler={() => onVoteClick(activity_wish_sid)}
          hasVoted={hasVoted}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.count}>
          {' '}
          {hasVoted ? `${count + 1}人已投` : `${count}人已投`}
        </div>
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
