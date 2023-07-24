import React from 'react';
import Styles from './navbar.module.css';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import NavRoundBtn from '../ui/buttons/NavRoundBtn';
export default function Navbar({ classTitle }) {
  const { auth, setAuth, logout } = useContext(AuthContext);
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  // const toggleLine = document.querySelector('.line');
  // const toggleMenu = document.querySelector('.link-menu');
  // const navbar = document.querySelector('.navbar');
  // toggleLine.addEventListener('click', () => {
  //   toggleLine.classList.toggle('active');
  //   toggleMenu.classList.toggle('active');
  // });
  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <header className={Styles.header}>
        <nav className={`${Styles.navbar} ${isActive ? Styles.active : ''}`}>
          <div className={Styles.logoMenu}>
            <button className={Styles.navbarToggler} onClick={handleClick}>
              <div
                className={`${Styles.line} ${isActive ? Styles.active : ''}`}
              ></div>
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
          <div
            className={`${Styles.linkMenu} ${isActive ? Styles.active : ''}`}
          >
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
              icon="/layout-images/h-cart.png"
              link="/member/sign-in"
            ></NavRoundBtn>
            <NavRoundBtn
              icon="/layout-images/h-user.png"
              link={'/member/sign-in'}
            ></NavRoundBtn>
          </div>
        </nav>
      </header>
    </>
  );
}
