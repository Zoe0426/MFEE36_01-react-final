import React from 'react';
import style from './cartDetailTotalSection.module.css';

export default function CartDetailTotalSection({
  checkoutType = '',
  coupon_amount = 0,
  post_amount = 0,
  subtotal_amount = 0,
}) {
  return (
    <div className={style.totalSection}>
      <div className={style.subtotals}>
        <span>小計</span>
        <span className={style.amount}>
          ${subtotal_amount.toLocaleString()}
        </span>
      </div>
      {checkoutType === 'shop' ? (
        <div className={style.subtotals}>
          <span>運費</span>
          <span className={style.amount}>${post_amount.toLocaleString()}</span>
        </div>
      ) : (
        ''
      )}
      <div className={style.subtotals}>
        <span>優惠券</span>
        <span className={style.amount}>-${coupon_amount.toLocaleString()}</span>
      </div>
      <div className={style.total}>
        <span>總計</span>
        <span className={style.totalamount}>
          ${(subtotal_amount + post_amount - coupon_amount).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
