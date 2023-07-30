import React from 'react';
import styles from '@/components/ui/home/homeShopCard.module.css';
export default function HomeShopCard({
  img = '',
  type = '',
  sale = 0,
  name = '',
  min_price = 0,
  max_price = 0,
  clickHandler = () => {},
}) {
  let showPrice = '';
  const sales_qty = sale.toLocaleString();
  min_price = min_price.toLocaleString();
  max_price = max_price.toLocaleString();
  if (min_price === max_price) {
    showPrice = `$${min_price}`;
  } else {
    showPrice = `$${min_price}~$${max_price}`;
  }

  return (
    <div className={styles.hsCard} onClick={clickHandler}>
      <img
        src="/home-images/shopRoof.png"
        alt="shopRoof"
        className={styles.hsroof}
      />
      <img className={styles.hsimg} src={img} alt="" />
      <div className={styles.hslabel}>
        <p className={styles.hstype}>{type}</p>
        <p className={styles.hssale}>熱賣{sales_qty}組</p>
      </div>
      <div className={styles.hscardbody}>
        <div className={styles.namebox}>
          <p className={styles.hsprodname}>{name}</p>
        </div>
        <p className={styles.hsprodprice}>{showPrice}</p>
      </div>
    </div>
  );
}
