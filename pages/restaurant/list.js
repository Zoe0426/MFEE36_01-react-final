import React from 'react';
import { useState, useEffect } from 'react';
import RestCard from '@/components/ui/cards/rest_card';
import { Pagination, Col, Row, ConfigProvider, Breadcrumb } from 'antd';
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
import { useRouter } from 'next/router';
import SearchBar from '@/components/ui/buttons/SearchBar';
import orderByOptions from '@/data/restaurnt/orderby.json';

export default function FilterPage() {
  const router = useRouter();
  // const { categorySid } = filterDatas;
  // console.log(categorySid);
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

  const [rule, setRule] = useState('');
  const [service, setService] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');

  const [orderBy, setOrderBy] = useState('-- 排序條件 --');

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [datePickerValue, setDatePickerValue] = useState(null);

  const [showTimeError, setShowTimeError] = useState(false);
  const [showTimeError1, setShowTimeError1] = useState(false);

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

  //searchBar相關的函式-------------------------------------------------------
  const searchBarHandler = (e) => {
    let copyURL = { ...router.query, page: 1 };
    if (e.key === 'Enter') {
      if (!keyword) {
        delete copyURL.keyword;
      } else {
        const searchText = e.target.value;
        copyURL = { ...copyURL, keyword: searchText };
      }
      router.push(`?${new URLSearchParams(copyURL).toString()}`);
    }
  };

  const searchBarClickHandler = () => {
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        keyword: keyword,
        page: 1,
      }).toString()}`
    );
  };

  useEffect(() => {
    //取得用戶拜訪的類別選項
    const { keyword, rule, service, city, orderBy, category } = router.query;
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
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router.query]);

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
      setShowTimeError(false);
      setShowTimeError1(true);
    } else if (!startTime && endTime) {
      setShowTimeError(true);
      setShowTimeError1(false);
    }

    const checkedOptions = filterCate
      .filter((v) => v.checked === true)
      .map((v) => v.value);

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
    setShowTimeError(false);
    setShowTimeError1(false);

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
                <LocationFilter text="用餐地區" />
                <TimeDateFilter
                  startTime={startTime}
                  endTime={endTime}
                  handlerChange1={handlerChange1}
                  handlerChange2={handlerChange2}
                  onDateChange={handleDatePickerChange}
                  value={datePickerValue}
                  alert_start={
                    showTimeError && (
                      <p style={{ color: 'red' }}>請填寫開始時間</p>
                    )
                  }
                  status_start={showTimeError && 'error'}
                  status_end={showTimeError1 && 'error'}
                  alert_end={
                    showTimeError1 && (
                      <p style={{ color: 'red' }}>請填寫結束時間</p>
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
