import React from 'react';
import Styles from './TimeDateFilter.module.css';
import { DownOutlined } from '@ant-design/icons';
import moment from 'moment/moment';
// import zh_TW from 'antd/es/locale/zh_TW';
import {
  DatePicker,
  TimePicker,
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
  handlerChange1,
  handlerChange2,
  onDateChange = '',
  value,
  alert_start,
  alert_end,
  status_end,
  status_start,
  onBlur,
}) {
  const onChange = (date, dateString) => {
    onDateChange(date, dateString); // 直接傳遞選擇的日期給父元件
  };

  const format = 'HH:mm';

  return (
    <ConfigProvider
      // locale={zh_TW}
      theme={{
        token: {
          colorBorder: '#DDDDDD',
          colorLink: '#FD8C46',
          colorPrimary: '#FD8C46',
          colorBgContainer: 'rgba(255,255,255)',
          borderRadius: 10,
          controlHeight: 37,
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
        <div className={Styles.input_area}>
          <DatePicker
            value={value}
            onChange={onChange}
            className={Styles.date}
            placeholder="選擇日期"
            disabledDate={(current) => {
              return moment().add(-1, 'days') >= current;
            }}
          />
        </div>

        <div className={Styles.categor_area}>
          <FontAwesomeIcon icon={faPaw} className={Styles.paw} />
          <p className={Styles.labels}>用餐時間</p>
        </div>
        <div className={Styles.input_section}>
          <div className={Styles.input_area}>
            <TimePicker
              placeholder="開始時間"
              status={status_start}
              onBlur={onBlur}
              value={startTime ? moment(startTime, 'HH:mm') : null}
              onChange={(time) =>
                handlerChange1(time ? time.format('HH:mm') : null)
              }
              className={Styles.input_frame}
              // onChange={handlerChange1}
              format={format}
            />
            <div
              className={Styles.alert}
              style={{ visibility: alert_start ? 'visible' : 'hidden' }}
            >
              {alert_start}
            </div>
          </div>
          <div className={Styles.input_area}>
            <TimePicker
              placeholder="結束時間"
              status={status_end}
              onBlur={onBlur}
              value={endTime ? moment(endTime, 'HH:mm') : null}
              // onChange={handlerChange2}
              onChange={(time) =>
                handlerChange2(time ? time.format('HH:mm') : null)
              }
              className={Styles.input_frame}
              format={format}
            />
            <div
              className={Styles.alert}
              style={{ visibility: alert_end ? 'visible' : 'hidden' }}
            >
              {alert_end}
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
