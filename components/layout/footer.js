import React from 'react';
import Styles from './footer.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Footer({ classTitle, type = '' }) {
  const router = useRouter();
  const gohome = () => {
    router.push('/');
  };
  return (
    <>
      <footer
        className={`${Styles.footer} ${
          classTitle === 'bigNone'
            ? Styles.bigNone
            : classTitle === 'smallNone'
            ? Styles.smallNone
            : ''
        }`}
      >
        <div
          className={`${
            type === 'home' ? Styles.homeFooterInfo : Styles.footerInfo
          }`}
        >
          <div className={Styles.logoInfo}>
            <div>
              <img
                src="/layout-images/h-logo.svg"
                alt=""
                className={Styles.logo}
                onClick={gohome}
              />
            </div>
            <div className={Styles.linkMenu}>
              <div className={Styles.linkItem}>
                <Link href="/product">商城</Link>
              </div>
              <div className={Styles.linkItem}>
                <Link href="/activity">活動</Link>
              </div>
              <div className={Styles.linkItem}>
                <Link href="/restaurant">餐廳</Link>
              </div>
              <div className={Styles.linkItem}>
                <Link href="/forum">論壇</Link>
              </div>
            </div>
          </div>
          <div className={Styles.copyRight}>
            <p>Copyright © 2010-2023 GOwithMe Company All rights reserved.</p>
          </div>
        </div>
        <img
          src="/home-images/h-footer.svg"
          alt="footerbg"
          className={Styles.footerbg}
        />
      </footer>
    </>
  );
}
