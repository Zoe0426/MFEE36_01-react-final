import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from '@/components/ui/buttons/SearchBar';

import {
  faFire,
  faMap,
  faHeart,
  faFilter,
  faFaceLaugh,
  faLocationDot,
  faThumbsUp,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import RestCard from '@/components/ui/cards/rest_card';
import { Col, Row } from 'antd';
import RestTitle from '@/components/ui/restaurant/RestTitle';
import LocationCard from '@/components/ui/restaurant/LocationCard';
import Styles from './index.module.css';
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
import friendlyCondition from '@/data/restaurnt/firendly-condition.json';

export default function Restindex() {
  const router = useRouter();
  const { categorySid } = filterDatas;
  const [showfilter, setShowFilter] = useState(false);

  const [likeDatas, setLikeDatas] = useState([]);
  const [showLikeList, setShowLikeList] = useState(false);

  const [keyword, setKeyword] = useState('');

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [datePickerValue, setDatePickerValue] = useState(null);

  const [showStartTimeError, setStartShowTimeError] = useState(false);
  const [showEndTimeError, setShowEndTimeError] = useState(false);

  const [filters, setFilters] = useState(filterDatas);

  const [data, setData] = useState({
    rows1: [],
    rows2: [],
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  // 點擊右邊箭頭
  const rightArrow1 = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= data.rows1.length
        ? 0
        : prevIndex + itemsPerPage
    );
  };

  // 點擊左邊箭頭
  const leftArrow1 = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0
        ? data.rows1.length - itemsPerPage
        : prevIndex - itemsPerPage
    );
  };
  //searchBar相關的函式-------------------------------------------------------
  const searchBarHandler = (e) => {
    if (e.key === 'Enter') {
      const searchText = e.target.value;
      if (!searchText.trim()) {
        // 如果沒有填字，則不執行換頁的動作
        return;
      }

      let copyURL = { page: 1 };
      if (searchText) {
        copyURL = { keyword: searchText, ...copyURL };
      }
      setShowFilter(false);

      router.push(
        `/restaurant/list?${new URLSearchParams(copyURL).toString()}`
      );
    }
  };

  const searchBarClickHandler = () => {
    if (!keyword) {
      return;
    }
    setShowFilter(false);

    router.push(
      `/restaurant/list?${new URLSearchParams({
        keyword: keyword,
        page: 1,
      }).toString()}`
    );
  };
  //checkbox相關的函式-------------------------------------------------------
  const checkboxToggleHandler = (arr, name, id) => {
    // 在點擊checkbox 的選擇，並更新狀態
    const updatedCategorySid = arr.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setFilters({
      ...filters,
      categorySid: updatedCategorySid,
    });
  };

  const handleDatePickerChange = (dateValue) => {
    setDatePickerValue(dateValue);
  };
  const handlerChange1 = (time) => {
    setStartTime(time);
  };

  const handlerChange2 = (time) => {
    setEndTime(time);
  };
  //餐廳篩選條件
  const filterHandler = () => {
    const filterCate = filters.categorySid;
    //console.log(filterCate);

    //時間篩選
    const start = startTime ? startTime + ':00' : null;
    const end = endTime ? endTime + ':00' : null;

    //日期篩選
    const selectedDate = datePickerValue;
    const selectedDayOfWeek = selectedDate ? selectedDate.$W : null;

    console.log(selectedDate);

    // 檢查是否填寫了開始時間和結束時間
    if (startTime && !endTime) {
      setStartShowTimeError(false);
      setShowEndTimeError(true);
    } else if (!startTime && endTime) {
      setStartShowTimeError(true);
      setShowEndTimeError(false);
    }

    const checkedOptions = filterCate
      .filter((v) => v.checked === true)
      .map((v) => v.value);

    // 檢查是否所有篩選條件都沒有填寫
    if (!checkedOptions.length && !selectedDayOfWeek && !start && !end) {
      return;
    }
    let query = {};
    if (checkedOptions.length > 0) {
      query.category = checkedOptions;
    }

    if (start && end) {
      query.startTime = start;
      query.endTime = end;
    }

    if (selectedDayOfWeek) {
      query.weekly = selectedDayOfWeek;
    }

    // console.log(start);
    // console.log(end);
    // console.log(checkedOptions);
    router.push(
      `/restaurant/list?${new URLSearchParams({
        ...query,
        page: 1,
      }).toString()}`
    );
  };
  //重置篩選條件
  const clearAllFilter = () => {
    setFilters(filterDatas);
    setEndTime('');
    setStartTime('');
    setDatePickerValue(null);
    setStartShowTimeError(false);
    setShowEndTimeError(false);

    // setStartTime('08:00');

    const { keyword } = router.query;
    const query = { page: 1 };
    if (keyword) {
      query.keyword = keyword;
    }
    router.push(
      `/restaurant/${new URLSearchParams({
        // ...query,
      }).toString()}`
    );
  };
  // 根據目前的索引來顯示資料
  const displayData = data.rows1.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

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

  useEffect(() => {
    fetch(`${process.env.API_SERVER}/restaurant-api`)
      .then((r) => r.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className={Styles.banner}>
        <div className={Styles.search}>
          <h1 className={Styles.jill_h1}>想知道哪裡有寵物餐廳？</h1>
          <SearchBar
            placeholder="搜尋餐廳名稱"
            btn_text="尋找餐廳"
            inputText={keyword}
            changeHandler={(e) => {
              setKeyword(e.target.value);
            }}
            keyDownHandler={searchBarHandler}
            clickHandler={searchBarClickHandler}
          />
        </div>
      </div>
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
                <TimeDateFilter
                  startTime={startTime}
                  endTime={endTime}
                  handlerChange1={handlerChange1}
                  handlerChange2={handlerChange2}
                  onDateChange={handleDatePickerChange}
                  value={datePickerValue}
                  alert_start={
                    showStartTimeError && (
                      <p style={{ color: 'red' }}>
                        <FontAwesomeIcon icon={faCircleExclamation} />{' '}
                        請填寫開始時間
                      </p>
                    )
                  }
                  status_start={showStartTimeError && 'error'}
                  status_end={showEndTimeError && 'error'}
                  alert_end={
                    showEndTimeError && (
                      <p style={{ color: 'red' }}>
                        <FontAwesomeIcon icon={faCircleExclamation} />{' '}
                        請填寫結束時間
                      </p>
                    )
                  }
                />
                <RestaurantFilter
                  text="用餐類別"
                  data={filters.categorySid}
                  onChange={checkboxToggleHandler}
                />

                <div className={Styles.filter_btns}>
                  <SecondaryBtn text="重置" clickHandler={clearAllFilter} />
                  <MainBtn text="確定" clickHandler={filterHandler} />
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
              clickHandler={() => {
                router.push(
                  'http://localhost:3000/restaurant/list?city=台北市'
                );
              }}
            />
          </Col>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/newtaipei.png"
              location="新北市"
              clickHandler={() => {
                router.push(
                  'http://localhost:3000/restaurant/list?city=新北市'
                );
              }}
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
              clickHandler={() => {
                router.push(
                  'http://localhost:3000/restaurant/list?city=taichung'
                );
              }}
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
              {friendlyCondition.map((e) => {
                return (
                  <Col xl={4} xs={8} key={e.id}>
                    <SubBtn
                      img={e.icon}
                      text={e.text}
                      subBtnHandler={() => {
                        //分類這邊的連結還沒寫
                        router.push(e.href);
                      }}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
        <MiddleAreaBgc className={Styles.middle_bgc} />
      </div>

      <div className="container-inner">
        <RestTitle
          icon={faFire}
          text="熱門餐廳"
          href="http://localhost:3000/restaurant/list?page=1&orderBy=hot_DESC"
          clickHandler1={leftArrow1}
          clickHandler2={rightArrow1}
        />
      </div>
      <div className="container-inner">
        <div className={Styles.hot_card_group}>
          <div className={Styles.hot_card}>
            {displayData.map((v) => {
              const {
                rest_sid,
                name,
                city,
                area,
                img_names,
                rule_names,
                service_names,
                average_friendly,
              } = v;

              return (
                <Col xl={8} xs={12} key={rest_sid}>
                  <RestCard
                    rest_sid={rest_sid}
                    image={'/rest_image/image/' + img_names.split(',')[0]}
                    name={name}
                    city={city}
                    area={area}
                    rule_names={rule_names}
                    service_names={service_names}
                    average_friendly={average_friendly}
                  />
                </Col>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-inner">
        <RestTitle
          icon={faThumbsUp}
          text="好評餐廳"
          href="http://localhost:3000/restaurant/list?page=1&orderBy=cmt_DESC"
        />
      </div>
      <div className="container-inner">
        <div className={Styles.hot_card_group}>
          <div className={Styles.hot_card}>
            {/* <RestCard
              name="我家休閒農場"
              city="台北市"
              area="大安區"
              rule_names="可自由活動"
              service_names="幫忙鏟屎"
              average_friendly="4.8"
              image="/rest_image/sunshine.jpeg"
            />
            <RestCard
              name="我家休閒農場"
              city="台北市"
              area="大安區"
              rule_names="可自由活動"
              service_names="幫忙鏟屎"
              average_friendly="4.8"
              image="/rest_image/sunshine.jpeg"
            />
            <RestCard
              name="我家休閒農場"
              city="台北市"
              area="大安區"
              rule_names="可自由活動"
              service_names="幫忙鏟屎"
              average_friendly="4.8"
              image="/rest_image/sunshine.jpeg"
            /> */}
            {data.rows2.map((v) => {
              const {
                rest_sid,
                name,
                city,
                area,
                img_names,
                rule_names,
                service_names,
                average_friendly,
              } = v;

              return (
                <Col xl={8} xs={12} key={rest_sid}>
                  <RestCard
                    rest_sid={rest_sid}
                    image={'/rest_image/image/' + img_names.split(',')[0]}
                    name={name}
                    city={city}
                    area={area}
                    rule_names={rule_names}
                    service_names={service_names}
                    average_friendly={average_friendly}
                  />
                </Col>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
