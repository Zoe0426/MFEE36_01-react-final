import React from 'react';
import { useState, useEffect } from 'react';
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
import LocationFilter from '@/components/ui/restaurant/LocationFilter';
import TimeDateFilter from '@/components/ui/restaurant/TimeDateFilter';
import Likelist from '@/components/ui/like-list/like-list';
import { useRouter } from 'next/router';
import SearchBar1 from '@/components/ui/buttons/SearchBar1';
import orderByOptions from '@/data/restaurnt/orderby.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cityDatas from '@/data/restaurnt/location.json';
import SearchBar from '@/components/ui/buttons/SearchBar';

export default function FilterPage() {
  const router = useRouter();

  // console.log(cityDatas);
  // const { categorySid } = filterDatas;

  const [filters, setFilters] = useState(filterDatas);

  // 儲存篩選條件
  const [selectedCategories, setSelectedCategories] = useState([]);

  //進階篩選------------------------------------------------------------
  const [showfilter, setShowFilter] = useState(false);

  //收藏清單------------------------------------------------------------
  const [likeDatas, setLikeDatas] = useState([]);
  const [showLikeList, setShowLikeList] = useState(false);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

  const [keyword, setKeyword] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [keywordDatas, setKeywordDatats] = useState([]);
  const [showKeywordDatas, setShowKeywordDatas] = useState(false);

  const [rule, setRule] = useState('');
  const [service, setService] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');

  const [orderBy, setOrderBy] = useState('-- 排序條件 --');

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [datePickerValue, setDatePickerValue] = useState(null);

  const [showStartTimeError, setStartShowTimeError] = useState(false);
  const [showEndTimeError, setShowEndTimeError] = useState(false);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

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

    console.log(newSelect.label);
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

  //這邊有點問題
  useEffect(() => {
    //取得用戶拜訪的類別選項
    const { keyword, rule, service, city, area, orderBy, category } =
      router.query;

    console.log(router.query);

    if (Object.keys(router.query).length !== 0) {
      console.log(router.query);
      setRule(rule || '');
      setService(service || '');
      setCity(city || '');
      setCategory(category || '');
      setKeyword(keyword || '');
      // setOrderBy(orderBy);
      const usp = new URLSearchParams(router.query);

      fetch(`${process.env.API_SERVER}/restaurant-api/list?${usp.toString()}`)
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data.rows)) {
            setData(data);
            console.log(data.rows);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log(router.query);
      fetch(`${process.env.API_SERVER}/restaurant-api/list`)
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
  }, [router.query]);
  //searchBar相關的函式-------------------------------------------------------
  const filterKeywordDatas = (data, keyword, keyin) => {
    if (!keyin) {
      const searchWord = keyword.split('');

      data.forEach((v1) => {
        v1.count = 0;
        searchWord.forEach((v2) => {
          if (v1.name.includes(v2)) {
            v1.count += 1;
          }
        });
      });
      console.log(searchWord);
      console.log(data);

      data.sort((a, b) => b.count - a.count);

      return data.filter((v) => v.count >= searchWord.length);
    }
  };
  const searchBarHandler = (e) => {
    const searchText = e.target.value;
    if (!searchText) {
      const newKeywordDatas = [...keywordDatas];
      setKeywordDatats(false);
      setShowKeywordDatas(newKeywordDatas);
    }
    if (e.key === 'Enter') {
      if (!searchText.trim()) {
        // 如果沒有填字，不執行換頁的動作
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

  const autocompleteHandler = (selectkeyword) => {
    setKeyword(selectkeyword);
    setShowKeywordDatas(false);
  };

  //datefilter相關的函式-------------------------------------------------------

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
    console.log(filterCate);

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

    let query = {};

    if (selectedCity) {
      query.city = selectedCity;
    }

    if (selectedArea) {
      query.area = selectedArea;
    }

    console.log(selectedCity);
    console.log(selectedArea);

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
    setShowFilter(false);
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
  const openShowLikeList = () => {
    setShowLikeList(!showLikeList);
  };

  const closeShowLikeList = () => {
    setShowLikeList(false);
  };

  // const removeAllLikeList = () => {
  //   setLikeDatas([]);
  //   //這邊需要再修改，要看怎麼得到會員的編號
  //   removeLikeListToDB('all', 'mem00002');
  // };

  // const removeLikeListItem = (pid) => {
  //   const newLikeList = likeDatas.filter((arr) => {
  //     return arr.product_sid !== pid;
  //   });

  //   setLikeDatas(newLikeList);
  //   //這邊需要再修改，要看怎麼得到會員的編號
  //   removeLikeListToDB(pid, 'mem00002');
  // };

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
                clickHandler={openShowLikeList}
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
            <h2 className={Styles.jill_h2}>餐廳進階篩選結果</h2>
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
