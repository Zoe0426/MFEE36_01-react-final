import { useState } from 'react';
import style from './cartRepayTotalSection.module.css';
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
  details = [],
  checkoutType = '',
  subtotal = 0,
  postType = 0,
  couponData = [],
  paymentType = 1,
  setPaymentType = () => {},
  repay = () => {},
}) {
  const [showCard, setShowCard] = useState(false);
  const couponPrice = couponData.length > 0 ? couponData[0].price : 0;
  let postAmount = 0;
  checkoutType !== 'shop'
    ? 0
    : postType !== 1
    ? (postAmount = 60)
    : (postAmount = 90);
  paymentType;
  const total = subtotal + postAmount - couponPrice;
  const totalQty = details.length;
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
  const selectPaymentType = (e) => {
    setPaymentType(parseInt(e.key));
  };
  const menuProps = {
    items,
    onClick: selectPaymentType,
  };
  const showInfoCard = () => {
    //console.log('clicked');
    //console.log(showCard);
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
              <span>${total.toLocaleString()}</span>
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

          <div className={style.totalSelectedNum}>
            {checkoutType === 'shop'
              ? `共${totalQty}項商品`
              : `共${totalQty}項活動`}
          </div>

          <div className={style.subtotals}>
            <span>小計</span>
            <span className={style.amount}>${subtotal.toLocaleString()}</span>
          </div>

          {checkoutType === 'shop' ? (
            <div className={style.subtotals}>
              <span>運費</span>
              <span className={style.amount}>
                ${postAmount.toLocaleString()}
              </span>
            </div>
          ) : (
            ''
          )}
          {couponData.length > 0 ? (
            <div className={style.subtotals}>
              <span style={{ color: '#FD8C46' }}>優惠券</span>
              <span className={style.amount} style={{ color: '#FD8C46' }}>
                -${couponPrice.toLocaleString()}
              </span>
            </div>
          ) : (
            ''
          )}

          <div className={style.total}>
            <span>應付總額</span>
            <span className={style.totalamount}>${total.toLocaleString()}</span>
          </div>
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
            <MainBtn text="重新付款" clickHandler={repay} />
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
