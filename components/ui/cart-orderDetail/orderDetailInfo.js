import React from 'react';
import style from './orderDetailInfo.module.css';

export default function OrderDetailInfo({
  name = '',
  phone = '',
  post_type = '',
  create_dt = '',
}) {
  //console.log(post_type);
  return (
    <div className={style.postDetails}>
      <div className={style.postTo}>
        <div className={style.detail}>
          <p className={style.detailtitle}>收件人</p>
          <span className={style.mr8}>:</span>
          <p>{name}</p>
        </div>
        <div className={style.detail}>
          <p className={style.detailtitle}>聯絡電話</p>
          <span className={style.mr8}>:</span>
          <p>{phone}</p>
        </div>
        <div className={style.detail}>
          <p className={style.detailtitle}>成立時間</p>
          <span className={style.mr8}>:</span>
          <p>{create_dt}</p>
        </div>
      </div>
    </div>
  );
}
