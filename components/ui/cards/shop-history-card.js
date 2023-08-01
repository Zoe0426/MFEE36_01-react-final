import React from 'react';
import { useRouter } from 'next/router';
import styles from './shop-history-card.module.css';

export default function ShopHistoryCard({
  data = [],
  clearAllHandler = () => {},
}) {
  const router = useRouter();
  return (
    <div className={styles.history_box}>
      <div className={styles.history_title}>
        <p>瀏覽紀錄</p>
      </div>
      {data.map((v, i) => {
        const { product_sid, img } = v;
        return (
          <div
            role="presentation"
            className={styles.history_img}
            key={i}
            onClick={() => {
              router.push(`${process.env.WEB}/product/${product_sid}`);
            }}
          >
            {img && (
              <img
                src={`${process.env.WEB}/product-img/${img}`}
                alt={product_sid}
              />
            )}
          </div>
        );
      })}
      <div className={styles.history_reset} onClick={clearAllHandler}>
        <span>清除全部</span>
      </div>
    </div>
  );
}
