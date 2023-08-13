import React, { useState, useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import AuthContext from '@/context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faCalendarDays,
  faClock,
  faLocationDot,
  faHeart,
  faUserPlus,
  faFilter,
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faLine } from '@fortawesome/free-brands-svg-icons';
import Xicon from '@/assets/X.svg';
import styles from '../../styles/activitydetail.module.css';
import NavDetailPage from '@/components/ui/cards/NavDetailPage';
import ActivityFeatureDetail from '@/components/ui/cards/ActivityFeatureDetail';
import IconMainBtn from '@/components/ui/buttons/IconMainBtn';
import ActivityIconSeconBtn from '@/components/ui/buttons/ActivityIconSeconBtn';
import CommentCard from '@/components/ui/cards/comment-card';
import CommentCard1 from '@/components/ui/restaurant/CommentCard';
import NoCommentCard from '@/components/ui/cards/comment-card-no';
import { Button, Select, ConfigProvider, Row, Col } from 'antd';
import BreadCrumb from '@/components/ui/bread-crumb/breadcrumb';
import IconBtn from '@/components/ui/buttons/IconBtn';
import LikeListDrawer from '@/components/ui/like-list/LikeListDrawer';
import Modal from '@/components/ui/modal/modal';
import ModoalReminder from '@/components/ui/shop/modoal-reminder';
import ActivityCard1 from '@/components/ui/cards/ActivityCard1';
import BGUpperDecoration from '@/components/ui/decoration/bg-upper-decoration';
import ModalWithoutBtn from '@/components/ui/modal/modal-without-btn';
import ActivityAlertModal from '@/components/ui/cards/ActivityAlertModal';
import ActivityLikeListCard from '@/components/ui/cards/ActivityLikeListCard';
import ActivityFeature from '@/components/ui/cards/ActivityFeature';

//likelist

// import CommentCard from '@/componets/ui/cards/comment-card.js';

