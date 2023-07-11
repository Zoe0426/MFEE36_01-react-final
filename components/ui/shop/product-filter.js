import React from 'react';
import { Row, Col, Checkbox, ConfigProvider } from 'antd';
import styles from './product-filter.module.css';
export default function ProductFilter({
  text = '',
  data = [],
  needSpan = true,
  onChange = () => {},
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FD8C46',
          colorText: 'rgb(81, 81, 81)',
          fontSize: 20,
          fontSizeLG: 20,
          controlInteractiveSize: 18,
        },
      }}
    >
      <div className={styles.filter}>
        <label className={styles.labels}>{text}</label>
        <div className={styles.checkBoxs}>
          <Checkbox.Group style={{ width: '100%' }} onChange={onChange} />
          <Row gutter={[16, 8]}>
            {data.map((v) => {
              return (
                <Col
                  xs={{ span: needSpan && 12 }}
                  sm={{ span: needSpan && 12 }}
                  md={{ span: needSpan && 3 }}
                  //   span={needSpan && 3}
                  key={v.value}
                >
                  <Checkbox value={v.value}>{v.label}</Checkbox>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </ConfigProvider>
  );
}
