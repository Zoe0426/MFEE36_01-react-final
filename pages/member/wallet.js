import React, { useEffect } from 'react';
import Style from '@/styles/wallet.module.css';
import { useState, useContext } from 'react';
import PageTag from '@/components/ui/pageTag/PageTag';
import CouponCard from '@/components/ui/cards/CouponCard';
import MemberCenterLayout from '@/components/layout/member-center-layout';
import AuthContext from '@/context/AuthContext';
import { useRouter } from 'next/router';
import Loading from '@/components/ui/loading/loading';
import Head from 'next/head';

export default function Wallet() {
  const { auth, setAuth } = useContext(AuthContext);
  const [first, setFirst] = useState(false);
  const [pageTag, setPageTag] = useState('coupon');
  const [allCoupons, setAllCoupons] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [used, setUsed] = useState(false);
  const [expire, setExpire] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setFirst(true);
  }, []);

  useEffect(() => {
    if (!auth.id && first) {
      const from = router.asPath;
      router.push(`/member/sign-in?from=${from}`);
    } else if (auth.id) {
      setPageLoading(false);
      if (auth.token) {
        fetch(`${process.env.API_SERVER}/member-api/coupon`, {
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        })
          .then((r) => r.json())
          .then((data) => {
            //console.log(data);
            let filterData = data.filter((data) => {
              const currentTime = new Date();
              const expireTime = new Date(data.exp_date);
              return currentTime < expireTime && data.coupon_status === 0;
            });
            setAllCoupons(data);
            setCoupons(filterData);
            setLoading(false);
          });
      } else {
        //console.log('User is not logged in. Cannot fetch coupons.');
      }
    }
  }, [auth, first]);

  if (loading) {
    return <div>Loading...</div>; // Or any loading component you prefer...
  }

  // 篩選條件
  const allHandleFilter = () => {
    // 全部未過期未使用
    const newCoupons = allCoupons.filter((data) => {
      const currentTime = new Date();
      const expireTime = new Date(data.exp_date);
      return currentTime < expireTime && data.coupon_status === 0;
    });
    setCoupons(newCoupons);
    setExpire(false);
    setUsed(false);
  };

  const usedHandleFilter = () => {
    // 已使用
    const newCoupons = allCoupons.filter((data) => data.coupon_status === 1);
    setCoupons(newCoupons);
    setUsed(true);
  };

  const expiredHandleFilter = () => {
    // 已過期
    const today = new Date();
    const newCoupons = allCoupons.filter(
      (data) => new Date(data.exp_date) < today
    );
    setCoupons(newCoupons);
    setExpire(true);
  };

  const soonHandleFilter = () => {
    // 當月到期
    const thisMonthStart = new Date();
    const thisMonthEnd = new Date(
      thisMonthStart.getFullYear(),
      thisMonthStart.getMonth() + 1
    );

    let newCoupons = allCoupons.filter((data) => {
      const expDate = new Date(data.exp_date);

      return (
        data.coupon_status === 0 &&
        expDate <= thisMonthEnd &&
        expDate >= thisMonthStart
      );
    });

    // 使用 sort 函數排序
    newCoupons = newCoupons.sort((a, b) => {
      return new Date(a.exp_date) - new Date(b.exp_date);
    });
    setExpire(false);
    setUsed(false);
    setCoupons(newCoupons);
  };

  if (pageLoading) {
    return <Loading />;
  } else if (!pageLoading) {
    return (
      <>
        <Head>
          <title>狗with咪 | 我的錢包</title>
        </Head>
        <div className="pageTag">
          <PageTag
            title="coupon"
            text="優惠券"
            pageTag={pageTag}
            onClick={() => {
              setPageTag('coupon');
              setCoupons(coupons);
              allHandleFilter();
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
                isused={used}
                isexpire={expire}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}
Wallet.getLayout = MemberCenterLayout;
