import { useEffect, useState, useContext } from 'react';
import Styles from './SignInForm.module.css';
import MainBtn from '../buttons/MainBtn';
import SecondaryBtn from '../buttons/SecondaryBtn';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { Form, Input, ConfigProvider } from 'antd';

export default function SignInForm({ handleSubmit }) {
  const { setAuth, setPhoto } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [memProfileImg, setMemProfileImg] = useState(
    `${process.env.API_SERVER}/img/default-profile.jpg`
  );

  //回去哪一頁的路徑
  const router = useRouter();
  const fromPath2 = router.asPath.split('from=')[1] || '/';

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  function handleCallbackResponse(response) {
    console.log('encoded JWT ID token', response.credential);
    const userObject = jwt_decode(response.credential);
    console.log('userObject', userObject);
    setUser(userObject);
    fetch(`${process.env.API_SERVER}/member-api/googleLogin`, {
      method: 'POST',
      body: JSON.stringify({ id_token: response.credential }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log('data', data);
        if (data.success) {
          const obj = { ...data.data };
          localStorage.setItem('petauth', JSON.stringify(obj));
          console.log('l30-', obj.profile);
          if (obj.profile) {
            const photo = `${process.env.API_SERVER}/img/${obj.profile}`;
            localStorage.setItem(`${obj.id}photoUrl`, JSON.stringify(photo));
            setPhoto(photo);
          } else {
            const photo = `${process.env.API_SERVER}/img/${memProfileImg}`;
            localStorage.setItem(`${obj.id}photoUrl`, JSON.stringify(photo));
            setPhoto(memProfileImg);
          }
          setAuth(obj);
          router.push(fromPath2);
        } else {
          console.log('error');
        }
      });
  }

  /* global google */
  // global google
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        '157368154764-abg5711auh3c254hcqfqu4sg1iv1gd3n.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signDiv'), {
      theme: 'outline',
      size: 'large',
    });
  }, []);

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
          <div className={Styles.google} id="signDiv"></div>
        </Form>
      </ConfigProvider>
    </>
  );
}
