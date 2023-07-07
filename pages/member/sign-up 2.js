import React from 'react';
import SignLayout from '@/components/layout/sign-layout';
import SignCard from '@/components/ui/cards/SignCard';
import SignUpForm from '@/components/ui/forms/SignUpForm';

export default function SignIn() {
  return (
    <>
      <SignCard title="會員註冊">
        <SignUpForm />
      </SignCard>
    </>
  );
}

SignIn.getLayout = SignLayout;
