import React from 'react';
import { Row, Col, Checkbox, ConfigProvider } from 'antd';
import Styles from './RestaurantFilter.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
export default function RestaurantFilter({
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
          fontSize: 18,
          controlInteractiveSize: 18,
        },
      }}
    >
      <div className={Styles.filter}>
        <div className={Styles.categor_area}>
          <FontAwesomeIcon icon={faPaw} className={Styles.paw} />
          <label className={Styles.labels}>{text}</label>
        </div>
        <div className={Styles.checkBoxs}>
          <Checkbox.Group style={{ width: '100%' }} onChange={onChange} />
          <Row gutter={[16, 16]}>
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
