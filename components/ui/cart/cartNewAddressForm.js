import { useState } from 'react';
import style from './cartNewAddressForm.module.css';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Space,
  ConfigProvider,
} from 'antd';

export default function CartNewAddressForm({
  postType = 1,
  postAddData = [],
  setPostAddData = () => {},
}) {
  const provinceData = ['Zhejiang', 'Jiangsu'];
  const cityData = {
    Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
  };

  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);
  const handleProvinceChange = (value) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };
  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };

  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Form data:', values);
    form.resetFields();
  };
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FD8C46',
            fontSize: 16,
          },
        }}
      >
        <div>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Space>
              <Form.Item
                style={{ paddingBottom: '0px' }}
                name="recipient"
                label="收件人"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label="手機"
                rules={[{ required: true }]}
                style={{ paddingBottom: '0px' }}
              >
                <Input />
              </Form.Item>
            </Space>

            <Form.Item
              name="address"
              label="地址"
              rules={[{ required: true }]}
              style={{ paddingBottom: '0px' }}
            >
              <Input />
            </Form.Item>
            <Checkbox />
            <Form.Item
              name="defaultAddress"
              valuePropName="checked"
              label="預設地址"
              style={{ paddingBottom: '0px' }}
            ></Form.Item>
            <Form.Item style={{ paddingBottom: '0px' }}>
              <Button type="primary" htmlType="submit">
                新增地址
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Space wrap>
          <Select
            defaultValue={provinceData[0]}
            style={{
              width: 120,
            }}
            onChange={handleProvinceChange}
            options={provinceData.map((province) => ({
              label: province,
              value: province,
            }))}
          />
          <Select
            style={{
              width: 120,
            }}
            value={secondCity}
            onChange={onSecondCityChange}
            options={cities.map((city) => ({
              label: city,
              value: city,
            }))}
          />
        </Space>
      </ConfigProvider>
    </>
  );
}
