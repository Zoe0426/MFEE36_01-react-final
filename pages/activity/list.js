import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import styles from '../../styles/activitymain.module.css';
import ActivityCard4 from '@/components/ui/cards/ActivityCard4';
import ActivityLikeListCard from '@/components/ui/cards/ActivityLikeListCard';
import {
  Row,
  Col,
  Pagination,
  ConfigProvider,
  Dropdown,
  Menu,
  Button,
  Space,
  Item,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SearchBar from '@/components/ui/buttons/SearchBar';
import Likelist from '@/components/ui/like-list/like-list';
import IconBtn from '@/components/ui/buttons/IconBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import MainBtn from '@/components/ui/buttons/MainBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faFilter } from '@fortawesome/free-solid-svg-icons';
import BreadCrumb from '@/components/ui/bread-crumb/breadcrumb';
import LikeListDrawer from '@/components/ui/like-list/LikeListDrawer';
import BGUpperDecoration from '@/components/ui/decoration/bg-upper-decoration';
import ActivityFilter from '@/components/ui/cards/ActivityFilter';
import ActivityFilterPrice from '@/components/ui/cards/ActivityFilterPrice';
import ActivityFilterDate from '@/components/ui/cards/ActivityFilterDate';

import cityDatas from '@/data/activity/location.json';
import filterDatas from '@/data/activity/filters.json';
import moment from 'moment';

