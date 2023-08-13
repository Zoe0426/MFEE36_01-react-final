import { useState } from 'react';
import { Radio, ConfigProvider } from 'antd';
import CartCouponInfo from './cartcouponinfo';
import style from './cartCouponList.module.css';
export default function CartCouponList({
  couponData = [],
  setChosenCoupon = () => {},
}) {
  //console.log({ couponData });
  const originalSelectedSid = couponData.filter((v) => v.selected === true)[0]
    .coupon_send_sid;
  //console.log(originalSelectedSid);
  const [selectedCoupon, setSelectedCoupon] = useState(originalSelectedSid);
  const onChange = (e) => {
    //console.log('radio checked', e.target.value);
    setSelectedCoupon(e.target.value);
    setChosenCoupon(e.target.value);
  };
  // console.log(selectedCoupon);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FD8C46',
          fontSize: 18,
        },
      }}
    >
      <Radio.Group
        onChange={onChange}
        value={selectedCoupon}
        className={style.radioGroup}
      >
        {couponData.length > 0 ? (
          couponData.map((v) => {
            return (
              <Radio
                value={v.coupon_send_sid}
                key={v.coupon_send_sid}
                className={style.radio}
              >
                <div
                  style={{
                    paddingLeft: '16px',
                    width: '100%',
                  }}
                >
                  <CartCouponInfo
                    coupon_send_sid={v.coupon_send_sid}
                    exp_date={v.exp_date}
                    name={v.name}
                    price={v.price}
                    selectedCoupon={selectedCoupon}
                    inmodal={true}
                  />
                </div>
              </Radio>
            );
          })
        ) : (
          <p>沒有其它優惠券</p>
        )}
      </Radio.Group>
    </ConfigProvider>
  );
}
