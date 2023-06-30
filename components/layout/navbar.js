import React from 'react';
import Styles from './navbar.module.css';

export default function Navbar() {
  return (
    <>
      <header className={Styles.header}>
        <nav className={Styles.navbar}>
          <div className={Styles.logoMenu}>
            <button className={Styles.navbarToggler}>
              <div className={Styles.line}></div>
            </button>
            <div className={Styles.logo}>
              <a href="">
                <img src="/layout-images/logo.png" alt="" />
              </a>
            </div>
            <div className={Styles.logoMobile}>
              <a href="">
                <img src="/layout-images/logo-mobile.png" alt="" />
              </a>
            </div>
          </div>

          {/* <div className={Styles.linkList}> */}
          <div className={Styles.linkMenu}>
            <div className={Styles.linkItem}>
              <a href="">商城</a>
            </div>
            <div className={Styles.linkItem}>
              <a href="">活動</a>
            </div>
            <div className={Styles.linkItem}>
              <a href="">餐廳</a>
            </div>
            <div className={Styles.linkItem}>
              <a href="">論壇</a>
            </div>
          </div>
          <div className={Styles.icon}>
            <ul className={Styles.iconMenu}>
              <li>
                <a href="">
                  <img src="/layout-images/icon-cart.png" alt="" />
                </a>
              </li>
              <li>
                <a href="">
                  <img src="/layout-images/icon-member.png" alt="" />
                </a>
              </li>
            </ul>
            <ul className={Styles.iconMeneMobile}>
              <li>
                <a href="">
                  <img src="/layout-images/icon-cart-mobile.png" alt="" />
                </a>
              </li>
              <li>
                <a href="">
                  <img src="/layout-images/icon-member-moble.png" alt="" />
                </a>
              </li>
            </ul>
          </div>
          {/* </div> */}
        </nav>
      </header>
    </>
  );
}
