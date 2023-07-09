import React from 'react';
import styles from './like-list.module.css';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SecondaryBtn from '../buttons/SecondaryBtn';
import MainBtn from '../buttons/MainBtn';

import { useRouter } from 'next/router';

export default function Likelist({
  datas = [], //需要渲染的陣列資料
  imgPosition = '', //告知照片的路徑，例如是存放在public中product-img資料夾，則請傳/product-img
  closeHandler = () => {}, //用來關閉視窗的函式
  removeAllHandler = () => {}, //用來清除所有蒐藏清單的函式
}) {
  const router = useRouter();
  return (
    <div className={styles.like_list_box}>
      <div className={styles.like_items}>
        {datas.length === 0 ? (
          <p className={styles.no_like_item}>目前尚未有任何收藏......</p>
        ) : (
          datas.map((v) => {
            const { product_sid, name, img, max_price, min_price } = v;
            return (
              <div className={styles.like_item} key={product_sid}>
                <div>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    className={styles.trash_icon}
                  />
                </div>
                <div
                  role="presentation"
                  className={styles.like_img}
                  onClick={() => {
                    router.push(`http://localhost:3000/product/${product_sid}`);
                  }}
                >
                  <img src={`http://localhost:3000/${imgPosition}/${img}`} />
                </div>
                <div
                  role="presentation"
                  className={styles.like_content_box}
                  onClick={() => {
                    router.push(`http://localhost:3000/product/${product_sid}`);
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
          })
        )}
      </div>
      <div className={styles.btns}>
        {<SecondaryBtn text="清除所有" clickHandler={removeAllHandler} />}
        {<MainBtn text="關閉視窗" clickHandler={closeHandler} />}
      </div>
    </div>
  );
}
