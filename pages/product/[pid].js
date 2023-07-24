import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/shop.module.css';
import Image from 'next/image';
import { Row, Col } from 'antd';
import useLocalStorageJson from '@/hooks/useLocalStorageJson';

/*引用的卡片*/
import CommentCard from '@/components/ui/cards/comment-card';
import Likelist from '@/components/ui/like-list/like-list';
import ShopLikelistCard from '@/components/ui/cards/shop-like-list-card';
import ShopProductCard from '@/components/ui/cards/shop-product-card';

/*引用的按鈕*/
import IconSeconBtn from '@/components/ui/buttons/IconSeconBtn';
import IconBtn from '@/components/ui/buttons/IconBtn';
import MainBtn from '@/components/ui/buttons/MainBtn';

/*引用的背景*/
import BGMiddleDecoration from '@/components/ui/decoration/bg-middle-decoration';
import BGRecomandDecoration from '@/components/ui/decoration/bg-reconmand-decoration';
import BGUpperDecoration from '@/components/ui/decoration/bg-upper-decoration';
import PawWalking from '@/components/ui/shop/pawWalking';

import BreadCrumb from '@/components/ui/bread-crumb/breadcrumb';

// 引用的icon+圖示
import RateStar from '@/components/ui/rateStar/RateStar';
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import CorpLogo from '@/assets/corpLogo.svg';

