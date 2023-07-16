import { useEffect, useState } from 'react';
import { Row, Col, Radio, ConfigProvider, Checkbox } from 'antd';
import style from '@/styles/cart.module.css';
import CartProductCard from '@/components/ui/cards/cartProductCard';
import CartActivityCard from '@/components/ui/cards/cartActivityCard';
import MainBtn from '@/components/ui/buttons/MainBtn';
import CartSectionTitle from '@/components/ui/cart/cartSectionTitle';
import BgCartHead from '@/components/ui/decoration/bg-cartHead';
import rundog from '@/assets/running-dog.svg';
import Image from 'next/image';
import CartTab from '@/components/ui/cart/cartTab';
import CartBlackcatPostInfo from '@/components/ui/cart/cartblackcatpostinfo';
import CartCouponInfo from '@/components/ui/cart/cartcouponinfo';
import Modal from '@/components/ui/modal/modal';
import CartCouponList from '@/components/ui/cart/cartCouponList';

export default function Cart() {
  const [cartData, setCartData] = useState({
    shop: [],
    activity: [],
    defaultAddress: [],
    blackCat: [],
    sevenEleven: [],
    family: [],
    coupon: [],
  });
  const [checkoutType, setCheckoutType] = useState('shop');
  const [postType, setPostType] = useState(1);
  const [paymentType, setPaymentType] = useState(1);
  const [shopData, setShopData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [couponData, setCouponData] = useState([]);
  const [blackcatData, setBlackcatData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [chosenCoupon, setChosenCoupon] = useState();

  const changeCheckoutType = (type) => {
    if (checkoutType !== type) {
      setCheckoutType(type);
      setSelectAll(false);
      setShopData((old) => old.map((v) => ({ ...v, selected: false })));
      setActivityData((old) => old.map((v) => ({ ...v, selected: false })));
    }
  };
  const changePostType = (e) => {
    console.log('radio checked', e.target.value);
    setPostType(e.target.value);
  };

  const changePaymentType = (e) => {
    console.log('radio checked', e.target.value);
    setPaymentType(e.target.value);
  };
  const selectCoupon = () => {
    console.log(chosenCoupon);
    setCouponData((old) =>
      old.map((v) =>
        v.coupon_send_sid === chosenCoupon
          ? { ...v, selected: true }
          : { ...v, selected: false }
      )
    );
  };
  const checkAllHandler = () => {
    setSelectAll((old) => !old);
    setShopData((old) => old.map((v) => ({ ...v, selected: !selectAll })));
    setActivityData((old) => old.map((v) => ({ ...v, selected: !selectAll })));
  };

  const getCart = async () => {
    const r = await fetch(`${process.env.API_SERVER}/cart-api/get-cart-items`, {
      method: 'POST',
      body: JSON.stringify({ member_sid: 'mem00471' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await r.json();
    const myShopData = data.shop.map((v) => ({ ...v, selected: false }));
    const myActivityData = data.activity.map((v) => ({
      ...v,
      selected: false,
    }));
    const myCouponData = data.coupon.map((v, i) => ({
      ...v,
      selected: i === 0,
    }));
    const myBlackcatData = data.blackCat.map((v) => ({
      ...v,
      selected: false,
    }));
    setShopData(myShopData);
    setActivityData(myActivityData);
    setCouponData(myCouponData);
    setBlackcatData(myBlackcatData);
    setCartData(data);
  };

  useEffect(() => {
    getCart();
  }, []);
  console.log(cartData);
  // console.log(chosenCoupon);
  console.log(couponData);

  return (
    <>
      <BgCartHead text="購物車" />
      <div className="container-inner">
        <Row>
          <Col xs={24} sm={24} md={24} lg={17} className={style.detailSection}>
            {/* ========== 選擇結帳種類 ========== */}
            <div className={style.checkoutType}>
              <CartTab
                type="shop"
                text="商品"
                checkoutType={checkoutType}
                clickHandler={() => {
                  changeCheckoutType('shop');
                }}
              />
              <CartTab
                type="activity"
                text="活動"
                checkoutType={checkoutType}
                clickHandler={() => {
                  changeCheckoutType('activity');
                }}
              />
            </div>
            {/* ========== 顯示商品 ==========*/}
            <div className={style.section}>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#FD8C46',
                    controlInteractiveSize: 20,
                  },
                }}
              >
                <Checkbox
                  onChange={checkAllHandler}
                  checked={selectAll}
                  className={style.selectAll}
                >
                  全選
                </Checkbox>
                {console.log(checkoutType)}
                {checkoutType === 'shop'
                  ? shopData.map((v) => (
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
                        setSelectAll={setSelectAll}
                      />
                    ))
                  : activityData.map((v) => (
                      <CartActivityCard
                        key={v.cart_sid}
                        cartSid={v.cart_sid}
                        selected={v.selected}
                        img={'/activity_img/' + v.img}
                        prodtitle={v.rel_name}
                        prodSubtitle={v.rel_seq_name}
                        adPrice={v.adult_price}
                        adQty={v.adult_qty}
                        kidPrice={v.child_price}
                        kidQty={v.child_qty}
                        activityData={activityData}
                        setActivityData={setActivityData}
                        setSelectAll={setSelectAll}
                      />
                    ))}
              </ConfigProvider>
            </div>
            {/* ========== 寄件方式 ==========*/}
            {checkoutType === 'shop' ? (
              <div className={style.section}>
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: '#FD8C46',
                      fontSize: 18,
                    },
                  }}
                >
                  <CartSectionTitle text="寄送方式" />
                  <Radio.Group onChange={changePostType} value={postType}>
                    <Radio value={1}>黑貓宅急便 $90</Radio>
                    <Radio value={2}>7-ELEVEN $60</Radio>
                    <Radio value={3}>全家 $60</Radio>
                  </Radio.Group>
                </ConfigProvider>
                {blackcatData.length > 0 ? (
                  <CartBlackcatPostInfo
                    address={
                      blackcatData[0].city +
                      blackcatData[0].area +
                      blackcatData[0].address
                    }
                    name={blackcatData[0].name}
                    mobile={blackcatData[0].mobile}
                    email={blackcatData[0].email}
                    selected={blackcatData[0].selected}
                  />
                ) : (
                  <p>沒有可使用的優惠券</p>
                )}
              </div>
            ) : (
              ''
            )}
            {/* ========== 優惠券 ==========*/}
            <div className={style.section}>
              <CartSectionTitle text="使用優惠券" />
              <div>
                {couponData.length > 0 ? (
                  couponData.map((v) =>
                    v.selected === true ? (
                      <CartCouponInfo
                        key={v.coupon_send_sid}
                        coupon_send_sid={v.coupon_send_sid}
                        exp_date={v.exp_date}
                        name={v.name}
                        price={v.price}
                      />
                    ) : (
                      ''
                    )
                  )
                ) : (
                  <p>沒有可使用的優惠券</p>
                )}
                <div className={style.couponModal}>
                  <Modal
                    btnType="text"
                    btnText="查看其它優惠券"
                    title="選擇優惠券"
                    confirmHandler={selectCoupon}
                    content={
                      <CartCouponList
                        couponData={couponData}
                        setChosenCoupon={setChosenCoupon}
                      />
                    }
                  />
                </div>
              </div>
            </div>
            {/* ========== 選付款方式 ==========*/}
            <div className={style.section}>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#FD8C46',
                    fontSize: 18,
                  },
                }}
              >
                <CartSectionTitle text="付款方式" />
                <Radio.Group onChange={changePaymentType} value={paymentType}>
                  <Radio value={1}>信用卡</Radio>
                  <Radio value={2}>LinePay</Radio>
                  <Radio value={3}>GooglePay</Radio>
                </Radio.Group>
              </ConfigProvider>
            </div>
          </Col>
          {/* ========== 金額統計 ==========*/}
          <Col xs={24} sm={24} md={24} lg={7} className={style.totalSection}>
            <div className={style.totalCard}>
              <CartSectionTitle text="訂單詳情" />
              <div className={style.subtotals}>
                <span>小計</span>
                <span className={style.amount}>$5400</span>
              </div>
              {checkoutType === 'shop' ? (
                <div className={style.subtotals}>
                  <span>運費</span>
                  <span className={style.amount}>$90</span>
                </div>
              ) : (
                ''
              )}

              <div className={style.subtotals}>
                <span>優惠券</span>
                <span className={style.amount}>-$50</span>
              </div>
              <div className={style.total}>
                <span>總計</span>
                <span className={style.totalamount}>$50</span>
              </div>
              <MainBtn text="結帳"></MainBtn>
              <Image
                src={rundog}
                className={style.runningdog}
                alt="runningdog"
              ></Image>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