export default function ActivityDetail() {
  // 活動數量 大人/小孩 input用
  const [countAdult, setCountAdult] = useState(1);
  const [countChild, setCountChild] = useState(0);

  const { query, asPath } = useRouter();
  const router = useRouter();

  // 會員登入相關
  const { auth, updateCart } = useContext(AuthContext);
  const authId = auth.id;

  // 新增活動相關
  const [activitySid, setActivitySid] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [successAddToCard, setSuccessAddToCard] = useState(false);

  const [data, setData] = useState({
    actDetailRows: [],
    actImageRows: [],
    actDateRows: [],
    actFeatureRows: [],
    actRatingRows: [],
    actRecommend: [],
    actCartTotalQtyRows: [],
  });

  const [actDetailRows, setActDetailRows] = useState([]);
  const [actImageRows, setActImageRows] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 初始索引為 0 // slider效果
  //const [fadeIn, setFadeIn] = useState(false); // slider效果
  const [actDateRows, setActDateRows] = useState([]);
  const [actFeatureRows, setActFeatureRows] = useState([]);
  const [actRatingRows, setActRatingRows] = useState([]);
  const [actRecommend, setActRecommend] = useState([]);
  const [actCartTotalQtyRows, setActCartTotalQtyRows] = useState([]);

  //收藏區
  const [likeDatas, setLikeDatas] = useState([]);
  const [showLikeList, setShowLikeList] = useState(false);

  //評論區
  const [commentWindowWidth, setCommentWindowWidth] = useState(null);
  const [commentCurrent, setCommentCurrent] = useState(0);
  const [totalCommentPage, setTotalCommentPage] = useState(0);
  const [showCommentCard, setShowCommentCard] = useState([]);
  const [showCommentCardQty, setShowCommentCardQty] = useState(4);
  const [showCommentArrowLeft, setShowCommentArrowLeft] = useState(false);
  const [showCommentArrowRight, setShowCommentArrowRight] = useState(true);
  const [showFullCommentArrowLeft, setShowFullCommentArrowLeft] =
    useState(false);
  const [showFullCommentArrowRight, setShowFullCommentArrowRight] =
    useState(true);
  const [showFullCommentCard, setShowFullCommentCard] = useState(false);
  const commentStyle = {
    position: 'relative',
    left: `calc(382px * ${showCommentCardQty} * -${commentCurrent})`,
    transition: '0.3s',
  };
  const [commentFilter, setCommentFilter] = useState(6); //評論篩選，6為全部，其他為5~1
  const [dataForComment, setDataForComment] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  const [dataForCommentQty, setDataForCommentQty] = useState([
    { star: 6, count: 0 },
    { star: 5, count: 0 },
    { star: 4, count: 0 },
    { star: 3, count: 0 },
    { star: 2, count: 0 },
    { star: 1, count: 0 },
  ]);

  /*用來過濾評價星的，要保持原本的dataForComment*/
  const commentFiliterByRating = (dataForComment, type) => {
    switch (type) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return dataForComment.filter((v) => v.star === type);
      default:
        return dataForComment;
    }
  };

  const totalPrice =
    actDetailRows.price_adult * countAdult +
    (actDetailRows.price_adult / 2) * countChild;

  // 小麵包屑
  const [breadCrubText, setBreadCrubText] = useState([
    {
      id: 'activity',
      text: '活動首頁',
      href: `${process.env.WEB}/activity`,
      show: true,
    },
    {
      id: 'search',
      text: '> 在地活動 >',
      href: ``,
      show: true,
    },
    {
      id: 'aid',
      text: '',
      href: '',
      show: true,
    },
  ]);

  // 取得頁面資訊
  useEffect(() => {
    const { aid } = query;

    if (aid) {
      setActivitySid(aid);
      fetch(`${process.env.API_SERVER}/activity-api/activity/${aid}`)
        .then((r) => r.json())
        .then((data) => {
          const {
            actDetailRows,
            actImageRows,
            actDateRows,
            actFeatureRows,
            actRatingRows,
            actRecommend,
            actCartTotalQtyRows,
          } = data;

          // 更新 React 組件的狀態
          if (actDetailRows && actDetailRows.length > 0) {
            setActDetailRows(...actDetailRows);
          }

          if (actImageRows.length > 0) {
            const imageUrls = actImageRows[0].activity_pic.split(',');
            setActImageRows(imageUrls);
          }

          // if (actImageRows && actImageRows.length > 0) {
          //   //setActImageRows(actImageRows);
          //   setActImageRows(actImageRows[0].activity_pic.split(','));
          // }

          //console.log(actImageRows); //測試
          // console.log((actImageRows[0].activity_pic).split(',')[0])//測試

          if (actDateRows && actDateRows.length > 0) {
            setActDateRows(actDateRows);
          }

          if (actFeatureRows && actFeatureRows.length > 0) {
            setActFeatureRows(actFeatureRows);
          }

          if (actRatingRows && actRatingRows.length > 0) {
            setActRatingRows(actRatingRows);
          }

          if (actRecommend && actRecommend.length > 0) {
            setActRecommend(actRecommend);
          }

          if (actCartTotalQtyRows && actCartTotalQtyRows.length > 0) {
            setActCartTotalQtyRows(...actCartTotalQtyRows);
          }

          //麵包屑
          const newBreadCrubText = breadCrubText.map((v) => {
            if (v.id === 'search') {
              return {
                ...v,
                text: `> ${actDetailRows[0].type_name} >`,
                href: `${process.env.WEB}/activity/list?activity_type_sid=${actDetailRows[0].activity_type_sid}`,
              };
            }
            if (v.id === 'aid') {
              return { ...v, text: actDetailRows[0].name };
            } else return { ...v };
          });
          setBreadCrubText(newBreadCrubText);

          //評論區
          if (Array.isArray(actRatingRows)) {
            setDataForComment(actRatingRows);

            let newCommentEachQty = dataForCommentQty.map((v) => {
              const eachCommentQty =
                v.star === 6
                  ? actRatingRows.length
                  : actRatingRows.filter((c) => parseInt(c.star) === v.star)
                      .length;

              return { ...v, count: eachCommentQty };
            });
            setDataForCommentQty(newCommentEachQty);
          }

          setShowWarning(false);
          setCommentFilter(6);
          setCommentCurrent(0);
          countTotalCommentPage();
          setShowCommentArrowLeft(false);

          setData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [query]);

  // 新增活動
  const orderActivityClick = async (
    activitySid,
    token,
    authId,
    countAdult,
    countChild,
    selectedDate
  ) => {
   

    try {
      if (!token) {
        throw new Error('未找到會員ID');
       
      }

    

      //console.log('Order activity button clicked!');
      //console.log('selectedDate:', selectedDate);
      //console.log('actDateRows:', actDateRows);
      

      if (!selectedDate) throw new Error('無效的活動日期');

      const response = await fetch(
        `${process.env.API_SERVER}/activity-api/order-activity/${activitySid}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            aid: activitySid,
            member_sid: authId,
            rel_seq_sid: selectedDate,
            adult_qty: countAdult,
            child_qty: countChild,
          }),
        }
      );

      if (!response.ok) throw new Error('加入購物車失敗');

      //購物車小icon立即更新
      updateCart(activitySid, selectedDate, 'add');

      setSuccessAddToCard(true);
      setTimeout(() => {
        setSuccessAddToCard(false);
      }, 1200);
      console.log('加入購物車成功');
    } catch (error) {
      console.error('操作報名失敗:', error);
    }
  };

  const handleOrderActivityClick = async () => {
    await orderActivityClick(
      activitySid,
      auth.token,
      authId,
      countAdult,
      countChild,
      selectedDate
    );

    // Reset values
    setSelectedDate(null);
    setCountAdult(1);
    setCountChild(0);
  };

  //若未登入會員而點擊收藏，要跳轉至會員登入
 
  const toSingIn = () => {
    const from = router.query;
    router.push(
      `/member/sign-in?from=${process.env.WEB}/activity/${new URLSearchParams(
        from
      ).toString()}`
    );
  };

  //收藏相關-----------------------------------------------------

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
    //console.log(data);

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
      const newData = likeDatas.map((v) => {
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

  //faheart相關
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
        console.log('新增收藏成功');
      }
    } catch (error) {
      console.error('操作收藏失敗:', error);
    }
  };

  // 判斷活動是否在收藏列表中
  const isInLikeList = (activitySid) => {
    return likeDatas.some((item) => item.activity_sid == activitySid);
  };
  const liked = isInLikeList(activitySid);
  console.log({ likeDatas, activitySid });

  //評價相關的函示-----------------------------------------------------
  //控制顯示全螢幕的單一評價內容，並設定左右箭頭狀態
  const toggleCommentCard = (arr = [], ratingNow = 6, id = '') => {
    const newShowFullCommentCard = !showFullCommentCard;
    if (arr.length > 0 && id) {
      const newArr = commentFiliterByRating(arr, ratingNow).map((v) => {
        if (v.activity_rating_sid === id) {
          return { ...v, display: true };
        } else return { ...v, display: false };
      });
      setShowCommentCard(newArr);
      const currentIndex = newArr.findIndex((v) => v.display === true);
      if (currentIndex === 0) {
        setShowFullCommentArrowLeft(false);
      } else {
        setShowFullCommentArrowLeft(true);
      }
      if (currentIndex < newArr.length - 1) {
        setShowFullCommentArrowRight(true);
      } else {
        setShowFullCommentArrowRight(false);
      }
    }

    setShowFullCommentCard(newShowFullCommentCard);
    // if (newShowFullCommentCard) {
    //   document.body.classList.add('likeList-open');
    // } else {
    //   document.body.classList.remove('likeList-open');
    // }
  };

  //轉換到下一張評價卡片
  const slideNextComment = (arr = []) => {
    const currentIndex = arr.findIndex((v) => v.display === true);
    if (currentIndex < arr.length - 1) {
      const newArr = arr.map((v, i) => {
        if (i === currentIndex + 1) {
          return { ...v, display: true };
        } else return { ...v, display: false };
      });
      setShowCommentCard(newArr);
      setShowFullCommentArrowLeft(true);
    }
    if (currentIndex === arr.length - 2) {
      setShowFullCommentArrowRight(false);
    }
  };
  //轉換到上一張評價卡片
  const slidePreComment = (arr = []) => {
    const currentIndex = arr.findIndex((v) => v.display === true);
    if (currentIndex > 0) {
      const newArr = arr.map((v, i) => {
        if (i === currentIndex - 1) {
          return { ...v, display: true };
        } else return { ...v, display: false };
      });
      setShowCommentCard(newArr);
      setShowFullCommentArrowRight(true);
    }
    if (currentIndex <= 1) {
      setShowFullCommentArrowLeft(false);
    }
  };

  //一般顯示區的評價卡相關function
  const countTotalCommentPage = () => {
    const currentCommentCardsQty = dataForCommentQty.filter((v) => {
      return parseInt(v.star) === parseInt(commentFilter);
    })[0].count;

    const newCommentTotalPage = Math.ceil(
      currentCommentCardsQty / showCommentCardQty
    );
    if (newCommentTotalPage <= 1) {
      setShowCommentArrowRight(false);
    } else {
      setShowCommentArrowRight(true);
    }

    setTotalCommentPage(newCommentTotalPage);
  };

  //處理評論頁碼更動
  useEffect(() => {
    countTotalCommentPage();
  }, [commentFilter, dataForCommentQty, showCommentCardQty]);

  //內頁導覽設定--------------------------------------------------
  //設定 目標位置的參考
  const targetRef1 = useRef(null);
  const targetRef2 = useRef(null);
  const targetRef3 = useRef(null);
  const targetRef4 = useRef(null);
  const targetRef5 = useRef(null);

  // 設定 text和對應的目標位置
  const items = [
    { text: '活動內容&行程', targetRef: targetRef1 },
    { text: '活動規範', targetRef: targetRef2 },
    { text: '購買須知&取消政策', targetRef: targetRef3 },
    { text: '顧客評價', targetRef: targetRef4 },
    { text: '為您推薦', targetRef: targetRef5 },
  ];

  // 目標位置的移動處理
  const handleClick = (targetRef) => {
    targetRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  //分享頁面
  const handleLineShare = (type = '') => {
    const title = `狗with咪 || ${actDetailRows.name}`; // 要分享的標題
    const shareUrl = window.location.href;
    //console.log(shareUrl);
    let shareURL = '';
    switch (type) {
      case 'shareOnLine':
        shareURL = `https://line.me/R/msg/text/?${encodeURIComponent(
          title
        )}%0D%0A${encodeURIComponent(shareUrl)}`;
        break;
      case 'shareOnFB':
        shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}&quote=${encodeURIComponent(title)}`;
        break;
      case 'shareOnTwitter':
        shareURL = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}&text=${encodeURIComponent(title)}`;
        break;
    }

    if (shareURL) {
      window.open(shareURL);
    }
  };

  return (
    <div>
      <Head>
        <title>狗with咪 | 活動</title>
      </Head>
      {/* .........上方資訊......... */}
      <div className={styles.bgc}>
        <div className="container-inner">
          <div className={styles.nav_head}>
            {/* <p>TODO: BreadCrumb</p> */}
            <BreadCrumb breadCrubText={breadCrubText} />
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
            </div>
          </div>
        </div>

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

      <div className="container-inner">
        <div className={styles.card}>
          {/* -------左邊------- */}

          <div className={styles.left}>
            <button
              onClick={() => {
                setCurrentImageIndex((prevIndex) =>
                  prevIndex === 0 ? actImageRows.length - 1 : prevIndex - 1
                );
              }}
              className={styles.overlay_left}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ maxWidth: '20px', maxHeight: '20px' }}
              />
            </button>
            {actImageRows.length > 0 && (
              <img
                src={`/activity_img/${actImageRows[currentImageIndex]}`}
                alt="Slider"
                className={styles.image}
              />
            )}
            <button
              onClick={() => {
                setCurrentImageIndex(
                  (prevIndex) => (prevIndex + 1) % actImageRows.length
                );
              }}
              className={styles.overlay_right}
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ maxWidth: '20px', maxHeight: '20px' }}
              />
            </button>

            <div className={styles.feature}>
              <p className={styles.feature_title}>活動特色：</p>
              <Row>
                {actFeatureRows.map((row, index) => (
                  <div key={index}>
                    <ActivityFeature
                      className={styles.feature}
                      feature={row.name}
                    />
                  </div>
                ))}
              </Row>
            </div>

            <div className={styles.share_box}>
              <div className={styles.share_title}>分享活動：</div>
              <div className={styles.share_icons}>
                <FontAwesomeIcon
                  icon={faLine}
                  className={styles.line}
                  onClick={() => {
                    handleLineShare('shareOnLine');
                  }}
                />
                <FontAwesomeIcon
                  icon={faFacebookSquare}
                  className={styles.fb}
                  onClick={() => {
                    handleLineShare('shareOnFB');
                  }}
                />
                <Image
                  src={Xicon}
                  alt="Xicon"
                  className={styles.twitter}
                  onClick={() => {
                    handleLineShare('shareOnTwitter');
                  }}
                />
              </div>
            </div>
          </div>

          {/* -------右邊------- */}
          <div className={styles.right}>
            {/* 標題 */}
            <div className={styles.row_text_title}>
              <p>{actDetailRows.name}</p>
            </div>

            {/* 評分＋總參加人數 */}
            <div className={styles.row}>
              <div className={styles.review}>
                <FontAwesomeIcon
                  icon={faStar}
                  className={styles.star_icon}
                  style={{ maxWidth: '20px', maxHeight: '20px' }}
                />
                <p className={styles.row_text_medium}>
                  {actDetailRows.avg_rating}
                </p>
              </div>

              <div>
                <p className={styles.purchase_count}>
                  (已有{actCartTotalQtyRows.purchase_count}人參加)
                </p>
              </div>
            </div>

            {/* 總金額 */}
            <div className={styles.row_total_price}>
              {/* <p className={styles.total_price}>總金額：</p> */}
              <p className={styles.total_price}>
                ${totalPrice.toLocaleString()}
              </p>
            </div>

            {/* 日期 */}
            <div className={styles.row}>
              <FontAwesomeIcon
                icon={faCalendarDays}
                className={styles.row_icon}
                style={{ maxWidth: '20px', maxHeight: '20px' }}
              />
              <div>
                <p className={styles.row_text_small}>
                  {actDetailRows.recent_date}~{actDetailRows.farthest_date}
                </p>
              </div>
            </div>

            {/* 時間 */}
            <div className={styles.row}>
              <FontAwesomeIcon
                icon={faClock}
                className={styles.row_icon}
                style={{ maxWidth: '20px', maxHeight: '20px' }}
              />
              <div>
                <p className={styles.row_text_small}>{actDetailRows.time}</p>
              </div>
            </div>

            {/* 地點 */}
            <div className={styles.row}>
              <FontAwesomeIcon
                icon={faLocationDot}
                className={styles.row_icon}
                style={{ maxWidth: '20px', maxHeight: '20px' }}
              />
              <div>
                <p className={styles.row_text_small}>
                  {actDetailRows.city}
                  {actDetailRows.area}
                  {actDetailRows.address}
                </p>
              </div>
            </div>

            {/* 報名日期 */}
            <div className={styles.row}>
              <div className={styles.row_date}>
                <p className={styles.row_text_small}>選擇日期：</p>
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: '#FD8C46',
                      borderRadius: 10,
                      controlHeight: 46,
                      fontSize: 16,
                      // width: 168,
                    },
                  }}
                >
                  <Select
                    value={selectedDate || '選擇活動日期'}
                    onChange={(value) => setSelectedDate(value)}
                  >
                    {actDateRows.map((row, index) => (
                      <Select.Option
                        key={index}
                        value={row.activity_group_sid}
                        className={styles.date_select}
                      >
                        {row.date}
                      </Select.Option>
                    ))}
                  </Select>
                </ConfigProvider>
              </div>
            </div>

            {/* 報名人數 */}
            <div className={styles.ppl_qty}>
              <div className={styles.ppl_qty_title}>
                <p className={styles.row_text_small}>報名人數：</p>
              </div>

              <div className={styles.ppl_qty_outer}>
                <div className={styles.ppl_qty_inner}>
                  <div>
                    <p className={styles.ppl_qty_row}>大人</p>
                    <p className={styles.row_price}>
                      (${actDetailRows.price_adult}/人)
                    </p>
                  </div>

                  <div className={styles.detail_qty}>
                    <div className={styles.numInputBlock}>
                      <button
                        className={styles.minusBtn}
                        onClick={() => {
                          if (countAdult > 1) {
                            setCountAdult(countAdult - 1);
                          }
                        }}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className={styles.input}
                        value={countAdult}
                        onChange={(e) => {
                          const reisNumber = /[.\d]/;
                          if (reisNumber.test(e.target.value)) {
                            setCountAdult(parseInt(e.target.value));
                          }
                        }}
                      />
                      <button
                        className={styles.addBtn}
                        onClick={() => {
                          setCountAdult(countAdult + 1);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {/* <input className={styles.ppl_qty_row}></input> */}
                </div>
                <div className={styles.ppl_qty_inner}>
                  <div>
                    <p className={styles.ppl_qty_row}>小孩</p>
                    <p className={styles.row_price}>
                      (${actDetailRows.price_adult / 2}/人)
                    </p>
                  </div>

                  <div className={styles.detail_qty}>
                    <div className={styles.numInputBlock}>
                      <button
                        className={styles.minusBtn}
                        onClick={() => {
                          if (countChild > 0) {
                            setCountChild(countChild - 1);
                          }
                        }}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className={styles.input}
                        value={countChild}
                        onChange={(e) => {
                          const reisNumber = /[.\d]/;
                          if (reisNumber.test(e.target.value)) {
                            setCountChild(parseInt(e.target.value));
                          }
                        }}
                      />
                      <button
                        className={styles.addBtn}
                        onClick={() => {
                          setCountChild(countChild + 1);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {/* <input className={styles.ppl_qty_row}></input> */}
                </div>
              </div>
            </div>

            {/* 第九行 */}

            {/* 第十行 */}
            <div className={styles.detail_main_buttom}>
              {auth.token ? (
                <ActivityIconSeconBtn
                  icon={faHeart}
                  text={liked ? '已收藏' : '加入收藏'}
                  activity_sid={activitySid}
                  isInLikeList={liked}
                  handleLikeClick={() =>
                    handleLikeClick(activitySid, auth.token)
                  }
                  auth={auth}
                />
              ) : (
                <ActivityAlertModal
                  btnType="heart"
                  title="貼心提醒"
                  content="收藏活動"
                  mainBtnText="前往登入"
                  subBtnText="暫時不要"
                  confirmHandler={toSingIn}
                />
              )}

              {!auth.token ? (
                <Modal
                  btnType="iconSeconBtn"
                  btnText="加入購物車"
                  title="貼心提醒"
                  content={
                    <ModoalReminder text="登入會員，才能加入購物車喔~" />
                  }
                  mainBtnText="前往登入"
                  subBtnText="暫時不要"
                  confirmHandler={toSingIn}
                  icon={faUserPlus}
                />
              ) : (
                <IconMainBtn
                  icon={faUserPlus}
                  text="加入購物車"
                  clickHandler={handleOrderActivityClick}
                />
              )}
              {successAddToCard && (
                <ModalWithoutBtn
                  text="成功加入購物車!"
                  img="/product-img/success.svg"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ....銜接處圖片1.... */}
        <img src="/activity_img/detail_bg_8.jpg" alt="Activity" />
      

      <div className="container-inner">
        <div className={styles.nav_detail}>
          <NavDetailPage items={items} handleClick={handleClick} />
        </div>
      </div>

      {/* .........下方資訊......... */}
      <div className="container-inner">
        <div className={styles.content}>
          <div ref={targetRef1}>
            <p className={styles.subtitle}>活動內容＆行程：</p>

            <p className={styles.row_text_small}>{actDetailRows.content}</p>
            <br />
            <br />
            <p className={styles.row_text_small}>
              活動行程：{actDetailRows.schedule}
            </p>
          </div>

          {/* <img
            className={styles.content_image}
            src="/activity_img/24.jpg"
            alt=""
          /> */}
          {actImageRows.length > 0 && (
            <img
              className={styles.content_image}
              src={`/activity_img/${actImageRows[2]}`}
              alt=""
            />
          )}
        </div>
      </div>

      {/* ....銜接處圖片2.... */}
      <img src="/activity_img/detail_bg_2.jpg" alt="Activity" />

      <div className="container-inner">
        <div className={styles.content}>
          {actImageRows.length > 0 && (
            <img
              className={styles.content_image_reverse}
              src={`/activity_img/${actImageRows[3]}`}
              alt=""
            />
          )}
          <div ref={targetRef2}>
            <p className={styles.subtitle}>活動規範：</p>

            <p className={styles.row_text_small}>{actDetailRows.policy}</p>
          </div>
        </div>
      </div>

      {/* ....銜接處圖片3.... */}
      <img src="/activity_img/detail_bg_3.jpg" alt="Activity" />

      <div className="container-inner">
        <div className={styles.content}>
          <div ref={targetRef3}>
            <p className={styles.subtitle}>購買須知&取消政策：</p>

            <p className={styles.row_text_small}>
              報名前請詳閱活動詳情並確認活動時間。活動地區除遇大豪雨特報或颱風影響宣布停班停課、集會遊行等不可抗力之天災、人為因素、行政院環保署空氣品質指標達危害等級或活動單位公告延期外，其活動皆照常舉行。倘遇上述原因導致活動延期，因而無法參加者，所繳交之報名費，主辦（執行）方應扣除已代辦或支出費用後，將餘額退回。倘遇上述原因導致活動未能舉辦，報名費將以5折退回。如有贈送禮品商，禮品最終材質、尺寸等，可能因製造時程、活動內容規劃等因素而有些許不同，主辦單位保留微調或更換之權利。
            </p>
          </div>

          {actImageRows.length > 0 && (
            <img
              className={styles.content_image}
              src={`/activity_img/${actImageRows[4]}`}
              alt=""
            />
          )}
        </div>
      </div>

      {/* ....銜接處圖片4.... */}
      <img src="/activity_img/detail_bg_6.jpg" alt="Activity" />

      {/* .........顧客評價......... */}

      <div className="container-outer">
        <div ref={targetRef4}>
          <div className="container-inner">
            <p className={styles.subtitle}>顧客評價：</p>
            <div className={styles.review_big}>
              <FontAwesomeIcon icon={faStar} className={styles.star_icon_big} />
              <p className={styles.rating}>{actDetailRows.avg_rating}</p>
              <p className={styles.row_text_small}>
                (共{actDetailRows.rating_count}則評價)
              </p>

              <div className={styles.comment_btns}>
                {dataForCommentQty.map((v) => {
                  const { star, count } = v;
                  return (
                    <button
                      key={star}
                      className={
                        commentFilter === star
                          ? `${styles.comment_btn} ${styles.active_comment_btn}`
                          : styles.comment_btn
                      }
                      onClick={() => {
                        setCommentFilter(star);
                        setCommentCurrent(0);
                        setShowCommentArrowLeft(false);
                      }}
                    >
                      {star === 6 ? '全部評論' : `${star}星 (${count})`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.act_container_inner}>
            <div className={styles.comment_cards_box}>
              {showCommentArrowLeft && (
                <div className={styles.detail_left_arrow_box}>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className={styles.left_arrow}
                    onClick={() => {
                      if (commentCurrent <= 0) {
                        setShowCommentArrowLeft(false);
                      } else if (commentCurrent === 1) {
                        setCommentCurrent(commentCurrent - 1);
                        setShowCommentArrowRight(true);
                        setShowCommentArrowLeft(false);
                      } else {
                        setCommentCurrent(commentCurrent - 1);
                        setShowCommentArrowRight(true);
                      }
                    }}
                  />
                </div>
              )}
              {showCommentArrowRight && (
                <div
                  className={`${styles.detail_right_arrow_box} ${styles.comment_right_arrow_box}`}
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className={styles.right_arrow}
                    onClick={() => {
                      if (commentCurrent === totalCommentPage - 1) {
                        setShowCommentArrowRight(false);
                      } else if (commentCurrent === totalCommentPage - 2) {
                        setCommentCurrent(commentCurrent + 1);
                        setShowCommentArrowLeft(true);
                        setShowCommentArrowRight(false);
                      } else {
                        setCommentCurrent(commentCurrent + 1);
                        setShowCommentArrowLeft(true);
                      }
                    }}
                  />
                </div>
              )}
              <div className={styles.comment_cards} style={commentStyle}>
                {dataForComment &&
                commentFiliterByRating(dataForComment, commentFilter).length <=
                  0 ? (
                  <NoCommentCard star={commentFilter} />
                ) : (
                  commentFiliterByRating(dataForComment, commentFilter).map(
                    (v) => {
                      const {
                        activity_rating_sid,
                        member_sid,
                        date,
                        star,
                        content,
                        name,
                        profile,
                      } = v;
                      return (
                        <CommentCard
                          key={activity_rating_sid}
                          member_sid={member_sid}
                          date={date}
                          rating={star}
                          content={content}
                          name={name}
                          profile={profile}
                          clickHandler={() => {
                            toggleCommentCard(
                              dataForComment,
                              commentFilter,
                              activity_rating_sid
                            );
                          }}
                        />
                      );
                    }
                  )
                )}
              </div>
            </div>
          </div>

          <div className="container-inner">
            <ul className={styles.recommend_pages}>
              {totalCommentPage <= 1 ? (
                <div className={styles.no_pages}></div>
              ) : (
                Array(totalCommentPage)
                  .fill(0)
                  .map((v, i) => {
                    return (
                      <li
                        key={i}
                        className={
                          i === commentCurrent
                            ? `${styles.sliders_pages_bttn} ${styles.sliders_pages_active}`
                            : styles.sliders_pages_bttn
                        }
                        // onClick={() => {
                        //   setCommentCurrent(i);
                        //   if (i === 0) {
                        //     setShowCommentArrowLeft(false);
                        //     setShowCommentArrowRight(true);
                        //   } else if (i === totalCommentPage - 1) {
                        //     setShowCommentArrowRight(false);
                        //     setShowCommentArrowLeft(true);
                        //   } else {
                        //     setShowCommentArrowLeft(true);
                        //     setShowCommentArrowRight(true);
                        //   }
                        // }}
                      ></li>
                    );
                  })
              )}
            </ul>
          </div>
        </div>
        {/* 全螢幕的評價顯示 */}
        {/* {showFullCommentCard && (
          <div className={styles.show_full_comment_card}>
            <div
              className={styles.bgc_comment_card}
              onClick={toggleCommentCard}
            ></div>
            <div className={styles.comment_card_display}>
              {showFullCommentArrowLeft && (
                <div className={styles.detail_left_arrow_box}>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className={styles.left_arrow}
                    onClick={() => {
                      slidePreComment(showCommentCard);
                    }}
                  />
                </div>
              )}
              {showFullCommentArrowRight && (
                <div
                  className={`${styles.detail_right_arrow_box} ${styles.full_right_arrow_box}`}
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className={styles.right_arrow}
                    onClick={() => {
                      slideNextComment(showCommentCard);
                    }}
                  />
                </div>
              )}

              {showCommentCard.map((v) => {
                const {
                  activity_rating_sid,
                  date,
                  star,
                  content,
                  name,
                  profile,
                  display,
                } = v;
                return (
                  display && (
                    <div className={styles.test} key={activity_rating_sid}>
                      <CommentCard1
                        date={date}
                        rating={star}
                        content={content}
                        name={name}
                        profile={profile}
                        clickHandler={toggleCommentCard}
                      />
                    </div>
                  )
                );
              })}
            </div>
          </div>
        )} */}

        {/* <div className={styles.comment_cards}>
              {actRatingRows &&
                actRatingRows.map((v) => {
                  const {
                    activity_rating_sid,
                    member_sid,
                    date,
                    star,
                    content,
                    name,
                    profile,
                  } = v;
                  return (
                    <CommentCard
                      key={activity_rating_sid}
                      member_sid={member_sid}
                      date={date}
                      rating={star}
                      content={content}
                      name={name}
                      profile={profile}
                    />
                  );
                })}
            </div> */}
      </div>

      {/* ....銜接處圖片5.... */}
      <img src="/activity_img/detail_bg_7.jpg" alt="Activity" />

      {/* .........推薦商品......... */}

      <div className="container-inner">
        <div className={styles.recommend_section}>
          <div ref={targetRef4}>
            <p className={styles.subtitle}>為您推薦：</p>

            <div className={styles.recommend_cards}>
              <Row gutter={[0, 64]} className={styles.section_card}>
                {actRecommend.map((i) => {
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

                  return (
                    <Col key={activity_sid} span={12}>
                      <ActivityCard1
                        // key={activity_sid}
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
                      />
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
