import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import { Fragment } from 'react';
import { useState } from 'react';
import { SlideImage } from '@/components/ui/restaurant/ImageSample';
import Styles from './[rid].module.css';
import IconBtn from '@/components/ui/buttons/IconBtn';
import IconSeconBtn from '@/components/ui/buttons/IconSeconBtn';
import IconMainBtn from '@/components/ui/buttons/IconMainBtn';
import RateStar from '@/components/ui/rateStar/RateStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faFileLines,
  faPhone,
  faLocationDot,
  faClock,
  faPaw,
  faCalendar,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import Tab from '@/components/ui/restaurant/Tab';
import FeatureCard from '@/components/ui/restaurant/featureCard';
import ActivityCard from '@/components/ui/restaurant/ActivityCard';
import Image from 'next/image';
import CloudTop from '@/assets/cloud_top.svg';
import NotionAreaBgc from '@/components/ui/restaurant/NotionAreaBgc';
import PinkBtn from '@/components/ui/restaurant/PinkBtn';
import { Col, Row, Breadcrumb, ConfigProvider } from 'antd';
import CommentCard from '@/components/ui/cards/comment-card';
import ImageGallary from '../../components/ui/restaurant/ImageGallary';
import catJump from '@/assets/jump_cat.svg';
import LikeListCard from '@/components/ui/restaurant/LikeListCard';
import LikeListDrawer from '@/components/ui/like-list/LikeListDrawer';
import AlertModal from '@/components/ui/restaurant/AlertModal';
import IconFavBtn from '@/components/ui/restaurant/IconFavBtn';

