import React from 'react';
import SignLayout from '@/components/layout/sign-layout';
import SignCard from '@/components/ui/cards/SignCard';
import SignInForm from '@/components/ui/forms/SignInForm';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import CryptoJS from 'crypto-js';

export default function SignIn() {
  const { auth, setAuth } = useContext(AuthContext);

  //回去哪一頁的路徑
  const router = useRouter();
  const fromPath = router.query.from || '/';
  console.log(fromPath);
  console.log(router.query.from);

  //送出表單
  const handleSubmit = (values) => {
    fetch(`${process.env.API_SERVER}/member-api/login`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          const obj = { ...data.data };

          //加密petauth id
          let petauthId = obj.id;
          petauthId = CryptoJS.AES.encrypt(petauthId, 'GoWithMe').toString();
          obj.id = petauthId;

          //加密email
          let petauthEmail = obj.email;
          petauthEmail = CryptoJS.AES.encrypt(
            petauthEmail,
            'GoWithMe'
          ).toString();
          obj.email = petauthEmail;

          //加密nickname
          let petauthNickname = obj.nickname;
          petauthNickname = CryptoJS.AES.encrypt(
            petauthNickname,
            'GoWithMe'
          ).toString();
          obj.nickname = petauthNickname;

          localStorage.setItem('petauth', JSON.stringify(obj));
          setAuth(obj);
          // window.location.href = 'http://localhost:3000/member/wallet';
          router.push(fromPath);
        } else {
          alert(data.error || '帳密錯誤');
        }
      });
  };
  return (
    <>
      <SignCard title="會員登入">
        <SignInForm handleSubmit={handleSubmit} />
      </SignCard>
    </>
  );
}

SignIn.getLayout = SignLayout;
