import React from 'react';
import { Col, Row } from 'antd';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import BlogNavbar from './BlogNavbar';

import MemberSidebar from '@/components/layout/MemberSidebar';
import PostBanner from '../postBanner/postBanner';
import Styles from './postBlogLayout.module.css';

export default function PostBlogLayout(children) {
  return (
    <>
      <div className="container-outer">
      <div className={Styles.topNav}>
        <Navbar/>
      </div>
        <div className={Styles.nav}>
          <div className={Styles.banner}>
            <PostBanner/>
          </div>
          <BlogNavbar />
        </div>
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
        <Footer classTitle="smallNone" />
      </div>
    </>
  );
}
