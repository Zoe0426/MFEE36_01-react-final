import { useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import style from './cartNewAddressForm.module.css';
import areaData, { countries } from '@/data/restaurnt/location';
import AuthContext from '@/context/AuthContext';
import SearchSeven from './searchSeven';
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
  setShowAddSuccess = () => {},
  setShowAddFail = () => {},
  memEmail = '',
}) {
  const [form] = Form.useForm();
  const { auth } = useContext(AuthContext);
  const validatePhone = (_, value) => {
    if (!value || /^09\d{8}$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject('手機格式不正確');
  };
  const [cities, setCities] = useState(areaData[countries[0]]);
  const [secondCity, setSecondCity] = useState(areaData[countries[0]][0]);
  const [sevenAddress, setSevenAddress] = useState('');
  const handleProvinceChange = (value) => {
    setCities(areaData[value]);
    form.setFieldsValue({ area: areaData[value][0] });
  };
  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };
  const newAddressToDB = async (newAddress) => {
    const r = await fetch(`${process.env.API_SERVER}/cart-api/add-newAddress`, {
      method: 'POST',
      body: JSON.stringify({ member_sid: auth.id, data: newAddress }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await r.json();
    return data;
  };
  const handleSubmit = async (values) => {
    const newSid = `0${uuid()}`;
    //整理地址
    let mycity = '';
    let myarea = '';
    let myaddress = '';
    let mystorename = '';
    if (postType === 1) {
      mycity = values.city;
      myarea = values.area;
      myaddress = values.address;
      mystorename = null;
    } else if (postType === 2) {
      mycity = '';
      myarea = '';
      myaddress = values.sevenAddress.split('_')[0];
      mystorename = values.sevenAddress.split('_')[1];
    }
    //原有資料加入新地址
    //console.log({ values });
    postAddData.unshift({
      address: myaddress,
      address_sid: newSid,
      area: myarea,
      city: mycity,
      create_time: '',
      default_status: values.defaultAddress ? 1 : 0,
      email: memEmail,
      member_sid: '',
      post_type: postType,
      recipient: values.recipient,
      recipient_phone: values.phone,
      selected: true,
      store_name: mystorename,
      update_time: '',
    });
    //整理預設地址
    const newData = postAddData.map((v, i) => {
      if (values.defaultAddress) {
        //有設預設的話，其它都設回不預設
        // console.log(i, v.address_sid);
        // console.log(i, newSid);
        return v.address_sid === newSid
          ? { ...v }
          : { ...v, selected: false, default_status: 0 };
      } else {
        //有設預設的話
        return v.address_sid === newSid ? { ...v } : { ...v, selected: false };
      }
    });
    //新地址送資料庫
    const r = await newAddressToDB(newData.filter((v) => v.selected)[0]);
    let sidupDatedData = [];
    //新增地址成功更新addressID
    if (r.success) {
      setShowAddSuccess(true);
      setTimeout(() => {
        setShowAddSuccess(false);
      }, 1000);
      sidupDatedData = newData.map((v) =>
        v.address_sid === newSid ? { ...v, address_sid: r.newId } : { ...v }
      );
    } else {
      alert('新增失敗');
      setShowAddFail(true);
      setShowAddFail(() => {
        setShowAddSuccess(false);
      }, 1000);
      throw new Error('新增地址時出錯');
    }
    //整理展現清單
    let updateList = [];
    if (postType === 1) {
      updateList = sidupDatedData.filter((v) => v.post_type === 1);
    } else if (postType === 2) {
      updateList = sidupDatedData.filter((v) => v.post_type === 2);
    } else if (postType === 3) {
      updateList = sidupDatedData.filter((v) => v.post_type === 3);
    }
    setPostAddData(sidupDatedData);
    setMapData(updateList);
    setaddNewBox(false);
    setselectedAddSid(r.newId);
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
          <img
            src="/home-images/h-tree.png"
            alt="tree"
            className={style.decoImg}
          />
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            {/* ==============姓名/電話============== */}
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
            {/* ==============地址============== */}
            {postType === 1 ? (
              <>
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
              </>
            ) : (
              <Form.Item
                label="請選擇門市"
                className={style.searchSeven}
                name="sevenAddress"
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: '請選擇門市' }]}
              >
                <SearchSeven
                  form={form}
                  sevenAddress={sevenAddress}
                  setSevenAddress={setSevenAddress}
                ></SearchSeven>
              </Form.Item>
            )}

            {/* ==============預設地址checkbox============== */}
            <Form.Item
              name="defaultAddress"
              style={{ marginBottom: 0 }}
              valuePropName="checked"
            >
              <Checkbox style={{ marginRight: 8 }}>預設地址</Checkbox>
            </Form.Item>
            {/* ==============Btns============== */}
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
