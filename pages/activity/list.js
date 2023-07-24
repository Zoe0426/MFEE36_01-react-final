import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import styles from '../../styles/activitymain.module.css';
import ActivityCard4 from '@/components/ui/cards/ActivityCard4';
import ActivityLikeListCard from '@/components/ui/cards/ActivityLikeListCard';
import { Row, Col, Pagination, ConfigProvider } from 'antd';
import SearchBar from '@/components/ui/buttons/SearchBar';
import Likelist from '@/components/ui/like-list/like-list';
import IconBtn from '@/components/ui/buttons/IconBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faFilter } from '@fortawesome/free-solid-svg-icons';
import BreadCrumb from '@/components/ui/bread-crumb/breadcrumb';

export default function ActivityMain() {
  // 網址在這看 http://localhost:3000/activity/list?cid=類別&keyword=關鍵字&page=頁碼

  const router = useRouter();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(16);
  const [keyword, setKeyword] = useState('');
  const [orderBy, setOrderBy] = useState('-- 請選擇 --');

  // 收藏清單
  const [likeDatas, setLikeDatas] = useState([]);
  const [showLikeList, setShowLikeList] = useState(true);

  const { auth } = useContext(AuthContext);

  const toSignIn = () => {
    const from = router.asPath;
    router.push(`/member/sign-in?from=${from}`);
  };

  // 取資料
  const [datas, setDatas] = useState({
    totalRows: 0,
    perPage: 16,
    totalPages: 0,
    page: 1,
    rows: [],
    // likeDatas:[],
  });



  // 小麵包屑--------------------
  const [breadCrubText, setBreadCrubText] = useState([
    {
      id: 'activity',
      text: '活動',
      href: 'http://localhost:3000/activity',
      show: true,
    },
    { id: 'search', text: '/ 活動列表', href: '', show: true },
    { id: 'aid', text: '', href: '', show: false },
  ]);



  
  // 進階篩選
  // const [showfilter, setShowFilter] = useState(false);

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

  // //收藏列表相關的函式--------------------
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

  // 給faheart的 新增與刪除--------------------
  const handleLikeClick = async (activitySid) => {
    try {
      if (isInLikeList(activitySid)) {
        // Perform the delete action to remove from the like list
        const response = await fetch(
          `${process.env.API_SERVER}/activity-api/likelist/${activitySid}/mem00300`,
          {
            method: 'DELETE',
          }
        );

        if (!response.ok) {
          throw new Error('刪除收藏失敗');
        }

        updateLikeList(activitySid, false); // Successfully removed from like list
        console.log('刪除收藏成功');
      } else {
        // Perform the post action to add to the like list
        const response = await fetch(
          `${process.env.API_SERVER}/activity-api/addlikelist/${activitySid}/mem00300`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              aid: activitySid,
              mid: 'mem00300', // TODO: 會員ID待修改
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
          {/* <p>TODO: BreadCrumb</p> */}
          <BreadCrumb breadCrubText={breadCrubText} />

          {/* .........收藏列表/進階篩選 btn......... */}
          <div className={styles.btns}>
            <IconBtn
              icon={faHeart}
              text="收藏列表"
              clickHandler={toggleLikeList}
            />
            <IconBtn
              icon={faFilter}
              text="進階篩選"
              
            />
          </div>
        </div>
        <div>
          <>
            {showLikeList && (
              <Likelist
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

        {/* .........篩選btn展開......... */}

        {/* .........搜尋結果+篩選btn......... */}
        <div className={styles.quick_selector}>
          <div>
            <p className={styles.text_large}>TODO: 搜尋活動「游泳課」</p>
            <p>TODO: 50項活動</p>
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
                    handleLikeClick={() => handleLikeClick(activity_sid)} // 傳遞handleLikeClick函式給子組件
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
