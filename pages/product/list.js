/*
 * coding style 引用順序
 * 1. 原生react套件
 * 2. 第三方套件
 * 3. 自定義context
 * 4. 自定義hook
 * 5. 自定義元件
 * 6. JSON + CSS
 */

import { useState, useEffect, useContext, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Pagination, Row, Col, ConfigProvider } from 'antd';
import { faFilter, faHeart } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '@/context/AuthContext';
import useLocalStorageJson from '@/hooks/useLocalStorageJson';
import {
  getProductListApi,
  getSearchBrandListApi,
  getLikeListApi,
  postLikeListApi,
  deleteLikeListApi,
} from '@/utils/api/shop/list';
import makeSearchParamsMethod from '@/utils/methods/makeSearchParamsMethod';

import BreadCrumb from '@/components/ui/bread-crumb/breadcrumb';
import BgUpperDecoration from '@/components/ui/decoration/bg-upper-decoration';
import IconBtn from '@/components/ui/buttons/IconBtn';
import LikeListDrawer from '@/components/ui/like-list/LikeListDrawer';
import MainBtn from '@/components/ui/buttons/MainBtn';
import ModalReminder from '@/components/ui/shop/modal-reminder';
import ModalWithoutLine from '@/components/ui/modal/modal-without-line';
import NotFindCard from '@/components/ui/cards/not-find-card';
import ProductFilter from '@/components/ui/shop/product-filter';
import ProductInput from '@/components/ui/shop/product-input';
import SearchBarWithAutocomplete from '@/components/ui/buttons/SearchBarWithAutocomplete';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import ShopHistoryCard from '@/components/ui/cards/shop-history-card';
import ShopLikeListCard from '@/components/ui/cards/shop-like-list-card';
import ShopProductCard from '@/components/ui/cards/shop-product-card';
import ShopTotalPagesRank from '@/components/ui/infos/shop-total-pages_rank';

import styles from '@/styles/shop.module.css';

import filterDatas from '@/data/product/filters.json';
import orderByOptions from '@/data/product/orderByOptions.json';

const BASE_URL = process.env.WEB || 'http://localhost:3000';
const LOCALSTORAGE_SHOP_VIEW_HISTORY = 'petProductHistory';

const initialTableDataState = {
  totalRows: 0,
  perPage: 16,
  totalPages: 0,
  page: 1,
  rows: [],
};

const initialBreadcrumbState = [
  {
    id: 'shop',
    text: '商城',
    href: `${BASE_URL}/product`,
    show: true,
  },
  { id: 'search', text: '> 商品列表', href: '', show: true },
  { id: 'pid', text: '', href: '', show: false },
];

const initialPriceInputState = [
  { key: 'minPrice', value: 0, placeholder: '$ 最小金額', errorMessage: '' },
  { key: 'maxPrice', value: 0, placeholder: '$ 最大金額', errorMessage: '' },
];

