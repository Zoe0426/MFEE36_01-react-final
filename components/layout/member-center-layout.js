import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import Styles from './member-center-layout.module.css';

export default function MemberCenterLayout({ children }) {
  return (
    <>
      <div className="container-outer">
        <Navbar />
        <main className={Styles.main}>{children}</main>
        <Footer />
      </div>
    </>
  );
}
