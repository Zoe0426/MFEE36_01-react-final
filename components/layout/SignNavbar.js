import React from 'react';
import Styles from './SignNavbar.module.css';

export default function SignVavbar() {
  return (
    <>
      <div className={Styles.signNavbar}>
        <div className={Styles.logoContainer}>
          <img src="/layout-images/h-logo.svg" alt="" className={Styles.logo} />
        </div>
        <img
          src="/member-center-images/sign-navbar.svg"
          alt=""
          className={Styles.signNavbarImg}
        />
      </div>
    </>
  );
}
