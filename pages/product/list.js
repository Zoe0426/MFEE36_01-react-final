import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/shop.module.css';
import { Pagination, Row, Col, ConfigProvider } from 'antd';

/*引用的卡片+篩選*/
import Likelist from '@/components/ui/like-list/like-list';
import ShopLikelistCard from '@/components/ui/cards/shop-like-list-card';
import ShopHistoryCard from '@/components/ui/cards/shop-history-card';
import ShopProductCard from '@/components/ui/cards/shop-product-card';
import ShopTotalPagesRank from '@/components/ui/infos/shop-total-pages_rank';
import ProductFilter from '@/components/ui/shop/product-filter';
import ProductInput from '@/components/ui/shop/product-input';

/*引用的按鈕*/
import IconBtn from '@/components/ui/buttons/IconBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import MainBtn from '@/components/ui/buttons/MainBtn';
import SearchBar from '@/components/ui/buttons/SearchBar';

/*引用的背景+icon+圖示*/
import BGUpperDecoration from '@/components/ui/decoration/bg-upper-decoration';
import { faFilter, faHeart } from '@fortawesome/free-solid-svg-icons';

/*引入資料*/
import filterDatas from '@/data/product/filters.json';

import BreadCrumb from '@/components/ui/bread-crumb/breadcrumb';

