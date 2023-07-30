import React, { useState } from 'react';
import SignLayout from '@/components/layout/sign-layout';
import SignCard from '@/components/ui/cards/SignCard';
import SignInForm from '@/components/ui/forms/SignInForm';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const { setAuth } = useContext(AuthContext);
  const [pass, setPass] = useState(false);
  const [nopass, setNoPass] = useState(false);

  //回去哪一頁的路徑
  const router = useRouter();
  const fromPath2 = router.asPath.split('from=')[1] || '/';
  //console.log({ mem: router.asPath.split('from=')[1] });

  //送出表單
  const handleSubmit = (values) => {
    fetch(`${process.env.API_SERVER}/member-api/login`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          const obj = { ...data.data };
          localStorage.setItem('petauth', JSON.stringify(obj));
          setAuth(obj);
          setNoPass(false);
          setPass(true);
          setTimeout(() => {
            router.push(fromPath2);
          }, 500);
        } else {
          setNoPass(true);
          setPass(false);
        }
      });
    console.log('pass', pass);
  };
  return (
    <>
      <SignCard title="會員登入">
        {nopass && !pass && <div className="signNoPass">帳號密碼錯誤 ！</div>}
        {pass && <div className="signPass">登入成功 ！</div>}
        <SignInForm handleSubmit={handleSubmit} pass={setPass} />
      </SignCard>
    </>
  );
}

SignIn.getLayout = SignLayout;
