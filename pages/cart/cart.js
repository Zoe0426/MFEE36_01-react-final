import { useState } from 'react';
import { Row, Col, Radio, ConfigProvider } from 'antd';
import style from '@/styles/cart.module.css';
import CartProductCard from '@/components/ui/cards/cartProductCard';
import CartActivityCard from '@/components/ui/cards/cartActivityCard';
import MainBtn from '@/components/ui/buttons/MainBtn';
import CartSectionTitle from '@/components/ui/cart/cartSectionTitle';

export default function Cart() {
  const [postType, setPostType] = useState(1);
  const changePostType = (e) => {
    console.log('radio checked', e.target.value);
    setPostType(e.target.value);
  };
  return (
    <>
      <div className="container-inner">
        <Row>
          <Col xs={24} sm={24} md={24} lg={17} className={style.detailSection}>
            <div className={style.checkoutType}>
              <div className={style.typeSelected}>商品</div>
              <div className={style.type}>活動</div>
            </div>
            <div className={style.section}>
              <CartProductCard
                img="/product-img/pro001.jpg"
                prodtitle="搖!搖! 超級水果～酥脆貓零食-鮭魚"
                prodSubtitle="鮪魚+0.4kg"
                price="250"
                qty="2"
              />
              <CartActivityCard
                img="/product-img/pro001.jpg"
                prodtitle="台北與毛家庭有約,邀你一起來挺寵！"
                prodSubtitle="2023-05-06"
                adPrice="500"
                adQty="2"
                kidPrice="100"
                kidQty="1"
              />
            </div>

            <div className={style.section}>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#FD8C46',
                  },
                }}
              >
                <CartSectionTitle text="寄送方式" />
                <Radio.Group onChange={changePostType} value={postType}>
                  <Radio value={1}>黑貓宅急便 $90</Radio>
                  <Radio value={2}>7-ELEVEN $60</Radio>
                  <Radio value={3}>全家 $60</Radio>
                </Radio.Group>
              </ConfigProvider>
              <div className={style.info}>
                <div className={style.details}>
                  <p>
                    <span>郭宜零&nbsp;&nbsp;&nbsp;</span>
                    <span>0919894942&nbsp;&nbsp;&nbsp;</span>
                    <span>屏東縣里港鄉大平村中山路XX號</span>
                  </p>
                  <p>
                    email: <span>ilwitu@mail.com</span>
                  </p>
                  <p>
                    預計到貨時間&nbsp;&nbsp;{' '}
                    <span>6月8日&nbsp;&nbsp;-&nbsp;&nbsp;6月16日</span>
                  </p>
                </div>
                <div>
                  <span className={style.postPrice}>$90&nbsp;&nbsp;</span>{' '}
                  <span className={style.edit}>編輯</span>
                </div>
              </div>
            </div>
            <div className={style.section}>
              <CartSectionTitle text="使用優惠券" />
              <div className={style.info}>
                <div className={style.details}>
                  <p>全站50</p>
                  <p className={style.expDate}>
                    使用期限&nbsp;&nbsp;
                    <span className={style.expDate}>2023-07-24</span>
                  </p>
                </div>
                <div>
                  <span className={style.postPrice}>-$50&nbsp;&nbsp;</span>
                  <span className={style.edit}>編輯</span>
                </div>
              </div>
            </div>
            <div className={style.section}>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#FD8C46',
                  },
                }}
              >
                <CartSectionTitle text="付款方式" />
                <Radio.Group onChange={changePostType} value={postType}>
                  <Radio value={1}>信用卡</Radio>
                  <Radio value={2}>LinePay</Radio>
                  <Radio value={3}>GooglePay</Radio>
                </Radio.Group>
              </ConfigProvider>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={7} className={style.totalSection}>
            <div className={style.totalCard}>
              <CartSectionTitle text="訂單詳情" />
              <div className={style.subtotals}>
                <span>小計</span>
                <span className={style.amount}>$5400</span>
              </div>
              <div className={style.subtotals}>
                <span>運費</span>
                <span className={style.amount}>$90</span>
              </div>
              <div className={style.subtotals}>
                <span>優惠券</span>
                <span className={style.amount}>-$50</span>
              </div>
              <div className={style.total}>
                <span>總計</span>
                <span className={style.totalamount}>$50</span>
              </div>
              <MainBtn text="結帳"></MainBtn>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
