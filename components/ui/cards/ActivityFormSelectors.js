import React, { useState } from 'react';
import { Radio, Button, DatePicker, Form, ConfigProvider } from 'antd';
const { RangePicker } = DatePicker;

const ActivityFormSelectors = () => {
  const plainOptions = [
    '主題派對',
    '在地活動',
    '市集展覽',
    '毛孩講座',
    '寵物學校',
    '願望實現清單',
  ];
  const [value1, setValue1] = useState('');

  const onChange1 = (e) => {
    console.log('radio1 checked', e.target.value);
    setValue1(e.target.value);
  };

  // const formItemLayout = {
  //   labelCol: {
  //     xs: {
  //       span: 24,
  //     },
  //     sm: {
  //       span: 24,
  //     },
  //   },
  //   wrapperCol: {
  //     xs: {
  //       span: 24,
  //     },
  //     sm: {
  //       span: 24,
  //     },
  //   },
  // };

  const rangeConfig = {
    rules: [
      {
        type: 'array',
      },
    ],
  };

  // submit時送出值
  const onFinish = (fieldsValue) => {
    const rangeValue = fieldsValue['range-picker'];
    const values = {
      ...fieldsValue,
      'range-picker': [
        rangeValue[0].format('YYYY-MM-DD'),
        rangeValue[1].format('YYYY-MM-DD'),
      ],
      'radio-value': value1,
    };
    console.log('Received values of form: ', values);
  };

  return (
    <div className="container-inner">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FD8C46',
            fontSize: 18,
            controlInteractiveSize: 18,
          },
        }}
      >
        <Form name="time_related_controls" onFinish={onFinish}>
          <Form.Item name="range-picker" label="活動日期" {...rangeConfig}>
            <RangePicker />
          </Form.Item>

          <div>
            <p>活動類別：</p>
            <Radio.Group
              options={plainOptions}
              onChange={onChange1}
              value={value1}
            />
          </div>

         
          <Button type="primary" htmlType="submit">
              送出
          </Button>
          
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default ActivityFormSelectors;
