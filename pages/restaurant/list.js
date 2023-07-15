import React from 'react';
import { useState, useEffect } from 'react';
import RestCard from '@/components/ui/cards/rest_card';
import { Col, Row } from 'antd';
import TopAreaBgc from '@/components/ui/restaurant/TopAreaBgc';
import Banner from '@/components/ui/restaurant/Banner';
import Styles from './list.module.css';
import filterDatas from '@/data/restaurnt/categories.json';
import IconBtn from '@/components/ui/buttons/IconBtn';
import { faFilter, faHeart, faMap } from '@fortawesome/free-solid-svg-icons';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import MainBtn from '@/components/ui/buttons/MainBtn';
import RestaurantFilter from '@/components/ui/restaurant/RestaurantFilter';
import RestPageOrder from '@/components/ui/restaurant/RestPageOrder';
import LocationFilter from '@/components/ui/restaurant/LocationFilter';
import TimeDateFilter from '@/components/ui/restaurant/TimeDateFilter';
import Likelist from '@/components/ui/like-list/like-list';

export default function FilterPage() {
  const { categorySid } = filterDatas;
  
  //進階篩選------------------------------------------------------------
  const [showfilter, setShowFilter] = useState(false);


  //收藏清單------------------------------------------------------------
  const [likeDatas, setLikeDatas] = useState([]);
  const [showLikeList, setShowLikeList] = useState(false);

  //取資料相關的函式-------------------------------------------------------
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3002/restaurant-api');
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

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
        <div className={Styles.second_area}>
          <div className={Styles.search_title}>
            <h2 className={Styles.jill_h2}>餐廳進階篩選結果</h2>
            <p>共64間餐廳</p>
          </div>
          <RestPageOrder />
          {/* <select name="" id="" className={Styles.filter}>
            <option value="1">排序</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select> */}
        </div>
      </div>

      <div className="container-inner">
        <Row gutter={{ xs: 16, xl: 32 }}>
          {data.map((i) => {
            const {
              rest_sid,
              name,
              city,
              area,
              img_names,
              rule_names,
              service_names,
            } = i;

            return (
              <Col xl={8} xs={12} key={rest_sid}>
                <RestCard
                  image={'/rest_image/image/' + img_names.split(',')[0]}
                  name={name}
                  city={city}
                  area={area}
                  rule_names={rule_names}
                  service_names={service_names}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
}
