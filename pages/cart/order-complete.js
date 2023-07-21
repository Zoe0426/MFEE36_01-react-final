import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import CartPostInfo from '@/components/ui/cart-orderDetail/cartpostinfo';
import BgCartHead from '@/components/ui/decoration/bg-cartHead';
import style from '@/styles/cartOrderdetail.module.css';
import CartSectionTitle from '@/components/ui/cart/cartSectionTitle';
import OrderDetailShop from '@/components/ui/cards/orderDetailShop';
import OrderDetailActivity from '@/components/ui/cards/orderDetailActivity';
import AuthContext from '@/context/AuthContext';
import CartDetailTotalSection from '@/components/ui/cart-orderDetail/cartDetailTotalSection';

export default function OrderComplete() {
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const { query } = router;
  const [first, setFirst] = useState(false);
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
      setCheckoutType(query.checkoutType);
      auth.id === query.memberSid &&
        getOrderDetail(query.orderSid, query.checkoutType);
    }
  }, [auth, first, query]);

  return !auth.id && first ? (
    <>沒東西</>
  ) : (
    <>
      <BgCartHead text="完成結帳" />
      <div className="container-inner">
        <div className={style.orderDetail}>
          <CartSectionTitle text={'訂單編號： ' + orderInfo.order_sid} />
          {orderInfo.checkoutType === 'shop' ? (
            <CartPostInfo
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
                  img={`/activity_img/${v.activity_pic}`}
                  prodtitle={v.rel_name}
                  prodSubtitle={v.rel_seq_name}
                  adPrice={v.adult_price}
                  adQty={v.adult_qty}
                  kidPrice={v.child_price}
                  kidQty={v.child_qty}
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
      </div>
    </>
  );
}
