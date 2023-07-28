import React, { useRef } from 'react';
import styles from './LikeListDrawer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import ShopLikelistCard from '../cards/shop-like-list-card';

export default function LikeListDrawer({
  datas = [], //需要渲染的陣列資料
  customCard = <></>, //各自的蒐藏清單卡片
  closeHandler = () => {}, //用來關閉視窗的函式
  removeAllHandler = () => {}, //用來清除所有蒐藏清單的函式
}) {
  return (
    <>
      <div className={styles.like_list_bgc} onClick={closeHandler}>
        {' '}
      </div>
      <div className={styles.like_list_box}>
        <div className={styles.btns}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={closeHandler}
            className={styles.arrow}
          />
          <p onClick={removeAllHandler} className={styles.clean_all}>
            清除所有
          </p>
        </div>
        <div className={styles.like_items}>
          {datas.length === 0 ? (
            <p className={styles.no_like_item}>目前尚未有任何收藏......</p>
          ) : (
            customCard
          )}
        </div>
      </div>
    </>
  );
}
