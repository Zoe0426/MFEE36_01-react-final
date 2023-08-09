import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import styles from '../../styles/activityvote.module.css';
import SubBtn from '@/components/ui/buttons/subBtn';
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
  DatePicker,
  Radio,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SearchBar from '@/components/ui/buttons/SearchBar';
// import Likelist from '@/components/ui/like-list/like-list';
import IconBtn from '@/components/ui/buttons/IconBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import MainBtn from '@/components/ui/buttons/MainBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faFilter } from '@fortawesome/free-solid-svg-icons';
import BreadCrumb from '@/components/ui/bread-crumb/breadcrumb';
import Likelist from '@/components/ui/like-list/LikeListDrawer';
import BGUpperDecoration from '@/components/ui/decoration/bg-upper-decoration';
import ActivityFilter from '@/components/ui/cards/ActivityFilter';
import ActivityFilterPrice from '@/components/ui/cards/ActivityFilterPrice';
import ActivityFilterDate from '@/components/ui/cards/ActivityFilterDate';
import orderByOptions from '@/data/activity/orderby.json';
import ActivityPageOrder from '@/components/ui/cards/ActivityPageOrder';

import cityDatas from '@/data/activity/location.json';
import filterDatas from '@/data/activity/filters.json';
import moment from 'moment';
import ActivityAlertModal from '@/components/ui/cards/ActivityAlertModal';
import ActivityCard6 from '@/components/ui/cards/ActivityCard6';
import ActivityCard7 from '@/components/ui/cards/ActivityCard7';

export default function ActivityVote() {


  const router = useRouter();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [keyword, setKeyword] = useState('');

  const { auth } = useContext(AuthContext);
  const authId = auth.id;

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
    topVoteRows:[],
  });

  // 小麵包屑------------------------------------------------------------
  const [breadCrubText, setBreadCrubText] = useState([
    {
      id: 'activity',
      text: '活動首頁',
      href: `${process.env.WEB}/activity`,
      show: true,
    },
    { id: 'search', text: '/ 願望列表', href: `${process.env.WEB}/activity/wishlist`, show: true },
    { id: 'vote', text: '/ 我要投票', href: '', show: true },
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
              {datas.totalRows != 0 ? `共${datas.totalRows}項願望` : '查無願望'}
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
          <p className={styles.title}>活動許願 呼聲最高TOP3</p>
          <Row gutter={[30, 120]} className={styles.section_card}>
            {datas.topVoteRows.map((i) => {
              const { member_sid, profile, name, city, area, vote_count } = i;
              return (
                <Col key={member_sid} span={8}>
                  <ActivityCard7
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

        <div>
          <p className={styles.title}>為什麼要投票?</p>
          <p>
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
              } = i;
              return (
                <Col key={member_sid} span={8}>
                  <ActivityCard6
                    profile={profile}
                    title={name}
                    count={vote_count}
                    city={city}
                    area={area}
                    content={content}
                    other_message={other_message}
                  />
                </Col>
              );
            })}
          </Row>
        </div>

        {/* <div className={styles.section_card}>
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
                    image={'/activity_img/' + activity_pic.split(',')[0]}
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
        </div> */}

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