export default function List() {
  const { typeForPet, categoryDetailSid, typeForAge } = filterDatas;
  const router = useRouter();
  //排序
  const [orderBy, setOrderBy] = useState('-- 請選擇 --');

  //是否顯示總銷售數的tag
  const [showFlag, setShowFlag] = useState(false);

  //換頁時要用的-類別/關鍵字/頁碼
  const [catergory, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [keyword, setKeyword] = useState('');

  const [datas, setDatas] = useState({
    totalRows: 0,
    perPage: 16,
    totalPages: 0,
    page: 1,
    rows: [],
    // like:[],
    brand: [],
  });

  const [likeDatas, setLikeDatas] = useState([]);
  //   const [brandDatas, setBrandDatas] = useState([]);
  //   const [totalItems, setTotalItems] = useState(0);
  //   const [totalPages, settotalPages] = useState(0);
  const [showLikeList, setShowLikeList] = useState(false);
  const [showfilter, setShowFilter] = useState(false);
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
    const { category, keyword } = router.query;
    console.log(router.query);
    setCategory(category || '');
    setKeyword(keyword || '');
    const usp = new URLSearchParams(router.query);

    fetch(`${process.env.API_SERVER}/shop-api/products?${usp.toString()}`)
      .then((r) => r.json())
      .then((obj) => {
        setDatas(obj);
        setLikeDatas(obj.likeDatas);
      })
      .catch((error) => {
        // 處理錯誤情況
        console.error(error);
      });

    // if (cid) {
    //   (async function getData() {
    //     const r = await fetch(
    //       `http://localhost:3002/shop-api/maincard/${cid}`,
    //       {
    //         method: 'GET',
    //       }
    //     );
    //     const backDatas = await r.json();
    //     const { totalRows, cardData, likeDatas, brandDatas } = backDatas;
    //     console.log(cardData);
    //     if (totalRows) {
    //       setTotalItems(totalRows);
    //     }
    //     if (cardData) {
    //       setDatas(cardData);
    //     }
    //     if (totalPages) {
    //       settotalPages(totalPages);
    //     }
    //     if (likeDatas) {
    //       setLikeDatas(likeDatas);
    //     }

    //     if (brandDatas) {
    //       setBrandDatas(brandDatas);
    //     }
    //   })();
    // }
  }, [router.query]);

  //篩選BOX相關的函式-------------------------------------------------------
  const toggleFilter = () => {
    setShowFilter(!showfilter);
  };

  //收藏列表相關的函式-------------------------------------------------------
  const toggleLikeList = () => {
    setShowLikeList(!showLikeList);
  };

  const removeAllLikeList = () => {
    if (likeDatas.length > 0) {
      setLikeDatas([]);
      //這邊需要再修改，要看怎麼得到會員的編號
      removeLikeListToDB('all', 'mem00002');
    }
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
          toggleLikeList();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //searchBar相關的函式-------------------------------------------------------
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

  //Pagination相關的函式-------------------------------------------------------
  const PageChangeHandler = (page, perpage) => {
    setPerPage(perpage);
    setPage(page);
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page: page,
        perPage: perpage,
      }).toString()}`
    );
  };

  //dropDown排序相關的函式-------------------------------------------------------
  const rankOptions = {
    1: 'price_ASC',
    2: 'price_DESC',
    3: 'new_DESC',
    4: 'sales_DESC',
  };

  const items = [
    {
      label: '價格由低到高',
      key: '1',
    },
    {
      label: '價格由高到低',
      key: '2',
    },
    {
      label: '最新商品',
      key: '3',
    },
    {
      label: '熱賣商品',
      key: '4',
    },
  ];

  const onRankChange = (e) => {
    const newSelect = items.find((v) => v.key === e.key);
    setOrderBy(newSelect.label);

    const selectedRank = rankOptions[e.key];
    if (selectedRank === 'sales_DESC') {
      setShowFlag(true);
    } else {
      setShowFlag(false);
    }
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page: 1,
        orderBy: selectedRank,
      }).toString()}`
    );
    console.log(selectedRank);
  };

  return (
    <>
      {/* <div className="container-outer"> */}
      <div className={styles.bgc_lightBrown}>
        <nav className="container-inner">
          <div className={styles.search_bar}>
            <SearchBar
              placeholder="搜尋你愛的東西"
              btn_text="尋找商品"
              inputText={keyword}
              changeHandler={(e) => {
                setKeyword(e.target.value);
              }}
              keyDownHandler={searchBarHandler}
              clickHandler={searchBarClickHandler}
            />
          </div>
          <div className={styles.nav_head}>
            <BreadCrumb breadCrubText={breadCrubText} />
            <div className={styles.btns}>
              <IconBtn
                icon={faHeart}
                text={'收藏列表'}
                clickHandler={toggleLikeList}
              />
              <IconBtn
                icon={faFilter}
                text={'進階篩選'}
                clickHandler={toggleFilter}
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
                closeHandler={toggleLikeList}
                removeAllHandler={removeAllLikeList}
                removeLikeListItem={removeLikeListItem}
              />
            )}
          </div>
          <div className={styles.filter_box}>
            {/* 要記得補上onChange的function給子元件 */}
            {showfilter && (
              <>
                <ProductFilter
                  text="適用對象:"
                  data={typeForPet}
                  onChange={() => {}}
                />
                <ProductFilter
                  text="使用年齡:"
                  data={typeForAge}
                  onChange={() => {}}
                />
                <ProductFilter
                  text="商品類別:"
                  data={categoryDetailSid}
                  onChange={() => {}}
                />
                <ProductInput
                  minHandlerHandler={() => {}}
                  maxHandler={() => {}}
                />
                <ProductFilter
                  text="品牌:"
                  data={datas.brand}
                  needSpan={false}
                  onChange={() => {}}
                />
                <div className={styles.filter_btns}>
                  <SecondaryBtn text="重置條件" />
                  <MainBtn text="確定篩選" />
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
      <BGUpperDecoration />
      <div className="container-outer">
        <ShopHistoryCard
          data={[
            { product_sid: 'CFCA0001', img: 'pro009.jpg' },
            { product_sid: 'CFCA0002', img: 'pro010.jpg' },
          ]}
        />
      </div>

      {/* </div> */}
      {/* <div className="container-outer"> */}
      <main className="container-inner">
        <ShopTotalPagesRank
          totalItems={datas.totalRows}
          onRankChange={onRankChange}
          orderBy={orderBy}
          items={items}
        />
        <Row gutter={[32, 36]} className={styles.cards}>
          {datas.rows &&
            datas.rows.map((v) => {
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
                  md={6}
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
                    tag_display={showFlag}
                    sales_qty={sales_qty}
                  />
                </Col>
              );
            })}
        </Row>
      </main>
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
            showSizeChanger
            pageSizeOptions={[20, 40, 60]}
            // showSizeChanger={false}
            onChange={PageChangeHandler}
            onShowSizeChange={PageChangeHandler}
          />
        </ConfigProvider>
      </div>
      {/* </div> */}
    </>
  );
}