export default function Product() {
  const { query, asPath } = useRouter();
  const [first, setFrist] = useState(false);
  const [localStorageHistory, setLocalStorageHistory] = useLocalStorageJson(
    'petProductHistory',
    [],
    true
  );

  const [datatForProductMain, setDataForProductMain] = useState({
    product_sid: '',
    name: '',
    description: '',
    supplier_name: '',
    made_in_where: '',
    avg_rating: null,
    catergory_chinese_name: '',
    catergory_english_name: '',
  });
  const [datatForProductDetail, setDataForProductDetail] = useState([]);
  const [dataForRecomand, setDataForRecomand] = useState([]);
  const [dataForComment, setDataForComment] = useState([]);
  const [dataForCommentQty, setDataForCommentQty] = useState([
    { rating: 5, count: 0 },
    { rating: 4, count: 0 },
    { rating: 3, count: 0 },
    { rating: 2, count: 0 },
    { rating: 1, count: 0 },
  ]);
  const [likeDatas, setLikeDatas] = useState([]);
  const [showLikeList, setShowLikeList] = useState(false);
  //評論篩選，6為全部，其他為5~1
  const [commentFilter, setCommentFilter] = useState(6);
  const [count, setCount] = useState(1);

  /*用來過濾評價星的，要保持原本的dataForComment*/
  const commentFiliterByRating = (dataForComment, type) => {
    switch (type) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return dataForComment.filter((v) => v.rating === type);
      default:
        return dataForComment;
    }
  };

  //麵包屑寫得有點奇怪...
  const [breadCrubText, setBreadCrubText] = useState([
    {
      id: 'shop',
      text: '商城',
      href: 'http://localhost:3000/product',
      show: true,
    },
    { id: 'search', text: '/ 飼料 /', href: '', show: true },
    {
      id: 'pid',
      text: '希爾思-雞肉、大麥與糙米特調食譜(小型及迷你幼犬)',
      href: '',
      show: true,
    },
  ]);

  useEffect(() => {
    setFrist(true);
  }, [localStorageHistory]);

  useEffect(() => {
    //取得用戶拜訪的特定商品編號
    const { pid } = query;

    // console.log(query);

    if (pid) {
      (async function getData() {
        //拿回特定商品的相關資訊 與評價
        const res_productInfo = await fetch(
          `${process.env.API_SERVER}/shop-api/product/${pid}`,
          { method: 'GET' }
        );
        const {
          shopMainData,
          shopDetailData,
          commentDatas,
          commentEachQty,
          reccomandData,
          likeDatas,
        } = await res_productInfo.json();
        const innitDescription = shopMainData[0].description;
        // const description = innitDescription.replace(/\n/g, '<br/>');
        const description = innitDescription
          .replace(/\n/g, '<br/>')
          .replace(/amp;/g, '&');

        if (shopMainData) {
          //將進入頁面的都存在localStorage，作為瀏覽紀錄的資料
          if (shopMainData[0].img && first) {
            if (
              localStorageHistory.length &&
              localStorageHistory[0].product_sid === pid
            ) {
              setLocalStorageHistory(localStorageHistory);
            } else {
              if (localStorageHistory.length >= 3) {
                localStorageHistory.pop();
              }
              setLocalStorageHistory([
                {
                  product_sid: pid,
                  img: shopMainData[0].img,
                },
                ...localStorageHistory,
              ]);
            }
          }

          setDataForProductMain({ ...shopMainData[0], description });
        }

        if (commentDatas) {
          setDataForComment(commentDatas);
        }

        if (shopDetailData) {
          setDataForProductDetail(
            shopDetailData.map((v, i) => {
              if (i === 0) {
                return { ...v, count: 0, display: true, active: false };
              } else return { ...v, count: 0, display: false, active: false };
            })
          );
          setPurchaseInfo({ unitPrice: shopDetailData[0].price });
        }

        if (commentEachQty) {
          let newCommentEachQty = dataForCommentQty.map((v) => {
            const comment = commentEachQty.find(
              (c) => v.rating === parseInt(c.rating)
            );
            if (comment) {
              return { ...v, count: comment.count };
            } else return { ...v };
          });

          setDataForCommentQty(newCommentEachQty);
        }

        if (reccomandData) {
          setDataForRecomand(reccomandData);
        }

        if (likeDatas) {
          setLikeDatas(likeDatas);
        }

        setCount(1);
      })();
    }
  }, [query, first]);

  //轉換圖片顯示
  const toggleDisplayForImg = (datatForProductDetail, id) => {
    return datatForProductDetail.map((v) => {
      if (v.product_detail_sid === id) {
        return { ...v, display: true };
      } else {
        return { ...v, display: false };
      }
    });
  };
  const [purchaseInfo, setPurchaseInfo] = useState({
    spec: '',
    unitPrice: 0,
    qty: 0,
  });

  //收藏列表相關的函式-------------------------------------------------------
  const openShowLikeList = () => {
    setShowLikeList(true);
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

  const removeLikeListToDB = async (pid = '', mid = '') => {
    try {
      const removeAll = await fetch(
        `${process.env.API_SERVER}/shop-api/likelist/${pid}/${mid}`,
        {
          method: 'DELETE',
        }
      );

      const result = await removeAll.json();
      console.log(JSON.stringify(result, null, 4));
      if (pid === 'all') {
        setTimeout(() => {
          closeShowLikeList();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="outer-container">
        <div className={styles.bgc_lightBrown}>
          <div className="container-inner">
            {/* 麵包屑這邊需要再修改 */}
            <div className={styles.nav_head}>
              <BreadCrumb breadCrubText={breadCrubText} />
              <div className={styles.btns}>
                <IconBtn
                  icon={faHeart}
                  text={'收藏列表'}
                  clickHandler={openShowLikeList}
                />
              </div>
            </div>
            <div className="like">
              {showLikeList && (
                <Likelist
                  datas={likeDatas}
                  customCard={
                    <ShopLikelistCard
                      datas={likeDatas}
                      removeLikeListItem={removeLikeListItem}
                    />
                  }
                  closeHandler={closeShowLikeList}
                  removeAllHandler={removeAllLikeList}
                  removeLikeListItem={removeLikeListItem}
                />
              )}
            </div>
          </div>
        </div>
        <BGUpperDecoration />
        <div className="container-inner">
          <section className={styles.detail_main_box}>
            <div className={styles.detail_img_box}>
              <div className={styles.detail_big_img}>
                {datatForProductDetail.map((v) => {
                  return (
                    v.display && (
                      <img
                        key={v.product_detail_sid}
                        src={`http://localhost:3000/product-img/${v.img}`}
                        alt={v.img}
                      />
                    )
                  );
                })}
              </div>
              <div className={styles.detail_small_boxs}>
                {datatForProductDetail.map((v) => {
                  return (
                    <Fragment key={v.product_detail_sid}>
                      {v.img && (
                        <div
                          className={
                            v.display
                              ? styles.detail_small_img_active
                              : styles.detail_small_img
                          }
                          role="presentation"
                          onClick={() => {
                            setDataForProductDetail(
                              toggleDisplayForImg(
                                datatForProductDetail,
                                v.product_detail_sid
                              )
                            );
                          }}
                        >
                          <img
                            src={`http://localhost:3000/product-img/${v.img}`}
                            alt={v.img}
                          />
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </div>
            <div className={styles.detail_main_info}>
              <div className="detail_main_upper">
                <h2 className={styles.detail_main_title}>
                  {datatForProductMain.name}
                </h2>
                <RateStar
                  score={datatForProductMain.avg_rating}
                  text={`( 已有${datatForProductMain.sales_qty}人購買 )`}
                />
                <div className={styles.detail_price_box}>
                  <h5 className={styles.detail_spec_title}>價格</h5>
                  <div className={styles.detail_price}>
                    {`$${purchaseInfo.unitPrice.toLocaleString('en-US')}`}
                  </div>
                </div>

                <div className={styles.detail_spec_box}>
                  <h5 className={styles.detail_spec_title}>規格選擇</h5>
                  {datatForProductDetail.map((v, i) => {
                    return (
                      <button
                        className={
                          i === 0
                            ? styles.detail_spec_btn_none
                            : purchaseInfo.spec === v.product_detail_sid
                            ? `${styles.active_detail_spec_btn} ${styles.detail_spec_btn}`
                            : styles.detail_spec_btn
                        }
                        key={v.product_detail_sid}
                        onClick={() => {
                          setPurchaseInfo({
                            spec: v.product_detail_sid,
                            unitPrice: v.price,
                          });
                          v.img &&
                            setDataForProductDetail(
                              toggleDisplayForImg(
                                datatForProductDetail,
                                v.product_detail_sid
                              )
                            );
                        }}
                      >
                        {v.name}
                      </button>
                    );
                  })}
                </div>
                <div className={styles.detail_qty_box}>
                  <h5 className={styles.detail_title}>購買數量</h5>
                  <div className={styles.detail_qty}>
                    <button
                      className={styles.detail_qty_sub_btn}
                      onClick={() => {
                        if (count > 1) {
                          setCount(count - 1);
                        }
                      }}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className={styles.detail_qty_input}
                      value={count}
                      onChange={(e) => {
                        const reisNumber = /[.\d]/;
                        if (reisNumber.test(e.target.value)) {
                          setCount(parseInt(e.target.value));
                        }
                      }}
                    />
                    <button
                      className={styles.detail_qty_add_btn}
                      onClick={() => {
                        setCount(count + 1);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <h5 className={styles.detail_title}>付款方式</h5>
                  <p className={styles.detail_spec_text}>
                    VISA 信用卡 / MASTER 信用卡 / LINE Pay / Google Pay
                  </p>
                </div>
                <div>
                  <h5 className={styles.detail_title}>運送方式</h5>
                  <p className={styles.detail_ship_text}>
                    黑貓宅配 / 7-11取貨 / 全家取貨
                  </p>
                </div>
              </div>
              <div className={styles.detail_main_bottom}>
                {/* <SecondaryBtn icon={faHeart} text={'收藏列表'} /> */}
                <IconSeconBtn icon={faHeart} text={'加入收藏'} />
                <IconSeconBtn icon={faCartShopping} text={'加入購物車'} />
                <MainBtn text={'立即購買'} />
              </div>
            </div>
          </section>
        </div>
      </div>
      <BGMiddleDecoration />
      {/* 商品詳述區 */}
      <div className="container-outer">
        <div className={styles.bgc_lightBrown}>
          <div className="container-inner">
            {/* 這邊待元件刻好需要更換 */}
            <ul className={styles.detail_tabs}>
              <li>產品特色</li>
              <li>退換貨須知</li>
              <li>商品評價</li>
            </ul>

            <ul className={styles.detail_text_box}>
              <li>
                <h6>品牌:</h6>
                <p>{datatForProductMain.supplier_name}</p>
              </li>
              <li>
                <h6>產地:</h6>
                <p>{datatForProductMain.made_in_where}</p>
              </li>
              <li>
                <h6>商品詳述 :</h6>
                <p
                  dangerouslySetInnerHTML={{
                    __html: datatForProductMain.description,
                  }}
                ></p>
              </li>
            </ul>
            <ul className={styles.detail_return_box}>
              <li>
                <h6>退換規定:</h6>
                <p>
                  商品到貨享十天猶豫期之權益（注意！猶豫期非試用期）
                  ，辦理退貨商品必須是全新狀態且包裝完整，商品一經拆封，等同商品價值已受損，僅能以福利品出售，若需退換貨，我方須收取價值損失之費用(回復原狀、整新費)，請先確認商品正確、外觀可接受，再行開機/使用，以免影響您的權利，祝您購物順心
                </p>
              </li>
              <li>
                <h6>特別說明:</h6>
                <ol>
                  <li>
                    本公司收到您下單(要約)後，仍需確認交易條件正確、供貨商品有庫存或服務可提供。如有無法接受訂單之異常情形，或您下單後未能完成正常付款，應視為訂單(買賣契約)全部自始不成立或失效，本公司得於合理期間內通知說明拒絕接受訂單。請您重新依需求下單訂購。
                  </li>
                  <li>
                    本公司對於所販售具遞延性之商品或服務，消費者權益均受保障。如因合作廠商無法提供商品或服務，請與本公司聯繫辦理退貨或換成等值商品。
                  </li>
                </ol>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <PawWalking />
      <div className="container-outer">
        <div className="container-inner">
          <div className={styles.comment_section}>
            <h4 className={styles.comment_title}>商品評論</h4>
            <p>{`(共 ${datatForProductMain.comment_count} 則相關評論)`}</p>
            <div className={styles.comment_btns}>
              <button
                className={styles.comment_btn}
                onClick={() => {
                  setCommentFilter(6);
                }}
              >
                全部評論
              </button>
              {dataForCommentQty.map((v) => {
                const { rating, count } = v;
                return (
                  <button
                    key={rating}
                    className={styles.comment_btn}
                    onClick={() => {
                      setCommentFilter(rating);
                    }}
                  >{`${rating}星 (${count})`}</button>
                );
              })}
            </div>
            <div className={styles.comment_cards}>
              {dataForComment &&
                commentFiliterByRating(dataForComment, commentFilter).map(
                  (v) => {
                    const {
                      product_comment_sid,
                      member_sid,
                      date,
                      rating,
                      content,
                      name,
                      profile,
                    } = v;
                    return (
                      <CommentCard
                        key={product_comment_sid}
                        member_sid={member_sid}
                        date={date}
                        rating={rating}
                        content={content}
                        name={name}
                        profile={profile}
                      />
                    );
                  }
                )}
            </div>
            <div className={styles.pet_type_btns}>
              <button className={styles.circle_btn_active}></button>
              <button></button>
              <button></button>
              <button></button>
            </div>
          </div>
        </div>
      </div>
      <BGRecomandDecoration />
      {/* 商品詳述區 */}
      <div className="container-outer">
        <div className={styles.bgc_lightBrown}>
          <div className="container-inner">
            <section className="container-outer recommand-products">
              {/* 推薦商品顯示區 頁碼要看怎麼用迴圈產生*/}
              <div className={styles.reconmand_products_box}>
                <Image src={CorpLogo} className={styles.recomand_img}></Image>
                <p className={styles.reconmand_products_title}>
                  毛孩可能會喜歡...
                </p>
              </div>

              <div className={styles.recomand_cards}>
                <Row gutter={[32, 0]} wrap={false} className={styles.cards}>
                  {dataForRecomand.map((v) => {
                    const {
                      product_sid,
                      category_detail_sid,
                      for_pet_type,
                      name,
                      img,
                      update_date,
                      supplier,
                      max_price,
                      min_price,
                      avg_rating,
                    } = v;
                    return (
                      <Col
                        xs={12}
                        sm={12}
                        md={1}
                        className={styles.product_card}
                        key={product_sid}
                      >
                        <ShopProductCard
                          product_sid={product_sid}
                          category_detail_sid={category_detail_sid}
                          for_pet_type={for_pet_type}
                          name={name}
                          img={img}
                          update_date={update_date}
                          supplier={supplier}
                          max_price={max_price}
                          min_price={min_price}
                          avg_rating={avg_rating}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </div>
              <div className={styles.pet_type_btns}>
                <button className={styles.circle_btn_active}></button>
                <button></button>
                <button></button>
                <button></button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
