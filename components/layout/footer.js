import React from 'react';
import Styles from './footer.module.css';

export default function Footer() {
  return (
    <>
      <footer className={Styles.footer}>
        <div className={Styles.fiiterInfo}>
          <div className={Styles.logoInfo}>
            <div className={Styles.logo}>
              <img src="/layout-images/footer-logo.png" alt="" />
            </div>
            <div className={Styles.logoMobile}>
              <img src="/layout-images/footer-logo-mobile.png" alt="" />
            </div>
            <div className={Styles.footerLink}>
              <ul className={Styles.linkMenu}>
                <li>
                  <a href="">商城</a>
                </li>
                <li>
                  <a href="">活動</a>
                </li>
                <li>
                  <a href="">餐廳</a>
                </li>
                <li>
                  <a href="">論壇</a>
                </li>
              </ul>
            </div>
          </div>

          <div className={Styles.copyRight}>
            <p>
              Copyright © 2010-2023 GOwithMe Company S.L. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
