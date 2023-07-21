import React from 'react';
import Styles from './SignInForm.module.css';
import MainBtn from '../buttons/MainBtn';
import SecondaryBtn from '../buttons/SecondaryBtn';
import Link from 'next/link';
import { Form, Input, ConfigProvider } from 'antd';

export default function SignInForm({ handleSubmit }) {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FD8C46',
            colorText: 'rgb(81, 81, 81)',
            fontSize: 18,
            controlInteractiveSize: 18,
          },
          components: {
            Radio: {
              colorPrimary: '#FD8C46',
            },
          },
        }}
      >
        <Form
          name="loginForm"
          className={Styles.loginForm}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
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
            className={Styles.formItem}
            name={'password'}
            rules={[
              {
                required: true,
                message: '請輸入密碼',
              },
            ]}
          >
            <Input.Password placeholder="請輸入密碼" size="large" />
          </Form.Item>
          <div className={Styles.btnsContain}>
            <Link href="/shop" className={Styles.forgetPwd}>
              忘記密碼？
            </Link>
            <div className={Styles.btns}>
              <Link href="/member/sign-up" className={Styles.btn}>
                <SecondaryBtn text="註冊" />
              </Link>
              <div className={Styles.btn}>
                <MainBtn text="完成" htmltype="submit" />
              </div>
            </div>
          </div>
          <div className={Styles.line}>
            <div className={Styles.lineText}>更多登入方式</div>
          </div>
          <div className={Styles.google}>
            <img src="/member-center-images/google.svg" alt="" />
          </div>
        </Form>
      </ConfigProvider>
    </>
  );
}
