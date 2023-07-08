import React from 'react'
import styles from './ActivityCard2.module.css'

const ActivityCard2 = ({
  image='',
  city='',
}) => {
  return (
    <div className={styles.card}>
     
        <img className={styles.image} src={image} alt='' />
     
      <div className={styles.content}>
        <p className={styles.city}>{city}</p>
          
        <div className={styles.btn}>
          <p className={styles.btnText}>更多活動</p>
        </div>
      </div>
    </div>
  )
}

export default ActivityCard2
