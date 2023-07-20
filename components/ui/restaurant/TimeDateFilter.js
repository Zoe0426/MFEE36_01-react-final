import React from 'react';
import Styles from './TimeDateFilter.module.css';
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
import { values } from 'lodash';

export default function TimeDateFilter({
  totalItems = 0,
  startTime = '',
  endTime = '',
  handlerChange1 = '',
  handlerChange2 = '',
}) {
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
      label: '08:00~10:00',
      key: '1',
    },
    {
      label: '10:00~12:00',
      key: '2',
    },
    {
      label: '12:00~14:00',
      key: '3',
    },
    {
      label: '14:00~16:00',
      key: '4',
    },
    {
      label: '16:00~18:00',
      key: '5',
    },
    {
      label: '18:00~20:00',
      key: '6',
    },
    {
      label: '20:00~22:00',
      key: '7',
    },
    {
      label: '22:00~00:00',
      key: '8',
    },
    {
      label: '00:00~02:00',
      key: '9',
    },
    {
      label: '02:00~04:00',
      key: '10',
    },
    {
      label: '04:00~06:00',
      key: '11',
    },
    {
      label: '06:00~08:00',
      key: '12',
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

        <DatePicker
          onChange={onChange}
          className={Styles.date}
          placeholder="選擇日期"
        />

        <div className={Styles.categor_area}>
          <FontAwesomeIcon icon={faPaw} className={Styles.paw} />
          <p className={Styles.labels}>用餐時間</p>
        </div>
        {/* <Dropdown menu={menuProps} className={Styles.time}>
          <Button>
            <Space>
              <p className={Styles.arrow}>時間</p>
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown> */}
        <input
          type="time"
          placeholder="開始時間"
          id="startTimeInput"
          value={startTime}
          onChange={handlerChange1}
        />
        <input
          type="time"
          placeholder="結束時間"
          id="endTimeInput"
          value={endTime}
          onChange={handlerChange2}
        />
      </div>
    </ConfigProvider>
  );
}
