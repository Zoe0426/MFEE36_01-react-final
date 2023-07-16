import { useState } from 'react';
import style from './cartActivityCard.module.css';
import { Checkbox } from 'antd';
import CloseBtn from '../buttons/closeBtn';
import NumberInput from '../numberInput/numberInput';

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
  setSelectAll = () => {},
  delHandler = () => {},
}) {
  const [myAdQty, setMyAdQty] = useState(adQty);
  const [myKidQty, setMyKidQty] = useState(kidQty);

  const onChecked = (sid) => {
    const newData = activityData.map((v) => {
      return v.cart_sid == sid ? { ...v, selected: !v.selected } : { ...v };
    });
    setActivityData(newData);
    newData.some((obj) => obj.selected === false) && setSelectAll(false);
  };
  const handleAdQty = (qty) => {
    setMyAdQty(qty);
  };
  const handleKidQty = (qty) => {
    setMyKidQty(qty);
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
            <div className={style.numberstyle}>
              <NumberInput
                min={1}
                defaultValue={myAdQty}
                handleNumber={handleAdQty}
              />
            </div>
          </div>
          <div className={style.qtyset}>
            <p className={style.price}>小孩${kidPrice}</p>
            <div className={style.numberstyle}>
              <NumberInput
                min={0}
                defaultValue={myKidQty}
                handleNumber={handleKidQty}
              />
            </div>
          </div>
          <p className={style.subtotal}>
            ${adPrice * myAdQty + kidPrice * myKidQty}
          </p>
        </div>
      </div>

      <CloseBtn closeHandler={delHandler} />
    </div>
  );
}
