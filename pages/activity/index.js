import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import Head from 'next/head';
import {
  Row,
  Col,
  ConfigProvider,
  DatePicker,
  Select,
} from 'antd';

import Link from 'next/link';
import styles from '../../styles/activityindex.module.css';

import SubBtn from '@/components/ui/buttons/subBtn';
import ActivityCard1 from '@/components/ui/cards/ActivityCard1';
import ActivityCard2 from '@/components/ui/cards/ActivityCard2';
import ActivityCard3 from '@/components/ui/cards/ActivityCard3';

import SearchBar from '@/components/ui/buttons/SearchBar';

import IconBtn from '@/components/ui/buttons/IconBtn';
import MainBtn from '@/components/ui/buttons/MainBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faFilter } from '@fortawesome/free-solid-svg-icons';
import LikeListDrawer from '@/components/ui/like-list/LikeListDrawer';
import BGUpperDecoration from '@/components/ui/decoration/bg-upper-decoration';
import ActivityLikeListCard from '@/components/ui/cards/ActivityLikeListCard';
import ActivityFilter from '@/components/ui/cards/ActivityFilter';
import ActivityFilterPrice from '@/components/ui/cards/ActivityFilterPrice';
import cityDatas from '@/data/activity/location.json';
import filterDatas from '@/data/activity/filters.json';
import moment from 'moment';
import ActivityAlertModal from '@/components/ui/cards/ActivityAlertModal';


