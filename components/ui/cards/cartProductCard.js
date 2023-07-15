import React from 'react';
import style from './cartProductCard.module.css';
import { Checkbox, InputNumber } from 'antd';
import CloseBtn from '../buttons/closeBtn';
export default function CartProductCard({
  cartSid = '',
  img = '',
  prodtitle = '',
  prodSubtitle = '',
  price = 0,
  qty = 0,
  selected = false,
  shopData = [],
  setShopData = () => {},
  delHandler = () => {},
  setSelectAll = () => {},
}) {
  const onChecked = (sid) => {
    const newData = shopData.map((v) => {
      return v.cart_sid == sid ? { ...v, selected: !v.selected } : { ...v };
    });
    setShopData(newData);
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
      <img src={img} alt="productimg" className={style.prodimg} />
      <div className={style.forRwd}>
        <div className={style.prodname}>
          <p className={style.prodtitle}>{prodtitle}</p>
          <p className={style.prodSubtitle}>{prodSubtitle}</p>
        </div>
        <div className={style.priceQty}>
          <p className={style.price}>${price}</p>

          <InputNumber
            size="small"
            min={1}
            defaultValue={qty}
            onChange={onChange}
            className={style.numberstyle}
          />
          <p className={style.subtotal}>${price * qty}</p>
        </div>
      </div>

      <CloseBtn closeHandler={delHandler} />
    </div>
  );
}
