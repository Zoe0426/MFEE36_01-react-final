import React from 'react'
import styles from './NavRoundBtn.module.css'

export default function RoundBtn({ icon = '' }) {
  return (
    <div className={styles.roundBtn}>
      <img src={icon} className={styles.rb - icon} alt="" />
    </div>
  )
}
