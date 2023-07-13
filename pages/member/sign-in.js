import React from 'react';
import SignLayout from '@/components/layout/sign-layout';
import SignCard from '@/components/ui/cards/SignCard';
import SignInForm from '@/components/ui/forms/SignInForm';
import AuthContext from '@/context/AuthContext';
import { useContext } from 'react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const router = useRouter();
  const { auth, setAuth } = useContext(AuthContext);
  const handleSubmit = (values) => {
    fetch('http://localhost:3002/member-api/login', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          const obj = { ...data.data };
          localStorage.setItem('petauth', JSON.stringify(obj));
          setAuth(obj);
          // window.location.href = 'http://localhost:3000/member/wallet';
          router.push('/');
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
