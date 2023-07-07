import React from 'react'
import styles from './ActivityFeatureDetailPage.module.css'

const ActivityFeatureDetailPage = ({
  text1 = '',
  text2 = '',
  text3 = '',
  text4 = '',
  text5 = '',
}) => {
  return (
    <div className={styles.underline_nav}>
      <button className={styles.nav_item}>{text1}</button>
    </div>
  )
}

export default ActivityFeatureDetailPage
