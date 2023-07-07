import React from 'react'
import styles from '@/components/ui/cards/homeShopCard.module.css'
export default function HomeShopCard({
  img = '',
  type = '',
  sale = 0,
  name = '',
  price = 0,
}) {
  return (
    <div className={styles.hsCard}>
      <img
        src="/home-images/shopRoof.png"
        alt="shopRoof"
        className={styles.hsroof}
      />
      <img className={styles.hsimg} src={img} alt="" />
      <div className={styles.hslabel}>
        <p className={styles.hstype}>{type}</p>
        <p className={styles.hssale}>熱賣{sale}組</p>
      </div>
      <div className={styles.hscardbody}>
        <p className={styles.hsprodname}>{name}</p>
        <p className={styles.hsprodprice}>${price}</p>
      </div>
    </div>
  )
}
