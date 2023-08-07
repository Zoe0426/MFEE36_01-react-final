import { useState } from 'react';
import style from './cartRepayTotalSection.module.css';
import Image from 'next/image';
import rundog from '@/assets/running-dog.svg';
import MainBtn from '@/components/ui/buttons/MainBtn';
import CartSectionTitle from './cartSectionTitle';
import CloseBtn from '../buttons/closeBtn';
import CartPayBtn from './cartPayBtn';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, ConfigProvider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreditCard,
  faPaw,
  faTicket,
} from '@fortawesome/free-solid-svg-icons';
import Modal from '../modal/modal';
import CartCouponList from './cartCouponList';
export default function CartTotalSection({
  checkoutType = '',
  details = [],
  postType = 0,
  couponData = [],
  paymentType = 1,
  setPaymentType = () => {},
}) {
  const [showCard, setShowCard] = useState(false);
  const postAmount = postType === 'blackcat' ? 90 : 60;
  // const shopSelected = shopData.reduce((a, v) => {
  //   return v.selected ? a + 1 : a;
  // }, 0);
  // const shopSubtotal = shopData.reduce((a, v) => {
  //   if (v.selected) {
  //     const subtotal = v.prod_price * v.prod_qty;
  //     return a + subtotal;
  //   }
  //   return a;
  // }, 0);
  // const activitySelected = activityData.reduce((a, v) => {
  //   return v.selected ? a + 1 : a;
  // }, 0);
  // const activitySubtotal = activityData.reduce((a, v) => {
  //   if (v.selected) {
  //     const subtotal =
  //       v.adult_price * v.adult_qty + v.child_price * v.child_qty;
  //     return a + subtotal;
  //   }
  //   return a;
  // }, 0);

  // const couponPrice =
  //   couponData.length > 0 &&
  //   couponData.filter((v) => v.selected === true)[0].price;
  // const shopTotal =
  //   shopSubtotal > 0 ? shopSubtotal + postAmount - couponPrice : 0;
  // const activityTotal =
  //   activitySubtotal > 0 ? activitySubtotal - couponPrice : 0;
  // const selectPaymentType = (e) => {
  //   setPaymentType(parseInt(e.key));
  // };
  const items = [
    {
      label: '信用卡',
      key: 1,
    },
    {
      label: 'Line pay',
      key: 2,
    },
  ];
  const menuProps = {
    items,
    //onClick: selectPaymentType,
  };
  const showInfoCard = () => {
    console.log('clicked');
    console.log(showCard);
    setShowCard(true);
  };
  const notShowCard = () => {
    setShowCard(false);
  };
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FD8C46',
            controlInteractiveSize: 20,
          },
        }}
      >
        <div className={style.toggleCard}>
          <div className={style.toggleInfoBox}>
            <div>
              <FontAwesomeIcon
                icon={faPaw}
                style={{
                  maxHeight: 16,
                  maxWidth: 16,
                  transform: 'rotate(-15deg)',
                  color: '#FD8C46',
                  marginRight: '16px',
                }}
              />
              <span style={{ color: '#515151' }}>應付總額 &nbsp;</span>
              <span>{/* 要算總金額 */}</span>
            </div>

            <MainBtn text="確認明細" clickHandler={showInfoCard}></MainBtn>
          </div>

          <div className={style.bottomDeco}></div>
        </div>
        <div className={`${showCard ? style.showTotalCard : style.totalCard}`}>
          <div className={style.closeBtn}>
            <CloseBtn closeHandler={notShowCard}></CloseBtn>
          </div>
          <CartSectionTitle text="訂單詳情" />

          <div className={style.totalSelectedNum}>{/* 算商品數量 */}</div>

          <div className={style.subtotals}>
            <span>小計</span>
            <span className={style.amount}>{/* 算總金額 */}</span>
          </div>

          {checkoutType === 'shop' ? (
            <div className={style.subtotals}>
              <span>運費</span>
              <span className={style.amount}>
                {postType === 1 ? `$90` : `$60`}
              </span>
            </div>
          ) : (
            ''
          )}
          {couponData.length > 0 ? (
            <div className={style.subtotals2}>
              <span style={{ color: '#FD8C46' }}>優惠券</span>
              <span className={style.amount} style={{ color: '#FD8C46' }}>
                -$
              </span>
            </div>
          ) : (
            ''
          )}

          <div className={style.total}>
            <span>應付總額</span>
            <span className={style.totalamount}>{/* {total} */}</span>
          </div>
          <div className={style.paymentArea}>
            <div className={style.subtotals2}>
              <span>付款方式</span>
              <span className={style.amount}>
                {paymentType === 1 ? (
                  <>
                    <span>信用卡</span>
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      style={{
                        maxHeight: 24,
                        maxWidth: 24,
                        fontSize: '20px',
                        color: '#A1D429',
                        marginLeft: '8px',
                      }}
                    />
                  </>
                ) : (
                  <img
                    src="/cart_img/c-linepay.png"
                    alt="linepay"
                    style={{ height: '20px' }}
                  />
                )}
              </span>
            </div>
            <div>
              <Dropdown menu={menuProps} trigger={['click']}>
                <Button
                  style={{
                    width: '100%',
                    color: '#515151',
                    marginBottom: '8px',
                  }}
                >
                  更換付款方式
                  <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </div>
          <div className={style.checkoutBtn}>
            <CartPayBtn
              btnText="結帳"
              title="溫馨提醒"
              mainBtnText="付款"
              subBtnText="返回"
              //confirmHandler={createOrder}
            />
          </div>
          <Image
            src={rundog}
            className={style.runningdog}
            alt="runningdog"
          ></Image>
        </div>
      </ConfigProvider>
    </>
  );
}
