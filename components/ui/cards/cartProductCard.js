import { useState } from 'react';
import style from './cartProductCard.module.css';
import { Checkbox } from 'antd';
import CloseBtn from '../buttons/closeBtn';
import NumberInput from '../numberInput/numberInput';

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
  const [myQty, setMyQty] = useState(qty);
  const onChecked = (sid) => {
    const newData = shopData.map((v) => {
      return v.cart_sid == sid ? { ...v, selected: !v.selected } : { ...v };
    });
    setShopData(newData);
    newData.some((obj) => obj.selected === false) && setSelectAll(false);
  };

  const handleQty = (qty) => {
    setMyQty(qty);
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
          <div className={style.numberstyle}>
            <NumberInput
              min={1}
              defaultValue={myQty}
              handleNumber={handleQty}
            />
          </div>
          <p className={style.subtotal}>${price * myQty}</p>
        </div>
      </div>

      <CloseBtn closeHandler={delHandler} />
    </div>
  );
}
