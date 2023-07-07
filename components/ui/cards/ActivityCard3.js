import React from 'react'
import styles from './ActivityCard3.module.css'

const ActivityCard3 = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image}></div>
      <div className={styles.content}>
        <div className={styles.title}>2022台北與毛家庭有約</div>
        <div className={styles.count}>10人已投</div>
        <div className={styles.location}>
          <div className={styles.icon}>[icon]</div>
          <div>新北市大安區</div>
        </div>
        <button className={styles.btn}>Button</button>
      </div>
    </div>
  )
}

export default ActivityCard3
