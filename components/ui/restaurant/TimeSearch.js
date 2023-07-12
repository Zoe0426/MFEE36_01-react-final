import React from 'react';
import Styles from './TimeSearch.module.css';
import { DownOutlined } from '@ant-design/icons';
import {
  DatePicker,
  Button,
  Dropdown,
  Space,
  message,
  ConfigProvider,
  Row,
  Col,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

export default function TimeSearch({ totalItems = 0 }) {
  const handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
  };
  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const items = [
    {
      label: '評價高到低',
      key: '1',
    },
    {
      label: '評價低到高',
      key: '2',
    },
    {
      label: '最熱門',
      key: '3',
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBorder: '#DDDDDD',
          colorPrimary: '#FD8C46',
          colorBgContainer: 'rgba(255,255,255)',
          borderRadius: 10,
          controlHeight: 50,
          fontSize: 16,
          borderRadiusOuter: 10,

        },
      }}
    >
      <div className={Styles.total_pages_rank}>
        <div className={Styles.categor_area}>
          <FontAwesomeIcon icon={faPaw} className={Styles.paw} />
          <p className={Styles.labels}>用餐日期</p>
        </div>

        <DatePicker onChange={onChange} className={Styles.date}  placeholder="選擇日期" />
        <div className={Styles.categor_area}>
          <FontAwesomeIcon icon={faPaw} className={Styles.paw} />
          <p className={Styles.labels}>用餐時間</p>
        </div>
        <Dropdown menu={menuProps} className={Styles.time}>
          <Button>
            <Space>
              <p className={Styles.arrow}>時間</p>
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>

      </div>
    </ConfigProvider>
  );
}
