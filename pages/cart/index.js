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
  const [selectAll, setSelectAll] = useState(false);

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
    setShopData(myShopData);
    setActivityData(myActivityData);
    setCartData(data);
  };

  useEffect(() => {
    getCart();
  }, []);
  console.log(shopData);

  return (
    <>
      <BgCartHead text="購物車" />
      <div className="container-inner">
        <Row>
          <Col xs={24} sm={24} md={24} lg={17} className={style.detailSection}>
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

            <div className={style.section}>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#FD8C46',
                    controlInteractiveSize: 20,
                  },
                }}
              >
                <Checkbox onChange={checkAllHandler} checked={selectAll}>
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
            {checkoutType === 'shop' ? (
              <div className={style.section}>
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: '#FD8C46',
                      fontSize: 18,
                      controlInteractiveSize: 18,
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
                <div className={style.info}>
                  <div className={style.details}>
                    <p>
                      <span>郭宜零&nbsp;&nbsp;&nbsp;</span>
                      <span>0919894942&nbsp;&nbsp;&nbsp;</span>
                      <span>屏東縣里港鄉大平村中山路XX號</span>
                    </p>
                    <p>
                      email: <span>ilwitu@mail.com</span>
                    </p>
                    <p>
                      預計到貨時間&nbsp;&nbsp;{' '}
                      <span>6月8日&nbsp;&nbsp;-&nbsp;&nbsp;6月16日</span>
                    </p>
                  </div>
                  <div>
                    <span className={style.postPrice}>$90&nbsp;&nbsp;</span>{' '}
                    <span className={style.edit}>編輯</span>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}

            <div className={style.section}>
              <CartSectionTitle text="使用優惠券" />
              <div className={style.info}>
                <div className={style.details}>
                  <p>全站50</p>
                  <p className={style.expDate}>
                    使用期限&nbsp;&nbsp;
                    <span className={style.expDate}>2023-07-24</span>
                  </p>
                </div>
                <div>
                  <span className={style.postPrice}>-$50&nbsp;&nbsp;</span>
                  <span className={style.edit}>編輯</span>
                </div>
              </div>
            </div>
            <div className={style.section}>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#FD8C46',
                    fontSize: 18,
                    controlInteractiveSize: 18,
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
