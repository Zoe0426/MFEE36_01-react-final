import React from 'react';
import MemberCenterLayout from '@/components/layout/member-center-layout';

export default function MemberCenterTest() {
  return (
    <>
      <div className="order">
        <div className="orderCard"></div>
        <div className="orderCard"></div>
        <div className="orderCard"></div>
        <div className="orderCard"></div>
        <div className="orderCard"></div>
        <div className="orderCard"></div>
      </div>
    </>
  );
}
MemberCenterTest.getLayout = MemberCenterLayout;
