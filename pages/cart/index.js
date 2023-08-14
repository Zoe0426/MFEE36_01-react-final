import { useContext, useEffect, useState } from 'react';
import { Row, Col, ConfigProvider, Checkbox } from 'antd';
import style from '@/styles/cart.module.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
//components
import BgCartHead from '@/components/ui/decoration/bg-cartHead';
import CartProductCard from '@/components/ui/cart/cartProductCard';
import CartActivityCard from '@/components/ui/cart/cartActivityCard';
import CartAlertContent from '@/components/ui/cart/cartAlertContent';
import CartSectionTitle from '@/components/ui/cart/cartSectionTitle';
import CartTab from '@/components/ui/cart/cartTab';
import CartPostInfo from '@/components/ui/cart/cartpostinfo';
import CartCouponInfo from '@/components/ui/cart/cartcouponinfo';
import CartCouponList from '@/components/ui/cart/cartCouponList';
import CartAddressList from '@/components/ui/cart/cartAddressList';
import Modal from '@/components/ui/modal/modal';
import CartAddressModal from '@/components/ui/modal/cartAddressModal';
import MainBtn from '@/components/ui/buttons/MainBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import CartTotalSection from '@/components/ui/cart/cartTotalSection';
import AuthContext from '@/context/AuthContext';
import Loading from '@/components/ui/loading/loading';
import CartNoInfoCard from '@/components/ui/cart/cartNoInfoCard';

