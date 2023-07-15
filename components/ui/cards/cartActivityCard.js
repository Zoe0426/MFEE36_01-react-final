import React from 'react';
import style from './cartActivityCard.module.css';
import { Checkbox, InputNumber } from 'antd';
import CloseBtn from '../buttons/closeBtn';

export default function CartActivityCard({
  cartSid = '',
  img = '',
  prodtitle = '',
  prodSubtitle = '',
  adPrice = 0,
  adQty = 0,
  kidPrice = 0,
  kidQty = 0,
  selected = false,
  activityData = [],
  setActivityData = () => {},
  delHandler = () => {},
  setSelectAll = () => {},
}) {
  const onChecked = (sid) => {
    const newData = activityData.map((v) => {
      return v.cart_sid == sid ? { ...v, selected: !v.selected } : { ...v };
    });
    setActivityData(newData);
    newData.some((obj) => obj.selected === false) && setSelectAll(false);
  };
  const onChange = (value) => {
    console.log('changed', value);
  };
  return (
    <div className={style.productCard}>
      <Checkbox
        onChange={() => {
          onChecked(cartSid);
        }}
        className={style.checkbox}
        checked={selected}
      ></Checkbox>
      <img src={img} alt="activity-Img" className={style.prodimg} />

      <div className={style.forRwd}>
        <div className={style.prodname}>
          <p className={style.prodtitle}>{prodtitle}</p>
          <p className={style.prodSubtitle}>{prodSubtitle}</p>
        </div>
        <div className={style.priceSet}>
          <div className={style.qtyset}>
            <p className={style.price}>大人${adPrice}</p>
            <InputNumber
              size="small"
              min={1}
              defaultValue={adQty}
              onChange={onChange}
              className={style.numberstyle}
            />
          </div>
          <div className={style.qtyset}>
            <p className={style.price}>小孩${kidPrice}</p>
            <InputNumber
              size="small"
              min={1}
              defaultValue={kidQty}
              onChange={onChange}
              className={style.numberstyle}
            />
          </div>
          <p className={style.subtotal}>
            ${adPrice * adQty + kidPrice * kidQty}
          </p>
        </div>
      </div>

      <CloseBtn closeHandler={delHandler} />
    </div>
  );
}
