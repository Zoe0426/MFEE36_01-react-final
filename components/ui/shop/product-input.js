import React from 'react';
import styles from './product-input.module.css';
import { Row, Col, Input, ConfigProvider } from 'antd';

export default function ProductInput({
  inputs = [],
  changeHandler = () => {},
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
          {inputs.map(({ key, value, placeholder, errorMessage }) => {
            return (
              <Col
                key={key}
                xs={{ span: 10, order: key === 'minPrice' ? 0 : 1 }}
                sm={{ span: 10, order: key === 'minPrice' ? 0 : 1 }}
                md={{ span: 3, order: key === 'minPrice' ? 0 : 1 }}
                className={styles.input_text}
              >
                <Input
                  placeholder={placeholder}
                  value={value ? value : null}
                  status={!!errorMessage && 'error'}
                  onChange={(e) => changeHandler(e, key)}
                  onBlur={(e) => checkHandler(e, key)}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      checkHandler(e, key);
                    }
                  }}
                />
                {!!errorMessage && (
                  <div className={styles.message_box}> {errorMessage}</div>
                )}
              </Col>
            );
          })}
          {/* <Col
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
          </Col> */}
          <Col
            xs={{ span: 4, order: 0 }}
            sm={{ span: 4, order: 0 }}
            md={{ span: 1, order: 0 }}
          >
            <div className={styles.symboTo}>~</div>
          </Col>
          {/* <Col
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
          </Col> */}
        </Row>
      </div>
    </ConfigProvider>
  );
}
