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

//二大類圖示
import dog from '@/assets/logo-dog.svg';
import cat from '@/assets/logo-cat.svg';
import ShopProductCard from '@/components/ui/cards/shop-product-card';
//載入八大類icon資料
import eightCatergoriesData from '@/data/product/eight-catergories-data.json';

export default function ProdoctIndex() {
  const router = useRouter();

  const [cardPosition, setCardPosition] = useState(0);
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
  const [dataForBrand, setDataForBrand] = useState([]);
  const [dataForNew, setDataForNew] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [keywordDatas, setKeywordDatats] = useState([]);
  const [showKeywordDatas, setShowKeywordDatas] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

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
        <nav></nav>
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
            {/* 這邊應該要改用共用元件分類按鈕 */}
            <Row gutter={{ xs: 0, sm: 0, md: 16 }}>
              {eightCatergoriesData.map((e) => {
                return (
                  <Col
                    xs={{ span: 6 }}
                    sm={{ span: 6 }}
                    md={{ span: 3 }}
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
                <Image src={v.icon} />
                <span>{v.text}</span>
              </div>
            );
          })}
        </div>
        <div
          style={{
            transform: `translateX(${cardPosition}px)`,
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <div className={styles.pet_type_cards}>
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
        <div className={styles.pet_type_btns}>
          <button className={styles.circle_btn_active}></button>
          <button></button>
          <button></button>
          <button></button>
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
