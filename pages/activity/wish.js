import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../../styles/activitywish.module.css';
import SubBtn from '@/components/ui/buttons/subBtn';

import {
  Row,
  Col,
  Form,
  Input,
  Select,
  ConfigProvider,
  faUserPlus,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SearchBar from '@/components/ui/buttons/SearchBar';
// import Likelist from '@/components/ui/like-list/like-list';
import IconBtn from '@/components/ui/buttons/IconBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import MainBtn from '@/components/ui/buttons/MainBtn';

import BreadCrumb from '@/components/ui/bread-crumb/breadcrumb';
import BGUpperDecoration from '@/components/ui/decoration/bg-upper-decoration';

import Modal from '@/components/ui/modal/modal';
import ModoalReminder from '@/components/ui/shop/modoal-reminder';
import ModalWithoutBtn from '@/components/ui/modal/modal-without-btn';

export default function ActivityWish() {
  const router = useRouter();

  const { auth } = useContext(AuthContext);
  const authId = auth.id;

  const { TextArea } = Input;

  const [successAddToCard, setSuccessAddToCard] = useState(false);

  const initialFormValues = {
    name: '',
    city: '請選擇',
    area: '請選擇',
    content: '',
    other_message: '',
  };

  const [formData, setFormData] = useState(initialFormValues);

  //沒登入會員收藏，跳轉登入
  const toSingIn = () => {
    const from = router.query;
    router.push(
      `/member/sign-in?from=${
        process.env.WEB
      }/activity/wish?${new URLSearchParams(from).toString()}`
    );
  };

  // 小麵包屑------------------------------------------------------------
  const [breadCrubText, setBreadCrubText] = useState([
    {
      id: 'activity',
      text: '活動首頁',
      href: `${process.env.WEB}/activity`,
      show: true,
    },
    {
      id: 'search',
      text: '> 願望列表',
      href: `${process.env.WEB}/activity/wishlist`,
      show: true,
    },
    { id: 'wish', text: '> 我要許願', href: '', show: true },
  ]);

  //form 表單驗證
  const [form] = Form.useForm();
  const onFinish = (values) => {
    //console.log('選中的值:', values);
    handleSubmit(values);
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

  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };

  const handleSubmit = async (values) => {
    const { name, city, area, content, other_message } = values;

    try {
      await orderActivityClick(
        auth.token,
        authId,
        name,
        city,
        area,
        content,
        other_message
      );
      //console.log('Wish submitted successfully');

      form.resetFields();
      setSelectedCity('');
      setSelectedArea('');
    } catch (error) {
      console.error('Error submitting wish:', error);
    }
  };

  const handleResetForm = () => {
    setFormData(initialFormValues);
    setSelectedCity('');
    setSelectedArea('');
  };

  const orderActivityClick = async (
    token,
    authId,
    name,
    city,
    area,
    content,
    other_message
  ) => {
    try {
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const requestBody = {
        member_sid: authId,
        name: name,
        city: city,
        area: area,
        content: content,
        other_message: other_message,
      };

      const response = await fetch(
        `${process.env.API_SERVER}/activity-api/wish`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error('送出願望 失敗');
      }

      //成功的話
      setSuccessAddToCard(true);
      setTimeout(() => {
        router.push(
          `${process.env.WEB}/activity/vote`
        );
      }, 1200);
      
      //失敗的話
      setTimeout(() => {
        setSuccessAddToCard(false);
      }, 1200);

      //console.log('送出願望 成功');
    } catch (error) {
      throw new Error('Error submitting wish: ' + error.message);
    }
  };

  return (
    <div>
      <Head>
        <title>狗with咪 | 活動</title>
      </Head>

      {/* .........banner......... */}
      <div className={styles.banner}></div>

      <div className={styles.bgc}>
        <div className="container-inner">
          <BreadCrumb breadCrubText={breadCrubText} />
        </div>
      </div>

      {/* .........分類bar......... */}
      <div className={styles.type}>
        <div className="container-inner">
          <div className={styles.type_btn_group}>
            <img
              className={styles.type_decoration}
              src="../activity_img/decoration1.png"
              alt=""
            />
            <Link
              href={`${process.env.WEB}/activity/wishlist`}
              className={styles.custom_link}
            >
              <SubBtn img="../activity_img/subicon_6.png" text="願望清單" />
            </Link>
            <Link
              href={`${process.env.WEB}/activity/vote`}
              className={styles.custom_link}
            >
              <SubBtn img="../activity_img/subicon_7.png" text="我要投票" />
            </Link>
            <Link
              href={`${process.env.WEB}/activity/wish`}
              className={styles.custom_link}
            >
              <SubBtn img="../activity_img/subicon_9.png" text="我要許願" />
            </Link>

            <img
              className={styles.type_decoration}
              src="../activity_img/decoration1.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <BGUpperDecoration />

      <div className="container-inner">
        <div className={styles.title}>
          <div className={styles.title_text}>活動許願池</div>
          <p className={styles.intro}>
            歡迎想發起活動的您，將活動需求填寫於下方表單中。
          </p>
          <p className={styles.intro}>表單送出後可以到'我要投票'看最新投票狀況噢！</p>
        </div>
      </div>

      <div className="container-inner">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#FD8C46',
              colorText: 'rgb(81, 81, 81)',
              fontSize: 18,
              controlInteractiveSize: 18,
            },
          }}
        >
          <Form
            form={form}
            name="activityWishForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onSubmit={handleSubmit}
            className={styles.form_outer}
            initialValues={formData}
          >
            <Form.Item
              label="活動名稱"
              className={styles.formItem}
              name="name"
              rules={[
                {
                  required: true,
                  message: '請輸入活動名稱',
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Row gutter={16}>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="city"
                  label="縣市"
                  className={styles.formItem}
                  rules={[
                    {
                      required: true,
                      message: '請選擇縣市',
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="請選擇"
                    onChange={handleCityChange}
                  >
                    {cityList.map((city, i) => (
                      <Select.Option key={i} value={city}>
                        {city}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  name="area"
                  label="地區"
                  className={styles.formItem}
                  rules={[
                    {
                      required: true,
                      message: '請選擇地區',
                    },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="請選擇"
                    onChange={handleAreaChange}
                  >
                    {selectedCity &&
                      area_data[selectedCity].map((area, i) => (
                        <Select.Option key={i} value={area}>
                          {area}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="活動內容"
              className={styles.formItem}
              name="content"
              rules={[
                {
                  required: true,
                  message: '請輸入活動內容',
                },
              ]}
            >
              <TextArea
                showCount
                style={{
                  height: 500,
                  resize: 'none',
                }}
                onChange={onChange}
                placeholder="活動內容..."
              />
            </Form.Item>
            <Form.Item
              label="其他內容"
              className={styles.formItem}
              name="other_message"
              rules={[
                {
                  required: false,
                  // message: '請輸入活動內容',
                },
              ]}
            >
              <TextArea
                showCount
                style={{
                  height: 200,
                  resize: 'none',
                }}
                onChange={onChange}
                placeholder="其他想說的話..."
              />
            </Form.Item>

            <div className={styles.btns_bottom}>
              <div className={styles.btn}>
                <SecondaryBtn
                  text="清空"
                  htmltype="reset"
                  onClick={handleResetForm}
                />
              </div>
              <div className={styles.btn}>
                {!auth.token ? (
                  <Modal
                    btnType="iconSeconBtn"
                    btnText="送出願望"
                    title="貼心提醒"
                    content={<ModoalReminder text="登入會員，才能許願喔~" />}
                    mainBtnText="前往登入"
                    subBtnText="暫時不要"
                    confirmHandler={toSingIn}
                    icon={faUserPlus}
                  />
                ) : (
                  <MainBtn text="送出願望" htmltype="submit" />
                )}
                {successAddToCard && (
                  <ModalWithoutBtn
                    text="許願成功！"
                    img="/product-img/success.svg"
                  />
                )}
              </div>
            </div>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
}
