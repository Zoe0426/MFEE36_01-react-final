import React from 'react'
import styles from './ActivityCard3.module.css'

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
          <div className={styles.icon}>[icon]</div>
          <div>{city}{area}</div>
        </div>
        <button className={styles.btn}>投我一票</button>
      </div>
    </div>
  )
}

export default ActivityCard3
