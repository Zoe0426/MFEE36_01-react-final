import React from 'react';
import style from './cartActivityCard.module.css';
import { Checkbox, ConfigProvider, InputNumber } from 'antd';
import CloseBtn from '../buttons/closeBtn';

export default function CartActivityCard({
  img = '',
  prodtitle = '',
  prodSubtitle = '',
  adPrice = 0,
  adQty = 0,
  kidPrice = 0,
  kidQty = 0,
  delHandler = () => {},
  checkHandler = () => {},
}) {
  const onChange = (value) => {
    console.log('changed', value);
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FD8C46',
        },
      }}
    >
      <div className={style.productCard}>
        <Checkbox onChange={checkHandler} className={style.checkbox}></Checkbox>
        <img src={img} alt="productimg" className={style.prodimg} />

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
          </div>
        </div>

        <p className={style.subtotal}>{adPrice * adQty + kidPrice * kidQty}</p>
        <CloseBtn closeHandler={delHandler} />
      </div>
    </ConfigProvider>
  );
}
