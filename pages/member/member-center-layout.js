import React from 'react';
import MemberCenterLayout from '@/components/layout/member-center-layout';
import { useState } from 'react';
import PageTag from '@/components/ui/pageTag/PageTag';


export default function MemberCenterTest() {
  const [pageTag, setPageTag] = useState('shop');
  return (
    <>
      <div className="pageTag">
        <PageTag
          title="shop"
          text="商城"
          pageTag={pageTag}
          onClick={setPageTag}
        />
        <PageTag
          title="active"
          text="活動"
          pageTag={pageTag}
          onClick={setPageTag}
        />
      </div>

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