export default function ActivityHome() {
  // 主卡片
  const [data, setData] = useState([]);
  const [topCityData, setTopCityData] = useState([]);
  const [wish, setWish] = useState([]);
  const [popularCount, setPopularCount] = useState([]);

  // 會員登入
  const { auth } = useContext(AuthContext);
  const authId = auth.id;
  const router = useRouter();

  // 其他
  const [keyword, setKeyword] = useState('');
  const [activity_type_sid, setActivity_type_sid] = useState(0);
  const [selectedActivityTypeSid, setSelectedActivityTypeSid] = useState(0);

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
  const [selectedDates, setSelectedDates] = useState([]);
  const [filtersReady, setFiltersReady] = useState(false);
  const [filters, setFilters] = useState(filterDatas);

  // 會員登入跳轉
  const toSingIn = () => {
    const from = router.query;
    router.push(
      `/member/sign-in?from=${process.env.WEB}/activity/${new URLSearchParams(
        from
      ).toString()}`
    );
  };


  //篩選地點
  const handleProvinceChange = (value) => {
    setSelectedCity(value);
    setSelectedArea(null);
  };
  const onSecondCityChange = (value) => {
    setSelectedArea(value);
  };
  //取台灣的地區
  const cities = cityDatas;

  // 主卡片資訊
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.API_SERVER}/activity-api`);
        const { data, topCityData, wish, popularCount } = await response.json();
        setData(data);
        setTopCityData(topCityData);
        setWish(wish);
        setPopularCount(popularCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

 

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
      router.push(`/activity/list?${new URLSearchParams(copyURL).toString()}`);
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

  const handleCityClick = (e) => {
    setSelectedCity(e.key);
    setSelectedArea(null);
  };

  const handleAreaClick = (e) => {
    setSelectedArea(e.key);
  };


  // 進階篩 日期區間
  const handleDateChange = (dates) => {
    const [startDate, endDate] = dates;
    setStartDate(startDate);
    setEndDate(endDate);
    setSelectedDates(dates);
  };

  const rangeConfig = {
    rules: [
      {
        type: 'array',
      },
    ],
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

    //console.log(minPrice);
    //console.log('query:', query);

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
    // setEndDate(null);
    // setStartDate(null);
    setSelectedDates([]);
    setSelectedCity(null);
    setSelectedArea(null);
    setMinPrice('');
    setMaxPrice('');

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
      // 將列表顯示為空的
      setLikeDatas([]);
      // 將畫面上的愛心清除
      const newData = data.map((v) => {
        return { ...v, like: false };
      });
      setData(newData);
      // 將請求送到後端作業
      removeLikeListToDB('all', token);
    }
  };

  // 刪除單一收藏
  const removeLikeListItem = async (aid, token = '') => {
    const newLikeList = likeDatas.filter((arr) => {
      return arr.activity_sid !== aid;
    });
    setLikeDatas(newLikeList);

    const newData = likeDatas.map((v) => {
      if (v.activity_sid == aid) {
        return { ...v, like: false };
      } else {
        return { ...v };
      }
    });

    updateLikeList(aid, false);

    await removeLikeListToDB(aid, token);
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
      //console.log(JSON.stringify(result, null, 4));
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
  useEffect(() => {
    // 在進入頁面時取得收藏清單資料, faheart也會立即更新
    if (auth.token) {
      getLikeList(auth.token);
    }
  }, [auth.token]);

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
        //console.log('刪除收藏成功');
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
        //console.log('新增收藏成功');
      }
    } catch (error) {
      console.error('操作收藏失敗:', error);
    }
  };

  // 判斷活動是否在收藏列表中
  const isInLikeList = (activitySid) => {
    return likeDatas.some((item) => item.activity_sid === activitySid);
  };

  return (
    <div>
      <Head>
        <title>狗with咪 | 活動</title>
      </Head>

      {/* .........banner......... */}
      <div className={styles.banner}>
        <div className={styles.search}>
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

            <div className={styles.btns}>
              {auth.token ? (
                <IconBtn
                  icon={faHeart}
                  text="收藏列表"
                  clickHandler={toggleLikeList}
                />
              ) : (
                <ActivityAlertModal
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
        </div>

        {/* .........進階篩選......... */}
        {showfilter && (
          <>
            <div className="container-outer">
              <div className={styles.line}></div>
            </div>
            <div className="container-inner">
              <div className={styles.filter}>
                <ActivityFilter
                  text="活動類別："
                  name="activity_type_sid"
                  data={filters.activity_type_sid}
                  selectedValue={selectedActivityTypeSid}
                  setSelectedValue={setSelectedActivityTypeSid}
                  filterHandler={filterHandler}
                />
                <ActivityFilterPrice onPriceChange={handlePriceChange} />

                <div className={styles.filter_date}>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: '#FD8C46',
                        fontSize: 18,
                        controlInteractiveSize: 18,
                        lineHeight: 1.8,
                        controlHeight: 50,
                        borderRadius: 10,
                      },
                    }}
                  >
                    <label className={styles.labels}>活動日期：</label>
                    <DatePicker.RangePicker
                      name="range-picker"
                      label="活動日期"
                      {...rangeConfig}
                      onChange={handleDateChange}
                      value={selectedDates}
                    />
                  </ConfigProvider>
                </div>

                <div className={styles.dropdowns}>
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
                    <div>
                      <label className={styles.labels}>活動地點：</label>
                    </div>
                    <div>
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
                        className={styles.city}
                      />
                      <Select
                        // style={{
                        //   width: 200,
                        // }}
                        value={selectedArea}
                        placeholder="地區"
                        onChange={onSecondCityChange}
                        className={styles.area}
                        options={
                          selectedCity
                            ? cities[selectedCity].map((area) => ({
                                label: area,
                                value: area,
                              }))
                            : []
                        }
                        disabled={!selectedCity}
                      />
                    </div>
                  </ConfigProvider>
                </div>

                <div className={styles.filter_btns}>
                  <SecondaryBtn text="重置" clickHandler={clearAllFilter} />
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

      {/* .........分類bar......... */}
      <div className={styles.type}>
        <div className="container-outer">
          <div className={styles.type_btn_group}>
            <img
              className={styles.type_decoration}
              src="./activity_img/decoration2.png"
              alt=""
            />
            <img
              className={styles.type_decoration}
              src="./activity_img/decoration1.png"
              alt=""
            />
            <Link
              href={`${process.env.WEB}/activity/list?activity_type_sid=1`}
              className={styles.custom_link}
            >
              <SubBtn img="./activity_img/subicon_1.png" text="主題派對" />
            </Link>
            <Link
              href={`${process.env.WEB}/activity/list?activity_type_sid=2`}
              className={styles.custom_link}
            >
              <SubBtn img="./activity_img/subicon_2.png" text="在地活動" />
            </Link>
            <Link
              href={`${process.env.WEB}/activity/list?activity_type_sid=3`}
              className={styles.custom_link}
            >
              <SubBtn img="./activity_img/subicon_3.png" text="市集展覽" />
            </Link>
            <Link
              href={`${process.env.WEB}/activity/list?activity_type_sid=4`}
              className={styles.custom_link}
            >
              <SubBtn img="./activity_img/subicon_4.png" text="毛孩講座" />
            </Link>
            <Link
              href={`${process.env.WEB}/activity/list?activity_type_sid=5`}
              className={styles.custom_link}
            >
              <SubBtn img="./activity_img/subicon_5.png" text="寵物學校" />
            </Link>
            <Link
              href={`${process.env.WEB}/activity/wishlist`}
              className={styles.custom_link}
            >
              <SubBtn img="./activity_img/subicon_8.png" text="許願池" />
            </Link>

            <img
              className={styles.type_decoration}
              src="./activity_img/decoration1.png"
              alt=""
            />
            <img
              className={styles.type_decoration}
              src="./activity_img/decoration3.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <BGUpperDecoration />

      {/* .........section1......... */}
      <div className={styles.section1}>
        <div className="container-inner">
          <div>
            <p className={styles.title}>TOP 4 熱門活動</p>
          </div>

          <Row gutter={[0, 64]} className={styles.section_card}>
            {popularCount.map((i) => {
              const {
                activity_sid,
                type_name,
                activity_pic,
                name,
                avg_rating,
                recent_date,
                farthest_date,
                time,
                city,
                area,
                address,
                feature_names,
                price_adult,
              } = i;
              const liked = isInLikeList(activity_sid);
              return (
                <Col key={activity_sid} span={12}>
                  <ActivityCard1
                    activity_sid={activity_sid}
                    type={type_name}
                    image={'/activity_img/' + activity_pic.split(',')[0]}
                    title={name}
                    rating={avg_rating}
                    date_begin={recent_date}
                    date_end={farthest_date}
                    time={time}
                    city={city}
                    area={area}
                    address={address}
                    features={feature_names.split(',')}
                    price={price_adult}
                    isInLikeList={liked}
                    handleLikeClick={() =>
                      handleLikeClick(activity_sid, auth.token)
                    } // 傳遞handleLikeClick函式給子組件
                    singinHandler={toSingIn}
                    token={auth.token}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
      </div>

      <div className={styles.bg_cover1}>
        <img src="/activity_img/index_bg_2.jpg" alt="Activity" />
      </div>

      {/* .........section2......... */}
      <div className={styles.section2}>
        <div className="container-inner">
          <div>
            <p className={styles.title}>最新上架</p>
          </div>
          <Row gutter={[0, 64]} className={styles.section_card}>
            {data.map((i) => {
              const {
                activity_sid,
                type_name,
                activity_pic,
                name,
                avg_rating,
                recent_date,
                farthest_date,
                time,
                city,
                area,
                address,
                feature_names,
                price_adult,
              } = i;
              const liked = isInLikeList(activity_sid);
              return (
                <Col key={activity_sid} span={12}>
                  <ActivityCard1
                    activity_sid={activity_sid}
                    type={type_name}
                    image={'/activity_img/' + activity_pic.split(',')[0]}
                    title={name}
                    rating={avg_rating}
                    date_begin={recent_date}
                    date_end={farthest_date}
                    time={time}
                    city={city}
                    area={area}
                    address={address}
                    features={feature_names.split(',')}
                    price={price_adult}
                    isInLikeList={liked}
                    handleLikeClick={() =>
                      handleLikeClick(activity_sid, auth.token)
                    } // 傳遞handleLikeClick函式給子組件
                    singinHandler={toSingIn}
                    token={auth.token}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
      {/* .........銜接處圖片2......... */}
      <img src="/activity_img/index_bg_3.jpg" alt="Activity" />

      {/* .........section3......... */}
      <div className={styles.section3}>
        <div className="container-inner">
          <div>
            <p className={styles.title}>探索熱門城市</p>
          </div>

          <Row gutter={[0, 64]} className={styles.section_card}>
            {topCityData.map((i) => {
              const { city } = i;
              return <ActivityCard2 key={city} city={city} />;
            })}
          </Row>
        </div>
      </div>

      {/* .........銜接處圖片3......... */}
      <div className={styles.bg_cover2}>
        <img src="/activity_img/index_bg_4.jpg" alt="Activity" />
      </div>
      {/* .........section4......... */}
      <div className={styles.section4}>
        <div className="container-inner">
          <div>
            <p className={styles.title}>會員願望投票區</p>
          </div>
          <Row gutter={[0, 64]} className={styles.section_card}>
            {wish.map((i) => {
              const { member_sid, profile, name, city, area, vote_count } = i;
              return (
                <Col key={member_sid} span={8}>
                  <ActivityCard3
                    profile={profile}
                    title={name}
                    count={vote_count}
                    city={city}
                    area={area}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
}
