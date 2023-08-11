import React from 'react';
import style from './orderDetailActivity.module.css';
export default function OrderDetailActivity({
  img = '',
  prodtitle = '',
  prodSubtitle = '',
  adPrice = 0,
  adQty = 0,
  kidPrice = 0,
  kidQty = 0,
  policy = '',
}) {
  return (
    <>
      <div className={style.productCard}>
        <img src={img} alt="activityImg" className={style.prodimg} />

        <div className={style.forRwd}>
          <div className={style.prodname}>
            <p className={style.prodtitle}>{prodtitle}</p>
            <p className={style.prodSubtitle}>{prodSubtitle}</p>
          </div>

          <div className={style.prodDetail}>
            <div className={style.prodQty}>
              <div className={style.detailblock}>
                <p className={style.label}>大人</p>
                <div className={style.qtyblock}>
                  <p className={style.price}>${adPrice.toLocaleString()}</p>
                  <p className={style.times}>*</p>
                  <p className={style.qty}>{adQty}</p>
                </div>
              </div>

              <div className={style.detailblock}>
                <p className={style.label}>小孩</p>
                <div className={style.qtyblock}>
                  <p className={style.price}>${kidPrice.toLocaleString()}</p>
                  <p className={style.times}>*</p>
                  <p className={style.qty}>{kidQty}</p>
                </div>
              </div>
            </div>
            <p className={style.subtotal}>
              ${(adPrice * adQty + kidPrice * kidQty).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
