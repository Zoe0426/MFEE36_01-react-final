import React from 'react';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import RestCard from '@/components/ui/cards/rest_card';
import { DownOutlined } from '@ant-design/icons';
import {
  Pagination,
  Col,
  Row,
  ConfigProvider,
  Breadcrumb,
  Button,
  Dropdown,
  Space,
  Menu,
} from 'antd';
import TopAreaBgc from '@/components/ui/restaurant/TopAreaBgc';
import Styles from './list.module.css';
import filterDatas from '@/data/restaurnt/categories.json';
import IconBtn from '@/components/ui/buttons/IconBtn';
import {
  faFilter,
  faHeart,
  faMap,
  faPaw,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import MainBtn from '@/components/ui/buttons/MainBtn';
import RestaurantFilter from '@/components/ui/restaurant/RestaurantFilter';
import RestPageOrder from '@/components/ui/restaurant/RestPageOrder';
import TimeDateFilter from '@/components/ui/restaurant/TimeDateFilter';
import Likelist from '@/components/ui/like-list/like-list';
import { useRouter } from 'next/router';
import SearchBar1 from '@/components/ui/buttons/SearchBar1';
import orderByOptions from '@/data/restaurnt/orderby.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cityDatas from '@/data/restaurnt/location.json';
import SearchBar from '@/components/ui/buttons/SearchBar';
import LikeListCard from '@/components/ui/restaurant/LikeListCard';

export default function FilterPage() {
  const router = useRouter();

  // console.log(cityDatas);
  // const { category } = filterDatas;

  const [filters, setFilters] = useState(filterDatas);

  // 儲存篩選條件
  const [selectedCategories, setSelectedCategories] = useState([]);

  //進階篩選------------------------------------------------------------
  const [showfilter, setShowFilter] = useState(false);

  //收藏清單
  const [likeDatas, setLikeDatas] = useState([]);
  const [showLikeList, setShowLikeList] = useState(false);
  const [addLikeList, setAddLikeList] = useState([]);
  const [isClickingLike, setIsClickingLike] = useState(false);

  //分頁相關
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

  //search bar相關
  const [keyword, setKeyword] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [keywordDatas, setKeywordDatas] = useState([]);
  const [showKeywordDatas, setShowKeywordDatas] = useState(false);

  const [rule, setRule] = useState('');
  const [service, setService] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState('');

  const [orderBy, setOrderBy] = useState('-- 排序條件 --');

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [errorMsg, setErrorMsg] = useState();
  const [datePickerValue, setDatePickerValue] = useState(null);

  const [showStartTimeError, setStartShowTimeError] = useState(false);
  const [showEndTimeError, setShowEndTimeError] = useState(false);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  const { auth, setAuth } = useContext(AuthContext);

  const getData = async (obj = {}, token = '') => {
    const usp = new URLSearchParams(obj);
    const res = await fetch(
      `${process.env.API_SERVER}/restaurant-api/list?${usp.toString()}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = await res.json();

    if (Array.isArray(data.rows)) {
      setData(data);
    }
  };

  const handleCityClick = ({ key }) => {
    setSelectedCity(key);
    setSelectedArea(null);
  };

  const handleAreaClick = ({ key }) => {
    setSelectedArea(key);
  };
  //取台灣的地區
  const cities = cityDatas;
  //取資料相關的函式-------------------------------------------------------
  const [data, setData] = useState({
    totalRows: 0,
    perPage: 15,
    totalPages: 0,
    page: 1,
    rows: [],
  });

  //排序相關的函式-------------------------------------------------------
  const rankOptions = {
    1: 'hot_DESC',
    2: 'new_DESC',
    3: 'cmt_DESC',
  };

  const orderByHandler = (e) => {
    const newSelect = orderByOptions.find((v) => v.key === e.key);

    // console.log(newSelect.label);
    setOrderBy(newSelect.label);

    const selectedRank = rankOptions[e.key];
    // console.log(selectedRank);
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page: 1,
        orderBy: selectedRank,
      }).toString()}`
    );
  };

  // 這邊有點問題;
  useEffect(() => {
    //取得用戶拜訪的類別選項
    const {
      keyword,
      rule,
      service,
      city,
      area,
      category,
      startTime,
      endTime,
      selectedDate,
    } = router.query;

    console.log(router.query);

    if (Object.keys(router.query).length !== 0) {
      console.log(router.query);
      setRule(rule || '');
      setService(service || '');
      if (city) {
        setSelectedCity(city);
      }
      if (area) {
        setSelectedArea(area);
      }

      if (startTime) {
        setStartTime(startTime);
      }

      if (endTime) {
        setEndTime(endTime);
      }

      if (selectedDate) {
        setDatePickerValue(selectedDate); // 設置日期狀態
      }
      if (category) {
        resetCheckBox('category', category);
      }

      setArea(area || '');
      setCategory(category || '');
      setKeyword(keyword || '');
      // setOrderBy(orderBy);
      const usp = new URLSearchParams(router.query);

      fetch(`${process.env.API_SERVER}/restaurant-api/list?${usp.toString()}`)
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data.rows)) {
            setData(data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // getData(router.query, auth.token);
    // if (Object.keys(router.query).length === 0) {
    //   console.log(router.query);
    //   fetch(`${process.env.API_SERVER}/restaurant-api/list`)
    //     .then((r) => r.json())
    //     .then((data) => {
    //       if (Array.isArray(data.rows)) {
    //         setData(data);
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
  }, [router.query]);

  console.log(data.rows);

  //進入畫面時將checkbox依據queryString設定勾選狀態
  const resetCheckBox = (key, str) => {
    const selectedValues = str.split(',');
    const newCheckBox = filters[key].map((v) => {
      if (selectedValues.includes(String(v.value))) {
        return { ...v, checked: true };
      }
      return { ...v, checked: false };
    });
    setFilters((prev) => ({ ...prev, [key]: newCheckBox }));
  };

  const filterKeywordDatas = (data, keyword, keyin) => {
    if (!keyin) {
      const searchWord = keyword.split('');

      if (searchWord.length === 0) {
        return data;
      }

      console.log(searchWord);

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

      console.log(data);

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
  const handleBlur = () => {
    // 檢查是否填寫了開始時間和結束時間
    if (startTime && !endTime) {
      setStartShowTimeError(false);
      setShowEndTimeError(true);
    } else if (!startTime && endTime) {
      setStartShowTimeError(true);
      setShowEndTimeError(false);
    } else if (startTime && endTime) {
      // 如果開始時間和結束時間相同，顯示相同時間錯誤提示訊息
      if (startTime === endTime) {
        setStartShowTimeError(true);
        setShowEndTimeError(true);
        setErrorMsg('不可填寫相同時間');
      } else {
        setStartShowTimeError(false);
        setShowEndTimeError(false);
        setErrorMsg(null);
      }
    } else {
      // 時間填寫正確，清除錯誤提示訊息
      setStartShowTimeError(false);
      setShowEndTimeError(false);
      setErrorMsg(null);
    }
  };

  //篩選的部分
  const filterHandler = () => {
    const filterCate = filters.category;
    console.log(filterCate);

    //時間篩選
    const start = startTime ? startTime + ':00' : null;
    const end = endTime ? endTime + ':00' : null;

    //日期篩選
    const selectedDate = datePickerValue;
    const selectedDayOfWeek = selectedDate ? selectedDate.$W : null;

    //console.log(selectedDate);

    // 檢查是否填寫了開始時間和結束時間
    if (startTime && !endTime) {
      setStartShowTimeError(false);
      setShowEndTimeError(true);
      setShowFilter(true);
    } else if (!startTime && endTime) {
      setStartShowTimeError(true);
      setShowEndTimeError(false);
      setShowFilter(true);
    } else if (startTime && endTime) {
      // 如果開始時間和結束時間相同，顯示相同時間錯誤提示訊息
      if (startTime === endTime) {
        setStartShowTimeError(true);
        setShowEndTimeError(true);
        setErrorMsg('不可填寫相同時間');
      } else {
        setStartShowTimeError(false);
        setShowEndTimeError(false);
        setErrorMsg(null);
      }
    } else {
      // 時間填寫正確，清除錯誤提示訊息
      setStartShowTimeError(false);
      setShowEndTimeError(false);
      setErrorMsg(null);
    }

    //如果有錯誤訊息就不送出篩選
    if (errorMsg && showStartTimeError && showEndTimeError) {
      return;
    }
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

    //收起篩選區域
    //setShowFilter(false);
    router.push(
      `?${new URLSearchParams({
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

    // setStartTime('08:00');

    const { keyword } = router.query;
    const query = { page: 1 };
    if (keyword) {
      query.keyword = keyword;
    }
    router.push(
      `?${new URLSearchParams({
        ...query,
      }).toString()}`
    );
  };
  //篩選filter相關的函式-------------------------------------------------------
  const toggleFilter = () => {
    setShowFilter(!showfilter);
  };

  //收藏列表相關的函式-------------------------------------------------------
  //取得收藏列表
  const getLikeList = async (token = '') => {
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
    console.log(data);
    if (data.likeDatas.length > 0) {
      setLikeDatas(data.likeDatas);
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
    const from = router.query;
    router.push(
      `/member/sign-in?from=http://localhost:3000/restaurant/list?${new URLSearchParams(
        from
      ).toString()}`
    );
  };

  //卡片愛心收藏的相關函式-------------------------------------------------------
  const clickHeartHandler = (id) => {
    setIsClickingLike(true);
    const timeClick = new Date().getTime();
    const newData = data.rows.map((v) => {
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
    setData({ ...data, rows: newData });
    setTimeout(() => {
      setIsClickingLike(false);
    }, 3000);
  };

  //將資料送到後端
  const sendLikeList = async (obj, token = '') => {
    const res = await fetch(
      `${process.env.API_SERVER}/restaurant-api/handle-like-list`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: obj }),
      }
    );
    const data = await res.json();

    if (data.success) {
      console.log(data);
    }
  };

  //控制愛心紅色
  const toggleLikeList = () => {
    const newShowLikeList = !showLikeList;
    console.log(newShowLikeList);
    setShowLikeList(newShowLikeList);
    if (newShowLikeList) {
      document.body.classList.add('likeList-open');
      getLikeList(auth.token);
    } else {
      document.body.classList.remove('likeList-open');
    }
  };

  // 刪除所有收藏
  const removeAllLikeList = (token) => {
    if (likeDatas.length > 0) {
      //將列表顯示為空的
      setLikeDatas([]);
      //將畫面上的愛心清除
      const newData = data.rows.map((v) => {
        return { ...v, like: false };
      });
      setData({ ...data, rows: newData });
      //將請求送到後端作業
      removeLikeListToDB('all', token);
    }
  };

  // 刪除單一收藏
  const removeLikeListItem = (rid, token = '') => {
    //將列表該項目刪除
    const newLikeList = likeDatas.filter((arr) => {
      return arr.rest_sid !== rid;
    });
    setLikeDatas(newLikeList);
    //將若取消的為畫面上的，則須將愛心清除
    const newData = data.rows.map((v) => {
      if (v.rest_sid === rid) {
        return { ...v, like: false };
      } else {
        return { ...v };
      }
    });
    setData({ ...data, rows: newData });
    //將請求送到後端作業
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
      console.log(JSON.stringify(result, null, 4));
      if (rid === 'all') {
        setTimeout(() => {
          toggleLikeList();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Pagination相關的函式-------------------------------------------------------
  const PageChangeHandler = (page, perpage) => {
    setPerPage(perpage);
    setPage(page);
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page: page,
        // perPage: perpage,
      }).toString()}`
    );
  };

  return (
    <>
      <div className={Styles.banner}>
        <div className={Styles.search}>
          <h1 className={Styles.jill_h1}>想知道哪裡有寵物餐廳？</h1>
          {/* <SearchBar
            placeholder="搜尋餐廳名稱"
            btn_text="尋找餐廳"
            inputText={keyword}
            changeHandler={(e) => {
              setKeyword(e.target.value);
            }}
            keyDownHandler={searchBarHandler}
            clickHandler={searchBarClickHandler}
          /> */}
          {/* <div className={Styles.search_bar}> */}
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
          {/* </div> */}
        </div>
      </div>

      <div className={Styles.bgc}>
        <div className="container-inner">
          <div className={Styles.bread_btn}>
            <div className={Styles.breadcrumb}>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#FD8C46',
                    colorBgContainer: 'transparent',
                    colorPrimaryTextHover: '#FFEFE8',
                    colorBgTextActive: '#FD8C46',
                    fontSize: 18,
                  },
                }}
              >
                <Breadcrumb
                  items={[
                    {
                      title: '餐廳首頁',
                      href: 'http://localhost:3000/restaurant',
                    },
                    {
                      title: '餐廳列表',
                    },
                  ]}
                />
              </ConfigProvider>
            </div>
            <div className={Styles.function_group}>
              <IconBtn icon={faMap} text="餐廳地圖" />
              <IconBtn
                icon={faHeart}
                text="收藏列表"
                clickHandler={toggleLikeList}
              />
              <IconBtn
                icon={faFilter}
                text="進階篩選"
                clickHandler={toggleFilter}
              />
            </div>
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
                {/* <LocationFilter
                  text="用餐地區"
                  handleCityClick={handleCityClick}
                  handleAreaClick={handleAreaClick}
                /> */}
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
                      <Dropdown
                        overlay={
                          <Menu onClick={handleCityClick}>
                            {Object.keys(cities).map((city) => (
                              <Menu.Item key={city}>{city}</Menu.Item>
                            ))}
                          </Menu>
                        }
                        className={Styles.city}
                        placement="bottomLeft"
                      >
                        <Button>
                          <Space>
                            <p className={Styles.dropdown_arrow}>
                              {selectedCity ? selectedCity : '城市'}
                            </p>
                            <DownOutlined />
                          </Space>
                        </Button>
                      </Dropdown>
                      <Dropdown
                        overlay={
                          <Menu onClick={handleAreaClick}>
                            {selectedCity &&
                              cities[selectedCity].map((area) => (
                                <Menu.Item key={area}>{area}</Menu.Item>
                              ))}
                          </Menu>
                        }
                        className={Styles.section}
                        placement="bottomLeft"
                      >
                        <Button>
                          <Space>
                            <p className={Styles.dropdown_arrow}>
                              {selectedArea ? selectedArea : '地區'}
                            </p>
                            <DownOutlined />
                          </Space>
                        </Button>
                      </Dropdown>
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
                  onBlur={handleBlur}
                  alert_start={
                    showStartTimeError && (
                      <p style={{ color: 'red' }}>
                        <FontAwesomeIcon icon={faCircleExclamation} />{' '}
                        {errorMsg || '請填寫開始時間'}
                      </p>
                    )
                  }
                  status_start={showStartTimeError && 'error'}
                  status_end={showEndTimeError && 'error'}
                  alert_end={
                    showEndTimeError && (
                      <p style={{ color: 'red' }}>
                        <FontAwesomeIcon icon={faCircleExclamation} />{' '}
                        {errorMsg || '請填寫結束時間'}
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
              <Likelist
                datas={likeDatas}
                customCard={
                  <LikeListCard
                    datas={likeDatas}
                    token={auth.token}
                    removeLikeListItem={removeLikeListItem}
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
        <div className={Styles.second_area}>
          <div className={Styles.search_title}>
            <h2 className={Styles.jill_h2}>餐廳列表</h2>
            <p>
              {data.totalRows != 0 ? `共${data.totalRows}間餐廳` : '查無餐廳'}
            </p>
          </div>
          <RestPageOrder
            totalItems={data.totalRows}
            onRankChange={orderByHandler}
            orderBy={orderBy}
            items={orderByOptions}
          />
        </div>
      </div>

      <div className="container-inner">
        <Row gutter={{ xs: 16, xl: 32 }}>
          {data.rows.map((v) => {
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
                  like={like}
                  token={auth.token}
                  singinHandler={toSingIn}
                  clickHandler={() => {
                    clickHeartHandler(rest_sid);
                  }}
                />
              </Col>
            );
          })}
        </Row>
      </div>

      <div className={Styles.pagination}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#FD8C46',
              colorBgContainer: 'transparent',
              colorBgTextHover: '#FFEFE8',
              colorBgTextActive: '#FFEFE8',
              fontSize: 18,
              controlHeight: 38,
              lineWidthFocus: 1,
            },
          }}
        >
          <Pagination
            current={data.page}
            total={data.totalRows}
            pageSize={data.perPage}
            onChange={PageChangeHandler}
          />
        </ConfigProvider>
      </div>
    </>
  );
}