const List = () => {
  /* 元件內的引用順序
   * 1. 常數宣告
   * 2. router宣告
   * 3. context宣告
   * 4. state宣告
   * 5. 客製hook宣告
   * 6. 函式宣告
   * 7. useEffect
   * 8. return
   */

  const router = useRouter();
  const filterInitialRef = useRef(filterDatas);

  const { auth } = useContext(AuthContext);

  const [addLikeList, setAddLikeList] = useState([]);
  const [breadCrumbs, setBreadCrumbs] = useState(initialBreadcrumbState);
  const [filters, setFilters] = useState(filterDatas);
  const [first, setFirst] = useState(false);
  const [isClickingLike, setIsClickingLike] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowKeywordDatas, setIsShowKeywordDatas] = useState(false);
  const [isShowLikeList, setIsShowLikeList] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [keywordDatas, setKeywordDatas] = useState([]);
  const [likeDatas, setLikeDatas] = useState([]);
  const [orderBy, setOrderBy] = useState(orderByOptions.DEFAULT);
  const [priceInputs, setPriceInputs] = useState(initialPriceInputState);
  const [tableData, setTableData] = useState(initialTableDataState);

  const [localStorageHistory, setLocalStorageHistory] = useLocalStorageJson(
    LOCALSTORAGE_SHOP_VIEW_HISTORY,
    [],
    true
  );

  // TODO: 將URLSearchParams拆成function，token要用客製化的hook取得
  const getData = async (urlParams = {}, token = '') => {
    const data = await getProductListApi(urlParams, token);
    if (!data.rows.length) return;
    setTableData((pre) => ({ ...data }));
  };

  // 取品牌與關鍵字的資料，並再進行一些加工並存放在ref中，以便後續需要設定成預設值
  const getBrandKeywordData = async () => {
    const data = await getSearchBrandListApi();
    const { brand, keywords } = data;

    if (brand) {
      const newBrand = brand.map((brand) => ({ ...brand, checked: false }));
      filterInitialRef.current.brand = newBrand;
      setFilters({ ...filters, brand: newBrand });
    }

    if (keywords) {
      const newKeywords = keywords.map((keyword) => ({
        name: keyword,
        count: 0,
      }));
      setKeywordDatas(newKeywords);
    }
  };

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      if (!first) {
        await getBrandKeywordData();
        setFirst(true);
      }

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
      const orderByUpperCase = orderBy ? orderBy.toUpperCase() : 'DEFAULT';
      setOrderBy(orderByOptions[orderByUpperCase]);

      const prices = { minPrice, maxPrice };
      setPriceInputs((prev) =>
        prev.map((input) => ({ ...input, value: prices[input.key] || 0 }))
      );

      const queryFilters = {
        typeForPet,
        typeForAge,
        category,
        brand,
      };

      let newSelectedCheckBoxGroup = Object.keys(queryFilters).reduce(
        (acc, key) => {
          if (!queryFilters[key]) return acc;

          const selectOptions = queryFilters[key].split(',');
          return { ...acc, [key]: selectOptions };
        },
        {}
      );

      let newFilter = Object.keys(filters).reduce((acc, key) => {
        if (!newSelectedCheckBoxGroup[key])
          return { ...acc, [key]: filterInitialRef.current[key] };

        const updatedFilters = filters[key].map((filter) => {
          const isChecked = newSelectedCheckBoxGroup[key].includes(
            String(filter.value)
          );
          return {
            ...filter,
            checked: isChecked,
          };
        });
        return { ...acc, [key]: updatedFilters };
      }, {});

      const newBreadCrumbs = initialBreadcrumbState.map((breadCrumb) => {
        const { id } = breadCrumb;
        const { category } = filters;
        const selectCategories = category?.filter((categoryValues) =>
          newSelectedCheckBoxGroup?.category?.includes(
            String(categoryValues.value)
          )
        );

        if (id === 'search' && selectCategories.length === 1) {
          return { ...breadCrumb, text: `> ${selectCategories[0].label}列表` };
        } else return { ...breadCrumb };
      });

      setBreadCrumbs(newBreadCrumbs);
      setFilters(newFilter);

      await getData(router.query, auth.token);
    };

    fetchDataAndSetState();
  }, [router.query]);

  //監看點擊愛心收藏的相關控制
  useEffect(() => {
    if (isClickingLike || addLikeList.length === 0) return;
    sendLikeListToDB(addLikeList, auth.token);
  }, [isClickingLike, addLikeList]);

  //若未登入會員而點擊收藏，要跳轉至會員登入
  const toSingIn = () => {
    const url = `/member/sign-in?from=${BASE_URL}${router.asPath}}`;
    router.push(url);
  };

  // 處理導向其他頁面的函式-------------------------------------------------------
  const toOtherUrl = (params) => {
    const query = { page: 1, perPage: tableData.perPage, ...params };
    const url = makeSearchParamsMethod(query);
    router.push(url);
  };

  //卡片愛心收藏的相關函式-------------------------------------------------------
  const updateAddLikeList = (id, timeClick, addLikeList) => {
    const isInsideTempAddLikeList = addLikeList.find(
      ({ product_sid }) => product_sid === id
    );

    return isInsideTempAddLikeList
      ? addLikeList.filter(({ product_sid }) => product_sid !== id)
      : [...addLikeList, { product_sid: id, time: timeClick }];
  };

  const updateRowLikeStatus = (rows, id) => {
    return rows.map((row) => {
      const { product_sid, like } = row;
      if (product_sid !== id) return { ...row };
      return { ...row, like: !like };
    });
  };

  const clickHeartHandler = (id) => {
    const { rows } = tableData;
    setIsClickingLike(true);
    const timeClick = new Date().getTime();

    const newAddLikeList = updateAddLikeList(id, timeClick, addLikeList);
    setAddLikeList(newAddLikeList);

    const newData = updateRowLikeStatus(rows, id);
    setTableData({ ...tableData, rows: newData });

    setTimeout(() => {
      setIsClickingLike(false);
    }, 1500);
  };

  const sendLikeListToDB = async (likeList, token = '') => {
    await postLikeListApi(likeList, token);
    setAddLikeList([]);
  };

  //收藏列表相關的函式-------------------------------------------------------
  const getLikeListData = async (token = '') => {
    const { likeDatas } = await getLikeListApi(token);
    setLikeDatas(likeDatas);
  };

  const toggleLikeListDrawer = () => {
    const newShowLikeList = !isShowLikeList;
    if (newShowLikeList) {
      getLikeListData(auth.token);
    }

    document.body.classList.toggle('likeList-open');
    setIsShowLikeList(newShowLikeList);
  };

  const removeAllLikeList = async (token) => {
    if (likeDatas.length <= 0) return;

    const { rows } = tableData;
    const newData = rows.map((v) => ({ ...v, like: false }));

    await removeLikeListToDB('all', token); //將請求送到後端作業
    setLikeDatas([]); //將列表顯示為空的
    setTableData({ ...tableData, rows: newData }); //將畫面上的愛心清除
    toggleLikeListDrawer();
  };

  const removeSingleLike = (id, token = '') => {
    const { rows } = tableData;

    const newLikeList = likeDatas.filter(
      ({ product_sid }) => product_sid !== id
    ); //將列表該項目刪除
    setLikeDatas(newLikeList);

    const newData = updateRowLikeStatus(rows, id); //取消畫面上的愛心
    setTableData({ ...tableData, rows: newData });

    removeLikeListToDB(id, token);
  };

  const removeLikeListToDB = async (pid = '', token = '') => {
    await deleteLikeListApi(pid, token);
  };

  //searchBar相關的函式-------------------------------------------------------
  const filterKeywordDatas = (datas, keyword, keyin) => {
    datas = datas
      .map((v) => ({ ...v, count: 0 }))
      .sort((a, b) => a.name.localeCompare(b.name, 'zh-Hant'));
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
      setIsShowKeywordDatas(false);
    }

    if (e.key === 'Enter') {
      setIsShowKeywordDatas(false);
      searchBarClickHandler(searchText);
    }
  };

  const searchBarClickHandler = (keyword = '') => {
    const url = keyword ? { keyword } : {};
    toOtherUrl({ ...url });
  };

  const autocompleteHandler = (selectkeyword) => {
    setKeyword(selectkeyword);
    setIsShowKeywordDatas(false);
  };

  //Pagination相關的函式-------------------------------------------------------
  const PageChangeHandler = (page, perPage) => {
    toOtherUrl({ ...router.query, page, perPage });
  };

  //排序相關的函式-------------------------------------------------------
  const orderByHandler = (e) => {
    const selectOrderBy = e.key;
    setOrderBy(orderByOptions[selectOrderBy]);
    toOtherUrl({ ...router.query, page: 1, orderBy: selectOrderBy });
  };

  //篩選BOX相關的函式-------------------------------------------------------
  const toggleFilter = () => {
    setIsShowFilter((preShowFilter) => !preShowFilter);
  };

  const filterHandler = (filters = {}, priceInputs = []) => {
    const isPriceError = priceInputs.some((input) => input.errorMessage);
    if (isPriceError) return;

    const query = router.query;
    const allSelectCheckboxOptions = getAllSelectedCheckboxOptions(filters);

    let newQuery = Object.keys(query).reduce((acc, key) => {
      if (!query[key]) return acc;
      return { ...acc, [key]: query[key] };
    }, {});

    newQuery = Object.keys(allSelectCheckboxOptions).reduce((acc, filter) => {
      if (!allSelectCheckboxOptions[filter].length) return acc;
      return { ...acc, [filter]: allSelectCheckboxOptions[filter].join(',') };
    }, newQuery);

    newQuery = priceInputs.reduce((acc, input) => {
      if (!input.value) return acc;
      return { ...acc, [input.key]: input.value };
    }, newQuery);

    toOtherUrl({ ...newQuery, page: 1 });
  };

  const clearAllFilter = () => {
    setFilters(filterInitialRef.current);
    setPriceInputs(initialPriceInputState);
    setTimeout(toggleFilter, 30);

    const { keyword } = router.query;
    const url = keyword ? { keyword } : {};
    toOtherUrl({ page: 1, ...url });
  };

  //checkbox相關的函式-------------------------------------------------------
  const toggleAllCheckboxes = (checkboxes, isChecked) => {
    return checkboxes.map((option) => ({
      ...option,
      checked: isChecked,
    }));
  };

  const toggleSingleCheckbox = (checkboxes, id) => {
    return checkboxes.map((option) => {
      const { label, checked } = option;
      if (label !== id) return { ...option };
      return { ...option, checked: !checked };
    });
  };

  const updateAllSelectedCheckbox = (checkboxes) => {
    const hasAllSelectedOption = checkboxes.some(
      (option) => option.label === '皆可'
    );

    if (hasAllSelectedOption) {
      const isAllSelected = checkboxes
        .filter((option) => option.label !== '皆可')
        .every((option) => option.checked);

      checkboxes[checkboxes.length - 1].checked = isAllSelected;
    }

    return checkboxes;
  };

  const checkBrandIncludeType = (brandTypeOptions, selectOptions) => {
    if (selectOptions.length === 0) return true;
    return brandTypeOptions.some((type) => selectOptions.includes(type));
  };

  const getAllSelectedCheckboxOptions = (filters) => {
    return Object.keys(filters).reduce((acc, filterName) => {
      return {
        ...acc,
        [filterName]: filters[filterName]
          .filter((option) => option.checked)
          .map((option) => option.value),
      };
    }, {});
  };

  const brandFilterBySelected = (filters) => {
    const { brand } = filters;
    const allSelectCheckboxOptions = getAllSelectedCheckboxOptions(filters);

    const newBrandCheckbox = brand.filter((brandOption) => {
      const { typeForPet, typeForAge, category } = brandOption;
      const isTypeForPet = checkBrandIncludeType(
        typeForPet,
        allSelectCheckboxOptions.typeForPet
      );
      const isTypeForAge = checkBrandIncludeType(
        typeForAge,
        allSelectCheckboxOptions.typeForAge
      );
      const isCategory = checkBrandIncludeType(
        category,
        allSelectCheckboxOptions.category
      );
      return isTypeForPet && isTypeForAge && isCategory;
    });

    return newBrandCheckbox;
  };

  const checkboxToggleHandler = (name, id) => {
    let newFilters = filters[name];
    const checkboxQty = newFilters.length;

    if (id === '皆可') {
      const isPreChecked = newFilters[checkboxQty - 1].checked;
      newFilters = toggleAllCheckboxes(newFilters, !isPreChecked);
    } else {
      newFilters = toggleSingleCheckbox(newFilters, id);
      newFilters = updateAllSelectedCheckbox(newFilters);
    }

    const updateFilterOptions = { [name]: newFilters };

    if (name !== 'brand') {
      const { brand } = filters;
      const newBrandFilter = toggleAllCheckboxes(brand, false);
      updateFilterOptions.brand = newBrandFilter;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      ...updateFilterOptions,
    }));
  };

  //處理價格輸入框相關函式-----------
  const inputChangeHandler = (e, inputType) => {
    const priceValue = Number(e.target.value);
    const newPriceInputs = priceInputs.map((input) => {
      if (input.key === inputType) {
        return { ...input, value: priceValue };
      } else return { ...input };
    });
    setPriceInputs(newPriceInputs);
  };

  const inputCheckHandler = (e, inputType) => {
    const priceValue = e.target.value;
    let errorMessage = '';

    if (isNaN(priceValue)) {
      errorMessage = '請輸入數字';
    }

    if (priceValue.includes('.')) {
      errorMessage = '請輸入整數';
    }

    if (parseInt(priceValue) < 0) {
      errorMessage = '金額需大於0';
    }

    const newPriceInputs = priceInputs.map((input) => {
      if (input.key === inputType) {
        return { ...input, errorMessage: errorMessage };
      } else return { ...input };
    });
    setPriceInputs(newPriceInputs);
  };

  //刪除瀏覽紀錄相關函式-----------
  const clearHistoryViews = () => {
    setLocalStorageHistory([]);
    localStorage.removeItem(LOCALSTORAGE_SHOP_VIEW_HISTORY);
  };

  return (
    <>
      <Head>
        <title>狗with咪 | 商城</title>
      </Head>
      {/* <div className="container-outer"> */}
      <div className={styles.bgc_lightBrown}>
        <nav className="container-inner">
          <div className={styles.search_bar}>
            <SearchBarWithAutocomplete
              keywordDatas={filterKeywordDatas(keywordDatas, keyword, isTyping)}
              placeholder="搜尋你愛的東西"
              btn_text="尋找商品"
              inputText={keyword}
              changeHandler={(e) => {
                setKeyword(e.target.value);
                setIsShowKeywordDatas(true);
                setIsTyping(true);
                setTimeout(() => {
                  setIsTyping(false);
                }, 700);
              }}
              keyDownHandler={searchBarHandler}
              clickHandler={() => {
                searchBarClickHandler(keyword);
              }}
              autocompleteHandler={autocompleteHandler}
              showKeywordDatas={isShowKeywordDatas}
              blurHandler={() => {
                setTimeout(() => {
                  setIsShowKeywordDatas(false);
                }, 200);
              }}
              clearHandler={() => {
                setKeyword('');
                searchBarClickHandler();
              }}
            />
          </div>
          <div className={styles.nav_head_list}>
            <BreadCrumb breadCrubText={breadCrumbs} />
            <div className={styles.btns}>
              {auth.token ? (
                <IconBtn
                  icon={faHeart}
                  text={'收藏列表'}
                  clickHandler={toggleLikeListDrawer}
                />
              ) : (
                <ModalWithoutLine
                  btnType="iconBtn"
                  btnText="收藏列表"
                  title="貼心提醒"
                  content={<ModalReminder text="登入，才能看收藏列表喔~" />}
                  mainBtnText="前往登入"
                  subBtnText="暫時不要"
                  confirmHandler={toSingIn}
                  icon={faHeart}
                />
              )}
              <IconBtn
                icon={faFilter}
                text={'進階篩選'}
                clickHandler={toggleFilter}
              />
            </div>
          </div>
          <div className="like">
            {isShowLikeList && (
              <LikeListDrawer
                datas={likeDatas}
                customCard={
                  <ShopLikeListCard
                    datas={likeDatas}
                    token={auth.token}
                    removeLikeListItem={removeSingleLike}
                    closeLikeList={toggleLikeListDrawer}
                  />
                }
                closeHandler={toggleLikeListDrawer}
                removeAllHandler={() => {
                  removeAllLikeList(auth.token);
                }}
              />
            )}
          </div>
          <div className={styles.filter_box}>
            {isShowFilter && (
              <>
                <ProductFilter
                  text="適用對象"
                  name="typeForPet"
                  data={filters.typeForPet}
                  changeHandler={checkboxToggleHandler}
                />
                <ProductFilter
                  text="使用年齡"
                  name="typeForAge"
                  data={filters.typeForAge}
                  changeHandler={checkboxToggleHandler}
                />
                <ProductFilter
                  text="商品類別"
                  name="category"
                  data={filters.category}
                  changeHandler={checkboxToggleHandler}
                />
                <ProductFilter
                  text="品牌"
                  name="brand"
                  data={brandFilterBySelected(filters)}
                  needSpan={false}
                  changeHandler={checkboxToggleHandler}
                />
                <ProductInput
                  inputs={priceInputs}
                  changeHandler={inputChangeHandler}
                  checkHandler={inputCheckHandler}
                />
                <div className={styles.filter_btns}>
                  <SecondaryBtn text="清除" clickHandler={clearAllFilter} />
                  <MainBtn
                    text="搜尋"
                    clickHandler={() => {
                      filterHandler(filters, priceInputs);
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
      <BgUpperDecoration />
      <div className="container-outer">
        {localStorageHistory.length > 0 && (
          <ShopHistoryCard
            data={localStorageHistory}
            clearAllHandler={clearHistoryViews}
          />
        )}
      </div>
      {/* </div> */}
      {/* <div className="container-outer"> */}
      <main className="container-inner">
        <ShopTotalPagesRank
          totalItems={tableData.totalRows}
          onRankChange={orderByHandler}
          orderBy={orderBy?.label}
          items={Object.values(orderByOptions)}
          searchText={breadCrumbs}
        />
        {tableData?.rows?.length > 0 ? (
          <Row gutter={[32, 36]} className={styles.cards_list}>
            {tableData.rows &&
              tableData.rows.map((v) => {
                const {
                  product_sid,
                  name,
                  img,
                  max_price,
                  min_price,
                  avg_rating,
                  sales_qty,
                  like,
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
                      tag_display={
                        orderBy?.key === orderByOptions.SALES_DESC.key
                      }
                      sales_qty={sales_qty}
                      like={like}
                      token={auth.token}
                      clickHandler={() => {
                        clickHeartHandler(product_sid);
                      }}
                      singinHandler={toSingIn}
                    />
                  </Col>
                );
              })}
          </Row>
        ) : (
          <NotFindCard textForCat="非常抱歉!" textForDog="沒有找到相關商品!" />
        )}
      </main>
      <div className={styles.pagination}>
        {tableData.rows.length > 0 && (
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
              current={tableData.page}
              total={tableData.totalRows}
              pageSize={tableData.perPage}
              showSizeChanger
              pageSizeOptions={[16, 32, 64]}
              onChange={PageChangeHandler}
              onShowSizeChange={PageChangeHandler}
            />
          </ConfigProvider>
        )}
      </div>
      {/* </div> */}
    </>
  );
};

export default List;
