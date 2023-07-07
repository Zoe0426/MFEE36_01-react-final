import React from 'react'
import styles from './ActivityCard2.module.css'

const ActivityCard2 = () => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <a href="/other-page" className={styles.city}>
          台北市
        </a>
        <div className={styles.btn}>
          <span className={styles.btnText}>更多活動</span>
        </div>
        <div className={styles.btn}>
          <span className={styles.btnText}>更多活動</span>
        </div>
      </div>
    </div>
  )
}

export default ActivityCard2
