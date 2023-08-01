import React from 'react';
import styles from './shop-like-list-card.module.css';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

export default function ShopLikelistCard({
  datas = [], //需要渲染的陣列資料
  token = '',
  removeLikeListItem = () => {}, //用來清除某一項蒐藏清單的函式
  closeLikeList = () => {}, //典籍前往某一項商品細節頁時，收藏列表需要關閉
}) {
  const router = useRouter();
  return datas.map((v) => {
    const { product_sid, name, img, max_price, min_price } = v;
    return (
      <div className={styles.like_item} key={product_sid}>
        <div>
          <FontAwesomeIcon
            icon={faTrashCan}
            className={styles.trash_icon}
            onClick={() => {
              removeLikeListItem(product_sid, token);
            }}
          />
        </div>
        <div
          role="presentation"
          className={styles.like_img}
          onClick={() => {
           
            closeLikeList();
            router.push(`${process.env.WEB}/product/${product_sid}`);
          }}
        >
          <img src={`${process.env.WEB}/product-img/${img}`} />
        </div>
        <div
          role="presentation"
          className={styles.like_content_box}
          onClick={() => {
           
            closeLikeList();
            router.push(`${process.env.WEB}/product/${product_sid}`);
          }}
        >
          <h5 className={styles.like_title}>{name}</h5>
          <p className={styles.like_detail}>
            {max_price === min_price
              ? `$ ${max_price.toLocaleString('en-US')}`
              : `$ ${min_price.toLocaleString(
                  'en-US'
                )} ~ ${max_price.toLocaleString('en-US')}`}
          </p>
        </div>
      </div>
    );
  });
}
