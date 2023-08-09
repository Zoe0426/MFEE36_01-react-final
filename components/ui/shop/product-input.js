import React from 'react';
import styles from './product-input.module.css';
import { Row, Col, Input, ConfigProvider } from 'antd';

export default function ProductInput({
  showErrorMessage1 = false,
  showErrorMessage2 = false,
  outlineStatus1 = '',
  outlineStatus2 = '',
  errorMessage1 = '',
  errorMessage2 = '',
  minPrice = 0,
  maxPrice = 0,
  minHandler = () => {},
  maxHandler = () => {},
  checkHandler = () => {},
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
        <label className={styles.labels}>價格範圍</label>
        <span className={styles.colon}>:</span>
        <Row align="middle" style={{ flex: 1 }} className={styles.toBox}>
          <Col
            xs={{ span: 10 }}
            sm={{ span: 10 }}
            md={{ span: 3 }}
            className={styles.input_text}
          >
            <Input
              placeholder="$ 最小金額"
              value={minPrice ? minPrice : null}
              status={outlineStatus1}
              onChange={minHandler}
              onBlur={(e) => checkHandler(e, 'minPrice')}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  checkHandler(e, 'minPrice');
                }
              }}
            />
            {showErrorMessage1 && (
              <div className={styles.message_box}> {errorMessage1}</div>
            )}
          </Col>
          <Col xs={{ span: 4 }} sm={{ span: 4 }} md={{ span: 1 }}>
            <div className={styles.symboTo}>~</div>
          </Col>
          <Col
            xs={{ span: 10 }}
            sm={{ span: 10 }}
            md={{ span: 3 }}
            className={styles.input_text}
          >
            <Input
              placeholder="$ 最大金額"
              value={maxPrice ? maxPrice : null}
              status={outlineStatus2}
              onChange={maxHandler}
              onBlur={(e) => checkHandler(e, 'maxPrice')}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  checkHandler(e, 'maxPrice');
                }
              }}
            />
            {showErrorMessage2 ? (
              <div className={styles.message_box}> {errorMessage2}</div>
            ) : (
              <div className={styles.message_box}></div>
            )}
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
}
