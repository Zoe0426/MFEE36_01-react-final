import React from 'react'
import styles from './NavRoundBtn.module.css'
import Link from 'next/link'

export default function RoundBtn({ icon = '' }) {
  return (
    <div className={styles.roundBtn}>
      <Link href="/shop">
        <img src={icon} className={styles.rb - icon} alt="" />
      </Link>
    </div>
  )
}
