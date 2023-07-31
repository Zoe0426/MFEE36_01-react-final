import React, { useEffect, useState } from 'react';
import { Col, Row, ConfigProvider } from 'antd';
import Navbar from './navbar';
import Footer from './footer';
import SecondNavbar from './SecondNavbar';
import MemberSidebar from './MemberSidebar';
import Styles from './member-center-layout.module.css';

export default function MemberCenterLayout(children) {
  return (
    <>
      <div className="container-outer">
        <Navbar />
        <SecondNavbar />
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#FD8C46',
              colorText: 'rgb(81, 81, 81)',
              fontSize: 18,
              controlInteractiveSize: 18,
            },
          }}
        >
          <Row className={Styles.antRow}>
            <Col className={Styles.antCol} lg={1} md={1} sm={1} xs={1}></Col>
            <Col className={Styles.antCol} lg={7} md={0} sm={0} xs={0}>
              <MemberSidebar />
            </Col>
            <Col className={Styles.antCol} lg={13} md={22} sm={22} xs={22}>
              <main className={Styles.main}>{children}</main>
            </Col>
            <Col className={Styles.antCol} lg={3} md={1} sm={1} xs={1}></Col>
          </Row>
          <Footer classTitle="smallNone" />
        </ConfigProvider>
      </div>
    </>
  );
}
