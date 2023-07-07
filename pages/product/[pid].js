import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CommentCard from '@/components/ui/cards/comment-card';
import BGMiddleDecoration from '@/components/ui/decoration/bg-middle-decoration';
import BreadCrumb from '@/components/ui/bread-crumb/breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {
  faApplePay,
  faCcMastercard,
  faCcVisa,
  faLine,
  faGooglePay,
} from '@fortawesome/free-brands-svg-icons';

import styles from '@/styles/shop.module.css';
import { Row } from 'antd';

export default function Product() {
  const { query, asPath } = useRouter();
  const [datatForProductMain, setDataForProductMain] = useState([]);
  const [datatForProductDetail, setDataForProductDetail] = useState([]);
  const [dataForComment, setDataForComment] = useState([]);
  const [count, setCount] = useState(1);

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
    //取得用戶拜訪的特定商品編號
    const { pid } = query;

    if (pid) {
      (async function getData() {
        //拿回特定商品的相關資訊 與評價
        const res_productInfo = await fetch(
          `http://localhost:3002/shop-api/product/${pid}`,
          { method: 'GET' }
        );
        const { shopMainData, shopDetailData, commentDatas } =
          await res_productInfo.json();
        // setDataForProduct(productDatas)
        setDataForProductMain(shopMainData[0]);
        setDataForComment(commentDatas);
        setDataForProductDetail(
          shopDetailData.map((v, i) => {
            if (i === 0) {
              return { ...v, count: 0, display: true };
            } else return { ...v, count: 0, display: false };
          })
        );
      })();
    }
  }, [query]);

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

  return (
    <>
      <div className="outer-container">
        <div className="container-inner">
          {/* 麵包屑這邊需要再修改 */}
          <div className={styles.nav_head}>
            <BreadCrumb breadCrubText={breadCrubText} />
            <div className={styles.btns}>
              <button>收藏列表</button>
            </div>
          </div>
          <section className={styles.detail_main_box}>
            <div className={styles.detail_img_box}>
              <div className={styles.detail_big_img}>
                {datatForProductDetail.map((v) => {
                  return (
                    v.display && (
                      <img
                        key={v.product_detail_sid}
                        src={`/product-img/${v.img}`}
                        alt=""
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
                          <img src={`/product-img/${v.img}`} alt="" />
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </div>
            <div className={styles.detail_main_info}>
              <h1 className={styles.detail_title}>
                {datatForProductMain.name}
              </h1>
              <div className={styles.avg_rating_total_sales}>
                <div>
                  <FontAwesomeIcon
                    icon={faStar}
                    className={styles.detail_main_star}
                  />
                </div>
                <div>{datatForProductMain.avg_rating}</div>
                <div>( 已有99人購買，這邊需要再拉API資料 )</div>
              </div>
              <div className={styles.detail_spec_box}>
                <h5 className={styles.detail_spec_title}>規格選擇</h5>
                {datatForProductDetail.map((v, i) => {
                  return (
                    <button
                      className={
                        i === 0
                          ? styles.detail_spec_btn_none
                          : styles.detail_spec_btn
                      }
                      key={v.product_detail_sid}
                      onClick={() => {
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
                <h5 className={styles.detail_spec_title}>購買數量</h5>
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
              <div className={styles.detail_pay_box}>
                <h5 className={styles.detail_spec_title}>付款方式</h5>
                <FontAwesomeIcon
                  icon={faApplePay}
                  className={styles.detail_pay_icon}
                />
                <p>apple Pay /</p>

                <FontAwesomeIcon
                  icon={faCcMastercard}
                  className={styles.detail_pay_icon}
                />
                <FontAwesomeIcon
                  icon={faCcVisa}
                  className={styles.detail_pay_icon}
                />
                <FontAwesomeIcon
                  icon={faLine}
                  className={styles.detail_pay_icon}
                />
                <FontAwesomeIcon
                  icon={faGooglePay}
                  className={styles.detail_pay_icon}
                />
                <p>信用卡 / </p>
                <p>LINE pay / ATM轉帳</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <BGMiddleDecoration />
      <div className="container-outer">
        <div className="container-inner">
          <div className={styles.comment_section}>
            <div className={styles.comment_cards}>
              {dataForComment.map((v) => {
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
              })}
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
    </>
  );
}
