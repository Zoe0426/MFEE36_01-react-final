import { useState, useContext } from 'react';
import style from './cartRepayActivity.module.css';
import { Checkbox } from 'antd';
import CloseBtn from '../buttons/closeBtn';
import NumberInput from '../numberInput/numberInput';
import AuthContext from '@/context/AuthContext';

export default function CartRepayActivity({
  img = '',
  prodtitle = '',
  prodSubtitle = '',
  adPrice = 0,
  adQty = 0,
  kidPrice = 0,
  kidQty = 0,
}) {
  return (
    <div className={style.productCard}>
      <img
        src={`/activity_img/${img}`}
        alt="activity-Img"
        className={style.prodimg}
      />

      <div className={style.forRwd}>
        <div className={style.prodname}>
          <p className={style.prodtitle}>{prodtitle}</p>
          <p className={style.prodSubtitle}>{prodSubtitle}</p>
        </div>
        <div className={style.priceSet}>
          <div className={style.qtyset}>
            <p className={style.price}>大人${adPrice}</p>
            <div className={style.numberstyle}>{adQty}</div>
          </div>
          <div className={style.qtyset}>
            <p className={style.price}>小孩${kidPrice}</p>
            <div className={style.numberstyle}>{kidQty}</div>
          </div>
          <p className={style.subtotal}>
            ${adPrice * adQty + kidPrice * kidQty}
          </p>
        </div>
      </div>
    </div>
  );
}
