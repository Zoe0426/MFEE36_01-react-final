import React from 'react';
import Head from 'next/head';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DownOutlined } from '@ant-design/icons';
import {
  faFire,
  faHeart,
  faFilter,
  faFaceLaugh,
  faLocationDot,
  faThumbsUp,
  faCircleExclamation,
  faPaw,
} from '@fortawesome/free-solid-svg-icons';
import RestCard from '@/components/ui/cards/rest_card';
import { Col, Row, ConfigProvider, Select } from 'antd';
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
import TimeDateFilter from '@/components/ui/restaurant/TimeDateFilter';
import filterDatas from '@/data/restaurnt/categories.json';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import MainBtn from '@/components/ui/buttons/MainBtn';
import friendlyCondition from '@/data/restaurnt/firendly-condition.json';
import cityDatas from '@/data/restaurnt/location.json';
import SearchBar1 from '@/components/ui/buttons/SearchBar1';
import LikeListCard from '@/components/ui/restaurant/LikeListCard';
import LikeListDrawer from '@/components/ui/like-list/LikeListDrawer';
import AlertModal from '@/components/ui/restaurant/AlertModal';

export default function Restindex() {
  const router = useRouter();
  const { categorySid } = filterDatas;
  const [showfilter, setShowFilter] = useState(false);

  //search bar相關
  const [keyword, setKeyword] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [keywordDatas, setKeywordDatas] = useState([]);
  const [showKeywordDatas, setShowKeywordDatas] = useState(false);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [datePickerValue, setDatePickerValue] = useState(null);

  const [showStartTimeError, setStartShowTimeError] = useState(false);
  const [showEndTimeError, setShowEndTimeError] = useState(false);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  //收藏清單
  const [likeDatas, setLikeDatas] = useState([]);
  const [showLikeList, setShowLikeList] = useState(false);
  const [addLikeList, setAddLikeList] = useState([]);
  const [isClickingLike, setIsClickingLike] = useState(false);

  const { auth, setAuth } = useContext(AuthContext);

  const [first, setFrist] = useState(false);

  const [filters, setFilters] = useState(filterDatas);

  const [data, setData] = useState({
    rows1: [],
    rows2: [],
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const itemsPerPage = 3;

  // const handleCityClick = ({ key }) => {
  //   setSelectedCity(key);
  //   setSelectedArea(null);
  // };

  // const handleAreaClick = ({ key }) => {
  //   setSelectedArea(key);
  // };
  const handleProvinceChange = (value) => {
    setSelectedCity(value);
    setSelectedArea(null);
  };
  const onSecondCityChange = (value) => {
    setSelectedArea(value);
  };
  const cities = cityDatas;

  // // 點擊右邊箭頭
  // const rightArrow2 = () => {
  //   setCurrentIndex2((prevIndex) =>
  //     prevIndex + itemsPerPage >= data.rows1.length
  //       ? 0
  //       : prevIndex + itemsPerPage
  //   );
  // };

  // // 點擊左邊箭頭
  // const leftArrow2 = () => {
  //   setCurrentIndex2((prevIndex) =>
  //     prevIndex - itemsPerPage < 0
  //       ? data.rows1.length - itemsPerPage
  //       : prevIndex - itemsPerPage
  //   );
  // };
  //熱門卡片區
  const [showHotCardQty, setShowHotCardQty] = useState(3); // 顯示的卡片數量
  const [newHotCurrent, setHotNewCurrent] = useState(0); // 目前顯示的位置索引
  const [hotTotalPage, setHotTotalPage] = useState(4);

  // 左箭頭按鈕點擊事件處理函數
  const leftArrow1 = () => {
    if (newHotCurrent === 0) {
      setHotNewCurrent(hotTotalPage - 1);
    } else {
      setHotNewCurrent(newHotCurrent - 1);
    }
  };

  // 右箭頭按鈕點擊事件處理函數
  const rightArrow1 = () => {
    if (newHotCurrent === hotTotalPage - 1) {
      setHotNewCurrent(0);
    } else {
      setHotNewCurrent(newHotCurrent + 1);
    }
  };
  // 計算 newStyle 樣式
  const newStyle1 = {
    position: 'relative',
    left: `calc(428px * ${showHotCardQty} * -${newHotCurrent})`,
    transition: '0.3s',
  };
  //友善卡片區
  const [showFreCardQty, setShowFreCardQty] = useState(3); // 顯示的卡片數量
  const [newFreCurrent, setFreNewCurrent] = useState(0); // 目前顯示的位置索引
  const [freTotalPage, setFreTotalPage] = useState(4);

  // 左箭頭按鈕點擊事件處理函數
  const leftArrow2 = () => {
    if (newFreCurrent === 0) {
      setFreNewCurrent(freTotalPage - 1);
    } else {
      setFreNewCurrent(newFreCurrent - 1);
    }
  };

  // 右箭頭按鈕點擊事件處理函數
  const rightArrow2 = () => {
    if (newFreCurrent === freTotalPage - 1) {
      setFreNewCurrent(0);
    } else {
      setFreNewCurrent(newFreCurrent + 1);
    }
  };

  // 計算 newStyle 樣式
  const newStyle2 = {
    position: 'relative',
    left: `calc(428px * ${showFreCardQty} * -${newFreCurrent})`,
    transition: '0.3s',
  };

  const filterKeywordDatas = (data, keyword, keyin) => {
    if (!keyin) {
      const searchWord = keyword.split('');

      if (searchWord.length === 0) {
        return data;
      }

      // console.log(searchWord);

      if (Array.isArray(data)) {
        // 確保 data 是陣列
        data.forEach((v1) => {
          v1.count = 0;
          searchWord.forEach((v2) => {
            if (v1.name.includes(v2)) {
              v1.count += 1;
            }
          });
        });
      }

      // console.log(data);

      data.sort((a, b) => b.count - a.count);

      return data.filter((v) => v.count >= searchWord.length);
    }
  };
  //searchBar相關的函式
  const restKeywordData = async () => {
    const res = await fetch(
      `${process.env.API_SERVER}/restaurant-api/search-name`,
      {
        method: 'GET',
      }
    );
    const data = await res.json();

    if (Array.isArray(data.keywords)) {
      const newKeywords = data.keywords.map((v) => {
        return { name: v, count: 0 };
      });
      setKeywordDatas(newKeywords);
    }
  };

  useEffect(() => {
    restKeywordData();
  }, []);

  const searchBarHandler = (e) => {
    let copyURL = { page: 1 };
    const searchText = e.target.value;

    if (!searchText) {
      setShowKeywordDatas(false);
    }

    if (e.key === 'Enter') {
      setShowKeywordDatas(false);
      if (searchText) {
        copyURL = { keyword: searchText, ...copyURL };
      }
      router.push(`?${new URLSearchParams(copyURL).toString()}`);
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

  const autocompleteHandler = (selectkeyword) => {
    setKeyword(selectkeyword);
    setShowKeywordDatas(false);
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
  //輸入時間的框框是否成為焦點
  // const handleBlur = () => {
  //   // 檢查是否填寫了開始時間和結束時間
  //   if (startTime && !endTime) {
  //     setStartShowTimeError(false);
  //     setShowEndTimeError(true);
  //     setShowFilter(true);
  //   } else if (!startTime && endTime) {
  //     setStartShowTimeError(true);
  //     setShowEndTimeError(false);
  //     setShowFilter(true);
  //   } else if (startTime && endTime) {
  //     setStartShowTimeError(false); // 將開始時間警告框框隱藏
  //     setShowEndTimeError(false); // 將結束時間警告框框隱藏
  //   } else if (!startTime && !endTime) {
  //     setStartShowTimeError(false); // 將開始時間警告框框隱藏
  //     setShowEndTimeError(false); // 將結束時間警告框框隱藏
  //   }
  // };
  //篩選的部分
  const filterHandler = () => {
    const filterCate = filters.category;
    // console.log(filterCate);

    //時間篩選
    const start = startTime ? startTime + ':00' : null;
    const end = endTime ? endTime + ':00' : null;

    //日期篩選
    const selectedDate = datePickerValue;
    const selectedDayOfWeek = selectedDate ? selectedDate.$W : null;

    // console.log(selectedDate);

    // 檢查是否填寫了開始時間和結束時間
    // if (startTime && !endTime) {
    //   setStartShowTimeError(false);
    //   setShowEndTimeError(true);
    //   // setShowFilter(true);
    // } else if (!startTime && endTime) {
    //   setStartShowTimeError(true);
    //   setShowEndTimeError(false);
    //   // setShowFilter(true);
    // }

    const checkedOptions = filterCate
      .filter((v) => v.checked === true)
      .map((v) => v.value);

    let query = {};

    if (selectedCity) {
      query.city = selectedCity;
    }

    if (selectedArea) {
      query.area = selectedArea;
    }

    // console.log(selectedCity);
    // console.log(selectedArea);

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
    setSelectedCity(null);
    setSelectedArea(null);
    setShowFilter(false);

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
  // 根據目前的索引來顯示資料
  const displayData2 = data.rows2.slice(
    currentIndex2,
    currentIndex2 + itemsPerPage
  );

  //篩選filter相關的函式-------------------------------------------------------
  const toggleFilter = () => {
    setShowFilter(!showfilter);
  };
  //checkbox相關的函式-------------------------------------------------------
  const checkboxToggleHandler = (arr, name, id) => {
    // 在點擊checkbox 的選擇，並更新狀態
    const updatedCategorySid = arr.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setFilters({
      ...filters,
      category: updatedCategorySid,
    });
  };
  //收藏列表相關的函式-------------------------------------------------------
  //取得收藏列表

  const getLikeList = async (token = '') => {
    try {
      const res = await fetch(
        `${process.env.API_SERVER}/restaurant-api/show-like`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      const data = await res.json();

      // if (data.likeDatas.length > 0) {
      setLikeDatas(data.likeDatas);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isClickingLike && addLikeList.length > 0) {
      sendLikeList(addLikeList, auth.token).then(() => {
        //在成功送資料到後端後重置addLikeList
        setAddLikeList([]);
      });
    }
  }, [isClickingLike, addLikeList]);

  //沒登入會員收藏，跳轉登入
  const toSingIn = () => {
    const from = router.asPath;
    router.push(`/member/sign-in?from=${process.env.WEB}${from}`);
  };

  //卡片愛心收藏的相關函式-------------------------------------------------------
  // const clickHeartHandler = (id) => {
  //   setIsClickingLike(true);
  //   const timeClick = new Date().getTime();
  //   const newData = data.map((v) => {
  //     if (v.rest_sid === id) {
  //       const insideInLikeList = addLikeList.find(
  //         (item) => item.rest_sid === id
  //       );
  //       if (insideInLikeList) {
  //         setAddLikeList((preV) => preV.filter((v2) => v2.rest_sid !== id));
  //       } else {
  //         setAddLikeList((preV) => [
  //           ...preV,
  //           { rest_sid: id, time: timeClick },
  //         ]);
  //       }

  //       return { ...v, like: !v.like };
  //     } else return { ...v };
  //   });
  //   console.log(newData);
  //   setData({ ...data, rows: newData });

  //   setTimeout(() => {
  //     setIsClickingLike(false);
  //   }, 1500);
  // };
  const clickHeartHandler = (id, type) => {
    setIsClickingLike(true);
    const timeClick = new Date().getTime();

    const targetArray = type === 'rows1' ? data.rows1 : data.rows2;

    const newData = targetArray.map((v) => {
      if (v.rest_sid === id) {
        const insideInLikeList = addLikeList.find(
          (item) => item.rest_sid === id
        );
        if (insideInLikeList) {
          setAddLikeList((preV) => preV.filter((v2) => v2.rest_sid !== id));
        } else {
          setAddLikeList((preV) => [
            ...preV,
            { rest_sid: id, time: timeClick },
          ]);
        }
        return { ...v, like: !v.like };
      } else return { ...v };
    });

    // console.log(newData);

    if (type === 'rows1') {
      setData({ ...data, rows1: newData });
    } else if (type === 'rows2') {
      setData({ ...data, rows2: newData });
    }

    setTimeout(() => {
      setIsClickingLike(false);
    }, 1500);
  };

  //將資料送到後端
  const sendLikeList = async (arr, token = '') => {
    try {
      const res = await fetch(
        `${process.env.API_SERVER}/restaurant-api/handle-like-list`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: arr }),
        }
      );
      const data = await res.json();

      if (data.success) {
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //展開收藏列表
  const toggleLikeList = () => {
    const newShowLikeList = !showLikeList;
    // console.log(newShowLikeList);
    setShowLikeList(newShowLikeList);
    if (newShowLikeList) {
      document.body.classList.add('likeList-open');
      getLikeList(auth.token);
    } else {
      document.body.classList.remove('likeList-open');
    }
  };

  const closeLikeList = () => {
    setShowLikeList(false);
    document.body.classList.remove('likeList-open');
  };

  // 刪除所有收藏
  const removeAllLikeList = (token) => {
    if (likeDatas.length > 0) {
      // 列表顯示為空
      setLikeDatas([]);

      // 將卡片上的愛心清除
      const newDataRows1 = data.rows1.map((v) => ({ ...v, like: false }));
      const newDataRows2 = data.rows2.map((v) => ({ ...v, like: false }));

      setData({
        ...data,
        rows1: newDataRows1,
        rows2: newDataRows2,
      });

      // 請求後端執行
      removeLikeListToDB('all', token);
    }
  };

  const removeLikeListItem = (rid, token = '') => {
    // 將該列表刪除
    const newLikeList = likeDatas.filter((arr) => {
      return arr.rest_sid !== rid;
    });
    setLikeDatas(newLikeList);

    // 取消愛心樣式
    const newDataRows1 = data.rows1.map((v) => {
      if (v.rest_sid === rid) {
        return { ...v, like: false };
      } else {
        return { ...v };
      }
    });

    const newDataRows2 = data.rows2.map((v) => {
      if (v.rest_sid === rid) {
        return { ...v, like: false };
      } else {
        return { ...v };
      }
    });

    // 更新 data
    const newData = {
      ...data,
      rows1: newDataRows1,
      rows2: newDataRows2,
    };

    setData(newData);

    // 請求後端執行
    removeLikeListToDB(rid, token);
  };

  const removeLikeListToDB = async (rid = '', token = '') => {
    try {
      const removeAll = await fetch(
        `${process.env.API_SERVER}/restaurant-api/likelist/${rid}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      const result = await removeAll.json();
      // console.log(JSON.stringify(result, null, 4));
      if (rid === 'all') {
        setTimeout(() => {
          toggleLikeList();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
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

  const getData = async (token = '') => {
    try {
      // 拿回卡片資訊
      const response = await fetch(
        `${process.env.API_SERVER}/restaurant-api/`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setFrist(true);
  }, []);

  useEffect(() => {
    //取得用戶token並取得相關資訊
    if (first) {
      if (auth.token) {
        getData(auth.token);
      } else {
        getData();
      }
    }
  }, [first]);

  return (
    <>
      <Head>
        <title>狗with咪 | 餐廳</title>
      </Head>
      <div className={Styles.banner}>
        <div className={Styles.search}>
          <h1 className={Styles.jill_h1}>想知道哪裡有寵物餐廳？</h1>
          <SearchBar1
            keywordDatas={filterKeywordDatas(keywordDatas, keyword, isTyping)}
            placeholder="搜尋友善餐廳"
            btn_text="尋找餐廳"
            inputText={keyword}
            changeHandler={(e) => {
              setKeyword(e.target.value);
              setShowKeywordDatas(true);
              setIsTyping(true);
              setTimeout(() => {
                setIsTyping(false);
              }, 700);
            }}
            keyDownHandler={searchBarHandler}
            clickHandler={searchBarClickHandler}
            autocompleteHandler={autocompleteHandler}
            showKeywordDatas={showKeywordDatas}
            blurHandler={() => {
              setTimeout(() => {
                setShowKeywordDatas(false);
              }, 200);
            }}
            clearHandler={() => {
              setKeyword('');
            }}
          />
        </div>
      </div>
      <div className={Styles.bgc}>
        <div className="container-inner">
          <div className={Styles.function_group}>
            {auth.token ? (
              <IconBtn
                icon={faHeart}
                text="收藏列表"
                clickHandler={toggleLikeList}
              />
            ) : (
              <AlertModal
                btnType="iconBtn"
                btnText="收藏列表"
                icon={faHeart}
                content="可查看收藏列表"
                mainBtnText="前往登入"
                subBtnText="暫時不要"
                confirmHandler={toSingIn}
              />
            )}
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
                <ConfigProvider
                  theme={{
                    token: {
                      colorBorder: '#DDDDDD',
                      colorPrimary: '#FD8C46',
                      colorBgContainer: 'rgba(255,255,255)',
                      borderRadius: 10,
                      controlHeight: 50,
                      fontSize: 16,
                      borderRadiusOuter: 10,
                    },
                  }}
                >
                  {/* <LocationFilter text={'用餐地點'} /> */}
                  <div className={Styles.location_search_area}>
                    <div className={Styles.category_area}>
                      <FontAwesomeIcon icon={faPaw} className={Styles.paw} />
                      <label className={Styles.labels}>用餐地點</label>
                    </div>
                    <div className={Styles.dropdowns}>
                      {/* <Space wrap> */}
                      <Select
                        value={selectedCity ? selectedCity : undefined}
                        placeholder="城市"
                        // style={{
                        //   width: 200,
                        // }}
                        onChange={handleProvinceChange}
                        options={Object.keys(cities).map((city) => ({
                          label: city,
                          value: city,
                        }))}
                        className={Styles.city}
                      />
                      <Select
                        // style={{
                        //   width: 200,
                        // }}
                        value={selectedArea}
                        placeholder="地區"
                        onChange={onSecondCityChange}
                        options={
                          selectedCity
                            ? cities[selectedCity].map((area) => ({
                                label: area,
                                value: area,
                              }))
                            : []
                        }
                        disabled={!selectedCity}
                        className={Styles.section}
                      />
                      {/* </Space> */}
                    </div>
                  </div>
                </ConfigProvider>
                <TimeDateFilter
                  startTime={startTime}
                  endTime={endTime}
                  handlerChange1={handlerChange1}
                  handlerChange2={handlerChange2}
                  onDateChange={handleDatePickerChange}
                  value={datePickerValue}
                  // onBlur={handleBlur}
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
                  data={filters.category}
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
              <LikeListDrawer
                datas={likeDatas}
                customCard={
                  <LikeListCard
                    datas={likeDatas}
                    token={auth.token}
                    removeLikeListItem={removeLikeListItem}
                    closeLikeList={closeLikeList}
                  />
                }
                closeHandler={toggleLikeList}
                removeAllHandler={() => {
                  removeAllLikeList(auth.token);
                }}
                // removeAllHandler={removeAllLikeList}
                // removeLikeListItem={removeLikeListItem}
              />
            )}
          </div>
        </div>
      </div>
      <TopAreaBgc />

      <div className="container-inner">
        <div className={Styles.explore_title}>
          <FontAwesomeIcon
            icon={faLocationDot}
            className={Styles.title_icon}
            style={{ maxWidth: '33px', maxHeight: '44px' }}
          />
          <h2 className={Styles.jill_h2}>探索各地友善餐廳</h2>
        </div>
        <Row gutter={{ xs: 16, xl: 32 }}>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/taipei.png"
              location="台北市"
              clickHandler={() => {
                router.push(`${process.env.WEB}/restaurant/list?city=台北市`);
              }}
            />
          </Col>
          <Col xl={4} xs={8}>
            <LocationCard
              rest_image="/rest_image/city/newtaipei.png"
              location="新北市"
              clickHandler={() => {
                router.push(`${process.env.WEB}/restaurant/list?city=新北市`);
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
                router.push(`${process.env.WEB}/restaurant/list?city=台中市`);
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
            <LocationCard
              rest_image="/rest_image/city/penghu.png"
              location="澎湖縣"
            />
          </Col>
        </Row>
      </div>

      <div className="container-outer">
        <div className={Styles.CloudTop}>
          <Image src={CloudTop} alt="CloudTop" />
          <div className={Styles.dog_print}>
            <div className={Styles.paw_print_1}>
              <div className={`${Styles.pad} ${Styles.large}`}></div>
              <div className={`${Styles.pad} ${Styles.small_1}`}></div>
              <div className={`${Styles.pad} ${Styles.small_2}`}></div>
              <div className={`${Styles.pad} ${Styles.small_3}`}></div>
              <div className={`${Styles.pad} ${Styles.small_4}`}></div>
            </div>

            <div className={Styles.paw_print_2}>
              <div className={`${Styles.pad} ${Styles.large}`}></div>
              <div className={`${Styles.pad} ${Styles.small_1}`}></div>
              <div className={`${Styles.pad} ${Styles.small_2}`}></div>
              <div className={`${Styles.pad} ${Styles.small_3}`}></div>
              <div className={`${Styles.pad} ${Styles.small_4}`}></div>
            </div>

            <div className={Styles.paw_print_3}>
              <div className={`${Styles.pad} ${Styles.large}`}></div>
              <div className={`${Styles.pad} ${Styles.small_1}`}></div>
              <div className={`${Styles.pad} ${Styles.small_2}`}></div>
              <div className={`${Styles.pad} ${Styles.small_3}`}></div>
              <div className={`${Styles.pad} ${Styles.small_4}`}></div>
            </div>

            <div className={Styles.paw_print_4}>
              <div className={`${Styles.pad} ${Styles.large}`}></div>
              <div className={`${Styles.pad} ${Styles.small_1}`}></div>
              <div className={`${Styles.pad} ${Styles.small_2}`}></div>
              <div className={`${Styles.pad} ${Styles.small_3}`}></div>
              <div className={`${Styles.pad} ${Styles.small_4}`}></div>
            </div>
          </div>
        </div>

        <div className={Styles.cloud_bgc}>
          <div className="container-inner">
            <div className={Styles.explore_title}>
              <FontAwesomeIcon
                icon={faFaceLaugh}
                className={Styles.title_icon}
                style={{ maxWidth: '45px', maxHeight: '45px' }}
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
        <div className={Styles.space}>
          <RestTitle
            icon={faFire}
            text="熱門餐廳"
            href={`${process.env.WEB}/restaurant/list?page=1&orderBy=hot_DESC`}
            clickHandler1={leftArrow1}
            clickHandler2={rightArrow1}
          />
        </div>
      </div>

      <div className="container-inner">
        <div className={Styles.hot_card_group}>
          {/* <Row gutter={{ xs: 24, xl: 32 }}> */}
          {data.rows1.map((v) => {
            const {
              rest_sid,
              name,
              city,
              area,
              img_names,
              rule_names,
              service_names,
              average_friendly,
              like,
            } = v;
            {
              /* <div xl={8} xs={24} key={rest_sid}> */
            }
            return (
              <div key={rest_sid} className={Styles.hot_card} style={newStyle1}>
                <RestCard
                  rest_sid={rest_sid}
                  image={'/rest_image/image/' + img_names.split(',')[0]}
                  name={name}
                  city={city}
                  area={area}
                  rule_names={rule_names}
                  service_names={service_names}
                  average_friendly={average_friendly}
                  like={like}
                  token={auth.token}
                  singinHandler={toSingIn}
                  clickHandler={() => {
                    clickHeartHandler(rest_sid, 'rows1');
                  }}
                />
              </div>
            );
          })}
          {/* </Row> */}
        </div>
      </div>

      <div className="container-inner">
        <RestTitle
          icon={faThumbsUp}
          text="好評餐廳"
          href={`${process.env.WEB}/restaurant/list?page=1&orderBy=cmt_DESC`}
          clickHandler1={leftArrow2}
          clickHandler2={rightArrow2}
        />
      </div>
      <div className="container-inner">
        <div className={Styles.friendly_card_group}>
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
              like,
            } = v;

            return (
              <div
                key={rest_sid}
                className={Styles.friendly_card}
                style={newStyle2}
              >
                <RestCard
                  rest_sid={rest_sid}
                  image={'/rest_image/image/' + img_names.split(',')[0]}
                  name={name}
                  city={city}
                  area={area}
                  rule_names={rule_names}
                  service_names={service_names}
                  average_friendly={average_friendly}
                  like={like}
                  token={auth.token}
                  singinHandler={toSingIn}
                  clickHandler={() => {
                    clickHeartHandler(rest_sid, 'rows2');
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
