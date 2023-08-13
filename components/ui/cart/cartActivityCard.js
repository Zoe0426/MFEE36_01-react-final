import { useState, useContext } from 'react';
import style from './cartActivityCard.module.css';
import { Checkbox } from 'antd';
import CloseBtn from '../buttons/closeBtn';
import NumberInput from '../numberInput/numberInput';
import AuthContext from '@/context/AuthContext';

export default function CartActivityCard({
  cartSid = '',
  relSid = '',
  relSeqSid = '',
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
}) {
  const { updateCart } = useContext(AuthContext);
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
    setActivityData((old) =>
      old.map((v) =>
        v.cart_sid === cartSid ? { ...v, adult_qty: qty } : { ...v }
      )
    );
  };
  const handleKidQty = (qty) => {
    setMyKidQty(qty);
    setActivityData((old) =>
      old.map((v) =>
        v.cart_sid === cartSid ? { ...v, child_qty: qty } : { ...v }
      )
    );
  };

  const removeItemFromDb = async (sid) => {
    //console.log('remove cart_sid:', sid);
    const r = await fetch(
      `${process.env.API_SERVER}/cart-api/remove-cart-item`,
      {
        method: 'POST',
        body: JSON.stringify({ cart_sid: sid }),
        headers: { 'Content-type': 'application/json' },
      }
    );
    const result = await r.json();
    //console.log('remove-result:', result);
    if (result === 'success') {
      setActivityData((old) => old.filter((v) => v.cart_sid !== sid));
      updateCart(relSid, relSeqSid, 'remove');
    } else {
      alert('remove from DB failed');
    }
  };
  return (
    <div
      className={selected ? `${style.productCard2}` : `${style.productCard}`}
    >
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
            <p className={style.price}>大人${adPrice.toLocaleString()}</p>
            <div className={style.numberstyle}>
              <NumberInput
                min={1}
                defaultValue={myAdQty}
                handleNumber={handleAdQty}
              />
            </div>
          </div>
          <div className={style.qtyset}>
            <p className={style.price}>小孩${kidPrice.toLocaleString()}</p>
            <div className={style.numberstyle}>
              <NumberInput
                min={0}
                defaultValue={myKidQty}
                handleNumber={handleKidQty}
              />
            </div>
          </div>
          <p className={style.subtotal}>
            ${(adPrice * myAdQty + kidPrice * myKidQty).toLocaleString()}
          </p>
        </div>
      </div>
      {/* <ModalWithoutLine
        btnType="closeBtn"
        subBtnText="不要移除"
        mainBtnText="確定移除"
        content="您從購物車移除此活動嗎？"
        confirmHandler={() => {
          removeItemFromDb(cartSid);
        }}
      /> */}
      <CloseBtn
        closeHandler={() => {
          removeItemFromDb(cartSid);
        }}
      />
    </div>
  );
}
