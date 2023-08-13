import React from 'react';
import style from './orderDetailpostinfo.module.css';

export default function OrderDetailPostInfo({
  recipient = '',
  recipient_phone = '',
  post_type = '',
  post_address = '',
  post_store_name = '',
  create_dt = '',
}) {
  //console.log(post_type);
  return (
    <div className={style.postDetails}>
      <div className={style.postTo}>
        <div className={style.detail}>
          <p className={style.detailtitle}>收件人</p>
          <span className={style.mr8}>:</span>
          <p>{recipient}</p>
        </div>
        <div className={style.detail}>
          <p className={style.detailtitle}>聯絡電話</p>
          <span className={style.mr8}>:</span>
          <p>{recipient_phone}</p>
        </div>
        <div className={style.detail}>
          <p className={style.detailtitle}>成立時間</p>{' '}
          <span className={style.mr8}>:</span>
          <p>{create_dt}</p>
        </div>
      </div>
      <div className={style.postAdd}>
        <div className={style.detail}>
          <p className={style.detailtitle}>運送方式</p>{' '}
          <span className={style.mr8}>:</span>
          <p>
            {post_type === 1
              ? '黑貓宅急便'
              : post_type === 2
              ? '7-ELEVEN'
              : '全家便利商店'}
          </p>
        </div>
        <div className={style.detail}>
          <p className={style.detailtitle}>運送地址</p>
          <span className={style.mr8}>:</span>
          <p>
            {post_address}
            {post_type !== '黑貓宅急便' ? post_store_name : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
