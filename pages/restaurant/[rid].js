import React from 'react';
import RestCard from '@/components/ui/cards/rest_card';
import { Col, Row } from 'antd';
import TopAreaBgc from '@/components/ui/restaurant/TopAreaBgc';
import Banner from '@/components/ui/restaurant/Banner';
import FunctionArea from '@/components/ui/restaurant/FunctionArea';
import Styles from './[rid].module.css';

export default function FilterPage() {
  return (
    <>
      <Banner />
      <FunctionArea />
      <TopAreaBgc />
      <div className="container-inner">
        <div className={Styles.second_area}>
          <div className={Styles.search_title}>
            <h2 className={Styles.jill_h2}>餐廳進階篩選結果</h2>
            <p>共64間餐廳</p>
          </div>
          <select name="" id="" className={Styles.filter}>
            <option value="1">排序</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>

      <div className="container-inner">
        <Row gutter={[24, 24]}>
          <Col xl={8} xs={12}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
          <Col xl={8} xs={12}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
          <Col xl={8} xs={12}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
          <Col xl={8} xs={12}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
          <Col xl={8} xs={12}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
          <Col xl={8} xs={12}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
          <Col xl={8} xs={12}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
          <Col xl={8} xs={12}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
          <Col xl={8} xs={12}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
          <Col xl={8} xs={12}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
          <Col xl={8} xs={12}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
          <Col xl={8} xs={12}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
