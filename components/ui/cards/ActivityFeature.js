import React from 'react'
import styles from './ActivityFeature.module.css'

const ActivityFeature = ({feature=''}) => {
  return (
    < >
      <p className={styles.feature}>{feature}</p>
    </>
  )
}

export default ActivityFeature
