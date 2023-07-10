import React from 'react';
import Styles from './SignUpForm.module.css';
import Link from 'next/link';
import SecondaryBtn from '../buttons/SecondaryBtn';
import MainBtn from '../buttons/MainBtn';
import {
  Form,
  Input,
  Radio,
  Select,
  Row,
  Col,
  ConfigProvider,
  Button,
  DatePicker,
} from 'antd';

export default function SignUpForm() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const [form] = Form.useForm();
  const handleReset = () => {
    // 用 form.resetFields() 來重置表單
    form.resetFields();
  };
  return (
    <>
      <Form
        form={form}
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
          <Input.Password size="large" />
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
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item label="生日">
          <DatePicker
            size="large"
            style={{
              width: '100%',
            }}
          />
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
              <Radio value="狗"> 狗 </Radio>
              <Radio value="貓"> 貓 </Radio>
              <Radio value="狗貓"> 狗貓 </Radio>
              <Radio value="其他"> 其他 </Radio>
            </Radio.Group>
          </ConfigProvider>
        </Form.Item>
        <Row gutter={16}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Form.Item name="city" label="縣市">
              <Select size="large">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Form.Item name="area" label="鄉/鎮/區">
              <Select size="large">
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="地址" className={Styles.formItem} name={'address'}>
          <Input size="large" />
        </Form.Item>

        <div className={Styles.btns}>
          <div className={Styles.btn}>
            <SecondaryBtn onClick={handleReset} text="取消" />
          </div>
          <div className={Styles.btn}>
            <MainBtn text="完成" />
          </div>
        </div>
        <Button onClick={handleReset} htmlType="reset">
          取消
        </Button>
        <Button htmlType="submit">完成</Button>
      </Form>
    </>
  );
}
