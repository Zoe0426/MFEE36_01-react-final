import { useContext, useEffect, useState } from 'react';
import { Row, Col, ConfigProvider, Checkbox } from 'antd';
import style from '@/styles/cart.module.css';
import { useRouter } from 'next/router';
//components
import BgCartHead from '@/components/ui/decoration/bg-cartHead';
import CartProductCard from '@/components/ui/cards/cartProductCard';
import CartActivityCard from '@/components/ui/cards/cartActivityCard';
import CartSectionTitle from '@/components/ui/cart/cartSectionTitle';
import CartTab from '@/components/ui/cart/cartTab';
import CartPostInfo from '@/components/ui/cart/cartpostinfo';
import CartCouponInfo from '@/components/ui/cart/cartcouponinfo';
import CartCouponList from '@/components/ui/cart/cartCouponList';
import CartAddressList from '@/components/ui/cart/cartAddressList';
import Modal from '@/components/ui/modal/modal';
import CartTotalSection from '@/components/ui/cart/cartTotalSection';
import AuthContext from '@/context/AuthContext';
import Loading from '@/components/ui/loading/loading';

export default function Cart() {
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const orderSid = router.query.orderSid;
  const [first, setFirst] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [cartData, setCartData] = useState({
    shop: [],
    activity: [],
    postAddress: [],
    coupon: [],
  });
  const [memEmail, setMemEmail] = useState('');
  const [checkoutType, setCheckoutType] = useState('shop');
  //商品選擇區
  const [shopData, setShopData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  //寄送資訊
  const [postType, setPostType] = useState(1);
  const [postAddData, setPostAddData] = useState([]);
  //優惠券
  const [couponData, setCouponData] = useState([]);
  const [chosenCoupon, setChosenCoupon] = useState();
  //付款
  const [paymentType, setPaymentType] = useState(1);

  useEffect(() => {
    setFirst(true);
  }, []);

  useEffect(() => {
    if (!auth.id && first) {
      const from = router.asPath;
      router.push(`/member/sign-in?from=${from}`);
    } else if (auth.id) {
      setPageLoading(false);
      getOrder(orderSid);
    }
  }, [auth, first]);
  const getOrder = async (id) => {
    setLoading(true);
    try {
      const r = await fetch(
        `${process.env.API_SERVER}/cart-api/get-repay-order`,
        {
          method: 'POST',
          body: JSON.stringify({ order_sid: orderSid }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await r.json();
      console.log(data);
    } catch (er) {
      console.log(er);
      throw new Error('取訂單資料時出錯');
    }
  };

  const checkDefaultAdd = (sid, status) => {
    const newData = postAddData.map((v) => {
      if (status === true) {
        return { ...v, default_status: 0 };
      } else {
        return v.address_sid == sid
          ? { ...v, default_status: 1 }
          : { ...v, default_status: 0 };
      }
    });
    // console.log(newData);
    setPostAddData(newData);
  };
  // const getCart = async (id) => {
  //   setLoading(true);
  //   const r = await fetch(`${process.env.API_SERVER}/cart-api/get-cart-items`, {
  //     method: 'POST',
  //     body: JSON.stringify({ member_sid: id }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const data = await r.json();
  //   if (data.shop.length > 0) {
  //     const myShopData = data.shop.map((v) => ({ ...v, selected: false }));
  //     setShopData(myShopData);
  //     // console.log('noshopData');
  //   }
  //   if (data.activity.length > 0) {
  //     const myActivityData = data.activity.map((v) => ({
  //       ...v,
  //       selected: false,
  //     }));
  //     setActivityData(myActivityData);
  //     // console.log('noActData');
  //   }
  //   if (data.coupon.length > 0) {
  //     const myCouponData = data.coupon.map((v, i) => ({
  //       ...v,
  //       selected: i === 0,
  //     }));
  //     setCouponData(myCouponData);
  //     // console.log('nocouponData');
  //   }
  //   if (data.postAddress.length > 0) {
  //     const myPostAddData = data.postAddress.map((v, i) => ({
  //       ...v,
  //       selected: i === 0,
  //     }));
  //     setPostAddData(myPostAddData);
  //     const defaultPostType = data.postAddress[0].post_type;
  //     setPostType(defaultPostType);
  //   }
  //   setMemEmail(data.email);
  //   setLoading(false);
  //   setCartData(data);
  // };

  const sendOrderRequest = async (data) => {
    //console.log('sentData:', data);
    const r = await fetch(`${process.env.API_SERVER}/cart-api/create-order`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const createOrderResult = await r.json();
    //訂單若成立，前往結帳
    if (createOrderResult.success) {
      const id = createOrderResult.orderSid;
      const total = createOrderResult.finalTotal;
      const checkoutType = createOrderResult.checkoutType;
      const memberSid = createOrderResult.memberSid;

      if (createOrderResult.paymentType === 1) {
        //console.log('paymentType in createOrderResult:', paymentType);
        window.location.href =
          process.env.API_SERVER +
          `/cart-api/ecpay?orderSid=${id}&totalAmount=${total}&checkoutType=${checkoutType}&memberSid=${memberSid}`;
      } else if (createOrderResult.paymentType === 2) {
        window.location.href =
          process.env.API_SERVER +
          `/cart-api/linepay?orderSid=${id}&totalAmount=${total}&checkoutType=${checkoutType}&memberSid=${memberSid}`;
      }
    } else {
      //TODO: 訂單成立失敗不前往付款頁面
      alert('訂單成立失敗無法前往付款頁面');
      //console.log('訂單成立失敗不前往付款頁面');
    }
  };

  const createOrder = () => {
    let isPass = false;
    const data = {};
    const checkoutItems =
      checkoutType === 'shop'
        ? shopData.filter((v) => v.selected)
        : activityData.filter((v) => v.selected);

    if (auth) {
      if (checkoutItems.length === 0) {
        //console.log('no items selected');
        alert('請至少選擇一樣商品');
      } else {
        isPass = true;
      }
    } else {
      //console.log('not loged in');
      // TODO: need to login
    }

    if (isPass) {
      data.member_sid = auth.id;
      data.checkoutType = checkoutType;
      data.paymentType = paymentType;
      data.checkoutItems = checkoutItems;
      data.postInfo =
        checkoutType === 'shop'
          ? postAddData.filter((v) => v.default_status === 1 || v.selected)
          : [];
      data.couponInfo =
        couponData.length && couponData.filter((v) => v.selected);
      sendOrderRequest(data);
    }
  };
  console.log({ cartData });
  console.log({ postAddData });
  console.log({ postType });
  // if (pageLoading) {
  //   return <Loading />;
  // } else if (!pageLoading) {
  return (
    <>
      {loading && <Loading />}
      <BgCartHead text="購物車" />
      <Row>
        <Col xs={2} sm={2} md={2} lg={4} />
        <Col xs={20} sm={20} md={20} lg={11} className={style.detailSection}>
          {/* ========== 顯示商品 ==========*/}
          <div className={style.section}>
            {checkoutType === 'shop'
              ? shopData.map((v) => (
                  <CartProductCard
                    key={v.cart_sid}
                    relSid={v.rel_sid}
                    relSeqSid={v.rel_seq_sid}
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
                    relSid={v.rel_sid}
                    relSeqSid={v.rel_seq_sid}
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
          </div>
          {/* ========== 寄件方式 ==========*/}
          {checkoutType === 'shop' ? (
            <div className={style.section}>
              <div className={style.postPrice}>
                <span>運費: </span>
                {postType !== 1 ? '$60' : '$90'}
              </div>
              <CartSectionTitle text="收件地址" />
              {postAddData.length > 0 ? (
                postAddData
                  .filter((v) => v.selected)
                  .map((v) =>
                    v.selected === true ? (
                      <CartPostInfo
                        key={v.address_sid}
                        addressSid={v.address_sid}
                        storeName={v.store_name}
                        address={v.city + v.area + v.address}
                        name={v.recipient}
                        mobile={v.recipient_phone}
                        email={v.email}
                        selected={v.selected}
                        postType={v.post_type}
                        edit={true}
                        defaultStatus={!!v.default_status}
                        checkDefaultAdd={checkDefaultAdd}
                      />
                    ) : (
                      ''
                    )
                  )
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
            </div>
          </div>
        </Col>
        {/* ========== 金額統計 ==========*/}
        <Col xs={2} sm={2} md={2} lg={1} />
        <Col xs={20} sm={20} md={20} lg={5} className={style.totalSection}>
          <CartTotalSection
            checkoutType={checkoutType}
            shopData={shopData}
            activityData={activityData}
            postType={postType}
            couponData={couponData}
            createOrder={createOrder}
            paymentType={paymentType}
            setPaymentType={setPaymentType}
          />
        </Col>
      </Row>
    </>
  );
  // }
}
