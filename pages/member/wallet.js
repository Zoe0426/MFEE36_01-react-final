import React, { useEffect } from 'react';
import Style from '@/styles/wallet.module.css';
import { useState, useContext } from 'react';
import PageTag from '@/components/ui/pageTag/PageTag';
import CouponCard from '@/components/ui/cards/CouponCard';
import MemberCenterLayout from '@/components/layout/member-center-layout';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Wallet() {
  const [pageTag, setPageTag] = useState('coupon');
  const [allCoupons, setAllCoupons] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();
  const toSignIn = () => {
    const from = router.asPath;
    router.push(`/member/sign-in?from=${from}`);
  };

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
      fetch(`${process.env.API_SERVER}/member-api/coupon`, {
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          setAllCoupons(data);
          setCoupons(data);
        });
    } else {
      console.log('User is not logged in. Cannot fetch coupons.');
    }
  }, []);

  // 篩選條件
  const usedHandleFilter = () => {
    // 已使用
    const newCoupons = allCoupons.filter((data) => data.coupon_status === 1);
    setCoupons(newCoupons);
  };

  const expiredHandleFilter = () => {
    // 已過期
    const today = new Date();
    const newCoupons = allCoupons.filter(
      (data) => new Date(data.exp_date) < today
    );
    setCoupons(newCoupons);
  };

  const soonHandleFilter = () => {
    // 當月到期
    const thisMonthStart = new Date();
    const thisMonthEnd = new Date(
      thisMonthStart.getFullYear(),
      thisMonthStart.getMonth() + 1
    );

    const newCoupons = allCoupons.filter((data) => {
      const expDate = new Date(data.exp_date);

      return (
        data.coupon_status === 0 &&
        expDate <= thisMonthEnd &&
        expDate >= thisMonthStart
      );
    });

    setCoupons(newCoupons);
  };

  return (
    <>
      {!auth.id ? (
        <button onClick={toSignIn}>登入</button>
      ) : (
        <>
          <div className="pageTag">
            <PageTag
              title="coupon"
              text="優惠券"
              pageTag={pageTag}
              onClick={() => {
                setPageTag('coupon');
                setCoupons(allCoupons);
              }}
            />
            <PageTag
              title="soon"
              text="即將到期"
              pageTag={pageTag}
              onClick={() => {
                setPageTag('soon');
                soonHandleFilter();
              }}
            />
            <PageTag
              title="used"
              text="已使用"
              pageTag={pageTag}
              onClick={() => {
                setPageTag('used');
                usedHandleFilter();
              }}
            />
            <PageTag
              title="expired"
              text="已過期"
              pageTag={pageTag}
              onClick={() => {
                setPageTag('expired');
                expiredHandleFilter();
              }}
            />
          </div>
          <div className={Style.content}>
            <div className={Style.couponContent}>
              {coupons.map((data) => (
                <CouponCard
                  key={data.coupon_send_sid}
                  title={data.name}
                  text={data.price}
                  expire={data.exp_date}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
Wallet.getLayout = MemberCenterLayout;
