import React from 'react';
import { useRouter } from 'next/router';
import styles from './shop-history-card.module.css';

export default function ShopHistoryCard({ data = [] }) {
  const router = useRouter();
  return (
    <div className={styles.history_box}>
      <div className={styles.history_title}>
        <p>瀏覽紀錄</p>
      </div>
      {data.map((v) => {
        const { product_sid, img } = v;
        return (
          <div
            role="presentation"
            className={styles.history_img}
            key={product_sid}
            onClick={() => {
              router.push(`http://localhost:3000/product/${product_sid}`);
            }}
          >
            <img src={`http://localhost:3000/product-img/${img}`} />
          </div>
        );
      })}
      <div className={styles.history_reset}>
        <p>清除全部</p>
      </div>
    </div>
  );
}