export default function ActivityMain() {
  // 網址在這看 http://localhost:3000/activity/list?cid=類別&keyword=關鍵字&page=頁碼

  const router = useRouter();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(16);
  const [keyword, setKeyword] = useState('');
  const [activity_type_sid, setActivity_type_sid] = useState(0);
  const [selectedActivityTypeSid, setSelectedActivityTypeSid] = useState(0);

  const [orderBy, setOrderBy] = useState('-- 請選擇 --');

  // 收藏清單
  const [likeDatas, setLikeDatas] = useState([]);
  const [showLikeList, setShowLikeList] = useState(false);

  // 進階篩選
  const [showfilter, setShowFilter] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedMinPrice, setSelectedMinPrice] = useState(null);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(null);

  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [filtersReady, setFiltersReady] = useState(false);
  const [filters, setFilters] = useState(filterDatas);

  const { auth } = useContext(AuthContext);
  const authId = auth.id;

  const toSignIn = () => {
    const from = router.asPath;
    router.push(`/member/sign-in?from=${from}`);
  };

  const handleCityClick = (e) => {
    setSelectedCity(e.key);
    setSelectedArea(null);
  };

  const handleAreaClick = (e) => {
    setSelectedArea(e.key);
  };
  //取台灣的地區
  const cities = cityDatas;
  // const areas = getAreasByCity(selectedCity);

  // 取資料
  const [datas, setDatas] = useState({
    totalRows: 0,
    perPage: 16,
    totalPages: 0,
    page: 1,
    rows: [],
    // likeDatas:[],
  });

  // 小麵包屑------------------------------------------------------------
  const [breadCrubText, setBreadCrubText] = useState([
    {
      id: 'activity',
      text: '活動首頁',
      href: 'http://localhost:3000/activity',
      show: true,
    },
    { id: 'search', text: '/ 活動列表', href: '', show: true },
    { id: 'aid', text: '', href: '', show: false },
  ]);

  // 排序
  const rankOptions = {
    1: 'new_DESC',
    // 2: 'hot_DESC', // TODO: 需再確認cart的欄位名稱
  };

  useEffect(() => {
    console.log('router.query:', router.query);
    const {
      activity_type_sid,
      keyword,
      orderBy,
      minPrice,
      maxPrice,
      startDate,
      endDate,
      city,
      area,
    } = router.query;

    if (Object.keys(router.query).length !== 0) {
      console.log(router.query);

      if (minPrice) {
        setMinPrice(minPrice);
      }

      if (maxPrice) {
        setMaxPrice(maxPrice);
      }

      // if (activity_type_sid) {
      //   setActivity_type_sid(activity_type_sid);
      // }
      if (activity_type_sid) {
        setSelectedActivityTypeSid(activity_type_sid);
      }

      if (city) {
        setSelectedCity(city);
      }
      if (area) {
        setSelectedArea(area);
      }

      setStartDate(startDate ? moment(startDate, 'YYYY-MM-DD') : null);
      setEndDate(endDate ? moment(endDate, 'YYYY-MM-DD') : null);

      //到頁面時 將type勾選回來
      if (activity_type_sid) {
        resetCheckBox('activity_type_sid', activity_type_sid);
      }

      setArea(area || '');
      setActivity_type_sid(activity_type_sid || 0);
      setKeyword(keyword || '');
      setMinPrice(minPrice || '');
      setMaxPrice(maxPrice || '');
      setStartDate(startDate || null);
      setEndDate(endDate || null);

      const usp = new URLSearchParams(router.query);

      fetch(`${process.env.API_SERVER}/activity-api/activity?${usp.toString()}`)
        .then((r) => r.json())
        .then((data) => {
          if (Array.isArray(data.rows)) {
            setDatas(data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [router.query]);

  // const handleActivityTypeSelection = (activityTypeSid) => {
  //   setActivity_type_sid(activityTypeSid);
  // };

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

  //searchBar相關的函式------------------------------------------------------------
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

  //進階篩選------------------------------------------------------------
  const toggleFilter = () => {
    setShowFilter(!showfilter);
  };

  const handleDateChange = (dates) => {
    const [startDate, endDate] = dates;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handlePriceChange = (minPrice, maxPrice) => {
    setSelectedMinPrice(minPrice);
    setSelectedMaxPrice(maxPrice);
  };

  //篩選 搜尋btn 觸發事件
  const filterHandler = () => {
    let query = {};

    // 將activity_type_sid設定回來
    const selectedActivityTypeSid = filters.activity_type_sid
      .filter((item) => item.checked)
      .map((item) => item.value);

    if (selectedActivityTypeSid.length > 0) {
      query.activity_type_sid = selectedActivityTypeSid.join(',');
    }

    if (selectedCity) {
      query.city = selectedCity;
    }

    if (selectedArea) {
      query.area = selectedArea;
    }

    if (selectedMinPrice !== null) {
      query.minPrice = selectedMinPrice;
    } else {
      delete query.minPrice;
    }

    if (selectedMaxPrice !== null) {
      query.maxPrice = selectedMaxPrice;
    } else {
      delete query.maxPrice;
    }

    if (startDate) {
      query.startDate = startDate.format('YYYY-MM-DD');
    } else {
      delete query.startDate;
    }

    if (endDate) {
      query.endDate = endDate.format('YYYY-MM-DD');
    } else {
      delete query.endDate;
    }

    console.log(minPrice);
    console.log('query:', query);

    router.push(
      `?${new URLSearchParams({
        ...query,
        page: 1,
      }).toString()}`
    );
  };

  //重置篩選條件
  // const clearAllFilter = () => {
  //   setFilters(filterDatas);
  //   // setEndDate('');
  //   // setStartDate('');
  //   // setDatePickerValue(null);
  //   setSelectedCity(null);
  //   setSelectedArea(null);
  //   setMinPrice('');

  //   const { keyword } = router.query;
  //   const query = { page: 1 };
  //   if (keyword) {
  //     query.keyword = keyword;
  //   }
  //   router.push(
  //     `?${new URLSearchParams({
  //       ...query,
  //     }).toString()}`
  //   );
  // };

  //收藏列表相關的函式------------------------------------------------------------

  // 更新收藏清單
  const updateLikeList = (activitySid, isLiked) => {
    if (isLiked) {
      // 新增至收藏清單
      setLikeDatas((prevLikeDatas) => [
        ...prevLikeDatas,
        { activity_sid: activitySid },
      ]);
    } else {
      // 從收藏清單中移除
      setLikeDatas((prevLikeDatas) =>
        prevLikeDatas.filter((item) => item.activity_sid !== activitySid)
      );
    }
  };

  //取得蒐藏列表資料
  const getLikeList = async (token = '') => {
    const res = await fetch(
      `${process.env.API_SERVER}/activity-api/show-like-list`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = await res.json();

    if (data.likeDatas.length > 0) {
      setLikeDatas(data.likeDatas);
    }
  };

  //控制展開收藏列表
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
      const newData = datas.rows.map((v) => {
        return { ...v, like: false };
      });
      setDatas({ ...datas, rows: newData });
      //將請求送到後端作業
      removeLikeListToDB('all', token);
    }
  };

  // 刪除單一收藏
  const removeLikeListItem = (aid, token = '') => {
    //將列表該項目刪除
    const newLikeList = likeDatas.filter((arr) => {
      return arr.acitvity_sid !== aid;
    });
    setLikeDatas(newLikeList);
    //將若取消的為畫面上的，則須將愛心清除
    const newData = datas.rows.map((v) => {
      if (v.activity_sid === aid) {
        return { ...v, like: false };
      } else {
        return { ...v };
      }
    });
    setDatas({ ...datas, rows: newData });
    //將請求送到後端作業
    removeLikeListToDB(aid, token);
  };

  //將刪除收藏的請求送到後端作業
  const removeLikeListToDB = async (aid = '', token = '') => {
    try {
      const removeAll = await fetch(
        `${process.env.API_SERVER}/activity-api/likelist/${aid}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      const result = await removeAll.json();
      console.log(JSON.stringify(result, null, 4));
      if (aid === 'all') {
        setTimeout(() => {
          toggleLikeList();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 給faheart的 新增與刪除------------------------------------------------------------
  const handleLikeClick = async (activitySid, token, authId) => {
    try {
      if (!token) {
        throw new Error('未找到會員ID');
      }

      if (isInLikeList(activitySid)) {
        // Perform the delete action to remove from the like list
        const response = await fetch(
          `${process.env.API_SERVER}/activity-api/likelist/${activitySid}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );
        //console.log('會員ID:', token.id);

        if (!response.ok) {
          throw new Error('刪除收藏失敗');
        }

        updateLikeList(activitySid, false); // Successfully removed from like list
        console.log('刪除收藏成功');
      } else {
        // Perform the post action to add to the like list
        const response = await fetch(
          `${process.env.API_SERVER}/activity-api/addlikelist/${activitySid}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify({
              aid: activitySid,
              mid: authId,
            }),
          }
        );

        if (!response.ok) {
          throw new Error('新增收藏失敗');
        }

        updateLikeList(activitySid, true); // Successfully added to like list
        console.log('新增收藏成功');
      }
    } catch (error) {
      console.error('操作收藏失敗:', error);
    }
  };

  // 判斷活動是否在收藏列表中
  const isInLikeList = (activitySid) => {
    return likeDatas.some((item) => item.activity_sid === activitySid);
  };

  // Pagination相關的函式------------------------------------------------------------
  const PageChangeHandler = (page) => {
    setPage(page);
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page: page,
      }).toString()}`
    );
  };

  return (
    <div>
      {/* .........banner......... */}
      <div className={styles.banner}>
        <div className={styles.search}>
          <h1>想找活動嗎？來這裡就對了！</h1>
          <SearchBar
            placeholder="搜尋活動名稱"
            btn_text="尋找活動"
            inputText={keyword}
            changeHandler={(e) => setKeyword(e.target.value)}
            keyDownHandler={searchBarHandler}
            clickHandler={searchBarClickHandler}
          />
        </div>
      </div>

      <div className={styles.bgc}>
        <div className="container-inner">
          <div className={styles.nav_head}>
            <BreadCrumb breadCrubText={breadCrubText} />

            <div className={styles.btns}>
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

        {/* .........進階篩選......... */}
        {showfilter && (
          <>
            <div className="container-outer">
              <div className={styles.line}></div>
            </div>
            <div className="container-inner">
              <div className={styles.filter_box}>
                <ActivityFilter
                  text="活動類別:"
                  name="activity_type_sid"
                  data={filters.activity_type_sid}
                  selectedValue={selectedActivityTypeSid}
                  setSelectedValue={setSelectedActivityTypeSid}
                  filterHandler={filterHandler}
                />
                <ActivityFilterPrice onPriceChange={handlePriceChange} />

                <ActivityFilterDate onDateChange={handleDateChange} />

                <div>
                  <div>
                    <label>活動地點</label>
                  </div>
                  <div>
                    {/* City Dropdown */}
                    <Dropdown
                      overlay={
                        <Menu onClick={handleCityClick}>
                          {Object.keys(cityDatas).map((city) => (
                            <Menu.Item key={city}>{city}</Menu.Item>
                          ))}
                        </Menu>
                      }
                      placement="bottomLeft"
                    >
                      <Button>
                        <Space>
                          <p>{selectedCity ? selectedCity : '縣市'}</p>
                          <DownOutlined />
                        </Space>
                      </Button>
                    </Dropdown>

                    {/* Area Dropdown */}
                    <Dropdown
                      overlay={
                        <Menu onClick={handleAreaClick}>
                          {selectedCity &&
                            cityDatas[selectedCity].map((area) => (
                              <Menu.Item key={area}>{area}</Menu.Item>
                            ))}
                        </Menu>
                      }
                      placement="bottomLeft"
                    >
                      <Button>
                        <Space>
                          <p>{selectedArea ? selectedArea : '地區'}</p>
                          <DownOutlined />
                        </Space>
                      </Button>
                    </Dropdown>
                  </div>
                </div>

                <div className={styles.filter_btns}>
                  {/* <SecondaryBtn text="重置" clickHandler={clearAllFilter} /> */}
                  <MainBtn text="確定" clickHandler={filterHandler} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* .........收藏列表......... */}
        <div className="container-inner">
          <>
            {showLikeList && (
              <LikeListDrawer
                datas={likeDatas}
                customCard={
                  <ActivityLikeListCard
                    datas={likeDatas}
                    token={auth.token}
                    removeLikeListItem={removeLikeListItem}
                  />
                }
                closeHandler={toggleLikeList}
                removeAllHandler={() => {
                  removeAllLikeList(auth.token);
                }}
              />
            )}
          </>
        </div>
      </div>
      <BGUpperDecoration />

      {/* .........搜尋結果......... */}
      <div className="container-inner">
        <div className={styles.quick_selector}>
          <div>
            <p className={styles.text_large}>TODO: 搜尋活動「游泳課」</p>
            <p>TODO: 50項活動</p>
          </div>
          <div>
            <button>最新</button>
          </div>
        </div>
      </div>
      {/* .........section1......... */}
      <div className="container-inner">
        <div className={styles.section_card}>
          <Row gutter={[0, 106]} className={styles.card}>
            {datas.rows.map((i) => {
              const {
                activity_sid,
                type_name,
                activity_pic,
                name,
                avg_star,
                recent_date,
                farthest_date,
                time,
                city,
                area,
                address,
                content,
                feature_names,
                price_adult,
              } = i;
              const liked = isInLikeList(activity_sid);
              return (
                <Col key={activity_sid} span={12}>
                  <ActivityCard4
                    key={activity_sid}
                    activity_sid={activity_sid}
                    type={type_name}
                    image={'/activity_img/' + activity_pic.split(',')[0]}
                    title={name}
                    rating={avg_star}
                    date_begin={recent_date}
                    date_end={farthest_date}
                    time={time}
                    city={city}
                    area={area}
                    address={address}
                    content={content}
                    features={feature_names?.split(',') || []}
                    price={price_adult}
                    isInLikeList={liked}
                    handleLikeClick={() =>
                      handleLikeClick(activity_sid, auth.token)
                    } // 傳遞handleLikeClick函式給子組件
                  />
                </Col>
              );
            })}
          </Row>
        </div>

        {/* .........頁碼......... */}
        <div className={styles.pagination}>
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
              current={datas.page}
              total={datas.totalRows}
              pageSize={datas.perPage}
              onChange={PageChangeHandler}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}
