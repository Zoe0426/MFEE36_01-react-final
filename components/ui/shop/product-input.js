import React from 'react';
import styles from './product-input.module.css';
import { Row, Col, Input, ConfigProvider } from 'antd';

export default function ProductInput({
  minHandler = () => {},
  maxHandler = () => {},
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
        <Row align="middle" style={{ flex: 1 }}>
          <Col xs={{ span: 10 }} sm={{ span: 10 }} md={{ span: 3 }}>
            <Input placeholder="$ 最小值" />
          </Col>
          <Col xs={{ span: 4 }} sm={{ span: 4 }} md={{ span: 1 }}>
            <div className={styles.symboTo}>~</div>
          </Col>
          <Col xs={{ span: 10 }} sm={{ span: 10 }} md={{ span: 3 }}>
            <Input placeholder="$ 最大值" />
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
}
