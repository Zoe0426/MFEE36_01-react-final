import React from 'react';
import style from './orderDetailShop.module.css';
export default function OrderDetailShop({
  img = '',
  prodtitle = '',
  prodSubtitle = '',
  price = '',
  qty = '',
}) {
  return (
    <div className={style.productCard}>
      <img src={img} alt="productimg" className={style.prodimg} />
      <div className={style.forRwd}>
        <div className={style.prodname}>
          <p className={style.prodtitle}>{prodtitle}</p>
          <p className={style.prodSubtitle}>{prodSubtitle}</p>
        </div>
        <div className={style.prodDetail}>
          <p className={style.price}>${price.toLocaleString()}</p>
          <p className={style.times}>*</p>
          <p className={style.qty}>{qty}</p>
          <p className={style.subtotal}>${(price * qty).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
