import React from 'react';
import Style from './CouponCard.module.css';

export default function CouponCard({ title, text, expire, isused, isexpire }) {
  let bgc;
  switch (text) {
    case 10:
      bgc = '#E6E3F0'; //紫
      break;

    case 50:
      bgc = '#DDEAF5'; //藍
      break;

    case 100:
      bgc = '#E1ECE5'; //綠
      break;

    case 150:
      bgc = '#FFEFE8'; //黃
      break;

    case 200:
      bgc = '#FDEDD3'; //咖啡
      break;

    case 250:
      bgc = '#FCD8DA'; //粉紅
      break;
  }

  return (
    <>
      <div
        className={
          isused
            ? `${Style.couponDisale}`
            : isexpire
            ? `${Style.couponDisale}`
            : `${Style.coupon}`
        }
      >
        <div className={Style.couponInfo}>
          <div className={Style.couponTitle}>{title}</div>
          <div className={Style.couponText} style={{ background: `${bgc}` }}>
            折抵${text}
          </div>
          <div className={Style.couponExpire}>
            有效期限: <div className={Style.expireTime}>{expire}</div>
          </div>
        </div>
        <div className={Style.couponImg}>
          <img src="/layout-images/h-logo.svg" alt="" />
        </div>
      </div>
    </>
  );
}
