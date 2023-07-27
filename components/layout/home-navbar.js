import React from 'react';
import Styles from './home-navbar.module.css';
// import Image from 'next/image';
// import logo from '@/assets/logo.svg';
import Link from 'next/link';
import NavRoundBtn from '@/components/ui/buttons/NavRoundBtn';
export default function HomeNavbar() {
  return (
    <>
      <header className={Styles.header}>
        <nav className={Styles.navbar}>
          <div className={Styles.logoMenu}>
            <button className={Styles.navbarToggler}>
              <div className={Styles.line}></div>
            </button>
            {/* <Image
              src={logo}
              className={Styles.logo}
              alt="gowithmeLogo"
            ></Image> */}
            <img className={Styles.logo} src="/home-images/h-logo.png" alt="" />
          </div>
          <div className={Styles.linkMenu}>
            <div className={Styles.linkItem}>
              <Link href="/shop" className={Styles.link}>
                商城
              </Link>
            </div>
            <div className={Styles.linkItem}>
              <Link href="/shop" className={Styles.link}>
                活動
              </Link>
            </div>
            <div className={Styles.linkItem}>
              <Link href="/shop" className={Styles.link}>
                餐廳
              </Link>
            </div>
            <div className={Styles.linkItem}>
              <Link href="/shop" className={Styles.link}>
                論壇
              </Link>
            </div>
          </div>
          <div className={Styles.iconMenu}>
            <NavRoundBtn
              icon="/home-images/h-cart.png"
              link={'/member/sign-in'}
            ></NavRoundBtn>
            <NavRoundBtn
              icon="/home-images/h-user.png"
              link={'/member/sign-in'}
            ></NavRoundBtn>
          </div>
        </nav>
      </header>
    </>
  );
}
