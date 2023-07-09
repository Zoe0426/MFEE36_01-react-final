import React from 'react'
import styles from './ActivityFeatureDetail.module.css'

const ActivityFeatureDetail = ({feature=''}) => {
  return (
    < >
      <p className={styles.feature}>{feature}</p>
    </>
  )
}

export default ActivityFeatureDetail
