import React, { useRef } from 'react';
import styles from './like-list.module.css';
import SecondaryBtn from '../buttons/SecondaryBtn';
import MainBtn from '../buttons/MainBtn';
// import ShopLikelistCard from '../cards/shop-like-list-card';

export default function Likelist({
  datas = [], //需要渲染的陣列資料
  customCard = <></>, //各自的蒐藏清單卡片
  closeHandler = () => {}, //用來關閉視窗的函式
  removeAllHandler = () => {}, //用來清除所有蒐藏清單的函式
}) {
  return (
    <>
      <div className={styles.like_list_bgc}> </div>
      <div className={styles.like_list_box}>
        <div className={styles.like_items}>
          {datas.length === 0 ? (
            <p className={styles.no_like_item}>目前尚未有任何收藏......</p>
          ) : (
            customCard
          )}
        </div>
        <div className={styles.btns}>
          {<SecondaryBtn text="清除所有" clickHandler={removeAllHandler} />}
          {<MainBtn text="關閉視窗" clickHandler={closeHandler} />}
        </div>
      </div>
    </>
  );
}
