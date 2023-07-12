import React from 'react';
import Link from 'next/link';
import Styles from './BlogNavbar.module.css';

export default function BlogNavbar() {
  return (
    <>
      <div className={Styles.secondNavbar}>
        <img
          src="/member-center-images/second-navbar.svg"
          alt=""
          className={Styles.navbarImg}
        />
        <div className={Styles.linkMenu}>
          <Link href="/shop" className={Styles.linkItem}>
            <img src="/member-center-images/Icon/member.svg" alt="" />
            <div className={Styles.linkTitile}>會員編輯</div>
          </Link>
          <Link href="/shop" className={Styles.linkItem}>
            <img src="/member-center-images/Icon/order.svg" alt="" />
            <div className={Styles.linkTitile}>訂單記錄</div>
          </Link>
          <Link href="/shop" className={Styles.linkItem}>
            <img src="/member-center-images/Icon/likes.svg" alt="" />
            <div className={Styles.linkTitile}>收藏清單</div>
          </Link>
          <Link href="/shop" className={Styles.linkItem}>
            <img src="/member-center-images/Icon/coin.svg" alt="" />
            <div className={Styles.linkTitile}>我的錢包</div>
          </Link>
          <Link href="/shop" className={Styles.linkItem}>
            <img src="/member-center-images/Icon/calendar.svg" alt="" />
            <div className={Styles.linkTitile}>我的預約</div>
          </Link>
          <Link href="/shop" className={Styles.linkItem}>
            <img src="/member-center-images/Icon/pet.svg" alt="" />
            <div className={Styles.linkTitile}>我的寵物</div>
          </Link>
        </div>
      </div>
    </>
  );
}
