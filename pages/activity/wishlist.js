import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../../styles/activitywishlist.module.css';
import SubBtn from '@/components/ui/buttons/subBtn';
import ActivityCard4 from '@/components/ui/cards/ActivityCard4';
import {
  Row,
  Col,
  Pagination,
  ConfigProvider,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SearchBar from '@/components/ui/buttons/SearchBar';
// import Likelist from '@/components/ui/like-list/like-list';
import IconBtn from '@/components/ui/buttons/IconBtn';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faFilter } from '@fortawesome/free-solid-svg-icons';
import BreadCrumb from '@/components/ui/bread-crumb/breadcrumb';

import BGUpperDecoration from '@/components/ui/decoration/bg-upper-decoration';

import ActivityAlertModal from '@/components/ui/cards/ActivityAlertModal';


export default function ActivityWishList() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [keyword, setKeyword] = useState('');

  const { auth } = useContext(AuthContext);
  const authId = auth.id;

  // 收藏清單
  const [likeDatas, setLikeDatas] = useState([]);
  const [showLikeList, setShowLikeList] = useState(false);

  //沒登入會員收藏，跳轉登入
  const toSingIn = () => {
    const from = router.query;
    router.push(
      `/member/sign-in?from=${
        process.env.WEB
      }/activity/wishlist?${new URLSearchParams(from).toString()}`
    );
  };

  // 取資料
  const [datas, setDatas] = useState({
    totalRows: 0,
    perPage: 8,
    totalPages: 0,
    page: 1,
    rows: [],
    topVoteRows: [],
  });

  // 小麵包屑------------------------------------------------------------
  const [breadCrubText, setBreadCrubText] = useState([
    {
      id: 'activity',
      text: '活動首頁',
      href: `${process.env.WEB}/activity`,
      show: true,
    },
    { id: 'search', text: '> 願望列表', href: '', show: true },
    { id: 'aid', text: '', href: '', show: false },
  ]);

  useEffect(() => {
    const hasQueryString = Object.keys(router.query).length > 0;

    if (!hasQueryString) {
      fetch(`${process.env.API_SERVER}/activity-api/wishlist`)
        .then((response) => response.json())
        .then((data) => {
          setDatas(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    //console.log('router.query:', router.query);
    const { keyword } = router.query;

    if (Object.keys(router.query).length !== 0) {
      console.log(router.query);

      setKeyword(keyword || '');

      const usp = new URLSearchParams(router.query);

      fetch(`${process.env.API_SERVER}/activity-api/wishlist?${usp.toString()}`)
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
    updateLikeList(aid, false);
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
      <Head>
        <title>狗with咪 | 活動</title>
      </Head>

      {/* .........banner......... */}
      <div className={styles.banner}>
        <div className={styles.search}>
          {/* <h1>想找活動嗎？來這裡就對了！</h1> */}
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
              {auth.token ? (
                <IconBtn
                  icon={faHeart}
                  text="收藏列表"
                  // clickHandler={toggleLikeList}
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
            </div>
          </div>
        </div>

        {/* .........進階篩選......... */}

        {/* .........收藏列表......... */}
        <div className="container-inner"></div>
      </div>

      {/* .........分類bar......... */}
      <div className={styles.type}>
        <div className="container-inner">
          <div className={styles.type_btn_group}>
            <img
              className={styles.type_decoration}
              src="../activity_img/decoration1.png"
              alt=""
            />
            <Link
              href={`${process.env.WEB}/activity/wishlist`}
              className={styles.custom_link}
            >
              <SubBtn img="../activity_img/subicon_6.png" text="願望列表" />
            </Link>
            <Link
              href={`${process.env.WEB}/activity/vote`}
              className={styles.custom_link}
            >
              <SubBtn img="../activity_img/subicon_7.png" text="我要投票" />
            </Link>
            <Link
              href={`${process.env.WEB}/activity/wish`}
              className={styles.custom_link}
            >
              <SubBtn img="../activity_img/subicon_9.png" text="我要許願" />
            </Link>

            <img
              className={styles.type_decoration}
              src="../activity_img/decoration1.png"
              alt=""
            />
          </div>
        </div>
      </div>

      <BGUpperDecoration />

      {/* .........搜尋結果......... */}
      <div className="container-inner">
        <div className={styles.quick_selector}>
          <div>
            <p className={styles.text_large}>願望列表</p>
            <p>
              (
              {datas.totalRows != 0 ? `共${datas.totalRows}項願望` : '查無願望'}
              )
            </p>
          </div>
          <div>
            {/* <ActivityPageOrder
              totalItems={datas.totalRows}
              onRankChange={orderByHandler}
              orderBy={orderBy}
              items={orderByOptions}
            /> */}
          </div>
        </div>
      </div>

      <div className="container-inner">
        <div className={styles.section_card}>
          <Row gutter={[0, 106]} className={styles.card}>
            {datas.rows.map((i) => {
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
                    image={
                      activity_pic
                        ? '../activity_img/' + activity_pic.split(',')[0]
                        : ''
                    }
                    title={name}
                    rating={avg_rating}
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
                    singinHandler={toSingIn}
                    token={auth.token}
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
