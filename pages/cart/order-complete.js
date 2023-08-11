import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Col } from 'antd';
import BgCartHeadTextMiddle from '@/components/ui/decoration/bg-cartHead-textMiddle';
import style from '@/styles/cartOrderdetail.module.css';
import CartSectionTitle from '@/components/ui/cart/cartSectionTitle';
import OrderDetailShop from '@/components/ui/cart-orderDetail/orderDetailShop';
import OrderDetailActivity from '@/components/ui/cart-orderDetail/orderDetailActivity';
import AuthContext from '@/context/AuthContext';
import CartDetailTotalSection from '@/components/ui/cart-orderDetail/cartDetailTotalSection';
import Loading from '@/components/ui/loading/loading';
import OrderDetailPostInfo from '@/components/ui/cart-orderDetail/orderDetailpostinfo';
import OrderDetailInfo from '@/components/ui/cart-orderDetail/orderDetailInfo';

export default function OrderComplete() {
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const { query } = router;
  const [first, setFirst] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [checkoutType, setCheckoutType] = useState('');
  const [orderInfo, setOrderInfo] = useState({
    order_sid: '',
    checkoutType: '',
    email: '',
    create_dt: '',
    recipient: '',
    recipient_phone: '',
    post_type: 0,
    post_address: '',
    post_store_name: '',
    name: '',
    mobile: '',
    subtotal_amount: 0,
    post_amount: 0,
    coupon_amount: 0,
    orderDetailItems: [],
  });

  const getOrderDetail = async (orderSid, checkoutType) => {
    const r = await fetch(
      `${process.env.API_SERVER}/cart-api/get-orderDetail`,
      {
        method: 'POST',
        body: JSON.stringify({
          order_sid: orderSid,
          checkoutType: checkoutType,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await r.json();
    console.log('data:', data);
    setOrderInfo(data);
  };

  useEffect(() => {
    setFirst(true);
  }, []);

  useEffect(() => {
    if (!auth.id && first) {
      const from = router.asPath;
      router.push(`/member/sign-in?from=${from}`);
    }
    if (auth.id && query.memberSid && query.orderSid) {
      setPageLoading(false);
      setCheckoutType(query.checkoutType);
      auth.id === query.memberSid &&
        getOrderDetail(query.orderSid, query.checkoutType);
    }
  }, [auth, first, query]);
  console.log(orderInfo);
  if (pageLoading) {
    return <Loading />;
  } else {
    console.log('pc pt', orderInfo.post_type);
    return (
      <>
        <BgCartHeadTextMiddle
          src="/cart_img/complete.png"
          title="謝謝您！付款成功！"
          text={`訂單確認郵件已經發送到您的電子信箱： ${orderInfo.email}`}
        />
        <Row>
          <Col xs={2} sm={2} md={2} lg={4} />
          <Col xs={20} sm={20} md={20} lg={16} className={style.box}>
            <div className={style.orderDetail}>
              <CartSectionTitle text={'訂單編號： ' + orderInfo.order_sid} />
              {orderInfo.checkoutType === 'activity' && <div></div>}
              {orderInfo.checkoutType === 'shop' ? (
                <OrderDetailPostInfo
                  recipient={orderInfo.recipient}
                  recipient_phone={orderInfo.recipient_phone}
                  post_type={orderInfo.post_type}
                  post_address={orderInfo.post_address}
                  post_store_name={orderInfo.post_store_name}
                  create_dt={orderInfo.create_dt}
                />
              ) : (
                <OrderDetailInfo
                  name={orderInfo.name}
                  phone={orderInfo.mobile}
                  create_dt={orderInfo.create_dt}
                />
              )}
              <div className={style.titles}>
                <p className={style.ttleft}>活動名稱</p>
                <div className={style.ttright}>
                  <div className={style.pq}>
                    <p>成人</p>
                    <p>人數</p>
                    <p>小孩</p>
                    <p>人數</p>
                  </div>
                  <p>小計</p>
                </div>
              </div>
              {orderInfo.checkoutType === 'shop'
                ? orderInfo.orderDetailItems.map((v) => (
                    <OrderDetailShop
                      key={v.order_detail_sid}
                      img={`/product-img/${v.img}`}
                      prodtitle={v.rel_name}
                      prodSubtitle={v.rel_seq_name}
                      price={v.product_price}
                      qty={v.product_qty}
                    />
                  ))
                : orderInfo.orderDetailItems.map((v) => (
                    <OrderDetailActivity
                      key={v.order_detail_sid}
                      img={`/activity_img/${v.activity_pic}`}
                      prodtitle={v.rel_name}
                      prodSubtitle={v.rel_seq_name}
                      adPrice={v.adult_price}
                      adQty={v.adult_qty}
                      kidPrice={v.child_price}
                      kidQty={v.child_qty}
                      policy={v.policy}
                    />
                  ))}
              {
                <CartDetailTotalSection
                  checkoutType={checkoutType}
                  coupon_amount={orderInfo.coupon_amount}
                  post_amount={orderInfo.post_amount}
                  subtotal_amount={orderInfo.subtotal_amount}
                />
              }
            </div>
          </Col>
        </Row>
      </>
    );
  }
}
