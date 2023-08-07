import { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import style from '@/styles/cart.module.css';
import { useRouter } from 'next/router';
//components
import BgCartHead from '@/components/ui/decoration/bg-cartHead';
import CartSectionTitle from '@/components/ui/cart/cartSectionTitle';
import CartPostInfo from '@/components/ui/cart/cartpostinfo';
import CartCouponInfo from '@/components/ui/cart/cartcouponinfo';
import CartRepayTotalSection from '@/components/ui/cart/cartRepayTotalSection';
import AuthContext from '@/context/AuthContext';
import Loading from '@/components/ui/loading/loading';
import CartRepayProduct from '@/components/ui/cart/cartRepayProduct';

export default function Cart() {
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const query = router.query;
  const orderSid = query.orderSid;
  //const  = router.query.orderSid;
  console.log(orderSid);
  const [first, setFirst] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [checkoutType, setCheckoutType] = useState('');
  //訂單品項
  const [details, setdetails] = useState([]);

  //寄送資訊
  const [postType, setPostType] = useState(0);
  const [orderInfo, setOrderInfo] = useState([]);
  //優惠券
  const [couponData, setCouponData] = useState([]);
  //付款
  const [paymentType, setPaymentType] = useState(1);

  useEffect(() => {
    setFirst(true);
  }, []);

  useEffect(() => {
    if (!auth.id && first) {
      const from = router.asPath;
      router.push(`/member/sign-in?from=${from}`);
    } else if (auth.id && query.orderSid) {
      setPageLoading(false);
      getOrder();
    }
  }, [auth, first, query]);

  const getOrder = async () => {
    setLoading(true);
    try {
      const r = await fetch(
        `${process.env.API_SERVER}/cart-api/get-repay-order/${orderSid}`,
        { method: 'GET' }
      );
      const data = await r.json();
      setCheckoutType(data.checkoutType);
      setdetails(data.details);
      setCouponData(data.coupon);
      setOrderInfo(data.orderInfo);
      console.log(data);
      if (data.postType) {
        setPostType(data.postType);
      }
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

  // const createOrder = () => {
  //   let isPass = false;
  //   const data = {};
  //   const checkoutItems =
  //     checkoutType === 'shop'
  //       ? shopData.filter((v) => v.selected)
  //       : activityData.filter((v) => v.selected);

  //   if (auth) {
  //     if (checkoutItems.length === 0) {
  //       //console.log('no items selected');
  //       alert('請至少選擇一樣商品');
  //     } else {
  //       isPass = true;
  //     }
  //   } else {
  //     //console.log('not loged in');
  //     // TODO: need to login
  //   }

  //   if (isPass) {
  //     data.member_sid = auth.id;
  //     data.checkoutType = checkoutType;
  //     data.paymentType = paymentType;
  //     data.checkoutItems = checkoutItems;
  //     data.postInfo =
  //       checkoutType === 'shop'
  //         ? postAddData.filter((v) => v.default_status === 1 || v.selected)
  //         : [];
  //     data.couponInfo =
  //       couponData.length && couponData.filter((v) => v.selected);
  //     sendOrderRequest(data);
  //   }
  // };
  // console.log({ cartData });
  // console.log({ postAddData });
  // console.log({ postType });

  // if (pageLoading) {
  //   return <Loading />;
  // } else if (!pageLoading) {
  return (
    <>
      {/* {loading && <Loading />} */}
      <BgCartHead text="購物車" />
      <Row>
        <Col xs={2} sm={2} md={2} lg={4} />
        <Col xs={20} sm={20} md={20} lg={11} className={style.detailSection}>
          {/* ========== 顯示商品 ==========*/}
          <div className={style.section}>
            {checkoutType === 'shop'
              ? details.map((v) => (
                  <CartRepayProduct
                    key={v.order_detail_sid}
                    img={v.img}
                    prodtitle={v.rel_name}
                    prodSubtitle={v.rel_seq_name}
                    price={v.prod_price}
                    qty={v.prod_qty}
                  />
                ))
              : details.map((v) => (
                  <CartRepayProduct
                    key={v.order_detail_sid}
                    img={v.img}
                    prodtitle={v.rel_name}
                    prodSubtitle={v.rel_seq_name}
                    adPrice={v.adult_price}
                    adQty={v.adult_qty}
                    kidPrice={v.child_price}
                    kidQty={v.child_qty}
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
              {orderInfo.map((v) => (
                <CartPostInfo
                  key={v.address_sid}
                  storeName={v.post_store}
                  address={v.post_address}
                  name={v.recipient}
                  mobile={v.recipient_phone}
                  email={v.email}
                  postType={v.post_type}
                  edit={false}
                />
              ))}
            </div>
          ) : (
            ''
          )}
          {/* ========== 優惠券 ==========*/}
          {couponData.length > 0 ? (
            <div className={style.section}>
              <CartSectionTitle text="使用優惠券" />
              <div>
                {couponData.map((v) => (
                  <CartCouponInfo
                    key={v.coupon_send_sid}
                    coupon_send_sid={v.coupon_send_sid}
                    exp_date={v.exp_date}
                    name={v.name}
                    price={v.price}
                  />
                ))}
              </div>
            </div>
          ) : (
            ''
          )}
        </Col>
        {/* ========== 金額統計 ==========*/}
        <Col xs={2} sm={2} md={2} lg={1} />
        <Col xs={20} sm={20} md={20} lg={5} className={style.totalSection}>
          <CartRepayTotalSection
            details={details}
            checkoutType={checkoutType}
            postType={postType}
            couponData={couponData}
            paymentType={paymentType}
            setPaymentType={setPaymentType}
          />
        </Col>
      </Row>
    </>
  );
  // }
}
