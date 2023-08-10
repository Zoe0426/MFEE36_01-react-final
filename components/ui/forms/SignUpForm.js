import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
import Styles from './SignUpForm.module.css';
import SecondaryBtn from '../buttons/SecondaryBtn';
import ModalWithoutBtn from '@/components/ui/modal/modal-without-btn';
import MainBtn from '../buttons/MainBtn';
import {
  Form,
  Input,
  Radio,
  Select,
  Row,
  Col,
  ConfigProvider,
  DatePicker,
} from 'antd';

export default function SignUpForm() {
  const [pass, setPass] = useState(false);
  const [nopass, setNoPass] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const router = useRouter();

  //form 表單驗證
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('選中的值:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // 台灣縣市
  const area_data = {
    臺北市: [
      '中正區',
      '大同區',
      '中山區',
      '萬華區',
      '信義區',
      '松山區',
      '大安區',
      '南港區',
      '北投區',
      '內湖區',
      '士林區',
      '文山區',
    ],
    新北市: [
      '板橋區',
      '新莊區',
      '泰山區',
      '林口區',
      '淡水區',
      '金山區',
      '八里區',
      '萬里區',
      '石門區',
      '三芝區',
      '瑞芳區',
      '汐止區',
      '平溪區',
      '貢寮區',
      '雙溪區',
      '深坑區',
      '石碇區',
      '新店區',
      '坪林區',
      '烏來區',
      '中和區',
      '永和區',
      '土城區',
      '三峽區',
      '樹林區',
      '鶯歌區',
      '三重區',
      '蘆洲區',
      '五股區',
    ],
    基隆市: [
      '仁愛區',
      '中正區',
      '信義區',
      '中山區',
      '安樂區',
      '暖暖區',
      '七堵區',
    ],
    桃園市: [
      '桃園區',
      '中壢區',
      '平鎮區',
      '八德區',
      '楊梅區',
      '蘆竹區',
      '龜山區',
      '龍潭區',
      '大溪區',
      '大園區',
      '觀音區',
      '新屋區',
      '復興區',
    ],
    新竹縣: [
      '竹北市',
      '竹東鎮',
      '新埔鎮',
      '關西鎮',
      '峨眉鄉',
      '寶山鄉',
      '北埔鄉',
      '橫山鄉',
      '芎林鄉',
      '湖口鄉',
      '新豐鄉',
      '尖石鄉',
      '五峰鄉',
    ],
    新竹市: ['東區', '北區', '香山區'],
    苗栗縣: [
      '苗栗市',
      '通霄鎮',
      '苑裡鎮',
      '竹南鎮',
      '頭份鎮',
      '後龍鎮',
      '卓蘭鎮',
      '西湖鄉',
      '頭屋鄉',
      '公館鄉',
      '銅鑼鄉',
      '三義鄉',
      '造橋鄉',
      '三灣鄉',
      '南庄鄉',
      '大湖鄉',
      '獅潭鄉',
      '泰安鄉',
    ],
    臺中市: [
      '中區',
      '東區',
      '南區',
      '西區',
      '北區',
      '北屯區',
      '西屯區',
      '南屯區',
      '太平區',
      '大里區',
      '霧峰區',
      '烏日區',
      '豐原區',
      '后里區',
      '東勢區',
      '石岡區',
      '新社區',
      '和平區',
      '神岡區',
      '潭子區',
      '大雅區',
      '大肚區',
      '龍井區',
      '沙鹿區',
      '梧棲區',
      '清水區',
      '大甲區',
      '外埔區',
      '大安區',
    ],
    南投縣: [
      '南投市',
      '埔里鎮',
      '草屯鎮',
      '竹山鎮',
      '集集鎮',
      '名間鄉',
      '鹿谷鄉',
      '中寮鄉',
      '魚池鄉',
      '國姓鄉',
      '水里鄉',
      '信義鄉',
      '仁愛鄉',
    ],
    彰化縣: [
      '彰化市',
      '員林鎮',
      '和美鎮',
      '鹿港鎮',
      '溪湖鎮',
      '二林鎮',
      '田中鎮',
      '北斗鎮',
      '花壇鄉',
      '芬園鄉',
      '大村鄉',
      '永靖鄉',
      '伸港鄉',
      '線西鄉',
      '福興鄉',
      '秀水鄉',
      '埔心鄉',
      '埔鹽鄉',
      '大城鄉',
      '芳苑鄉',
      '竹塘鄉',
      '社頭鄉',
      '二水鄉',
      '田尾鄉',
      '埤頭鄉',
      '溪州鄉',
    ],
    雲林縣: [
      '斗六市',
      '斗南鎮',
      '虎尾鎮',
      '西螺鎮',
      '土庫鎮',
      '北港鎮',
      '莿桐鄉',
      '林內鄉',
      '古坑鄉',
      '大埤鄉',
      '崙背鄉',
      '二崙鄉',
      '麥寮鄉',
      '臺西鄉',
      '東勢鄉',
      '褒忠鄉',
      '四湖鄉',
      '口湖鄉',
      '水林鄉',
      '元長鄉',
    ],
    嘉義縣: [
      '太保市',
      '朴子市',
      '布袋鎮',
      '大林鎮',
      '民雄鄉',
      '溪口鄉',
      '新港鄉',
      '六腳鄉',
      '東石鄉',
      '義竹鄉',
      '鹿草鄉',
      '水上鄉',
      '中埔鄉',
      '竹崎鄉',
      '梅山鄉',
      '番路鄉',
      '大埔鄉',
      '阿里山鄉',
    ],
    嘉義市: ['東區', '西區'],
    臺南市: [
      '中西區',
      '東區',
      '南區',
      '北區',
      '安平區',
      '安南區',
      '永康區',
      '歸仁區',
      '新化區',
      '左鎮區',
      '玉井區',
      '楠西區',
      '南化區',
      '仁德區',
      '關廟區',
      '龍崎區',
      '官田區',
      '麻豆區',
      '佳里區',
      '西港區',
      '七股區',
      '將軍區',
      '學甲區',
      '北門區',
      '新營區',
      '後壁區',
      '白河區',
      '東山區',
      '六甲區',
      '下營區',
      '柳營區',
      '鹽水區',
      '善化區',
      '大內區',
      '山上區',
      '新市區',
      '安定區',
    ],
    高雄市: [
      '楠梓區',
      '左營區',
      '鼓山區',
      '三民區',
      '鹽埕區',
      '前金區',
      '新興區',
      '苓雅區',
      '前鎮區',
      '小港區',
      '旗津區',
      '鳳山區',
      '大寮區',
      '鳥松區',
      '林園區',
      '仁武區',
      '大樹區',
      '大社區',
      '岡山區',
      '路竹區',
      '橋頭區',
      '梓官區',
      '彌陀區',
      '永安區',
      '燕巢區',
      '田寮區',
      '阿蓮區',
      '茄萣區',
      '湖內區',
      '旗山區',
      '美濃區',
      '內門區',
      '杉林區',
      '甲仙區',
      '六龜區',
      '茂林區',
      '桃源區',
      '那瑪夏區',
    ],
    屏東縣: [
      '屏東市',
      '潮州鎮',
      '東港鎮',
      '恆春鎮',
      '萬丹鄉',
      '長治鄉',
      '麟洛鄉',
      '九如鄉',
      '里港鄉',
      '鹽埔鄉',
      '高樹鄉',
      '萬巒鄉',
      '內埔鄉',
      '竹田鄉',
      '新埤鄉',
      '枋寮鄉',
      '新園鄉',
      '崁頂鄉',
      '林邊鄉',
      '南州鄉',
      '佳冬鄉',
      '琉球鄉',
      '車城鄉',
      '滿州鄉',
      '枋山鄉',
      '霧台鄉',
      '瑪家鄉',
      '泰武鄉',
      '來義鄉',
      '春日鄉',
      '獅子鄉',
      '牡丹鄉',
      '三地門鄉',
    ],
    宜蘭縣: [
      '宜蘭市',
      '羅東鎮',
      '蘇澳鎮',
      '頭城鎮',
      '礁溪鄉',
      '壯圍鄉',
      '員山鄉',
      '冬山鄉',
      '五結鄉',
      '三星鄉',
      '大同鄉',
      '南澳鄉',
    ],
    花蓮縣: [
      '花蓮市',
      '鳳林鎮',
      '玉里鎮',
      '新城鄉',
      '吉安鄉',
      '壽豐鄉',
      '秀林鄉',
      '光復鄉',
      '豐濱鄉',
      '瑞穗鄉',
      '萬榮鄉',
      '富里鄉',
      '卓溪鄉',
    ],
    臺東縣: [
      '臺東市',
      '成功鎮',
      '關山鎮',
      '長濱鄉',
      '海端鄉',
      '池上鄉',
      '東河鄉',
      '鹿野鄉',
      '延平鄉',
      '卑南鄉',
      '金峰鄉',
      '大武鄉',
      '達仁鄉',
      '綠島鄉',
      '蘭嶼鄉',
      '太麻里鄉',
    ],
    澎湖縣: ['馬公市', '湖西鄉', '白沙鄉', '西嶼鄉', '望安鄉', '七美鄉'],
    金門縣: ['金城鎮', '金湖鎮', '金沙鎮', '金寧鄉', '烈嶼鄉', '烏坵鄉'],
    連江縣: ['南竿鄉', '北竿鄉', '莒光鄉', '東引鄉'],
  };
  const cityList = Object.keys(area_data);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  const initialValues = {
    city: '請選擇',
    area: '請選擇',
  };
  const handleCityChange = (value) => {
    setSelectedCity(value);
    setSelectedArea('');

    form.setFieldsValue({
      area: '請選擇',
    });
  };

  const handleAreaChange = (value) => {
    setSelectedArea(value);
  };

  // 表單送出
  const handleSubmit = (values) => {
    fetch('http://localhost:3002/member-api', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        if (data.success === false) {
          setPass(false);
          setNoPass(true);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 1000);
        } else {
          setNoPass(false);
          setPass(true);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            router.push('/member/sign-in');
          }, 1000);
          form.resetFields();
        }
      });
  };

  const validatePhone = (_, value) => {
    if (!value || /^09\d{8}$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject('手機格式不正確');
  };

  const handleChange = (event) => {
    setNoPass(false);
    const email = event.target.value;

    // Check if the email is valid using a basic regex pattern.
    const ValidEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    console.log('ValidEmail', ValidEmail);
    setIsValidEmail(false);
    if (ValidEmail) {
      setIsValidEmail(true);
    }
  };

  const getFormItemProps = () => {
    if (nopass) return { validateStatus: 'error', help: '此帳號已註冊過！' };
    if (pass) return { validateStatus: '', help: '' };
    if (!isValidEmail)
      return { validateStatus: 'error', help: '請輸入正確的Email！' };
  };

  // const getFormItemProps = () => {
  // return {
  //   ...nopass,
  //   ...isValidEmail,
  //   };
  // };
  // 密碼驗證
  const [lengthValid, setLengthValid] = useState(false);
  const [lowerValid, setLowerValid] = useState(false);
  const [upperValid, setUpperValid] = useState(false);
  const [numberValid, setNumberValid] = useState(false);

  const handlePwdChange = (value) => {
    console.log(value);
    // regex
    const length = new RegExp('(?=.{8,})');
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');

    if (lower.test(value)) {
      setLowerValid(true);
    } else {
      setLowerValid(false);
    }

    if (upper.test(value)) {
      setUpperValid(true);
    } else {
      setUpperValid(false);
    }

    if (length.test(value)) {
      setLengthValid(true);
    } else {
      setLengthValid(false);
    }

    if (number.test(value)) {
      setNumberValid(true);
    } else {
      setNumberValid(false);
    }

    return value;
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
          form={form}
          name="signUpForm"
          initialValues={initialValues}
          className={Styles.signUpForm}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col xl={12} lg={24} md={24} sm={24}>
              <Form.Item
                label="姓名"
                className={Styles.formItem}
                name="name"
                rules={[
                  {
                    type: 'string',
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
                  { required: true, message: '請輸入手機號碼' },
                  { validator: validatePhone },
                ]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="帳號"
            className={Styles.formItem}
            name="email"
            onChange={handleChange}
            {...getFormItemProps()}
            // {...getFormItemProps2()}
            rules={[{ required: true, message: '請輸入 Email' }]}
          >
            <Input placeholder="請輸入Email" size="large" />
          </Form.Item>
          {/* {nopass && !pass && (
            <div className="signNoPass">此帳號已註冊過 ！</div>
          )} */}
          <Form.Item
            name="password"
            label="密碼"
            rules={[
              {
                required: true,
                message: '請輸入密碼',
              },
            ]}
            getValueFromEvent={(e) => e.target.value}
          >
            <div>
              <Input.Password
                size="large"
                onChange={(e) => handlePwdChange(e.target.value)}
              />
              <div className={Styles.validBox}>
                <div className={lengthValid ? `${Styles.validated}` : ''}>
                  至少8個字元
                </div>
                <div className={numberValid ? `${Styles.validated}` : ''}>
                  至少一個數字
                </div>
                <div className={upperValid ? `${Styles.validated}` : ''}>
                  至少一個大寫英文字母
                </div>
                <div className={lowerValid ? `${Styles.validated}` : ''}>
                  至少一個小寫英文字母
                </div>
              </div>
            </div>
          </Form.Item>

          <Form.Item
            name="confirm"
            label="確認密碼"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: '請輸入密碼',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  console.log('Password: ', getFieldValue('password'));
                  console.log('Confirm password: ', value);
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

          <Form.Item label="生日" name="birthday">
            <DatePicker
              size="large"
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item label="性別" name="gender">
            <Radio.Group>
              <Radio value="男"> 男 </Radio>
              <Radio value="女"> 女 </Radio>
              <Radio value="其他"> 其他 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="寵物"
            name="pet"
            rules={[
              {
                required: true,
                message: '請填寫寵物',
              },
            ]}
          >
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
                <Select
                  size="large"
                  placeholder="請選擇"
                  onChange={handleCityChange}
                >
                  {cityList.map((city, i) => {
                    return (
                      <Select.Option key={i} value={city}>
                        {city}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item name="area" label="鄉/鎮/區">
                <Select
                  size="large"
                  placeholder="請選擇"
                  onChange={handleAreaChange}
                >
                  {selectedCity &&
                    area_data[selectedCity].map((area, i) => {
                      return (
                        <Select.Option key={i} value={area}>
                          {area}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="地址" className={Styles.formItem} name="address">
            <Input size="large" />
          </Form.Item>

          <div className={Styles.btns}>
            <div className={Styles.btn}>
              <SecondaryBtn text="取消" htmltype="reset" />
            </div>
            <div className={Styles.btn}>
              <MainBtn text="完成" htmltype="submit" />
            </div>
          </div>
        </Form>
      </ConfigProvider>
      {nopass && showAlert && (
        <ModalWithoutBtn
          text="註冊失敗"
          img="/member-center-images/Icon/no.svg"
        />
      )}
      {pass && showAlert && (
        <ModalWithoutBtn
          text="註冊成功"
          img="/member-center-images/Icon/happy.svg"
        />
      )}
    </>
  );
}
