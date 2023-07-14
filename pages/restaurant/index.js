import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFire,
  faMap,
  faHeart,
  faFilter,
  faFaceLaugh,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import RestCard from '@/components/ui/cards/rest_card';
import { Col, Row } from 'antd';
import RestTitle from '@/components/ui/restaurant/RestTitle';
import LocationCard from '@/components/ui/restaurant/LocationCard';
import Styles from './index.module.css';
import Banner from '@/components/ui/restaurant/Banner';
import TopAreaBgc from '@/components/ui/restaurant/TopAreaBgc';
import Image from 'next/image';
import CloudTop from '@/assets/cloud_top.svg';
import IconBtn from '@/components/ui/buttons/IconBtn';
import MiddleAreaBgc from '@/components/ui/restaurant/MiddleAreaBgc';
import SubBtn from '@/components/ui/buttons/subBtn';
import RestaurantFilter from '@/components/ui/restaurant/RestaurantFilter';
import LocationFilter from '@/components/ui/restaurant/LocationFilter';
import TimeDateFilter from '@/components/ui/restaurant/TimeDateFilter';
import Likelist from '@/components/ui/like-list/like-list';
import filterDatas from '@/data/restaurnt/categories.json';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import MainBtn from '@/components/ui/buttons/MainBtn';

export default function Restindex() {
  const { categorySid } = filterDatas;
  const [showfilter, setShowFilter] = useState(false);

  const [likeDatas, setLikeDatas] = useState([]);
  const [showLikeList, setShowLikeList] = useState(false);

  //篩選filter相關的函式-------------------------------------------------------
  const toggleFilter = () => {
    setShowFilter(!showfilter);
  };

  //收藏列表相關的函式-------------------------------------------------------
  const openShowLikeList = () => {
    setShowLikeList(!showLikeList);
  };

  const closeShowLikeList = () => {
    setShowLikeList(false);
  };

  const removeAllLikeList = () => {
    setLikeDatas([]);
    //這邊需要再修改，要看怎麼得到會員的編號
    removeLikeListToDB('all', 'mem00002');
  };

  const removeLikeListItem = (pid) => {
    const newLikeList = likeDatas.filter((arr) => {
      return arr.product_sid !== pid;
    });

    setLikeDatas(newLikeList);
    //這邊需要再修改，要看怎麼得到會員的編號
    removeLikeListToDB(pid, 'mem00002');
  };
  return (
    <>
      <Banner />
      <div className={Styles.bgc}>
        <div className="container-inner">
          <div className={Styles.function_group}>
            <IconBtn icon={faMap} text="餐廳地圖" />
            <IconBtn
              icon={faHeart}
              text="收藏列表"
              clickHandler={openShowLikeList}
            />
            <IconBtn
              icon={faFilter}
              text="進階篩選"
              clickHandler={toggleFilter}
            />
          </div>
        </div>
        {/* 進階篩選的畫面 */}
        {showfilter && (
          <>
            <div className="container-outer">
              <div className={Styles.line}></div>
            </div>
            <div className="container-inner">
              <div className={Styles.filter_box}>
                <LocationFilter text="用餐地區" />
                <TimeDateFilter />
                <RestaurantFilter
                  text="用餐類別"
                  data={categorySid}
                  onChange={() => {}}
                />

                <div className={Styles.filter_btns}>
                  <SecondaryBtn text="重置" />
                  <MainBtn text="確定" />
                </div>
              </div>
            </div>
          </>
        )}
        {/* 收藏列表畫面 */}
        <div className="container-inner">
          <div className={Styles.like_list}>
            {showLikeList && (
              <Likelist
                datas={likeDatas}
                // customCard={
                //   <ShopLikelistCard
                //     datas={likeDatas}
                //     removeLikeListItem={removeLikeListItem}
                //   />
                // }
                closeHandler={closeShowLikeList}
                removeAllHandler={removeAllLikeList}
                removeLikeListItem={removeLikeListItem}
              />
            )}
          </div>
        </div>
      </div>
      <TopAreaBgc />
    
      <div className="container-inner">
        <div className={Styles.explore_title}>
          <FontAwesomeIcon icon={faLocationDot} className={Styles.title_icon} />
          <h2 className={Styles.jill_h2}>探索各地友善餐廳</h2>
        </div>
        <Row gutter={{ xs: 16, xl: 32 }}>
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
                <SubBtn text="可放繩" img="/rest_image/friendly/rope.png" />
              </Col>
              <Col xl={4} xs={8}>
                <SubBtn
                  text="可自由活動"
                  img="/rest_image/friendly/dog_run.png"
                />
              </Col>
              <Col xl={4} xs={8}>
                <SubBtn
                  text="有賣寵物餐"
                  img="/rest_image/friendly/sell_food.png"
                />
              </Col>
              <Col xl={4} xs={8}>
                <SubBtn
                  text="附寵物餐具"
                  img="/rest_image/friendly/tableware.png"
                />
              </Col>
              <Col xl={4} xs={8}>
                <SubBtn text="幫忙鏟屎" img="/rest_image/friendly/clean.png" />
              </Col>
              <Col xl={4} xs={8}>
                <SubBtn
                  text="可上座椅"
                  img="/rest_image/friendly/onchair.png"
                />
              </Col>
            </Row>
          </div>
        </div>
        <MiddleAreaBgc className={Styles.middle_bgc} />
      </div>

      <div className="container-inner">
        <RestTitle icon={faFire} text="熱門餐廳" />
      </div>
      <div className="container-inner">
        <div className={Styles.hot_card_group}>
          <div className={Styles.hot_card}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              area="大安區"
            />

            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              area="大安區"
            />

            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              area="大安區"
            />
          </div>
        </div>
      </div>

      <div className="container-inner">
        <RestTitle icon={faFaceLaugh} text="最友善餐廳" />
      </div>
      <div className="container-inner">
        <div className={Styles.hot_card_group}>
          <div className={Styles.hot_card}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              area="大安區"
            />

            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              area="大安區"
            />

            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              area="大安區"
            />
          </div>
        </div>
      </div>
    </>
  );
}
