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

  //是否顯示總銷售數的tag
  const [showFlag, setShowFlag] = useState(false);

  //換頁時要用的-類別/關鍵字/頁碼/排序
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [orderBy, setOrderBy] = useState('-- 請選擇 --');
  const [keyword, setKeyword] = useState('');
  const [filtersReady, setFiltersReady] = useState(false);
  const [filters, setFilters] = useState(filterDatas);
  const [copyFilters, setCopyFilters] = useState([]);

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

  const getBrandData = async () => {
    const res = await fetch(`${process.env.API_SERVER}/shop-api/brand-list`, {
      method: 'GET',
    });
    const data = await res.json();

    if (Array.isArray(data.brand)) {
      const newBrand = data.brand.map((v) => {
        return { ...v, checked: false };
      });
      setFilters({ ...filters, brand: newBrand });
      // setCopyFilters({ ...filters, brand: newBrand });
      setCopyFilters(
        JSON.parse(JSON.stringify({ ...filters, brand: newBrand }))
      );
      setFiltersReady(true);
    }
  };

  useEffect(() => {
    getBrandData().then(() => {
      const { category } = router.query;
      if (category) {
        resetCheckBox('category', category);
        setFiltersReady(true);
      }
    });
  }, []);

  useEffect(() => {
    //取得用戶拜訪的類別選項
    const {
      category,
      keyword,
      orderBy,
      typeForPet,
      typeForAge,
      brand,
      minPrice,
      maxPrice,
    } = router.query;

    setKeyword(keyword || '');

    //將按下上一頁/重新整理，都可將先前排序的選項設定回去
    if (orderBy) {
      const selectedOrderByKey = Object.keys(rankOptions).find(
        (key) => rankOptions[key] === orderBy
      );
      if (selectedOrderByKey === '4') {
        setShowFlag(true);
      }
      const selectedOrderBy = orderByOptions.find((v) => {
        return v.key === selectedOrderByKey;
      });
      setOrderBy(selectedOrderBy.label);
    } else {
      setOrderBy('-- 請選擇 --');
    }

    if (minPrice) {
      setMinPrice(minPrice);
    } else {
      setMinPrice(0);
    }
    if (maxPrice) {
      setMaxPrice(maxPrice);
    } else {
      setMaxPrice(0);
    }

    //需要等所有filters(brands)設定都完成後才能開始跑回圈將有勾選的設定回來
    if (filtersReady) {
      if (typeForPet) {
        resetCheckBox('typeForPet', typeForPet);
      }

      if (typeForAge) {
        resetCheckBox('typeForAge', typeForAge);
      }

      if (category) {
        resetCheckBox('category', category);
      }

      if (brand) {
        resetCheckBox('brand', brand);
      }

      if (!typeForPet && !typeForAge && !category && !brand) {
        setFilters(copyFilters);
      }
    }

    if (router.query) {
      getData(router.query);
    }
  }, [router.query, filtersReady]);

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
    let copyURL = { page: 1 };
    if (e.key === 'Enter') {
      if (!keyword) {
        copyURL;
      } else {
        const searchText = e.target.value;
        copyURL = { keyword: searchText, ...copyURL };
      }
      router.push(`?${new URLSearchParams(copyURL).toString()}`);
    }
  };

  const searchBarClickHandler = () => {
    router.push(
      `?${new URLSearchParams({
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

  const orderByHandler = (e) => {
    const newSelect = orderByOptions.find((v) => v.key === e.key);
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
  };

  //篩選BOX相關的函式-------------------------------------------------------
  const toggleFilter = () => {
    setShowFilter(!showfilter);
  };

  //進入畫面時將checkbox依據queryString設定勾選狀態;
  const resetCheckBox = (key, str) => {
    const selectedValues = str.split(',');
    const newCheckBox = filters[key].map((v) => {
      if (selectedValues.includes(String(v.value))) {
        return { ...v, checked: true };
      }
      return { ...v, checked: false };
    });
    setFilters((prev) => ({ ...prev, [key]: newCheckBox }));
  };

  //管理checkbox勾選的狀態
  const checkboxToggleHandler = (arr, name, id) => {
    const arrLength = arr.length - 1;
    let countTrue = 0;
    let newFilters = [];

    if (id === '皆可') {
      const prechecked = arr[arr.length - 1].checked;
      newFilters = arr.map((v) => {
        if (!prechecked) {
          return { ...v, checked: true };
        } else return { ...v, checked: false };
      });
    } else {
      newFilters = arr.map((v) => {
        if (v.label === id) {
          return { ...v, checked: !v.checked };
        } else if (v.label === '皆可') {
          return { ...v, checked: false };
        } else return { ...v };
      });
    }
    for (let a of newFilters) {
      if (a.checked) {
        countTrue++;
      }
    }

    if (countTrue === arrLength) {
      newFilters[arrLength].checked = true;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: newFilters,
    }));
  };

  const filterHandler = (
    filters = {},
    priceErrorText1 = '',
    priceErrorText2 = '',
    minPrice = 0,
    maxPrice = 0
  ) => {
    if (!priceErrorText1 && !priceErrorText2) {
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

      const { orderBy, keyword } = router.query;

      let query = {};
      if (orderBy) {
        query.orderBy = orderBy;
      }
      if (keyword) {
        query.keyword = keyword;
      }
      if (minPrice) {
        query.minPrice = minPrice;
      }
      if (maxPrice) {
        query.maxPrice = maxPrice;
      }

      for (const [key, value] of Object.entries(filtersToCheck)) {
        if (value.length > 0) {
          query[key] = value;
        }
      }

      router.push(
        `?${new URLSearchParams({
          ...query,
          page: 1,
        }).toString()}`
      );
    }
  };

  const clearAllFilter = () => {
    setFilters(copyFilters);
    setMinPrice(0);
    setMaxPrice(0);
    setShowErrorMessage1(false);
    setShowErrorMessage2(false);
    setOutlineStatus1('');
    setOutlineStatus2('');
    setPriceErrorText1('');
    setPriceErrorText2('');
    const { keyword } = router.query;
    const query = { page: 1 };
    if (keyword) {
      query.keyword = keyword;
    }
    router.push(
      `?${new URLSearchParams({
        ...query,
      }).toString()}`
    );
  };

  //管理價格條件的input

  const [showErrorMessage1, setShowErrorMessage1] = useState(false);
  const [showErrorMessage2, setShowErrorMessage2] = useState(false);
  const [outlineStatus1, setOutlineStatus1] = useState('');
  const [outlineStatus2, setOutlineStatus2] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceErrorText1, setPriceErrorText1] = useState('');
  const [priceErrorText2, setPriceErrorText2] = useState('');

  const inputCheckHandler = (e, inputType) => {
    let isPass = true;
    let setPriceErrorText = null;
    let setShowErrorMessage = null;
    let setOutlineStatus = null;
    const priceNow = Number(e.target.value);
    if (inputType === 'minPrice') {
      setPriceErrorText = setPriceErrorText1;
      setShowErrorMessage = setShowErrorMessage1;
      setOutlineStatus = setOutlineStatus1;
      if (priceNow && maxPrice && priceNow > maxPrice) {
        setPriceErrorText('不能大於最高金額');
        isPass = false;
      }
    } else if (inputType === 'maxPrice') {
      setPriceErrorText = setPriceErrorText2;
      setShowErrorMessage = setShowErrorMessage2;
      setOutlineStatus = setOutlineStatus2;
      if (priceNow && minPrice && priceNow < minPrice) {
        setPriceErrorText('不能小於最低金額');
        isPass = false;
      }
    }

    if (isNaN(e.target.value)) {
      setPriceErrorText('請輸入數字');
      isPass = false;
    }
    if (e.target.value.includes('.')) {
      setPriceErrorText('請輸入整數');
      isPass = false;
    }
    if (parseInt(priceNow) < 0) {
      setPriceErrorText('金額需大於0');
      isPass = false;
    }
    if (!isPass) {
      setShowErrorMessage(true);
      setOutlineStatus('error');
    }
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
                  changeHandler={checkboxToggleHandler}
                />

                <ProductFilter
                  text="使用年齡:"
                  name="typeForAge"
                  data={filters.typeForAge}
                  changeHandler={checkboxToggleHandler}
                />
                <ProductFilter
                  text="商品類別:"
                  name="category"
                  data={filters.category}
                  changeHandler={checkboxToggleHandler}
                />
                <ProductFilter
                  text="品牌:"
                  name="brand"
                  data={filters.brand}
                  needSpan={false}
                  changeHandler={checkboxToggleHandler}
                />
                <ProductInput
                  errorMessage1={priceErrorText1}
                  errorMessage2={priceErrorText2}
                  showErrorMessage1={showErrorMessage1}
                  showErrorMessage2={showErrorMessage2}
                  outlineStatus1={outlineStatus1}
                  outlineStatus2={outlineStatus2}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  minHandler={(e) => {
                    setOutlineStatus1('');
                    setPriceErrorText1('');
                    setMinPrice(e.target.value);
                  }}
                  maxHandler={(e) => {
                    setOutlineStatus2('');
                    setPriceErrorText2('');
                    setMaxPrice(e.target.value);
                  }}
                  checkHandler={inputCheckHandler}
                />
                <div className={styles.filter_btns}>
                  <SecondaryBtn text="清除" clickHandler={clearAllFilter} />
                  <MainBtn
                    text="搜尋"
                    clickHandler={() => {
                      filterHandler(
                        filters,
                        priceErrorText1,
                        priceErrorText2,
                        minPrice,
                        maxPrice
                      );
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
            onChange={PageChangeHandler}
            onShowSizeChange={PageChangeHandler}
          />
        </ConfigProvider>
      </div>
      {/* </div> */}
    </>
  );
}