export default function RestInfo() {
  const { query, asPath } = useRouter();
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();
  const [restDetailRows, setRestDetailRows] = useState({ like: false });
  const [data, setData] = useState({
    restDetailRows: [],
    imageRows: [],
    ruleRows: [],
    serviceRows: [],
    commentRows: [],
    commentAvgRows: [],
    activityRows: [],
    likeDatas: [],
    menuRows: [],
  });
  const [imageRows, setImageRows] = useState([]);
  const [ruleRows, setRuleRows] = useState([]);
  const [serviceRows, setServiceRows] = useState([]);
  const [commentRows, setCommentRows] = useState([]);
  const [commentAvgRows, setCommentAvgRows] = useState([]);
  const [activityRows, setActivityRows] = useState([]);

  //收藏清單
  const [likeDatas, setLikeDatas] = useState([]);
  const [showLikeList, setShowLikeList] = useState(false);
  const [addLikeList, setAddLikeList] = useState([]);
  const [isClickingLike, setIsClickingLike] = useState(false);

  const [menuRows, setMenuRows] = useState([]);

  const [first, setFrist] = useState();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const getData = async (rid = '', token = '') => {
    const restInfo = await fetch(
      `http://localhost:3002/restaurant-api/restaurant/${rid}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const {
      restDetailRows,
      imageRows,
      ruleRows,
      serviceRows,
      commentRows,
      commentAvgRows,
      activityRows,
      menuRows,
    } = await restInfo.json();

    // 更新 React 組件的狀態
    if (restDetailRows && restDetailRows.length > 0) {
      setRestDetailRows(...restDetailRows);
    }

    if (serviceRows && serviceRows.length > 0) {
      setServiceRows(serviceRows);
    }
    if (ruleRows && ruleRows.length > 0) {
      setRuleRows(ruleRows);
    }

    if (menuRows && menuRows.length > 0) {
      setMenuRows(menuRows);
    }

    console.log(menuRows);
    // if (imageRows && imageRows.length > 0) {
    //   setImageRows(imageRows);
    // }

    const initialImageRows = imageRows.map((v, index) => {
      return {
        ...v,
        display: index === 0, // 第一張照片設為預設顯示
      };
    });
    setImageRows(initialImageRows);

    if (commentRows && commentRows.length > 0) {
      setCommentRows(commentRows);
    }

    if (commentAvgRows && commentAvgRows.length > 0) {
      setCommentAvgRows(...commentAvgRows);
    }
    if (activityRows && activityRows.length > 0) {
      setActivityRows(...activityRows);
    }
    console.log(restDetailRows);

    setData(data);
  };

  useEffect(() => {
    //取得用戶拜訪的特定商品編號
    const { rid } = router.query;

    if (rid) {
      if (auth.token) {
        getData(rid, auth.token);
      } else {
        getData(rid);
      }
    }
  }, [router.query]);

  // useEffect(() => {
  //   const { rid } = query;

  //   if (rid) {
  //     fetch(`http://localhost:3002/restaurant-api/restaurant/${rid}`)
  //       .then((r) => r.json())
  //       .then((data) => {
  //         const {
  //           restDetailRows,
  //           imageRows,
  //           ruleRows,
  //           serviceRows,
  //           commentRows,
  //           commentAvgRows,
  //           activityRows,
  //           menuRows,
  //         } = data;

  //         // 更新 React 組件的狀態
  //         if (restDetailRows && restDetailRows.length > 0) {
  //           setRestDetailRows(...restDetailRows);
  //         }

  //         if (serviceRows && serviceRows.length > 0) {
  //           setServiceRows(serviceRows);
  //         }
  //         if (ruleRows && ruleRows.length > 0) {
  //           setRuleRows(ruleRows);
  //         }

  //         if (menuRows && menuRows.length > 0) {
  //           setMenuRows(menuRows);
  //         }

  //         console.log(menuRows);
  //         // if (imageRows && imageRows.length > 0) {
  //         //   setImageRows(imageRows);
  //         // }

  //         const initialImageRows = imageRows.map((v, index) => {
  //           return {
  //             ...v,
  //             display: index === 0, // 第一張照片設為預設顯示
  //           };
  //         });
  //         setImageRows(initialImageRows);

  //         if (commentRows && commentRows.length > 0) {
  //           setCommentRows(commentRows);
  //         }

  //         if (commentAvgRows && commentAvgRows.length > 0) {
  //           setCommentAvgRows(...commentAvgRows);
  //         }
  //         if (activityRows && activityRows.length > 0) {
  //           setActivityRows(...activityRows);
  //         }
  //         console.log(restDetailRows);

  //         setData(data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, [query]);

  function toggleDisplayForImg(imgUrl) {
    let main = document.getElementById('imageBox');
    main.src = imgUrl;
  }
  //收藏列表相關的函式-------------------------------------------------------

  const getLikeList = async (token = '') => {
    const res = await fetch(
      `${process.env.API_SERVER}/restaurant-api/show-like`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    const data = await res.json();
    console.log(data);

    if (data.likeDatas.length > 0) {
      setLikeDatas(data.likeDatas);
    }
    console.log(likeDatas);
  };

  //沒登入會員收藏，跳轉登入booking
  const toSingInBook = () => {
    const from = router.query;
    router.push(
      `/member/sign-in?from=http://localhost:3000/restaurant/booking`
    );
  };
  //沒登入會員收藏，跳轉登入likelist
  const toSingIn = () => {
    const from = router.asPath;
    router.push(`/member/sign-in?from=http://localhost:3000${from}`);
  };

  //卡片愛心收藏的相關函式-------------------------------------------------------
  const addLikeListHandler = () => {
    const timeClick = new Date().getTime();
    const data = [
      {
        rest_sid: router.query.rid,
        time: timeClick,
      },
    ];
    sendLike(data, auth.token);
    setRestDetailRows({
      ...restDetailRows,
      like: true,
    });
  };

  //將資料送到後端
  const sendLike = async (arr, token = '') => {
    const res = await fetch(
      `${process.env.API_SERVER}/restaurant-api/handle-like-list`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: arr }),
      }
    );
    const data = await res.json();

    if (data.success) {
      console.log(data);
    }
  };

  //監看點擊愛心收藏的相關控制
  useEffect(() => {
    if (!isClickingLike && addLikeList.length > 0) {
      sendLike(addLikeList, auth.token).then(() => {
        //在成功送資料到後端後重置addLikeList
        setAddLikeList([]);
      });
    }
  }, [isClickingLike, addLikeList]);

  //展開收藏列表
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

  const closeLikeList = () => {
    setShowLikeList(false);
    document.body.classList.remove('likeList-open');
  };

  // 刪除所有收藏
  const removeAllLikeList = (token) => {
    if (likeDatas.length > 0) {
      //將列表顯示為空的
      setLikeDatas([]);
      //將畫面上的愛心按鈕清除
      setRestDetailRows((prevRows) => ({ ...prevRows, like: false }));
      // const newData = data.rows.map((v) => {
      //   return { ...v, like: false };
      // });
      // setData({ ...data, rows: newData });
      //將請求送到後端作業
      removeLikeListToDB('all', token);
    }
  };

  // 更新 like 狀態的函式
  const updateLikeStatus = (newStatus) => {
    setRestDetailRows((prevRestDetailRows) => ({
      ...prevRestDetailRows,
      like: newStatus,
    }));
  };
  // 收藏按鈕/已經收藏按鈕toggle
  const toggleLikeStatus = (rid, token) => {
    if (restDetailRows.like) {
      // 如果已收藏，則取消收藏
      removeLikeListBtn(rid, token);
      updateLikeStatus(false); // 更新狀態為未收藏
    } else {
      // 如果未收藏，則添加收藏
      addLikeListHandler();
      updateLikeStatus(true); // 更新狀態為已收藏
    }
  };

  const removeLikeListBtn = (rid, token = '') => {
    // 將列表該項目刪除
    setLikeDatas((prevLikeDatas) => {
      // 使用 filter 方法來刪除符合條件的項目
      return prevLikeDatas.filter((item) => item.rest_sid !== rid);
    });

    // 將請求送到後端作業
    removeLikeListToDB(rid, token);
  };

  // 刪除單一收藏
  const removeLikeListItem = (rid, token = '') => {
    //將列表該項目刪除
    const newLikeList = likeDatas.filter((arr) => {
      return arr.rest_sid !== rid;
    });
    setLikeDatas(newLikeList);

    //將畫面上的愛心按鈕清除
    setRestDetailRows((prevRows) => ({ ...prevRows, like: false }));
    // const newData = data.rows.map((v) => {
    //   if (v.rest_sid === rid) {
    //     return { ...v, like: false };
    //   } else {
    //     return { ...v };
    //   }
    // });
    // setData({ ...data, rows: newData });
    //將請求送到後端作業
    removeLikeListToDB(rid, token);
  };

  console.log(restDetailRows.like);

  const removeLikeListToDB = async (rid = '', token = '') => {
    try {
      const removeAll = await fetch(
        `${process.env.API_SERVER}/restaurant-api/likelist/${rid}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      const result = await removeAll.json();
      console.log(JSON.stringify(result, null, 4));
      if (rid === 'all') {
        setTimeout(() => {
          toggleLikeList();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //給他一個loading的時間
  if (!serviceRows || !restDetailRows) return <p>loading</p>;
  return (
    <>
      <div className={Styles.abc}>
        <div className="container-inner">
          <div className={Styles.bgc}>
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
                      title: '餐廳列表',
                      href: 'http://localhost:3000/restaurant/list',
                    },
                    {
                      title: `${restDetailRows.name}`,
                    },
                  ]}
                />
              </ConfigProvider>
            </div>
            {auth.token ? (
              <IconBtn
                icon={faHeart}
                text="收藏列表"
                clickHandler={toggleLikeList}
              />
            ) : (
              <AlertModal
                btnType="iconBtn"
                btnText="收藏列表"
                icon={faHeart}
                content="才可查看收藏列表"
                mainBtnText="前往登入"
                subBtnText="暫時不要"
                confirmHandler={toSingIn}
              />
            )}
          </div>
        </div>
      </div>
      {/* 收藏列表畫面 */}
      <div className="container-inner">
        <div className={Styles.like_list}>
          {showLikeList && (
            <LikeListDrawer
              datas={likeDatas}
              customCard={
                <LikeListCard
                  datas={likeDatas}
                  token={auth.token}
                  removeLikeListItem={removeLikeListItem}
                  closeLikeList={closeLikeList}
                />
              }
              closeHandler={toggleLikeList}
              removeAllHandler={() => {
                removeAllLikeList(auth.token);
              }}
            />
          )}
        </div>
      </div>

      <div className="container-inner">
        <div className={Styles.rest_detail}>
          <div className={Styles.rest_image}>
            <div className={Styles.rest_image_main}>
              <img
                src={`/rest_image/image/${imageRows[0]?.img_name}`}
                alt={imageRows[0]?.img_name}
                id="imageBox"
              />
            </div>
            <div className={Styles.rest_image_group}>
              <div className={Styles.rest_image_single}>
                <img
                  src={`/rest_image/image/${imageRows[0]?.img_name}`}
                  alt={imageRows[0]?.img_name}
                  onClick={() => {
                    toggleDisplayForImg(
                      `/rest_image/image/${imageRows[0]?.img_name}`
                    );
                  }}
                />
              </div>
              <div className={Styles.rest_image_single}>
                <img
                  src={`/rest_image/image/${imageRows[1]?.img_name}`}
                  alt={imageRows[1]?.img_name}
                  onClick={() => {
                    toggleDisplayForImg(
                      `/rest_image/image/${imageRows[1]?.img_name}`
                    );
                  }}
                />
              </div>
              <div className={Styles.rest_image_single}>
                <img
                  src={`/rest_image/image/${imageRows[2]?.img_name}`}
                  alt={imageRows[2]?.img_name}
                  onClick={() => {
                    toggleDisplayForImg(
                      `/rest_image/image/${imageRows[2]?.img_name}`
                    );
                  }}
                />
              </div>
              <div className={Styles.rest_image_single}>
                <img
                  src={`/rest_image/image/${imageRows[3]?.img_name}`}
                  alt={imageRows[3]?.img_name}
                  onClick={() => {
                    toggleDisplayForImg(
                      `/rest_image/image/${imageRows[3]?.img_name}`
                    );
                  }}
                />
              </div>
            </div>
          </div>

          <div className={Styles.rest_info}>
            <h1 className={Styles.jill_h1}>{restDetailRows.name}</h1>
            <RateStar
              score={commentAvgRows.avg_friendly}
              className={Styles.rate_star}
            />
            <p className={Styles.information}>{restDetailRows.info}</p>

            <div className={Styles.contact_group}>
              <div className={Styles.contact}>
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{ maxWidth: '20px', maxHeight: '20px' }}
                  className={Styles.info_icon}
                />
                <p className={Styles.information_detail}>
                  0{restDetailRows.phone}
                </p>
              </div>
              <div className={Styles.contact}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ maxWidth: '20px', maxHeight: '20px' }}
                  className={Styles.info_icon}
                />
                <p className={Styles.information_detail}>
                  {restDetailRows.city}
                  {restDetailRows.area}
                  {restDetailRows.address}
                </p>
              </div>
              <div className={Styles.contact}>
                <FontAwesomeIcon
                  icon={faClock}
                  className={Styles.info_icon}
                  style={{ maxWidth: '20px', maxHeight: '20px' }}
                />
                <p className={Styles.information_detail}>
                  {restDetailRows.start_at_1}~{restDetailRows.end_at_1}
                </p>
              </div>
              <div className={Styles.contact}>
                <FontAwesomeIcon
                  icon={faPaw}
                  className={Styles.info_icon}
                  style={{ maxWidth: '20px', maxHeight: '20px' }}
                />
                <p className={Styles.information_detail}>
                  {restDetailRows.acceptType}
                </p>
              </div>
            </div>

            {/* button */}
            <div className={Styles.detail_main_buttom}>
              {/* {!auth.token ? (
                <AlertModal
                  btnType="iconSeconBtn"
                  btnText="加入收藏"
                  content="登入！才可收藏餐廳"
                  mainBtnText="前往登入"
                  subBtnText="暫時不要"
                  confirmHandler={toSingIn}
                  icon={faHeart}
                />
              ) : restDetailRows.like ? (
                <AlertModal
                  btnType="iconSeconBtn"
                  btnText="已收藏"
                  content="已經收藏過囉~"
                  mainBtnText="前往登入"
                  showSubBtn={false}
                  confirmHandler={toSingIn}
                  icon={faHeart}
                />
              ) : (
                <IconSeconBtn
                  icon={faHeart}
                  text={'收藏餐廳'}
                  clickHandler={() =>
                    toggleLikeStatus(router.query.rid, auth.token)
                  }
                />
              )} */}
              {!auth.token ? (
                <AlertModal
                  btnType="iconSeconBtn"
                  btnText="加入收藏"
                  content="才可收藏餐廳"
                  mainBtnText="前往登入"
                  subBtnText="暫時不要"
                  confirmHandler={toSingIn}
                  icon={faHeart}
                />
              ) : (
                <IconFavBtn
                  icon={faHeart}
                  text={restDetailRows.like ? '已收藏' : '收藏餐廳'}
                  like={restDetailRows.like ? false : true}
                  clickHandler={() =>
                    toggleLikeStatus(router.query.rid, auth.token)
                  }
                />
              )}
              <div className="like"></div>
              <ImageGallary data={menuRows} />
              {auth.token ? (
                <IconMainBtn
                  icon={faCalendar}
                  text="我要預約"
                  clickHandler={() => {
                    router.push(`/restaurant/booking`);
                  }}
                />
              ) : (
                <AlertModal
                  btnType="IconMainBtn"
                  btnText="我要預約"
                  icon={faFileLines}
                  content="才可預約餐廳"
                  mainBtnText="前往登入"
                  subBtnText="暫時不要"
                  confirmHandler={toSingInBook}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container-inner">
        <Tab
          text1="服務項目"
          text2="攜帶規範"
          text3="餐廳特色"
          text4="優惠/活動"
          text5="店家叮嚀"
          text6="饕客評價"
        />
      </div>
      <div className="container-inner">
        <h2 className={Styles.jill_h2}>服務項目</h2>
        <Row gutter={[48, 48]} className={Styles.row_gutter}>
          <Col xl={4} xs={8}>
            <PinkBtn
              text={serviceRows[0]?.service_name}
              img={`/rest_image/service/${serviceRows[0]?.service_icon}`}
            />
          </Col>
          <Col xl={4} xs={8}>
            <PinkBtn
              text={serviceRows[1]?.service_name}
              img={`/rest_image/service/${serviceRows[1]?.service_icon}`}
            />
          </Col>
        </Row>
      </div>
      <div className="container-inner">
        <h2 className={Styles.jill_h2}>攜帶規則</h2>
        <Row gutter={[48, 48]}>
          <Col xl={4} xs={8}>
            <PinkBtn
              text={ruleRows[0]?.rule_name}
              img={`/rest_image/rule/${ruleRows[0]?.rule_icon}`}
            />
          </Col>
          <Col xl={4} xs={8}>
            <PinkBtn
              text={ruleRows[1]?.rule_name}
              img={`/rest_image/rule/${ruleRows[1]?.rule_icon}`}
            />
          </Col>
        </Row>
      </div>
      <div className="container-inner">
        <h2 className={Styles.jill_h2}>餐廳特色</h2>
      </div>
      <FeatureCard
        img={`/rest_image/feature/${restDetailRows.feature_img}`}
        title={restDetailRows.feature_title}
        feature_info={restDetailRows.feature_content}
      />
      <div className="container-inner">
        <h2 className={Styles.jill_h2}>餐廳活動</h2>
      </div>
      <ActivityCard
        img={`/rest_image/activity/${activityRows.img}`}
        title={activityRows.title}
        date={activityRows.date}
        activity_info={activityRows.content}
      />
      <div className={Styles.CloudTop}>
        <Image src={CloudTop} alt="CloudTop" />
      </div>
      <div className={Styles.notion_bgc}>
        <div className="container-inner">
          <div className={Styles.cat_section}>
            <h2 className={Styles.jill_h2_notion}>預約叮嚀</h2>
            <Image src={catJump} alt="catJump" />
          </div>
          <div className={Styles.notion_frame}>
            <p>
              1. 事先了解店家規範：不論是去任何餐廳都應該先詳細了解店內規範。
            </p>
            <p>
              2.
              配合餐廳規範：遵守不同餐廳的寵物規範，避免惡意違規造成店家不好的印象。
            </p>
            <p>
              3.
              保護毛兒安全：保護自己與他人毛兒的安全非常重要，攻擊性強的毛兒要加強管控，要摸別人家毛兒之前也要先問過毛爸媽。
            </p>
            <p>
              4.
              不影響他人用餐：管控好毛兒吠叫問題，也別讓毛兒四處亂跑（是餐廳友善程度而定），避免影響他人用餐。
            </p>
            <p>
              5.
              不共用餐具：為維護他人權益與用餐品質，除非店家有明確說可以，不然別讓毛兒上餐桌，也不要與毛兒共用餐廳餐具。
            </p>
            <p>
              6.
              維護環境整潔：自備毛兒坐墊，自行處理毛兒便溺，共同維護環境整潔。
            </p>
          </div>
        </div>
      </div>
      <NotionAreaBgc />
      <div className="container-inner">
        <h2 className={Styles.jill_h2}>饕客評價</h2>
        <div className={Styles.section_rating}>
          <div className={Styles.avg}>
            <p className={Styles.comment_title}>用餐環境</p>
            <div>
              <FontAwesomeIcon icon={faStar} className={Styles.star} />
              {commentAvgRows.avg_environment}
            </div>
          </div>
          <div className={Styles.avg}>
            <p className={Styles.comment_title}>服務</p>
            <div>
              <FontAwesomeIcon icon={faStar} className={Styles.star} />
              {commentAvgRows.avg_food}
            </div>
          </div>
          <div className={Styles.avg}>
            <p className={Styles.comment_title}>友善程度</p>
            <div>
              <FontAwesomeIcon icon={faStar} className={Styles.star} />
              {commentAvgRows.avg_friendly}
            </div>
          </div>
        </div>
      </div>

      <div className="container-inner">
        <div className={Styles.comment_cards}>
          {commentRows.map((v) => {
            return (
              <CommentCard
                key={v.rest_commtent_id}
                name={v.name}
                rating={v.avg_rating}
                content={v.content}
                date={v.created_at}
                profile={v.profile}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
