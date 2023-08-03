import { useState, useEffect } from 'react';
import style from './cartTotalSection.module.css';
import Image from 'next/image';
import rundog from '@/assets/running-dog.svg';
import MainBtn from '@/components/ui/buttons/MainBtn';
import CartSectionTitle from './cartSectionTitle';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, ConfigProvider } from 'antd';

export default function CartTotalSection({
  checkoutType = '',
  shopData = [],
  activityData = [],
  postType = [],
  couponData = [],
  paymentType = 1,
  createOrder = () => {},
  setPaymentType = () => {},
}) {
  const postAmount = postType === 'blackcat' ? 90 : 60;

  const shopSubtotal = shopData.reduce((a, v) => {
    if (v.selected) {
      const subtotal = v.prod_price * v.prod_qty;
      return a + subtotal;
    }
    return a;
  }, 0);

  const activitySubtotal = activityData.reduce((a, v) => {
    if (v.selected) {
      const subtotal =
        v.adult_price * v.adult_qty + v.child_price * v.child_qty;
      return a + subtotal;
    }
    return a;
  }, 0);

  const couponPrice =
    couponData.length > 0 &&
    couponData.filter((v) => v.selected === true)[0].price;
  const shopTotal =
    shopSubtotal > 0 ? shopSubtotal + postAmount - couponPrice : 0;
  const activityTotal =
    activitySubtotal > 0 ? activitySubtotal - couponPrice : 0;
  const selectPaymentType = (e) => {
    setPaymentType(parseInt(e.key));
  };
  const items = [
    {
      label: '信用卡',
      key: 1,
    },
    {
      label: 'Line pay',
      key: 2,
    },
  ];
  const menuProps = {
    items,
    onClick: selectPaymentType,
  };
  return (
    <div className={style.totalCard}>
      <CartSectionTitle text="訂單詳情" />
      <div></div>
      <div className={style.subtotals}>
        <span>小計</span>
        <span className={style.amount}>
          {checkoutType === 'shop' ? shopSubtotal : activitySubtotal}
        </span>
      </div>

      {checkoutType === 'shop' ? (
        <div className={style.subtotals}>
          <span>運費</span>
          <span className={style.amount}>
            ${shopSubtotal === 0 ? 0 : postAmount}
          </span>
        </div>
      ) : (
        ''
      )}

      <div className={style.subtotals}>
        <span>優惠券</span>
        <span className={style.amount}>
          -$
          {(checkoutType === 'shop' && shopSubtotal === 0) ||
          (checkoutType !== 'shop' && activitySubtotal === 0)
            ? 0
            : couponPrice}
        </span>
      </div>
      <div className={style.total}>
        <span>總計</span>
        <span className={style.totalamount}>
          ${checkoutType === 'shop' ? shopTotal : activityTotal}
        </span>
      </div>
      <div className={style.subtotals}>
        <span>結帳品項總計</span>
        <span className={style.amount}>X項</span>
      </div>
      <div className={style.subtotals}>
        <span>付款方式</span>
        <span className={style.amount}>
          {paymentType === 1 ? '信用卡' : 'LinePay'}
        </span>
      </div>
      <div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#FD8C46',
              controlInteractiveSize: 20,
            },
          }}
        >
          <Dropdown menu={menuProps}>
            <Button style={{ width: '100%' }}>
              選擇付款方式
              <DownOutlined />
            </Button>
          </Dropdown>
        </ConfigProvider>
      </div>

      <MainBtn text="結帳" clickHandler={createOrder}></MainBtn>
      <Image src={rundog} className={style.runningdog} alt="runningdog"></Image>
    </div>
  );
}
