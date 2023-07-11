import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHand,faLocationDot } from '@fortawesome/free-solid-svg-icons';
import styles from './ActivityCard3.module.css';
import IconMainBtn from '@/components/ui/buttons/IconMainBtn';

const ActivityCard3 = ({
image='',
title='',
count=0,
city='',
area='',
}) => {
  return (
    <div className={styles.card}>
      
      <img className={styles.image} src={image}></img>
      
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.count}>{count}人已投</div>
        <div className={styles.location}>
          <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
          <div className={styles.location_text}>{city}{area}</div>
        </div>
        <IconMainBtn icon={faHand} text = '投我一票'/>
      </div>
    </div>
  )
}

export default ActivityCard3
