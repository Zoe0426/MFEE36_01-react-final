import React from 'react';
import Styles from './SignNavbar.module.css';

export default function SignVavbar() {
  return (
    <>
      <div className={Styles.signNavbar}>
        <img src="/layout-images/h-logo.png" alt="" className={Styles.logo} />
        <img src="/sign-images/sign-navbar.png" alt="" />
      </div>
    </>
  );
}
