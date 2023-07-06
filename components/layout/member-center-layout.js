import React from 'react';
import { Col, Row } from 'antd';
import Navbar from './navbar';
import MemberCenterFooter from './MemberCenterFooter';
import SecondNavbar from './SecondNavbar';
import MemberSidebar from './MemberSidebar';
import Styles from './member-center-layout.module.css';

export default function MemberCenterLayout(children) {
  return (
    <>
      <div className="container-outer">
        <Navbar />
        <SecondNavbar />
        <Row className={Styles.antRow}>
          <Col className={Styles.antCol} lg={2} md={1} sm={1} xs={1}></Col>
          <Col className={Styles.antCol} lg={6} md={8} sm={0} xs={0}>
            <MemberSidebar />
          </Col>
          <Col className={Styles.antCol} lg={12} md={14} sm={22} xs={22}>
            <main className={Styles.main}>{children}</main>
          </Col>
          <Col className={Styles.antCol} lg={4} md={1} sm={1} xs={1}></Col>
        </Row>
        <MemberCenterFooter />
      </div>
    </>
  );
}
