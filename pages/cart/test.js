import { useEffect, useState } from 'react';
import { Checkbox } from 'antd';

import CartProductCard from '@/components/ui/cards/cartProductCard';

export default function Test() {
  const [shopData, setShopData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  //從db拿購物車資料
  const getCart = async () => {
    const r = await fetch(`${process.env.API_SERVER}/cart-api/get-cart-items`, {
      method: 'POST',
      body: JSON.stringify({ member_sid: 'mem00471' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await r.json();
    const myShopData = data.shop.map((v) => {
      return { ...v, selected: false };
    });
    console.log(myShopData);
    setShopData(myShopData);
  };

  const checkAllHandler = () => {
    setSelectAll((old) => !old);
    const newData = shopData.map((v) => ({ ...v, selected: !selectAll }));
    console.log('newData:', newData);

    setShopData(newData);
  };
  useEffect(() => {
    getCart();
  }, []);
  return (
    <div>
      <Checkbox onChange={checkAllHandler} checked={selectAll}>
        Checkbox
      </Checkbox>
      {shopData.map((v) => (
        <CartProductCard
          key={v.cart_sid}
          cartSid={v.cart_sid}
          selected={v.selected}
          img={'/product-img/' + v.img}
          prodtitle={v.rel_name}
          prodSubtitle={v.rel_seq_name}
          price={v.prod_price}
          qty={v.prod_qty}
          shopData={shopData}
          setShopData={setShopData}
        />
      ))}
    </div>
  );
}
