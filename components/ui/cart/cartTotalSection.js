import { useState } from 'react';
import style from './cartTotalSection.module.css';
import Image from 'next/image';
import rundog from '@/assets/running-dog.svg';
import MainBtn from '@/components/ui/buttons/MainBtn';
import CartSectionTitle from './cartSectionTitle';
import CloseBtn from '../buttons/closeBtn';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, ConfigProvider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faPaw } from '@fortawesome/free-solid-svg-icons';

export default function CartTotalSection({
  checkoutType = '',
  shopData = [],
  activityData = [],
  postType = [],
  couponData = [],
  paymentType = 1,
  createOrder = () => {},
  setPaymentType = () => {},
}) {
  const [showCard, setShowCard] = useState(false);
  const postAmount = postType === 'blackcat' ? 90 : 60;

  const shopSubtotal = shopData.reduce((a, v) => {
    if (v.selected) {
      const subtotal = v.prod_price * v.prod_qty;
      return a + subtotal;
    }
    return a;
  }, 0);
  const activitySubtotal = activityData.reduce((a, v) => {
    if (v.selected) {
      const subtotal =
        v.adult_price * v.adult_qty + v.child_price * v.child_qty;
      return a + subtotal;
    }
    return a;
  }, 0);

  const couponPrice =
    couponData.length > 0 &&
    couponData.filter((v) => v.selected === true)[0].price;
  const shopTotal =
    shopSubtotal > 0 ? shopSubtotal + postAmount - couponPrice : 0;
  const activityTotal =
    activitySubtotal > 0 ? activitySubtotal - couponPrice : 0;
  const selectPaymentType = (e) => {
    setPaymentType(parseInt(e.key));
  };
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
    onClick: selectPaymentType,
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
            <span>${checkoutType === 'shop' ? shopTotal : activityTotal}</span>
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
        <div></div>
        <div className={style.subtotals}>
          <span>{checkoutType === 'shop' ? '產品' : '活動'}小計</span>
          <span className={style.amount}>
            {checkoutType === 'shop' ? shopSubtotal : activitySubtotal}
          </span>
        </div>

        {checkoutType === 'shop' ? (
          <div className={style.subtotals}>
            <span>運費</span>
            <span className={style.amount}>
              ${shopSubtotal === 0 ? 0 : postAmount}
            </span>
          </div>
        ) : (
          ''
        )}

        <div className={style.subtotals}>
          <span>優惠券</span>
          <span className={style.amount} style={{ color: '#FD8C46' }}>
            -$
            {(checkoutType === 'shop' && shopSubtotal === 0) ||
            (checkoutType !== 'shop' && activitySubtotal === 0)
              ? 0
              : couponPrice}
          </span>
        </div>
        <div className={style.total}>
          <span>應付總額</span>
          <span className={style.totalamount}>
            ${checkoutType === 'shop' ? shopTotal : activityTotal}
          </span>
        </div>
        {/* <div className={style.subtotals}>
        <span>結帳品項總計</span>
        <span className={style.amount}>X項</span>
      </div> */}
        <div className={style.paymentArea}>
          <div className={style.subtotals}>
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
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#FD8C46',
                  controlInteractiveSize: 20,
                },
              }}
            >
              <Dropdown menu={menuProps} trigger={['click']}>
                <Button
                  style={{
                    width: '100%',
                    color: '#515151',
                    marginBottom: '16px',
                  }}
                >
                  更換付款方式
                  <DownOutlined />
                </Button>
              </Dropdown>
            </ConfigProvider>
          </div>
        </div>

        <div className={style.checkoutBtn}>
          <MainBtn text="結帳" clickHandler={createOrder}></MainBtn>
        </div>

        <Image
          src={rundog}
          className={style.runningdog}
          alt="runningdog"
        ></Image>
      </div>
    </>
  );
}
