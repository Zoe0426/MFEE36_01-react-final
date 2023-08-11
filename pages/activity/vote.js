import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../../styles/activityvote.module.css';
import SubBtn from '@/components/ui/buttons/subBtn';

import {
  Row,
  Col,
  Pagination,
  ConfigProvider,
 
} from 'antd';

import BreadCrumb from '@/components/ui/bread-crumb/breadcrumb';

import BGUpperDecoration from '@/components/ui/decoration/bg-upper-decoration';

import ActivityCard6 from '@/components/ui/cards/ActivityCard6';
import ActivityCard7 from '@/components/ui/cards/ActivityCard7';

export default function ActivityVote() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [keyword, setKeyword] = useState('');

  const { auth } = useContext(AuthContext);
  const authId = auth.id;

  //投票
  const [votedActivities, setVotedActivities] = useState([]);

  //沒登入會員收藏，跳轉登入
  const toSingIn = () => {
    const from = router.query;
    router.push(
      `/member/sign-in?from=${
        process.env.WEB
      }/activity/vote?${new URLSearchParams(from).toString()}`
    );
  };

  // 取資料
  const [datas, setDatas] = useState({
    totalRows: 0,
    perPage: 12,
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
    {
      id: 'search',
      text: '> 願望列表',
      href: `${process.env.WEB}/activity/wishlist`,
      show: true,
    },
    { id: 'vote', text: '> 我要投票', href: '', show: true },
  ]);

  useEffect(() => {
    const hasQueryString = Object.keys(router.query).length > 0;

    if (!hasQueryString) {
      fetch(`${process.env.API_SERVER}/activity-api/vote`)
        .then((response) => response.json())
        .then((data) => {
          setDatas(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    console.log('router.query:', router.query);
    const { keyword } = router.query;

    if (Object.keys(router.query).length !== 0) {
      console.log(router.query);

      setKeyword(keyword || '');

      const usp = new URLSearchParams(router.query);

      fetch(`${process.env.API_SERVER}/activity-api/vote?${usp.toString()}`)
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

  const handleVoteClick = async (activity_wish_sid) => {
    try {
      if (!auth.id) {
        return toSingIn();
      }

      const response = await fetch(
        `${process.env.API_SERVER}/activity-api/addvote`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ activity_wish_sid }),
        }
      );

      if (response.ok) {
        const votedRowIndex = datas.rows.findIndex(
          (row) => row.activity_wish_sid === activity_wish_sid
        );

        if (votedRowIndex !== -1) {
          datas.rows[votedRowIndex].hasVoted = true;

          setVotedActivities((prevVotedActivities) => [
            ...prevVotedActivities,
            activity_wish_sid,
          ]);

          setDatas((prevDatas) => ({
            ...prevDatas,
            rows: datas.rows,
          }));
        }
      } else {
        console.error('Vote failed:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
      <div className={styles.banner}></div>

      <div className={styles.bgc}>
        <div className="container-inner">
          <div className={styles.nav_head}>
            <BreadCrumb breadCrubText={breadCrubText} />
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
              <SubBtn img="../activity_img/subicon_6.png" text="願望清單" />
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
            <p className={styles.text_large}>我要投票</p>
            <p>
              (
              {datas.totalRows != 0
                ? `共${datas.totalRows}個投票項目`
                : '查無項目'}
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
        <div>
          <p className={styles.title}>\ 活動許願·呼聲最高TOP3 /</p>
          <Row gutter={[100, 120]}>
            {datas.topVoteRows.map((i) => {
              const {
                member_sid,
                profile,
                name,
                city,
                area,
                content,
                vote_count,
              } = i;
              return (
                <Col key={member_sid} span={8}>
                  <ActivityCard7
                    profile={profile}
                    title={name}
                    count={vote_count}
                    city={city}
                    area={area}
                    content={content}
                  />
                </Col>
              );
            })}
          </Row>
        </div>

        <div className={styles.title_why}>
          <p className={styles.title_text}>為什麼要投票?</p>
          <p className={styles.intro}>
            狗with咪希望大家都有機會可以發起一場屬於自己與毛孩的活動，因此我們開放大家將活動需求填寫於發起表單中，並開放讓大家投票。
            我們將於每個月選出投票區中的三場新活動，在願望實現列表頁面開放讓大家自由報名。
          </p>
        </div>

        <div className={styles.section_card}>
          <Row gutter={[100, 120]} className={styles.section_card}>
            {datas.rows.map((i) => {
              const {
                member_sid,
                profile,
                name,
                city,
                area,
                vote_count,
                content,
                other_message,
                activity_wish_sid,
              } = i;

              return (
                <Col key={activity_wish_sid} span={8}>
                  <ActivityCard6
                    activity_wish_sid={activity_wish_sid}
                    title={name}
                    city={city}
                    area={area}
                    profile={profile}
                    content={content}
                    count={vote_count}
                    onVoteClick={handleVoteClick}
                    hasVoted={votedActivities.includes(activity_wish_sid)}
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
