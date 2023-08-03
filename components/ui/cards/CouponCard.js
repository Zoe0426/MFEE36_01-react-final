import React from 'react';
import Style from './CouponCard.module.css';

export default function CouponCard({ title, text, expire }) {
  return (
    <>
      <div className={Style.coupon}>
        <div className={Style.couponInfo}>
          <div className={Style.couponTitle}>{title}</div>
          <div className={Style.couponText}>折抵${text}</div>
          <div className={Style.couponExpire}>有效期限: {expire}</div>
        </div>
        <div className={Style.couponImg}>
          <img src="/layout-images/h-logo.svg" alt="" />
        </div>
      </div>
    </>
  );
}