export default function Cart() {
  const { auth } = useContext(AuthContext);
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
  const [chosenCoupon, setChosenCoupon] = useState(0);
  //付款
  const [paymentType, setPaymentType] = useState(1);
  //Alerts
  const [amodal, setaModal] = useState(false);
  const [bmodal, setbModal] = useState(false);
  const [cmodal, setcModal] = useState(false);
  const [couponmodal, setCouponmodal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setFirst(true);
  }, []);

  useEffect(() => {
    if (!auth.id && first) {
      const from = router.asPath;
      router.push(`/member/sign-in?from=${from}`);
    } else if (auth.id) {
      setPageLoading(false);
      getCart(auth.id);
    }
  }, [auth, first]);

  const changeCheckoutType = (type) => {
    setCheckoutType(type);
    setSelectAll(false);
    setShopData((old) => old.map((v) => ({ ...v, selected: false })));
    setActivityData((old) => old.map((v) => ({ ...v, selected: false })));
    setCouponData((old) => old.map((v, i) => ({ ...v, selected: i === 0 })));
  };
  const checkAllHandler = () => {
    setSelectAll((old) => !old);
    setShopData((old) => old.map((v) => ({ ...v, selected: !selectAll })));
    setActivityData((old) => old.map((v) => ({ ...v, selected: !selectAll })));
  };
  const selectCoupon = () => {
    setCouponData((old) =>
      old.map((v) =>
        v.coupon_send_sid === chosenCoupon
          ? { ...v, selected: true }
          : { ...v, selected: false }
      )
    );
    setCouponmodal(false);
    document.body.classList.remove('likeList-open');
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
  const getCart = async (id) => {
    setLoading(true);
    const r = await fetch(`${process.env.API_SERVER}/cart-api/get-cart-items`, {
      method: 'POST',
      body: JSON.stringify({ member_sid: id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await r.json();
    //console.log(data);
    if (data.shop.length > 0) {
      const myShopData = data.shop.map((v) => ({ ...v, selected: false }));
      setShopData(myShopData);
      // console.log('noshopData');
    }
    if (data.activity.length > 0) {
      const myActivityData = data.activity.map((v) => ({
        ...v,
        selected: false,
      }));
      setActivityData(myActivityData);
      // console.log('noActData');
    }
    if (data.coupon.length > 0) {
      const myCouponData = data.coupon.map((v, i) => ({
        ...v,
        selected: i === 0,
      }));
      setCouponData(myCouponData);
      setChosenCoupon(myCouponData[0].coupon_send_sid);
      // console.log('nocouponData');
    }
    if (data.postAddress.length > 0) {
      const myPostAddData = data.postAddress.map((v, i) => ({
        ...v,
        selected: i === 0,
      }));
      setPostAddData(myPostAddData);
      const defaultPostType = data.postAddress[0].post_type;
      setPostType(defaultPostType);
    }
    setMemEmail(data.email);
    setLoading(false);
    setCartData(data);
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
    }
  };
  const checkOrderRequest = () => {
    const checkoutItems =
      checkoutType === 'shop'
        ? shopData.filter((v) => v.selected)
        : activityData.filter((v) => v.selected);

    if (auth) {
      if (checkoutItems.length === 0) {
        setaModal(true);
        document.body.classList.add('likeList-open');
        //alert('請至少選擇一樣商品');
        return;
      }
      if (checkoutType === 'shop' && postAddData.length < 0) {
        setaModal(true);
        document.body.classList.add('likeList-open');
        //alert('請編輯收件地址');
        return;
      } else {
        setcModal(true);
        document.body.classList.add('likeList-open');
      }
    }
  };
  const createOrder = () => {
    const data = {};
    const checkoutItems =
      checkoutType === 'shop'
        ? shopData.filter((v) => v.selected)
        : activityData.filter((v) => v.selected);
    data.member_sid = auth.id;
    data.checkoutType = checkoutType;
    data.paymentType = paymentType;
    data.checkoutItems = checkoutItems;
    data.postInfo =
      checkoutType === 'shop'
        ? postAddData.filter((v) => v.default_status === 1 || v.selected)
        : [];
    data.couponInfo = couponData.length && couponData.filter((v) => v.selected);
    sendOrderRequest(data);
  };
  const aModalHandler = () => {
    setaModal(false);
    document.body.classList.remove('likeList-open');
  };
  const bModalHandler = () => {
    setbModal(false);
    document.body.classList.remove('likeList-open');
  };
  const cModalHandler = () => {
    setcModal(false);
    document.body.classList.remove('likeList-open');
  };
  const couponModalHandler = () => {
    setCouponmodal(false);
    document.body.classList.remove('likeList-open');
  };
  const showCouponModalHandler = () => {
    setCouponmodal(true);
    document.body.classList.add('likeList-open');
  };
  //console.log(couponData);
  //console.log(cartData);
  if (pageLoading) {
    return <Loading />;
  } else if (!pageLoading) {
    return (
      <>
        <Head>
          <title>狗with咪 | 購物車</title>
        </Head>
        {loading && <Loading />}
        <BgCartHead text="購物車" />
        <Row>
          <Col xs={2} sm={2} md={2} lg={4} />
          <Col xs={20} sm={20} md={20} lg={11} className={style.detailSection}>
            {/* ========== 選擇結帳種類 ========== */}
            <div className={style.checkoutType}>
              <CartTab
                type="shop"
                text={`商品結帳 (${shopData.length})`}
                checkoutType={checkoutType}
                shopData={shopData}
                activityData={activityData}
                changeTypeHandler={changeCheckoutType}
                mainBtnText="確認前往活動結帳"
              />
              <CartTab
                type="activity"
                text={`活動結帳 (${activityData.length})`}
                checkoutType={checkoutType}
                shopData={shopData}
                activityData={activityData}
                changeTypeHandler={changeCheckoutType}
                mainBtnText="確認前往商品結帳"
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
                {checkoutType === 'shop' && shopData.length > 0 ? (
                  <Checkbox
                    onChange={checkAllHandler}
                    checked={selectAll}
                    className={style.selectAll}
                  >
                    全選
                  </Checkbox>
                ) : (
                  ''
                )}
                {checkoutType === 'activity' && activityData.length > 0 ? (
                  <Checkbox
                    onChange={checkAllHandler}
                    checked={selectAll}
                    className={style.selectAll}
                  >
                    全選
                  </Checkbox>
                ) : (
                  ''
                )}

                {checkoutType === 'shop' ? (
                  shopData.length > 0 ? (
                    shopData.map((v) => (
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
                  ) : (
                    <CartNoInfoCard text="目前無商城相關商品" />
                  )
                ) : activityData.length > 0 ? (
                  activityData.map((v) => (
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
                  ))
                ) : (
                  <CartNoInfoCard text="目前無活動相關商品" />
                )}
              </ConfigProvider>
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
                  <CartNoInfoCard />
                )}
                <div className={style.couponModal}>
                  <CartAddressModal
                    btnType="text"
                    btnText="變更收件地址"
                    title={
                      postAddData.length > 0
                        ? '選擇/新增收件地址'
                        : '新增收件地址'
                    }
                    showSubBtn={false}
                    content={
                      <CartAddressList
                        postAddData={postAddData}
                        setPostAddData={setPostAddData}
                        postType={postType}
                        setPostType={setPostType}
                        memEmail={memEmail}
                      />
                    }
                  />
                </div>
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
                  <CartNoInfoCard text="很抱歉目前沒有可以使用的優惠券" />
                )}
                {couponData.length > 0 && (
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
              createOrder={checkOrderRequest}
              paymentType={paymentType}
              setPaymentType={setPaymentType}
              setChosenCoupon={setChosenCoupon}
              selectCoupon={selectCoupon}
              showCouponModalHandler={showCouponModalHandler}
            />
          </Col>
        </Row>
        {amodal && (
          <>
            <div className={style.overlay}></div>
            <div className={style.modal}>
              <div className={style.modal_card}>
                <div className={style.modal_content}>
                  {checkoutType === 'shop'
                    ? '請至少選擇一樣商品'
                    : '請至少選擇一樣商品'}
                </div>
                <div className={style.btn_group}>
                  <MainBtn clickHandler={aModalHandler} text="確認" />
                </div>
              </div>
            </div>
          </>
        )}
        {bmodal && (
          <>
            <div className={style.overlay}></div>
            <div className={style.modal}>
              <div className={style.modal_card}>
                <div className={style.modal_content}>請編輯收件地址</div>
                <div className={style.btn_group}>
                  <MainBtn clickHandler={bModalHandler} text={'aaa'} />
                </div>
              </div>
            </div>
          </>
        )}
        {cmodal && (
          <>
            <div className={style.overlay}></div>
            <div className={style.modal}>
              <div className={style.modal_card}>
                <h2 className={style.modal_title}>溫馨提醒</h2>
                <div className={style.cmodal_content}>
                  <CartAlertContent
                    contentP1="訂單成立後，相關商品及使用的優惠券"
                    contentP2="將會從購物車移除，可於會員中心查看"
                  />
                </div>
                <div className={style.btn_group}>
                  <SecondaryBtn
                    text="返回購物車"
                    clickHandler={cModalHandler}
                  />
                  <MainBtn clickHandler={createOrder} text="付款" />
                </div>
              </div>
            </div>
          </>
        )}
        {couponmodal && (
          <>
            <div onClick={couponModalHandler} className={style.overlay}></div>
            <div className={style.modal}>
              <div className={style.cmodal_card}>
                <h2 className={style.cou_modal_tital}>選擇優惠券</h2>
                <div className={style.cmodal_content}>
                  <CartCouponList
                    couponData={couponData}
                    setChosenCoupon={setChosenCoupon}
                  />
                </div>

                <div className={style.line}></div>
                <div className={style.coubtn_group}>
                  <SecondaryBtn text="取消" clickHandler={couponModalHandler} />
                  <MainBtn clickHandler={selectCoupon} text="確認" />
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
