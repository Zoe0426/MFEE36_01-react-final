import React from 'react';
import Styles from './SignUpForm.module.css';
import Link from 'next/link';
import SecondaryBtn from '../buttons/SecondaryBtn';
import MainBtn from '../buttons/MainBtn';
import { Form, Input, Radio, Select, Row, Col, ConfigProvider } from 'antd';

export default function SignUpForm() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Form
        name="signUpForm"
        className={Styles.signUpForm}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={16}>
          <Col xl={12} lg={24} md={24} sm={24}>
            <Form.Item
              label="姓名"
              className={Styles.formItem}
              name={'name'}
              rules={[
                {
                  required: true,
                  message: '請輸入姓名',
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24}>
            <Form.Item
              label="手機"
              className={Styles.formItem}
              name={'mobile'}
              rules={[
                {
                  required: true,
                  message: '請輸入手機',
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="帳號"
          className={Styles.formItem}
          name={'email'}
          rules={[
            {
              required: true,
              type: 'email',
              message: '請輸入正確Email',
            },
          ]}
        >
          <Input placeholder="請輸入Email" size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密碼"
          rules={[
            {
              required: true,
              message: '請輸入密碼',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="確認密碼"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '請輸入密碼',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('密碼不相符，請重新輸入'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="gender" label="性別">
          <ConfigProvider
            theme={{
              components: {
                Radio: {
                  colorPrimary: '#FD8C46',
                },
              },
            }}
          >
            <Radio.Group>
              <Radio value="男"> 男 </Radio>
              <Radio value="女"> 女 </Radio>
              <Radio value="其他"> 其他 </Radio>
            </Radio.Group>
          </ConfigProvider>
        </Form.Item>
        <Form.Item name="pet" label="寵物">
          <Radio.Group>
            <Radio value="狗"> 狗 </Radio>
            <Radio value="貓"> 貓 </Radio>
            <Radio value="狗貓"> 狗貓 </Radio>
            <Radio value="其他"> 其他 </Radio>
          </Radio.Group>
        </Form.Item>
        <Row gutter={16}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Form.Item name="city" label="縣市">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Form.Item name="area" label="鄉/鎮/區">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="地址" className={Styles.formItem} name={'address'}>
          <Input size="large" />
        </Form.Item>

        <div className={Styles.btns}>
          <Link href="/shop" className={Styles.btn}>
            <SecondaryBtn text="取消" />
          </Link>
          <div className={Styles.btn}>
            <MainBtn text="完成" />
          </div>
        </div>
      </Form>
    </>
  );
}
