import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import PostInfo from '@/components/ui/cart-orderDetail/postinfo';
import BgCartHead from '@/components/ui/decoration/bg-cartHead';
import style from '@/styles/cartOrderdetail.module.css';
import CartSectionTitle from '@/components/ui/cart/cartSectionTitle';
import OrderDetailShop from '@/components/ui/cards/orderDetailShop';
import OrderDetailActivity from '@/components/ui/cards/orderDetailActivity';
import AuthContext from '@/context/AuthContext';

export default function OrderComplete() {
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const { query } = router;
  const [first, setFirst] = useState(false);
  const [memberSid, setMemberSid] = useState(query.memberSid);
  const [orderSid, setOrderSid] = useState(query.orderSid);
  const [checkoutType, setCheckoutType] = useState('shop');
  const [orderInfo, setOrderInfo] = useState({
    order_sid: '',
    checkoutType: 'shop',
    email: '',
    create_dt: '',
    coupon_amount: 0,
    recipient: '',
    recipient_phone: '',
    post_type: 0,
    post_address: '',
    post_store_name: '',
    post_amount: 0,
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
    setOrderInfo(data);
    console.log(data);
  };
  useEffect(() => {
    setFirst(true);
  }, []);

  useEffect(() => {
    setMemberSid(query.memberSid);
    setOrderSid(query.orderSid);
    setCheckoutType(query.checkoutType);
    if (!auth.id && first) {
      const from = router.asPath;
      console.log(from);
      router.push(`/member/sign-in?from=${from}`);
    } else if (auth.id) {
      auth.id === memberSid && getOrderDetail(orderSid, checkoutType);
    }
  }, [auth, query, first]);

  return !auth.id && first ? (
    <>沒東西</>
  ) : (
    <>
      <BgCartHead text="完成結帳" />
      <div className="container-inner">
        <div className={style.orderDetail}>
          <CartSectionTitle text={'訂單編號： ' + orderInfo.order_sid} />
          {orderInfo.checkoutType === 'shop' ? (
            <PostInfo
              recipient={orderInfo.recipient}
              recipient_phone={orderInfo.recipient_phone}
              post_type={orderInfo.post_type}
              post_address={orderInfo.post_address}
              post_store_name={orderInfo.post_store_name}
            />
          ) : (
            ''
          )}
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
                  img={`/product-img/${v.activity_pic}`}
                  prodtitle={v.rel_name}
                  prodSubtitle={v.rel_seq_name}
                  adPrice={v.adult_price}
                  adQty={v.adult_qty}
                  kidPrice={v.child_price}
                  kidQty={v.child_qty}
                />
              ))}
          <div className={style.totalSection}>
            <div className={style.subtotals}>
              <span>小計</span>
              <span className={style.amount}>$5400</span>
            </div>
            {orderType === 'shop' ? (
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
          </div>
        </div>
      </div>
    </>
  );
}
