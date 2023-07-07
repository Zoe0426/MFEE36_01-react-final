import React from 'react';
import Styles from './SignInForm.module.css';

export default function SignInForm() {
  return (
    <>
      <div className={Styles.form}></div>
      <div className={Styles.btns}></div>
      <div className={Styles.line}>
        <div className={Styles.lineText}>更多登入方式</div>
      </div>
      <div className={Styles.google}>
        <img src="/sign-images/google.svg" alt="" />
      </div>
    </>
  );
}
