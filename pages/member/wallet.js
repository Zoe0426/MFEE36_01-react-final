import React, { useEffect } from 'react';
import Style from '@/pages/member/wallet.module.css';
import { useState } from 'react';
import PageTag from '@/components/ui/pageTag/PageTag';
import CouponCard from '@/components/ui/cards/CouponCard';
import MemberCenterLayout from '@/components/layout/member-center-layout';

export default function Wallet() {
  const [pageTag, setPageTag] = useState('coupon');
  const [allCoupons, setAllCoupons] = useState([]);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/member-api/coupon/mem00001')
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setAllCoupons(data);
        setCoupons(data);
      });
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
      // Set to last day of the current month
    );

    const newCoupons = allCoupons.filter((data) => {
      const expDate = new Date(data.exp_date);

      // Check if the coupon expires this month
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
  );
}
Wallet.getLayout = MemberCenterLayout;
