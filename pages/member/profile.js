import { useEffect, useState, useContext } from 'react';
import Styles from '@/styles/profile.module.css';
import MemberCenterLayout from '@/components/layout/member-center-layout';
import AuthContext from '@/context/AuthContext';
import { useRouter } from 'next/router';
import MainBtn from '@/components/ui/buttons/MainBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Radio, ConfigProvider, DatePicker, Upload } from 'antd';
import moment from 'moment';

export default function Profile() {
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();
  const [data, setData] = useState([]);

  const onFinish = (values) => {
    console.log('選中的值:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let auth = {};
    const authStr = localStorage.getItem('petauth');
    if (authStr) {
      try {
        auth = JSON.parse(authStr);
      } catch (ex) {
        ('');
      }
    }
    console.log(auth.id);

    if (auth.token) {
      fetch(`${process.env.API_SERVER}/member-api/edit/mem00300`, {
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          setData(data);
          let array = data;
          let obj = array[0];
          setInitialValues({
            memberSid: obj ? obj.memberSid : '',
            name: obj ? obj.name : '',
            mobile: obj ? obj.mobile : '',
            avarta: obj ? obj.profile : '',
            email: obj ? obj.email : '',
            gender: obj ? obj.gender : '',
            birthday: obj ? moment(obj.birthday) : '',
            pet: obj ? obj.pet : '',
          });
          setLoading(false);
          console.log('obj', obj);
        });
    } else {
      console.log('User is not logged in. Cannot fetch coupons.');
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or any loading component you prefer...
  }

  // let obj;
  // if (data.length > 0) {
  //   let array = data;
  //   obj = array[0];
  // }

  // console.log('obj', obj);

  // const initialValues = {
  //   memberSid: obj ? obj.memberSid : '',
  //   name: obj ? obj.name : '',
  //   mobile: obj ? obj.mobile : '',
  //   avarta: obj ? obj.profile : '',
  //   email: obj ? obj.email : '',
  //   gender: obj ? obj.gender : '',
  //   birthday: obj ? obj.birthday : '',
  //   pet: obj ? obj.pet : '',
  // };

  // console.log('infoData.name', indoData.name);
  // console.log('data[0].name', data[0].name);

  // 表單送出
  const handleSubmit = (values) => {
    const formData = new FormData(document.editForm);
    fetch('http://localhost:3002/member-api/updateInfo/mem00300', {
      method: 'PUT',
      body: formData,
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <>
      <div className="content">
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
            name="editForm"
            initialValues={initialValues}
            className={Styles.signUpForm}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
          >
            <div className="title">基本資料</div>
            <div className="nameMobile">
              <div className="name">
                <Form.Item name="memberSid" style={{ display: 'none' }}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="姓名"
                  className={Styles.formItem}
                  name="name"
                  rules={[
                    {
                      type: 'string',
                      message: '請輸入姓名',
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
                <Form.Item
                  label="手機"
                  className={Styles.formItem}
                  name="mobile"
                  rules={[
                    {
                      message: '請輸入手機',
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name="avatar"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                  }}
                >
                  <Upload action="/upload.do" listType="picture-card">
                    <div>
                      <PlusOutlined />
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        Upload
                      </div>
                    </div>
                  </Upload>
                </Form.Item>
              </div>
            </div>

            <Form.Item
              label="帳號"
              className={Styles.formItem}
              name="email"
              rules={[
                {
                  type: 'email',
                  message: '請輸入正確Email',
                },
              ]}
            >
              <Input placeholder="請輸入Email" size="large" />
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
            <Form.Item label="寵物" name="pet">
              <Radio.Group>
                <Radio value="狗"> 狗 </Radio>
                <Radio value="貓"> 貓 </Radio>
                <Radio value="狗貓"> 狗貓 </Radio>
                <Radio value="其他"> 其他 </Radio>
              </Radio.Group>
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
      </div>
    </>
  );
}
Profile.getLayout = MemberCenterLayout;
