import { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import style from '@/styles/cart.module.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
//components
import BgCartHead from '@/components/ui/decoration/bg-cartHead';
import CartSectionTitle from '@/components/ui/cart/cartSectionTitle';
import CartPostInfo from '@/components/ui/cart/cartpostinfo';
import CartCouponInfo from '@/components/ui/cart/cartcouponinfo';
import CartRepayTotalSection from '@/components/ui/cart/cartRepayTotalSection';
import AuthContext from '@/context/AuthContext';
import Loading from '@/components/ui/loading/loading';
import CartRepayProduct from '@/components/ui/cart/cartRepayProduct';
import CartRepayActivity from '@/components/ui/cart/cartRepayActivity';
import BgCartHeadTextMiddle from '@/components/ui/decoration/bg-cartHead-textMiddle';
import MainBtn from '@/components/ui/buttons/MainBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
export default function Cart() {
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const query = router.query;
  //console.log(query.orderSid);

  const [orderSid, setOrderSid] = useState('');
  const [first, setFirst] = useState(false);
  const [fromMem, setFromMem] = useState(false);
  const [showRepayAlert, setShowRepayAlert] = useState(false);
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
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentType, setPaymentType] = useState(1);

  useEffect(() => {
    setFirst(true);
  }, []);

  useEffect(() => {
    if (!auth.id && first) {
      const from = router.asPath;
      router.push(`/member/sign-in?from=${from}`);
    } else if (auth.id && query.orderSid) {
      const s = query.orderSid.slice(0, 8);
      setOrderSid(s);
      if (query.orderSid.slice(-3) === 'mem') {
        setFromMem(true);
      } else {
        setShowRepayAlert(true);
        document.body.classList.add('likeList-open');
      }
      setPageLoading(false);
      getOrder(s);
    }
  }, [auth, first, query]);

  const getOrder = async (sid) => {
    try {
      const r = await fetch(
        `${process.env.API_SERVER}/cart-api/get-repay-order/${sid}`,
        { method: 'GET' }
      );
      const data = await r.json();
      const sub = data.details.reduce((a, v) => {
        const subtotal =
          v.adult_price * v.adult_qty +
          v.child_price * v.child_qty +
          v.prod_price * v.prod_qty;
        return a + subtotal;
      }, 0);
      let couponPrice = 0;
      if (data.coupon.length > 0) {
        couponPrice = data.coupon[0].price;
      }
      let postPrice = data.orderInfo[0].post_amount;
      const t = sub + postPrice - couponPrice;
      setTotal(t);
      setSubtotal(sub);
      setCheckoutType(data.checkoutType);
      setdetails(data.details);
      setCouponData(data.coupon);
      setOrderInfo(data.orderInfo);

      //console.log(data);
      if (data.postType) {
        setPostType(data.postType);
      }
    } catch (er) {
      //console.log(er);
      throw new Error('取訂單資料時出錯');
    }
  };

  const repay = async () => {
    const id = orderSid;
    const mytotal = total;
    const myCheckoutType = checkoutType;
    const memberSid = auth.id;

    if (paymentType === 1) {
      window.location.href =
        process.env.API_SERVER +
        `/cart-api/ecpay?orderSid=${id}&totalAmount=${mytotal}&checkoutType=${myCheckoutType}&memberSid=${memberSid}`;
    } else if (paymentType === 2) {
      window.location.href =
        process.env.API_SERVER +
        `/cart-api/linepay?orderSid=${id}&totalAmount=${mytotal}&checkoutType=${myCheckoutType}&memberSid=${memberSid}`;
    }
  };

  const closeAlert = () => {
    setShowRepayAlert(false);
    document.body.classList.remove('likeList-open');
  };
  const redirectToMem = () => {
    router.push('/member/orderlist');
  };
  if (pageLoading) {
    return <Loading />;
  } else if (!pageLoading) {
    return (
      <>
        <Head>
          <title>狗with咪 GO WITH ME</title>
        </Head>
        {!fromMem && (
          <BgCartHeadTextMiddle
            src="/cart_img/warning.png"
            title="付款失敗，重新付款"
            text="請於時限內完成付款流程，未付款訂單可於會員中心查詢"
          />
        )}
        {fromMem && (
          <BgCartHead text={fromMem ? '重新付款' : '付款失敗 重新付款'} />
        )}
        <Row>
          <Col xs={2} sm={2} md={2} lg={4} />
          <Col xs={20} sm={20} md={20} lg={11} className={style.detailSection}>
            {/* ========== 顯示商品 ==========*/}
            <div className={style.section}>
              <CartSectionTitle text={`待付款訂單：${orderSid}`} />
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
                    <CartRepayActivity
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
              subtotal={subtotal}
              checkoutType={checkoutType}
              postType={postType}
              couponData={couponData}
              paymentType={paymentType}
              setPaymentType={setPaymentType}
              repay={repay}
            />
          </Col>
        </Row>
        {showRepayAlert && (
          <>
            <div onClick={closeAlert} className={style.overlay}></div>
            <div className={style.modal}>
              <div className={style.modal_card}>
                <div className={style.modal_content}>付款失敗，重新付款？</div>
                <div className={style.btn_group}>
                  <SecondaryBtn
                    text="前往訂單列表"
                    clickHandler={redirectToMem}
                  />
                  <MainBtn clickHandler={closeAlert} text="重新付款" />
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
