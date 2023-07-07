import React from 'react'
import styles from './NavDetailPage.module.css'

const NavDetailPage = ({
  text1 = '',
  text2 = '',
  text3 = '',
  text4 = '',
  text5 = '',
  text6 = '',
}) => {
  return (
    <div className={styles.underline_nav}>
      <p className={styles.nav_item}>{text1}</p>
      <p className={styles.nav_item}>{text2}</p>
      <p className={styles.nav_item}>{text3}</p>
      <p className={styles.nav_item}>{text4}</p>
      <p className={styles.nav_item}>{text5}</p>
      <p className={styles.nav_item}>{text6}</p>
    </div>
  )
}

export default NavDetailPage
