import React from 'react';
import styles from './product-input.module.css';
import { Row, Col, Input, ConfigProvider } from 'antd';

export default function ProductInput({
  minPrice = 0,
  maxPrice = 0,
  minHandler = () => {},
  maxHandler = () => {},
  blurHander = () => {},
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FD8C46',
          colorText: 'rgb(81, 81, 81)',
          colorTextPlaceholder: '#DDDDDD',
          controlOutline: 'transparent',
          fontSize: 18,
          controlInteractiveSize: 18,
        },
      }}
    >
      <div className={styles.filter_price}>
        <label className={styles.labels}>價格範圍:</label>
        <Row align="middle" style={{ flex: 1 }} className={styles.toBox}>
          <Col xs={{ span: 10 }} sm={{ span: 10 }} md={{ span: 3 }}>
            <Input
              placeholder="$ 最小金額"
              value={minPrice ? minPrice : ''}
              onChange={minHandler}
              onBlur={blurHander}
            />
            <div className={styles.message_box}> 請輸入數字</div>
          </Col>
          <Col xs={{ span: 4 }} sm={{ span: 4 }} md={{ span: 1 }}>
            <div className={styles.symboTo}>~</div>
          </Col>
          <Col xs={{ span: 10 }} sm={{ span: 10 }} md={{ span: 3 }}>
            <Input
              placeholder="$ 最大金額"
              value={maxPrice ? maxPrice : ''}
              onChange={maxHandler}
              onBlur={blurHander}
            />
            <div className={styles.message_box}> 請輸入數字</div>
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
}
