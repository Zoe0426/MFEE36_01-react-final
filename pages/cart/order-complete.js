import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
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
  const [checkoutType, setCheckoutType] = useState('');
  const [orderInfo, setOrderInfo] = useState({
    order_sid: '',
    checkoutType: '',
    email: '',
    create_dt: '',
    coupon_amount: 0,
    recipient: '',
    recipient_phone: '',
    post_type: '',
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

  const orderNum = 'ORD000345';
  const orderType = 'shop';
  return !auth.id && first ? (
    <>沒東西</>
  ) : (
    <>
      <BgCartHead text="完成結帳" />
      <div className="container-inner">
        <div className={style.orderDetail}>
          <CartSectionTitle text={'訂單編號： ' + orderNum} />
          <div className={style.postDetails}>
            <div className={style.postTo}>
              <div className={style.detail}>
                <p className={style.detailtitle}>收件人</p>
                <p>: &nbsp;&nbsp;郭宜零</p>
              </div>
              <div className={style.detail}>
                <p className={style.detailtitle}>聯絡電話</p>
                <p>: &nbsp;&nbsp;0900123123</p>
              </div>
              <div className={style.detail}>
                <p className={style.detailtitle}>成立時間</p>
                <p>: &nbsp;&nbsp;2023-06-12 16:32</p>
              </div>
            </div>
            <div className={style.postAdd}>
              <div className={style.detail}>
                <p className={style.detailtitle}>運送方式</p>
                <p>: &nbsp;&nbsp;7-ELEVEN</p>
              </div>
              <div className={style.detail}>
                <p className={style.detailtitle}>運送地址</p>
                <p>: &nbsp;&nbsp;台北市中山區開心街 123號</p>
              </div>
            </div>
          </div>
          <OrderDetailShop
            img="/product-img/pro001.jpg"
            prodtitle="搖!搖! 超級水果～酥脆貓零食-鮭魚"
            prodSubtitle="鮪魚+0.4kg"
            price="250"
            qty="2"
          />
          <OrderDetailShop
            img="/product-img/pro001.jpg"
            prodtitle="搖!搖! 超級水果～酥脆貓零食-鮭魚"
            prodSubtitle="鮪魚+0.4kg"
            price="250"
            qty="2"
          />
          <OrderDetailActivity
            img="/product-img/pro001.jpg"
            prodtitle="台北與毛家庭有約,邀你一起來挺寵！"
            prodSubtitle="2023-05-06"
            adPrice="500"
            adQty="2"
            kidPrice="100"
            kidQty="1"
          />
          <OrderDetailActivity
            img="/product-img/pro001.jpg"
            prodtitle="台北與毛家庭有約,邀你一起來挺寵！"
            prodSubtitle="2023-05-06"
            adPrice="200"
            adQty="1"
            kidPrice="100"
            kidQty="1"
          />
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
