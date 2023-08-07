import { useContext, useEffect, useState } from 'react';
import SignLayout from '@/components/layout/sign-layout';
import SignCard from '@/components/ui/cards/SignCard';
import SignUpForm from '@/components/ui/forms/SignUpForm';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import Loading from '@/components/ui/loading/loading';
import Head from 'next/head';

export default function SignIn() {
  const { auth, setAuth } = useContext(AuthContext);
  const [first, setFirst] = useState(false);
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setFirst(true);
  }, []);

  useEffect(() => {
    if (auth.id && first) {
      const from = router.asPath;
      router.push(`/member/orderlist?from=${from}`);
    } else if (!auth.id) {
      setPageLoading(false);
    }
  }, [auth, first]);

  if (pageLoading) {
    return <Loading />;
  } else if (!pageLoading) {
    return (
      <>
        <Head>
          <title>狗with咪 | 註冊</title>
        </Head>
        <SignCard title="會員註冊">
          <SignUpForm />
        </SignCard>
      </>
    );
  }
}

SignIn.getLayout = SignLayout;
