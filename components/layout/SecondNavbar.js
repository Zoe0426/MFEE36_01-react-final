import React from 'react';
import Link from 'next/link';
import Styles from './SecondNavbar.module.css';

export default function SecondNavbar() {
  return (
    <>
      <div className={Styles.secondNavbar}>
        <img
          src="/member-center-images/second-navbar.svg"
          alt=""
          className={Styles.navbarImg}
        />
        <div className={Styles.linkMenu}>
          <Link href="/member/profile" className={Styles.linkItem}>
            <img src="/member-center-images/Icon/member.svg" alt="" />
            <div className={Styles.linkTitile}>會員編輯</div>
          </Link>
          <Link href="/member/orderlist" className={Styles.linkItem}>
            <img src="/member-center-images/Icon/order.svg" alt="" />
            <div className={Styles.linkTitile}>訂單記錄</div>
          </Link>
          <Link href="/member/wallet" className={Styles.linkItem}>
            <img src="/member-center-images/Icon/coin.svg" alt="" />
            <div className={Styles.linkTitile}>我的優惠</div>
          </Link>
          <Link href="/member/schedule" className={Styles.linkItem}>
            <img src="/member-center-images/Icon/calendar.svg" alt="" />
            <div className={Styles.linkTitile}>我的預約</div>
          </Link>
          <Link href="/member/petGame" className={Styles.linkItem}>
            <img src="/member-center-images/Icon/pet.svg" alt="" />
            <div className={Styles.linkTitile}>我的寵物</div>
          </Link>
        </div>
      </div>
    </>
  );
}
