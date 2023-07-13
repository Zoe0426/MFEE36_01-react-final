import React from 'react';
import Styles from './navbar.module.css';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import NavRoundBtn from '../ui/buttons/NavRoundBtn';
export default function Navbar({ classTitle }) {
  const { auth, setAuth, logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <>
      <header
        className={`${Styles.header} ${
          classTitle === 'bigNone' ? Styles.bigNone : ''
        }`}
      >
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
            <img
              className={Styles.logo}
              src="/layout-images/h-logo.svg"
              alt=""
            />
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
            {/* {auth.id === '' ? (
              <NavRoundBtn
                linku="/member/sign-in"
                icon="/layout-images/h-cart.png"
                test="1"
              />
            ) : (
              ''
            )} */}

            <NavRoundBtn
              link="/member/sign-in"
              icon="/layout-images/h-cart.png"
            ></NavRoundBtn>
          </div>
        </nav>
      </header>
    </>
  );
}
