import React from 'react';
import { Row, Col } from 'antd';
import style from '@/styles/cart.module.css';
import CartProductCard from '@/components/ui/cards/cartProductCard';

export default function Cart() {
  return (
    <>
      <div className="container-inner">
        <Row>
          <Col xs={24} sm={24} md={17} className={style.detailSection}>
            <CartProductCard
              img="/product-img/pro001.jpg"
              prodtitle="搖!搖! 超級水果～酥脆貓零食-鮭魚"
              prodSubtitle="鮪魚+0.4kg"
              price="250"
              qty="2"
            />
          </Col>
          <Col xs={24} sm={24} md={7} className={style.totalSection}>
            total
          </Col>
        </Row>
      </div>
    </>
  );
}
