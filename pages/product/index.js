import { useState, useEffect } from 'react';
import BGUpperDecoration from '@/components/ui/decoration/bg-upper-decoration';
import BGMiddleDecoration from '@/components/ui/decoration/bg-middle-decoration';
import BGMNewDecoration from '@/components/ui/decoration/bg-new-decoration';
import ShopSupplierCard from '@/components/ui/cards/shop-supplier-card';

import Link from 'next/link';
import { Row, Col } from 'antd';

import iconBKG from '@/assets/icon-BKG.svg';
//八大類圖示
import Image from 'next/image';
import styles from '@/styles/shop.module.css';
import can from '@/assets/icon-shop-can.svg';
import dress from '@/assets/icon-shop-dress.svg';
import food from '@/assets/icon-shop-food.svg';
import health from '@/assets/icon-shop-health.svg';
import other from '@/assets/icon-shop-other.svg';
import outdoor from '@/assets/icon-shop-outdoor.svg';
import snack from '@/assets/icon-shop-snack.svg';
import toy from '@/assets/icon-shop-toy.svg';

//二大類圖示
import dog from '@/assets/logo-dog.svg';
import cat from '@/assets/logo-cat.svg';
import ShopProductCard from '@/components/ui/cards/shop-product-card';

export default function ProdoctIndex() {
  //汪星人/喵星人/品牌推薦/最新上架的卡片資訊
  const [dataForDog, setDataForDog] = useState([]);
  const [dataForCat, setDataForCat] = useState([]);
  const [dataForBrand, setDataForBrand] = useState([]);
  const [dataForNew, setDataForNew] = useState([]);

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

  //八大類icon資料
  const eightCatergoriesData = [
    {
      id: 'food',
      text: '飼料',
      icon: food,
      href: 'http://localhost:3000/product/catergory/food',
    },
    {
      id: 'can',
      text: '罐頭',
      icon: can,
      href: 'http://localhost:3000/product/catergory/can',
    },
    {
      id: 'snack',
      text: '零食',
      icon: snack,
      href: 'http://localhost:3000/product/catergory/snack',
    },
    {
      id: 'health',
      text: '保健品',
      icon: health,
      href: 'http://localhost:3000/product/catergory/health',
    },
    {
      id: 'toy',
      text: '玩具',
      icon: toy,
      href: 'http://localhost:3000/product/catergory/toy',
    },
    {
      id: 'dress',
      text: '服飾',
      icon: dress,
      href: 'http://localhost:3000/product/catergory/dress',
    },
    {
      id: 'outdoor',
      text: '戶外用品',
      icon: outdoor,
      href: 'http://localhost:3000/product/catergory/outdoor',
    },
    {
      id: 'other',
      text: '其他',
      icon: other,
      href: 'http://localhost:3000/product/catergory/other',
    },
  ];

  useEffect(() => {
    (async function getData() {
      //拿回汪星人24張卡片資訊
      const res_cards = await fetch(
        'http://localhost:3002/shop-api/hompage-cards',
        {
          method: 'GET',
        }
      );
      const { dogDatas, catDatas, brandData, newData } = await res_cards.json();

      setDataForDog(dogDatas);
      setDataForCat(catDatas);
      setDataForBrand(brandData);
      setDataForNew(newData);

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

  return (
    <>
      <div className="container-outer">
        <nav></nav>
      </div>
      <div className="container-outer">
        <div className={styles.bgc_lightBrown}>
          <div className="container-inner">
            <div className={styles.search_bar}>
              {/* 這邊應該要改用共用元件SearchBar */}
              <input type="text" placeholder="搜尋你愛的東西" />
              <button>找尋商品</button>
            </div>
            {/* 這邊應該要改用共用元件分類按鈕 */}
            <Row gutter={16}>
              {eightCatergoriesData.map((e) => {
                return (
                  <Col span={3} key={e.id} className={styles.eight_icons}>
                    <Link href={e.href} className={styles.eight_icons_links}>
                      <Image src={iconBKG} className={styles.icon_bg} />
                      <div className={styles.icon_info}>
                        <Image src={e.icon} className={styles.icon} />
                        <p>{e.text}</p>
                      </div>
                    </Link>
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
        <div className={styles.pet_type_cards}>
          <Row gutter={[32, 0]} className={styles.cards}>
            {twotCatergoriesData.map((v) => {
              return (
                v.display &&
                v.data.map((v) => {
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
                    <ShopProductCard
                      key={product_sid}
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
                  );
                })
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
        <BGMiddleDecoration />
      </section>
      <section className="container-outer reccomand-brand">
        {/* 第二區推薦品牌 */}
        <div className={styles.bgc_lightBrown}>
          <div className="container-inner">
            <Row gutter={[32, 64]} className={styles.brand_cards}>
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
          <Row gutter={[32, 0]} className={styles.cards}>
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
                <ShopProductCard
                  key={product_sid}
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
