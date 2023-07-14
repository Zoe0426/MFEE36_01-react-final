import React from 'react';
import style from './cartProductCard.module.css';
import { Checkbox, ConfigProvider, InputNumber } from 'antd';
import CloseBtn from '../buttons/closeBtn';
export default function CartProductCard({
  img = '',
  prodtitle = '',
  prodSubtitle = '',
  price = 0,
  qty = 0,
  selected,
  shopData = [],
  setShopData = () => {},
  delHandler = () => {},
}) {
  const onChange = (value) => {
    console.log('changed', value);
  };

  console.log(selected);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FD8C46',
          fontSize: 20,
          controlInteractiveSize: 20,
        },
      }}
    >
      <div className={style.productCard}>
        <Checkbox
          // onChange={() => {
          //   const newData = shopData.map((v)=>{
          //     && {}
          //   })
          // }}
          className={style.checkbox}
          checked={selected}
        ></Checkbox>
        <img src={img} alt="productimg" className={style.prodimg} />
        <div className={style.forRwd}>
          <div className={style.prodname}>
            <p className={style.prodtitle}>{prodtitle}</p>
            <p className={style.prodSubtitle}>{prodSubtitle}</p>
          </div>
          <p className={style.price}>${price}</p>

          <InputNumber
            size="small"
            min={1}
            defaultValue={qty}
            onChange={onChange}
            className={style.numberstyle}
          />
        </div>

        <p className={style.subtotal}>{price * qty}</p>
        <CloseBtn closeHandler={delHandler} />
      </div>
    </ConfigProvider>
  );
}
