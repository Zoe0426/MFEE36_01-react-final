import React from 'react';
import { Row, Col, Checkbox, ConfigProvider  } from 'antd';
import styles from './ActivityFilter.module.css';
import { useRouter } from 'next/router';

export default function ActivityFilter({
  text = '',
  name = '',
  data = [],
  needSpan = true,
  checkboxToggleHandler = () => {},
}) {
  
  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#FD8C46',
        colorText: 'rgb(81, 81, 81)',
        fontSize: 18,
        controlInteractiveSize: 18,
        lineHeight: 1.8,
      },
    }}
  >
    <div className={styles.filter}>
      <label className={styles.labels}>{text}</label>
      <div className={styles.checkBoxs}>
        <Checkbox.Group style={{ width: '100%' }} />
        <Row gutter={[16, 0]}>
          {data.map((v) => {
            return (
              <Col
                xs={{ span: needSpan && 12 }}
                sm={{ span: needSpan && 12 }}
                md={{ span: needSpan && 3 }}
                //   span={needSpan && 3}
                key={v.id}
              >
                <Checkbox
                  value={v.value}
                  checked={v.checked}
                  onChange={() => checkboxToggleHandler(name, v.label)}
                >
                  {v.label}
                </Checkbox>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  </ConfigProvider>
  );
}
