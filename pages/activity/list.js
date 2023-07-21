import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/activitymain.module.css';
import ActivityCard4 from '@/components/ui/cards/ActivityCard4';
import ActivityLikeListCard from '@/components/ui/cards/ActivityLikeListCard';
import { Row, Col, Pagination, ConfigProvider } from 'antd';
import SearchBar from '@/components/ui/buttons/SearchBar';
import Likelist from '@/components/ui/like-list/like-list';
import IconBtn from '@/components/ui/buttons/IconBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faFilter } from '@fortawesome/free-solid-svg-icons';

ActivityLikeListCard;

export default function ActivityMain() {
  // 網址在這看 http://localhost:3000/activity/list?cid=類別&keyword=關鍵字&page=頁碼

  const router = useRouter();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(16);
  const [keyword, setKeyword] = useState('');
  const [orderBy, setOrderBy] = useState('-- 請選擇 --');

  // 收藏清單
  const [likeDatas, setLikeDatas] = useState([]);
  const [showLikeList, setShowLikeList] = useState(false);

  // 進階篩選
  const [showfilter, setShowFilter] = useState(false);

  // 取資料
  const [datas, setDatas] = useState({
    totalRows: 0,
    perPage: 16,
    totalPages: 0,
    page: 1,
    rows: [],
  });

  // 排序
  const rankOptions = {
    1: 'new_DESC',
    2: 'hot_DESC', // TODO: 需再確認cart的欄位名稱
  };

  // const orderByHandler = (e) => {
  //   const newSelect = orderByOptions.find((v) => v.key === e.key);

  //   console.log(newSelect.label);
  //   setOrderBy(newSelect.label);

  //   const selectedRank = rankOptions[e.key];
  //   // console.log(selectedRank);
  //   router.push(
  //     `?${new URLSearchParams({
  //       ...router.query,
  //       page: 1,
  //       orderBy: selectedRank,
  //     }).toString()}`
  //   );
  // };

  useEffect(() => {
    const { cid, keyword, page: urlPage } = router.query;
    const activity_type_sid = cid ? encodeURIComponent(cid) : '';

    setKeyword(keyword || '');
    setPage(Number(urlPage) || 1); // 將url中的page值轉換為數字，如果為空或無效則設置為1
    setPerPage(perPage || 16);

    const fetchData = async () => {
      try {
        const encodedCid = encodeURIComponent(cid || '');
        const encodedKeyword = encodeURIComponent(keyword || '');
        const response = await fetch(
          `${process.env.API_SERVER}/activity-api/activity?activity_type_sid=${encodedCid}&keyword=${encodedKeyword}&page=${page}&perPage=${perPage}`
        );
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const data = await response.json();
        setDatas((prevData) => ({
          ...prevData,
          totalRows: data.totalRows,
          totalPages: data.totalPages,
          rows: data.rows,
          page: data.page, // 更新 page 的設定
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [router.query, perPage, page]); // 這裡包含了page和perPage的依賴

  // useEffect(() => {
  //   const { cid, keyword } = router.query;
  //   const activity_type_sid = cid ? encodeURIComponent(cid) : '';

  //   setKeyword(keyword || '');

  //   const fetchData = async () => {
  //     try {
  //       const encodedCid = encodeURIComponent(cid || '');
  //       const encodedKeyword = encodeURIComponent(keyword || '');
  //       const response = await fetch(
  //         `${process.env.API_SERVER}/activity-api/activity?activity_type_sid=${encodedCid}&keyword=${encodedKeyword}&page=${page}&perPage=${perPage}`
  //       );
  //       if (!response.ok) {
  //         throw new Error('Request failed');
  //       }
  //       const data = await response.json();
  //       setDatas((prevData) => ({
  //         ...prevData,
  //         totalRows: data.totalRows,
  //         totalPages: data.totalPages,
  //         rows: data.rows,
  //         page: data.page,
  //       }));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, [router.query, page, perPage]);

  //searchBar相關的函式--------------------
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

  //篩選filter相關的函式 (TODO: 待確認)-------------------------------------------------------
  // const toggleFilter = () => {
  //   setShowFilter(!showfilter);
  // };

  // //收藏列表相關的函式--------------------
  const openShowLikeList = () => {
    setShowLikeList(!showLikeList);
  };

  // const closeShowLikeList = () => {
  //   setShowLikeList(false);
  // };

  // const removeAllLikeList = () => {
  //   setLikeDatas([]);
  //   //這邊需要再修改，要看怎麼得到會員的編號
  //   removeLikeListToDB('all', 'mem00300');
  // };

  // const removeLikeListItem = (pid) => {
  //   const newLikeList = likeDatas.filter((arr) => {
  //     return arr.product_sid !== pid;
  //   });

  //   setLikeDatas(newLikeList);
  //   //這邊需要再修改，要看怎麼得到會員的編號
  //   removeLikeListToDB(pid, 'mem00002');
  // };

  // Pagination相關的函式--------------------
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

      <div className="container-inner">
        <div className={styles.nav_head}>

          <p>TODO: BreadCrumb</p>
          {/* <BreadCrumb breadCrubText={breadCrubText} /> */}

          {/* .........收藏列表/進階篩選 btn......... */}
          <div className={styles.btns}>
            <IconBtn
              icon={faHeart}
              text="收藏列表"
              clickHandler={openShowLikeList}
            />
            <IconBtn
              icon={faFilter}
              text="進階篩選"
              // clickHandler={toggleFilter}
            />
          </div>
        </div>
        <div className="like_list">
          {showLikeList && (
              <Likelist
                datas={likeDatas}
                customCard={
                  <ActivityLikeListCard
                    datas={likeDatas}
                    // removeLikeListItem={removeLikeListItem}
                  />
                }
                // closeHandler={toggleLikeList}
                // removeAllHandler={removeAllLikeList}
                // removeLikeListItem={removeLikeListItem}
              />
            )}
        </div>

        {/* .........篩選btn展開......... */}

        {/* .........搜尋結果+篩選btn......... */}
        <div className={styles.quick_selector}>
          <div>
            <p className={styles.text_large}>搜尋活動「游泳課」</p>
            <p>50項活動</p>
          </div>
          <div>
            <button>最新</button>
          </div>
        </div>

        {/* .........section1......... */}

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
              return (
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
                />
              );
            })}
          </Row>
        </div>

        {/* <Row gutter={[16, 32]}>
          <ActivityCard4
            image="/activity_img/asian-young-girl-holding-kittens-park.jpg"
            type="市集展覽"
            title="寵物瑜珈課"
            rating={4.5}
            date_begin="2023-04-09"
            date_end="2023-05-09"
            time="每週六 8:00-18:00"
            content="寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。"
            city="台北市"
            area="大安區"
            address="大安路一段234號"
            feature="寵物健康餐提供"
            price={500}
          />

        </Row> */}
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
