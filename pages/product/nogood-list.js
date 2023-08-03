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
import orderByOptions from '@/data/product/orderby.json';

import BreadCrumb from '@/components/ui/bread-crumb/breadcrumb';

export default function List() {
  const router = useRouter();
  //排序
  const [orderBy, setOrderBy] = useState('-- 請選擇 --');

  //是否顯示總銷售數的tag
  const [showFlag, setShowFlag] = useState(false);

  //換頁時要用的-類別/關鍵字/頁碼
  const [category, setCategory] = useState('');
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

  const getData = async (obj) => {
    const usp = new URLSearchParams(obj);
    const res = await fetch(
      `${process.env.API_SERVER}/shop-api/products?${usp.toString()}`,
      { method: 'GET' }
    );
    const data = await res.json();

    if (Array.isArray(data.rows)) {
      setDatas(data);
    }
  };

  useEffect(() => {
    //取得用戶拜訪的類別選項
    const usp = new URLSearchParams(router.query);

    fetch(`${process.env.API_SERVER}/shop-api/products?${usp.toString()}`)
      .then((r) => r.json())
      .then((obj) => {
        const newBrand = obj.brand.map((v) => {
          return { ...v, checked: false };
        });
        setFilters({ ...filters, brand: newBrand });
        setDatas(obj);
        setLikeDatas(obj.likeDatas);
      })
      .catch((error) => {
        // 處理錯誤情況
        console.error(error);
      });
  }, []);

  //收藏列表相關的函式-------------------------------------------------------
  const toggleLikeList = () => {
    setShowLikeList((prev) => !prev);
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
      getData(copyURL);
      router.push(`?${new URLSearchParams(copyURL).toString()}`);
    }
  };

  const searchBarClickHandler = () => {
    getData({
      ...router.query,
      keyword: keyword,
      page: 1,
    });
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
    getData({
      ...router.query,
      page: page,
      perPage: perpage,
    });
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

  const orderByHandler = (e) => {
    const newSelect = orderByOptions.find((v) => v.key === e.key);
    setOrderBy(newSelect.label);

    const selectedRank = rankOptions[e.key];
    if (selectedRank === 'sales_DESC') {
      setShowFlag(true);
    } else {
      setShowFlag(false);
    }

    getData({
      ...router.query,
      page: 1,
      orderBy: selectedRank,
    });

    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page: 1,
        orderBy: selectedRank,
      }).toString()}`
    );
  };

  //篩選BOX相關的函式-------------------------------------------------------
  const toggleFilter = () => {
    setShowFilter(!showfilter);
  };

  const [filters, setFilters] = useState(filterDatas);

  const filterCheckedHandler = (arr, name, id) => {
    const newFilters = arr.map((v) => {
      if (v.label === id) {
        return { ...v, checked: !v.checked };
      } else return { ...v };
    });

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: newFilters,
    }));
  };

  const filterHandler = (filters = {}) => {
    const { typeForPet, typeForAge, category, brand } = filters;

    const checkedOptions = (arr) => {
      return arr.filter((v) => v.checked === true).map((v) => v.value);
    };

    const filtersToCheck = {
      typeForPet: checkedOptions(typeForPet),
      typeForAge: checkedOptions(typeForAge),
      category: checkedOptions(category),
      brand: checkedOptions(brand),
    };

    let query = router.query;

    for (const [key, value] of Object.entries(filtersToCheck)) {
      if (value.length > 0) {
        query[key] = value;
      }
    }

    getData({
      ...query,
      page: 1,
    });
    router.push(
      `?${new URLSearchParams({
        ...query,
        page: 1,
      }).toString()}`
    );
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
                  name="typeForPet"
                  data={filters.typeForPet}
                  changeHandler={filterCheckedHandler}
                />
                <ProductFilter
                  text="使用年齡:"
                  name="typeForAge"
                  data={filters.typeForAge}
                  changeHandler={filterCheckedHandler}
                />
                <ProductFilter
                  text="商品類別:"
                  name="category"
                  data={filters.category}
                  changeHandler={filterCheckedHandler}
                />
                <ProductInput
                  minHandlerHandler={() => {}}
                  changeHandler={() => {}}
                />
                <ProductFilter
                  text="品牌:"
                  name="brand"
                  data={filters.brand}
                  needSpan={false}
                  changeHandler={filterCheckedHandler}
                />
                <div className={styles.filter_btns}>
                  <SecondaryBtn text="重置條件" />
                  <MainBtn
                    text="確定篩選"
                    clickHandler={() => {
                      filterHandler(filters);
                    }}
                  />
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
          onRankChange={orderByHandler}
          orderBy={orderBy}
          items={orderByOptions}
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
