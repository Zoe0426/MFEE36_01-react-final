import React from 'react';
import Styles from './MemberCenterFooter.module.css';
import Link from 'next/link';

export default function MemberCenterFooter() {
  return (
    <>
      <footer className={Styles.footer}>
        <div className={Styles.footerInfo}>
          <div className={Styles.logoInfo}>
            <div>
              <img
                src="/layout-images/h-logo.svg"
                alt=""
                className={Styles.logo}
              />
            </div>
            <div className={Styles.linkMenu}>
              <div className={Styles.linkItem}>
                <Link href="/shop">商城</Link>
              </div>
              <div className={Styles.linkItem}>
                <Link href="/shop">活動</Link>
              </div>
              <div className={Styles.linkItem}>
                <Link href="/shop">餐廳</Link>
              </div>
              <div className={Styles.linkItem}>
                <Link href="/shop">論壇</Link>
              </div>
            </div>
          </div>
          <div className={Styles.copyRight}>
            <p>Copyright © 2010-2023 GOwithMe Company All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
