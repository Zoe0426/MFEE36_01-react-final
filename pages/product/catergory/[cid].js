import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ShopProductCard from '@/components/ui/cards/shop-product-card';
import ShopTotalPagesRank from '@/components/ui/infos/shop-total-pages_rank';
import BreadCrumb from '@/components/ui/bread-crumb/breadcrumb';
import IconBtn from '@/components/ui/buttons/IconBtn';
import BGUpperDecoration from '@/components/ui/decoration/bg-upper-decoration';
import SearchBar from '@/components/ui/buttons/SearchBar';
import Likelist from '@/components/ui/like-list/like-list';
import { faFilter, faHeart } from '@fortawesome/free-solid-svg-icons';

import { Pagination } from 'antd';
import { Row } from 'antd';
import styles from '@/styles/shop.module.css';

export default function Catergory() {
  const { query, asPath } = useRouter();
  const [datas, setDatas] = useState([]);
  const [likeDatas, setLikeDatas] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, settotalPages] = useState(0);
  const [showLikeList, setShowLikeList] = useState(false);

  //麵包屑寫得有點奇怪...
  const [breadCrubText, setBreadCrubText] = useState([
    {
      id: 'shop',
      text: '商城',
      href: 'http://localhost:3000/product',
      show: true,
    },
    { id: 'search', text: '/ 商品列表', href: '', show: true },
    { id: 'pid', text: '', href: '', show: false },
  ]);

  useEffect(() => {
    //取得用戶拜訪的類別選項
    const { cid } = query;

    if (cid) {
      (async function getData() {
        const r = await fetch(
          `http://localhost:3002/shop-api/maincard/${cid}`,
          {
            method: 'GET',
          }
        );
        const backDatas = await r.json();
        const { totalRows, cardData, likeDatas } = backDatas;
        console.log(cardData);
        if (totalRows) {
          setTotalItems(totalRows);
        }
        if (cardData) {
          setDatas(cardData);
        }
        if (totalPages) {
          settotalPages(totalPages);
        }
        if (likeDatas) {
          setLikeDatas(likeDatas);
        }
      })();
    }
  }, [query]);

  //收藏列表相關的函式
  const openShowLikeList = () => {
    setShowLikeList(true);
  };

  const closeShowLikeList = () => {
    setShowLikeList(false);
  };

  const removeAllLikeList = async () => {
    setLikeDatas([]);

    //這邊需要再修改
    try {
      const removeAll = await fetch(
        `http://localhost:3002/shop-api/maincard/${query.cid}`,
        {
          method: 'DELETE',
        }
      );

      const result = await removeAll.json();
      console.log(JSON.stringify(result, null, 4));

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <div className="container-outer"> */}
      <div className={styles.bgc_lightBrown}>
        <nav className="container-inner">
          <div className={styles.search_bar}>
            <SearchBar placeholder="搜尋你愛的東西" btn_text="尋找商品" />
          </div>
          <div className={styles.nav_head}>
            <BreadCrumb breadCrubText={breadCrubText} />
            <div className={styles.btns}>
              <IconBtn
                icon={faHeart}
                text={'收藏列表'}
                clickHandler={openShowLikeList}
              />
              <IconBtn icon={faFilter} text={'進階篩選'} />
            </div>
          </div>
          <div className="filters">
            {showLikeList && (
              <Likelist
                datas={likeDatas}
                imgPosition="/product-img"
                closeHandler={closeShowLikeList}
                removeAllHandler={removeAllLikeList}
              />
            )}
          </div>
        </nav>
      </div>
      <BGUpperDecoration />
      {/* </div> */}
      {/* <div className="container-outer"> */}
      <main className="container-inner">
        <ShopTotalPagesRank totalItems={totalItems} />
        <Row gutter={[32, 36]} className={styles.cards}>
          {datas.map((v) => {
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
                col={6}
                xs={12}
                flex={0}
              />
            );
          })}
        </Row>
      </main>
      <div className={styles.pagination}>
        <Pagination
          defaultCurrent={1}
          total={totalItems}
          pageSize={16}
          showSizeChanger={false}
        />
      </div>
      {/* </div> */}
    </>
  );
}
