import { useState, useContext } from 'react';
import style from './cartProductCard.module.css';
import { Checkbox } from 'antd';
import CloseBtn from '../buttons/closeBtn';
import NumberInput from '../numberInput/numberInput';
import AuthContext from '@/context/AuthContext';
import ModalWithoutLine from '../modal/modal-without-line';
export default function CartProductCard({
  cartSid = '',
  relSid = '',
  relSeqSid = '',
  img = '',
  prodtitle = '',
  prodSubtitle = '',
  price = 0,
  qty = 0,
  selected = false,
  shopData = [],
  setShopData = () => {},
  setSelectAll = () => {},
}) {
  const { updateCart } = useContext(AuthContext);
  const [myQty, setMyQty] = useState(qty);
  const onChecked = (sid) => {
    const newData = shopData.map((v) => {
      return v.cart_sid == sid ? { ...v, selected: !v.selected } : { ...v };
    });
    setShopData(newData);
    //console.log(newData);
    newData.some((obj) => obj.selected === false) && setSelectAll(false);
  };

  const handleQty = (qty) => {
    setMyQty(qty);

    setShopData((old) =>
      old.map((v) =>
        v.cart_sid === cartSid ? { ...v, prod_qty: qty } : { ...v }
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
      setShopData((old) => old.filter((v) => v.cart_sid !== sid));
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
      <div>
        <img src={img} alt="productimg" className={style.prodimg} />
        <p className={style.mobileprice}>${price.toLocaleString()}</p>
      </div>

      <div className={style.forRwd}>
        <div className={style.prodname}>
          <p className={style.prodtitle}>{prodtitle}</p>
          <p className={style.prodSubtitle}>{prodSubtitle}</p>
        </div>
        <div className={style.priceQty}>
          <p className={style.price}>${price.toLocaleString()}</p>
          <div className={style.qtyNsubTotal}>
            <div className={style.numberstyle}>
              <NumberInput
                min={1}
                defaultValue={myQty}
                handleNumber={handleQty}
              />
            </div>
            <p className={style.subtotal}>
              ${(price * myQty).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      {/* <ModalWithoutLine
        btnType="closeBtn"
        subBtnText="不要移除"
        mainBtnText="確定移除"
        content="您從購物車移除此商品嗎？"
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
