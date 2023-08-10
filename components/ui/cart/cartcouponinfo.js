import React from 'react';
import style from './cartcouponinfo.module.css';

export default function CartCouponInfo({
  coupon_send_sid,
  exp_date = '',
  name = '',
  price = 0,
  selectedCoupon,
  inmodal = false,
}) {
  return (
    <div
      className={
        inmodal && coupon_send_sid === selectedCoupon
          ? `${style.info2}`
          : `${style.info}`
      }
    >
      <div className={style.details}>
        <div className={style.namebox}>
          <p className={style.name}>{name}</p>
          <p className={style.price}>折抵${price}</p>
        </div>
        <p className={style.expDate}>有效期限：{exp_date}</p>
      </div>
      <img src="/home-images/h-logo.png" alt="" className={style.img} />
    </div>
  );
}
