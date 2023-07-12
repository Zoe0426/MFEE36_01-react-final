import React from 'react';
import Style from '@/pages/member/wallet.module.css';
import { useState } from 'react';
import MemberCenterLayout from '@/components/layout/member-center-layout';

export default function Wallet() {
  const [pageTag, setPageTag] = useState('coupon');
  return (
    <>
      <div className={Style.pageTag}>
        <div
          className={`${Style.tag} ${pageTag === 'coupon' ? Style.active : ''}`}
          onClick={() => {
            setPageTag('coupon');
          }}
        >
          優惠券
        </div>
        <div
          className={`${Style.tag} ${pageTag === 'soon' ? Style.active : ''}`}
          onClick={() => {
            setPageTag('soon');
          }}
        >
          即將到期
        </div>
        <div
          className={`${Style.tag} ${pageTag === 'used' ? Style.active : ''}`}
          onClick={() => {
            setPageTag('used');
          }}
        >
          已使用
        </div>
        <div
          className={`${Style.tag} ${
            pageTag === 'expired' ? Style.active : ''
          }`}
          onClick={() => {
            setPageTag('expired');
          }}
        >
          已過期
        </div>
      </div>
      <div className="content">
      <div className="couponContent">
        <div className="coupon">
          <div className="couponInfo">
            <div className="couponTitle">全站50</div>
            <div className="couponText">折抵$50</div>
            <div className="couponExpire">有效期限: 2023.06.30</div>
          </div>
          <div className="couponImg">
            <img src="/layout-images/h-logo.svg" alt="" />
          </div>
        </div>
        <div className="coupon">
          <div className="couponInfo">
            <div className="couponTitle">全站50</div>
            <div className="couponText">折抵$50</div>
            <div className="couponExpire">有效期限: 2023.06.30</div>
          </div>
          <div className="couponImg">
            <img src="/layout-images/h-logo.svg" alt="" />
          </div>
        </div>
        <div className="coupon">
          <div className="couponInfo">
            <div className="couponTitle">全站50</div>
            <div className="couponText">折抵$50</div>
            <div className="couponExpire">有效期限: 2023.06.30</div>
          </div>
          <div className="couponImg">
            <img src="/layout-images/h-logo.svg" alt="" />
          </div>
        </div>
        <div className="coupon">
          <div className="couponInfo">
            <div className="couponTitle">全站50</div>
            <div className="couponText">折抵$50</div>
            <div className="couponExpire">有效期限: 2023.06.30</div>
          </div>
          <div className="couponImg">
            <img src="/layout-images/h-logo.svg" alt="" />
          </div>
        </div>
        <div className="coupon">
          <div className="couponInfo">
            <div className="couponTitle">全站50</div>
            <div className="couponText">折抵$50</div>
            <div className="couponExpire">有效期限: 2023.06.30</div>
          </div>
          <div className="couponImg">
            <img src="/layout-images/h-logo.svg" alt="" />
          </div>
        </div>
        <div className="coupon">
          <div className="couponInfo">
            <div className="couponTitle">全站50</div>
            <div className="couponText">折抵$50</div>
            <div className="couponExpire">有效期限: 2023.06.30</div>
          </div>
          <div className="couponImg">
            <img src="/layout-images/h-logo.svg" alt="" />
          </div>
        </div>
        <div className="coupon">
          <div className="couponInfo">
            <div className="couponTitle">全站50</div>
            <div className="couponText">折抵$50</div>
            <div className="couponExpire">有效期限: 2023.06.30</div>
          </div>
          <div className="couponImg">
            <img src="/layout-images/h-logo.svg" alt="" />
          </div>
        </div>
        <div className="coupon">
          <div className="couponInfo">
            <div className="couponTitle">全站50</div>
            <div className="couponText">折抵$50</div>
            <div className="couponExpire">有效期限: 2023.06.30</div>
          </div>
          <div className="couponImg">
            <img src="/layout-images/h-logo.svg" alt="" />
          </div>
        </div>
        <div className="coupon">
          <div className="couponInfo">
            <div className="couponTitle">全站50</div>
            <div className="couponText">折抵$50</div>
            <div className="couponExpire">有效期限: 2023.06.30</div>
          </div>
          <div className="couponImg">
            <img src="/layout-images/h-logo.svg" alt="" />
          </div>
        </div>
      </div>
      </div>
      
      
    </>
  );
}
Wallet.getLayout = MemberCenterLayout;
