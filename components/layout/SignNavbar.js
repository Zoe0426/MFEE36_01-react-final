import React from 'react';
import Styles from './SignNavbar.module.css';

export default function SignVavbar() {
  return (
    <>
      <div className={Styles.signNavbar}>
        <img src="/layout-images/h-logo.svg" alt="" className={Styles.logo} />
        <img src="/member-center-images/sign-navbar.svg" alt="" />
      </div>
    </>
  );
}
