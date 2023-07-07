import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFire,
  faFaceLaugh,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import RestCard from '@/components/ui/cards/rest_card';
import { Col, Row } from 'antd';
import RestTitle from '@/components/ui/restaurant/RestTitle';
import LocationCard from '@/components/ui/restaurant/LocationCard';
import Styles from './index.module.css';
import Banner from '@/components/ui/restaurant/Banner';
import FunctionArea from '@/components/ui/restaurant/FunctionArea';
import TopAreaBgc from '@/components/ui/restaurant/TopAreaBgc';
import Image from 'next/image';
import CloudTop from '@/assets/cloud_top.svg';
import MiddleAreaBgc from '@/components/ui/restaurant/MiddleAreaBgc';

export default function Restindex() {
  return (
    <>
      <div className="container-outer">
        <Banner />
        <FunctionArea />
        <TopAreaBgc />
      </div>
      <div className="container-inner">
        <div className={Styles.explore_title}>
          <FontAwesomeIcon icon={faLocationDot} className={Styles.title_icon} />
          <h2 className={Styles.jill_h2}>探索各地友善餐廳</h2>
        </div>
        <Row gutter={[48, 48]}>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/taipei.png"
              location="台北市"
            />
          </Col>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/newtaipei.png"
              location="新北市"
            />
          </Col>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/keelung.png"
              location="基隆市"
            />
          </Col>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/taoyuan.png"
              location="桃園市"
            />
          </Col>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/taichung.png"
              location="台中市"
            />
          </Col>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/hsinchu.png"
              location="新竹市"
            />
          </Col>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/kaohsiung.png"
              location="高雄市"
            />
          </Col>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/tainan.png"
              location="台南市"
            />
          </Col>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/miaoli.png"
              location="苗栗市"
            />
          </Col>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/chiayi.png"
              location="嘉義市"
            />
          </Col>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/changhua.png"
              location="彰化市"
            />
          </Col>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/yilan.png"
              location="宜蘭市"
            />
          </Col>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/pingtung.png"
              location="屏東市"
            />
          </Col>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/hualien.png"
              location="花蓮市"
            />
          </Col>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/taitung.png"
              location="台東市"
            />
          </Col>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/nantou.png"
              location="南投市"
            />
          </Col>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/yunlin.png"
              location="雲林市"
            />
          </Col>
          <Col xl={4} xs={8}>
            <LocationCard rest_image="/rest_image/dog_paw.png" />
          </Col>
        </Row>
      </div>
      <div className="container-outer">
        <div className={Styles.CloudTop}>
          <Image src={CloudTop} />
        </div>

        <div className={Styles.cloud_bgc}>
          <div className="container-inner">
            <div className={Styles.explore_title}>
              <FontAwesomeIcon
                icon={faFaceLaugh}
                className={Styles.title_icon}
              />
              <h2 className={Styles.jill_h2}>友善條件</h2>
            </div>
            <Row gutter={[48, 48]}>
              <Col xl={4} xs={8}>
                <div className={Styles.box}>
                  <img src="/rest_image/friendly/friendly1.png" alt="" />
                </div>
              </Col>
              <Col xl={4} xs={8}>
                <div className={Styles.box}>
                  <img src="/rest_image/friendly/friendly1.png" alt="" />
                </div>
              </Col>
              <Col xl={4} xs={8}>
                <div className={Styles.box}>
                  <img src="/rest_image/friendly/friendly1.png" alt="" />
                </div>
              </Col>
              <Col xl={4} xs={8}>
                <div className={Styles.box}>
                  <img src="/rest_image/friendly/friendly1.png" alt="" />
                </div>
              </Col>
              <Col xl={4} xs={8}>
                <div className={Styles.box}>
                  <img src="/rest_image/friendly/friendly1.png" alt="" />
                </div>
              </Col>
              <Col xl={4} xs={8}>
                <div className={Styles.box}>
                  <img src="/rest_image/friendly/friendly1.png" alt="" />
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <MiddleAreaBgc />
      </div>
      <div className="container-inner">
        <RestTitle icon={faFire} text="熱門餐廳" />
      </div>
      <div className="container-inner">
        <Row gutter={[32, 32]}>
          <Col span={8}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
          <Col span={8}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
          <Col span={8}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
        </Row>
      </div>
      <div className="container-inner">
        <RestTitle icon={faFaceLaugh} text="最友善餐廳" />
      </div>
      <div className="container-inner">
        <Row gutter={[32, 32]}>
          <Col span={8}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
          <Col span={8}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
          <Col span={8}>
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
