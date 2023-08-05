import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import style from './cartNewAddressForm.module.css';
import areaData, { countries } from '@/data/restaurnt/location';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  ConfigProvider,
  Row,
  Col,
} from 'antd';

export default function CartNewAddressForm({
  postType = 1,
  postAddData = [],
  setPostAddData = () => {},
  setaddNewBox = () => {},
  setMapData = () => {},
  setselectedAddSid = '',
}) {
  const [form] = Form.useForm();
  const validatePhone = (_, value) => {
    if (!value || /^09\d{8}$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject('手機格式不正確');
  };
  const [cities, setCities] = useState(areaData[countries[0]]);
  const [secondCity, setSecondCity] = useState(areaData[countries[0]][0]);
  const handleProvinceChange = (value) => {
    setCities(areaData[value]);
    form.setFieldsValue({ area: areaData[value][0] });
  };
  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };

  const handleSubmit = (values) => {
    const newSid = `0${uuid()}`;
    console.log({ postAddData });
    postAddData.unshift({
      address: values.address,
      address_sid: newSid,
      area: values.area,
      city: values.city,
      create_time: '',
      default_status: values.defaultAddress ? 1 : 0,
      email: '',
      member_sid: '',
      post_type: postType,
      recipient: values.recipient,
      recipient_phone: values.phone,
      selected: true,
      store_name: null,
      update_time: '',
    });
    console.log(postAddData);
    const newData = postAddData.map((v, i) => {
      if (values.defaultAddress) {
        console.log(i, v.address_sid);
        console.log(i, newSid);
        return v.address_sid === newSid
          ? { ...v, selected: true, default_status: 1 }
          : { ...v, selected: false, default_status: 0 };
      } else {
        return v.address_sid !== newSid ? { ...v } : { ...v, selected: false };
      }
    });
    let updateList = [];
    if (postType === 1) {
      updateList = newData.filter((v) => v.post_type === 1);
    } else if (postType === 2) {
      updateList = newData.filter((v) => v.post_type === 2);
    } else if (postType === 3) {
      updateList = newData.filter((v) => v.post_type === 3);
    }
    console.log(newData);
    setPostAddData(newData);
    setMapData(updateList);
    setaddNewBox(false);
    setselectedAddSid(newSid);
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
        <div className={style.formBox}>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  style={{ paddingBottom: '0px' }}
                  name="recipient"
                  label="收件人"
                  rules={[{ required: true, message: '請輸入姓名' }]}
                >
                  <Input placeholder="請輸入姓名" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="手機"
                  rules={[
                    { required: true, message: '請輸入手機號碼' },
                    { validator: validatePhone },
                  ]}
                  style={{ paddingBottom: '0px' }}
                >
                  <Input placeholder="請輸入手機" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="city"
                  label="縣市"
                  rules={[{ required: true }]}
                  style={{ paddingBottom: '0px' }}
                >
                  <Select
                    placeholder="請選擇"
                    style={{
                      width: 120,
                    }}
                    style={{ width: '100%' }}
                    onChange={handleProvinceChange}
                    options={countries.map((province) => ({
                      label: province,
                      value: province,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="area"
                  label="地區"
                  rules={[{ required: true }]}
                  style={{ paddingBottom: '0px' }}
                >
                  <Select
                    style={{
                      width: 120,
                    }}
                    value={secondCity}
                    placeholder="請選擇"
                    style={{ width: '100%' }}
                    onChange={onSecondCityChange}
                    options={cities.map((city) => ({
                      label: city,
                      value: city,
                    }))}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="address"
              label="地址"
              rules={[{ required: true, message: '請輸入收件地址' }]}
              style={{ paddingBottom: '0px' }}
            >
              <Input placeholder="請輸入正確地址，才能收到產品喔～" />
            </Form.Item>
            <Form.Item
              name="defaultAddress"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Checkbox style={{ marginRight: 8 }}>預設地址</Checkbox>
            </Form.Item>
            <Row>
              <Button
                type="default"
                onClick={() => {
                  setaddNewBox(false);
                }}
              >
                取消新增
              </Button>
              <Form.Item style={{ paddingBottom: '0px', paddingLeft: '16px' }}>
                <Button type="primary" htmlType="submit">
                  新增地址
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </div>
      </ConfigProvider>
    </>
  );
}
