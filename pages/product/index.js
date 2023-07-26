import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BGUpperDecoration from '@/components/ui/decoration/bg-upper-decoration';
import BGMiddleDecoration from '@/components/ui/decoration/bg-middle-decoration';
import BGMNewDecoration from '@/components/ui/decoration/bg-new-decoration';
import ShopSupplierCard from '@/components/ui/cards/shop-supplier-card';
import SearchBar from '@/components/ui/buttons/SearchBar1';
import SubBtn from '@/components/ui/buttons/subBtn';
import { Row, Col } from 'antd';
import Image from 'next/image';
import styles from '@/styles/shop.module.css';
import { faFontAwesome } from '@fortawesome/free-solid-svg-icons';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

//二大類圖示
import dog from '@/assets/logo-dog.svg';
import cat from '@/assets/logo-cat.svg';
import ShopProductCard from '@/components/ui/cards/shop-product-card';
//載入八大類icon資料
import eightCatergoriesData from '@/data/product/eight-catergories-data.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ProdoctIndex() {
  const router = useRouter();

  // const [cardPosition, setCardPosition] = useState(0);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCardPosition((prevPosition) => prevPosition - window.innerWidth);
  //   }, 10000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  // useEffect(() => {
  //   if (cardPosition <= -((5 - 1) * window.innerWidth)) {
  //     setCardPosition(0);
  //   }
  // }, [cardPosition]);

  //汪星人/喵星人/品牌推薦/最新上架的卡片資訊
  const [dataForDog, setDataForDog] = useState([]);
  const [dataForCat, setDataForCat] = useState([]);
  const [twotCatergoriesData, setTwotCatergoriesData] = useState([
    {
      id: 'dog',
      text: '汪星人專區',
      icon: dog,
      display: true,
      data: dataForDog,
    },
    {
      id: 'cat',
      text: '喵星人專區',
      icon: cat,
      display: false,
      data: dataForCat,
    },
  ]);

  const [dataForBrand, setDataForBrand] = useState([]);
  const [dataForNew, setDataForNew] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [keywordDatas, setKeywordDatats] = useState([]);
  const [showKeywordDatas, setShowKeywordDatas] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  //banner資料
  const [isMouseOverOnSlider, setIsMouseOverOnSliver] = useState(false);
  const [bannerCurrent, setBannerCurrent] = useState(0);
  const bannerPicDatas = ['banner01.jpg', 'banner02.jpg', 'banner03.jpg'];
  const bannerPlayStyle = {
    width: `calc(100% * ${bannerPicDatas.length})`,
    left: `calc(-100% * ${bannerCurrent})`,
  };

  //貓狗專區
  const [catDogCurrent, setCatDogCurrent] = useState(0);
  const catDogStyle = {
    position: 'relative',
    left: `calc(-96.5% * ${catDogCurrent})`,
    transition: '0.3s',
  };

  useEffect(() => {
    (async function getData() {
      //拿回卡片資訊
      const res_cards = await fetch(
        `${process.env.API_SERVER}/shop-api/hompage-cards`,
        {
          method: 'GET',
        }
      );
      const { dogDatas, catDatas, brandData, newData, keywords } =
        await res_cards.json();

      if (dogDatas.length > 0) {
        setDataForDog(dogDatas);
      }
      if (catDatas.length > 0) {
        setDataForCat(catDatas);
      }
      if (brandData.length > 0) {
        setDataForBrand(brandData);
      }
      if (newData.length > 0) {
        setDataForNew(newData);
      }
      if (keywords.length > 0) {
        const newKeywords = keywords.map((v) => {
          return { name: v, count: 0 };
        });
        setKeywordDatats(newKeywords);
      }

      setTwotCatergoriesData(
        twotCatergoriesData.map((v) => {
          if (v.id === 'dog') {
            return { ...v, data: dogDatas };
          } else {
            return { ...v, data: catDatas };
          }
        })
      );
    })();
  }, []);

  useEffect(() => {
    const bannerPics = bannerPicDatas.length - 1;
    let timer;
    if (!isMouseOverOnSlider) {
      timer = setInterval(() => {
        if (bannerCurrent >= bannerPics) {
          setBannerCurrent(0);
        } else {
          setBannerCurrent((preV) => preV + 1);
        }
      }, 3000);
    }

    return () => clearInterval(timer);
  }, [bannerCurrent, isMouseOverOnSlider]);

  //轉換貓狗卡片顯示
  const toggleDisplayForDogCat = (twotCatergoriesData, id) => {
    return twotCatergoriesData.map((v) => {
      if (v.id === id) {
        return { ...v, display: true };
      } else {
        return { ...v, display: false };
      }
    });
  };

  //searchBar相關的函式-------------------------------------------------------
  const filterKeywordDatas = (datas, keyword, keyin) => {
    if (!keyin) {
      const searchWord = keyword.split('');

      datas.forEach((v1) => {
        v1.count = 0;
        searchWord.forEach((v2) => {
          if (v1.name.includes(v2)) {
            v1.count += 1;
          }
        });
      });
      datas.sort((a, b) => b.count - a.count);

      return datas.filter((v) => v.count >= searchWord.length);
    }
  };

  const searchBarHandler = (e) => {
    const searchText = e.target.value;

    if (!searchText) {
      const newKeywordDatas = [...keywordDatas];
      setShowKeywordDatas(false);
      setKeywordDatats(newKeywordDatas);
    }

    if (e.key === 'Enter' && searchText) {
      setShowKeywordDatas(false);
      let copyURL = { keyword: searchText };

      router.push(
        `http://localhost:3000/product/list?${new URLSearchParams(
          copyURL
        ).toString()}`
      );
    }
  };

  const searchBarClickHandler = () => {
    router.push(
      `http://localhost:3000/product/list?${new URLSearchParams({
        keyword: keyword,
      }).toString()}`
    );
  };

  const autocompleteHandler = (selectkeyword) => {
    setKeyword(selectkeyword);
    setShowKeywordDatas(false);
  };

  return (
    <>
      <div className="container-outer">
        <nav className={styles.shop_sliders}>
          <div className={styles.slider_left_box}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className={styles.slider_left}
              onClick={() => {
                if (bannerCurrent === 0) {
                  setBannerCurrent(bannerPicDatas.length - 1);
                } else {
                  setBannerCurrent(bannerCurrent - 1);
                }
              }}
            />
          </div>
          <ul
            className={styles.shop_sliders_box}
            style={bannerPlayStyle}
            onMouseEnter={() => {
              setIsMouseOverOnSliver(true);
            }}
            onMouseLeave={() => {
              setIsMouseOverOnSliver(false);
            }}
          >
            {bannerPicDatas.map((v) => {
              return (
                <li key={v}>
                  <img src={`./product-img/${v}`} alt={v} />
                </li>
              );
            })}
          </ul>
          <div className={styles.slider_right_box}>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={styles.slider_right}
              onClick={() => {
                if (bannerCurrent === bannerPicDatas.length - 1) {
                  setBannerCurrent(0);
                } else {
                  setBannerCurrent(bannerCurrent + 1);
                }
              }}
            />
          </div>
        </nav>
        <ul className={styles.shop_sliders_pages}>
          {bannerPicDatas.map((v, i) => {
            return (
              <li
                key={v}
                className={
                  i === bannerCurrent
                    ? `${styles.shop_sliders_pages_bttn} ${styles.shop_sliders_pages_active}`
                    : styles.shop_sliders_pages_bttn
                }
                onClick={() => {
                  setBannerCurrent(i);
                }}
              ></li>
            );
          })}
        </ul>
      </div>
      <div className={styles.container_outer_shop}>
        <div className={styles.bgc_lightBrown}>
          <div className="container-inner">
            <div className={styles.search_bar}>
              <SearchBar
                keywordDatas={filterKeywordDatas(
                  keywordDatas,
                  keyword,
                  isTyping
                )}
                placeholder="搜尋你愛的東西"
                btn_text="尋找商品"
                inputText={keyword}
                changeHandler={(e) => {
                  setKeyword(e.target.value);
                  setShowKeywordDatas(true);
                  setIsTyping(true);
                  setTimeout(() => {
                    setIsTyping(false);
                  }, 700);
                }}
                keyDownHandler={searchBarHandler}
                clickHandler={searchBarClickHandler}
                autocompleteHandler={autocompleteHandler}
                showKeywordDatas={showKeywordDatas}
                blurHandler={() => {
                  setTimeout(() => {
                    setShowKeywordDatas(false);
                  }, 200);
                }}
                clearHandler={() => {
                  setKeyword('');
                }}
              />
            </div>
            <Row gutter={{ xs: 0, sm: 0, xl: 8 }}>
              {eightCatergoriesData.map((e) => {
                return (
                  <Col
                    xs={{ span: 6 }}
                    sm={{ span: 6 }}
                    xl={{ span: 3 }}
                    key={e.id}
                    className={styles.eight_icons}
                  >
                    <SubBtn
                      img={e.icon}
                      text={e.text}
                      subBtnHandler={() => {
                        router.push(e.href);
                      }}
                    />
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
        <BGUpperDecoration />
      </div>
      <section className="container-outer dog-cat-products">
        <div className={styles.pet_type_tabs}>
          {twotCatergoriesData.map((v) => {
            return (
              <div
                role="presentation"
                key={v.id}
                className={v.display ? styles.tab_active : styles.tab_normal}
                onMouseEnter={() => {
                  setTwotCatergoriesData(
                    toggleDisplayForDogCat(twotCatergoriesData, v.id)
                  );
                }}
              >
                {' '}
                <Image src={v.icon} alt={v.id} />
                <span>{v.text}</span>
              </div>
            );
          })}
        </div>
        <div className={styles.pet_type_cards_box}>
          <div className={styles.catDog_left_box}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className={styles.catDog_left}
              onClick={() => {
                if (catDogCurrent === 0) {
                  setCatDogCurrent(twotCatergoriesData[0].data.length / 6 - 1);
                } else {
                  setCatDogCurrent(catDogCurrent - 1);
                }
              }}
            />
          </div>
          <div className={styles.try}>
            <div className={styles.pet_type_cards} style={catDogStyle}>
              <Row gutter={[32, 0]} wrap={false} className={styles.cards}>
                {twotCatergoriesData.map((v) => {
                  return (
                    v.display &&
                    v.data.map((v) => {
                      const {
                        product_sid,
                        name,
                        img,
                        max_price,
                        min_price,
                        avg_rating,
                        sales_qty,
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
                            name={name}
                            img={img}
                            max_price={max_price}
                            min_price={min_price}
                            avg_rating={avg_rating}
                            tag_display={true}
                            sales_qty={sales_qty}
                          />
                        </Col>
                      );
                    })
                  );
                })}
              </Row>
            </div>
          </div>
          <div className={styles.catDog_right_box}>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={styles.catDog_right}
              onClick={() => {
                if (
                  catDogCurrent ===
                  twotCatergoriesData[0].data.length / 6 - 1
                ) {
                  setCatDogCurrent(0);
                } else {
                  setCatDogCurrent(catDogCurrent + 1);
                }
              }}
            />
          </div>
        </div>
        <BGMiddleDecoration />
      </section>
      <section className="container-outer reccomand-brand">
        {/* 第二區推薦品牌 */}
        <div className={styles.bgc_lightBrown}>
          <div className="container-inner">
            <Row
              gutter={[
                { xs: 16, sm: 16, md: 32 },
                { xs: 32, sm: 32, md: 64 },
              ]}
              className={styles.brand_cards}
            >
              {dataForBrand.map((v) => {
                const { supplier_sid, name, img } = v;
                return (
                  <ShopSupplierCard
                    key={supplier_sid}
                    supplier_sid={supplier_sid}
                    name={name}
                    img={img}
                    col="1 1 200px"
                  />
                );
              })}
            </Row>
          </div>
        </div>
      </section>
      <section className="container-outer new-products">
        {/* s第三區新品顯示區 頁碼要看怎麼用迴圈產生*/}
        <BGMNewDecoration />
        <p className={styles.new_products_title}>新品專區</p>
        <div className={styles.new_cards}>
          <Row gutter={[32, 0]} wrap={false} className={styles.cards}>
            {dataForNew.map((v) => {
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
    </>
  );
}
