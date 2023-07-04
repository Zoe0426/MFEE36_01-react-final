import React from 'react';
import SignLayout from '@/components/layout/sign-layout';
import SignCard from '@/components/ui/cards/SignCard';
import SignInForm from '@/components/ui/forms/SignInForm';

export default function SignIn() {
  return (
    <>
      <SignCard title="會員登入">
        <SignInForm />
      </SignCard>
    </>
  );
}

SignIn.getLayout = SignLayout;
