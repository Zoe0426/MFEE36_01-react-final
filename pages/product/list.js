import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/shop.module.css';
import { Pagination, Row, Col, ConfigProvider } from 'antd';
import useLocalStorageJson from '@/hooks/useLocalStorageJson';
import AuthContext from '@/context/AuthContext';
import BreadCrumb from '@/components/ui/bread-crumb/breadcrumb';
import Head from 'next/head';

/*引用的卡片+篩選*/
import Likelist from '@/components/ui/like-list/LikeListDrawer';
import NotFindCard from '@/components/ui/cards/not-find-card';
import ShopLikelistCard from '@/components/ui/cards/shop-like-list-card';
import ShopHistoryCard from '@/components/ui/cards/shop-history-card';
import ShopProductCard from '@/components/ui/cards/shop-product-card';
import ShopTotalPagesRank from '@/components/ui/infos/shop-total-pages_rank';
import ProductFilter from '@/components/ui/shop/product-filter';
import ProductInput from '@/components/ui/shop/product-input';

/*引用的按鈕+modal*/
import IconBtn from '@/components/ui/buttons/IconBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import MainBtn from '@/components/ui/buttons/MainBtn';
import SearchBar from '@/components/ui/buttons/SearchBar1';
// import Modal from '@/components/ui/modal/modal';
import Modal1 from '@/components/ui/modal/modal-without-line';
import ModoalReminder from '@/components/ui/shop/modoal-reminder';

/*引用的背景+icon+圖示*/
import BGUpperDecoration from '@/components/ui/decoration/bg-upper-decoration';
import { faFilter, faHeart } from '@fortawesome/free-solid-svg-icons';

/*引入資料*/
import filterDatas from '@/data/product/filters.json';
import orderByOptions from '@/data/product/orderby.json';

export default function List() {
  const router = useRouter();
  const [localStorageHistory, setLocalStorageHistory] = useLocalStorageJson(
    'petProductHistory',
    [],
    true
  );

  const { auth, setAuth } = useContext(AuthContext);
  const [first, setFirst] = useState(false);
  const [datas, setDatas] = useState({
    totalRows: 0,
    perPage: 16,
    totalPages: 0,
    page: 1,
    rows: [],
  });

  const [addLikeList, setAddLikeList] = useState([]);
  const [isClickingLike, setIsClickingLike] = useState(false);
  const [likeDatas, setLikeDatas] = useState([]);
  const [showLikeList, setShowLikeList] = useState(false);
  //商品卡是否顯示總銷售數的tag
  const [showFlag, setShowFlag] = useState(false);

  //換頁時要用的-類別/關鍵字/頁碼/排序/麵包屑
  const [breadCrubText, setBreadCrubText] = useState([
    {
      id: 'shop',
      text: '商城',
      href: `${process.env.WEB}/product`,
      show: true,
    },
    { id: 'search', text: '> 商品列表', href: '', show: true },
    { id: 'pid', text: '', href: '', show: false },
  ]);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [orderBy, setOrderBy] = useState('-- 請選擇 --');
  const [keyword, setKeyword] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [keywordDatas, setKeywordDatats] = useState([]);
  const [showKeywordDatas, setShowKeywordDatas] = useState(false);
  const [showfilter, setShowFilter] = useState(false);
  const [filtersReady, setFiltersReady] = useState(false);
  const [filters, setFilters] = useState(filterDatas);
  const [copyFilters, setCopyFilters] = useState([]);
  const [selectedCheckBox, setSelectedCheckBox] = useState([]);

  //管理價格條件的input
  const [showErrorMessage1, setShowErrorMessage1] = useState(false);
  const [showErrorMessage2, setShowErrorMessage2] = useState(false);
  const [outlineStatus1, setOutlineStatus1] = useState('');
  const [outlineStatus2, setOutlineStatus2] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceErrorText1, setPriceErrorText1] = useState('');
  const [priceErrorText2, setPriceErrorText2] = useState('');

  const getData = async (obj = {}, token = '') => {
    try {
      const usp = new URLSearchParams(obj);
      const res = await fetch(
        `${process.env.API_SERVER}/shop-api/products?${usp.toString()}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      const data = await res.json();

      if (Array.isArray(data.rows)) {
        setDatas(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBrandKeywordData = async () => {
    try {
      const res = await fetch(
        `${process.env.API_SERVER}/shop-api/search-brand-list`,
        {
          method: 'GET',
        }
      );
      const data = await res.json();

      if (Array.isArray(data.brand)) {
        const newBrand = data.brand.map((v) => {
          return { ...v, checked: false };
        });

        setFilters({ ...filters, brand: newBrand });
        setCopyFilters(
          JSON.parse(JSON.stringify({ ...filters, brand: newBrand }))
        );
        const newKeywords = data.keywords.map((v) => {
          return { name: v, count: 0 };
        });
        setKeywordDatats(newKeywords);
        setFiltersReady(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrandKeywordData().then(() => {
      const { category, brand } = router.query;
      if (category) {
        resetCheckBox('category', category);
      } else if (brand) {
        if (filtersReady) {
          resetCheckBox('brand', brand);
        }
      } else {
        setFirst(true);
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
      setShowFlag(false);
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
      let newSelectedCheckBox = {
        typeForPet: [],
        typeForAge: [],
        category: [],
      };
      const newBreadCrubText = breadCrubText.map((v) => {
        if (v.id === 'search') {
          return { ...v, text: `> 商品列表` };
        } else return { ...v };
      });
      setBreadCrubText(newBreadCrubText);

      if (typeForPet) {
        resetCheckBox('typeForPet', typeForPet);
        const newArr = typeForPet.split(',');
        newSelectedCheckBox = { ...newSelectedCheckBox, typeForPet: newArr };
      }

      if (typeForAge) {
        resetCheckBox('typeForAge', typeForAge);
        const newArr = typeForAge.split(',');
        newSelectedCheckBox = { ...newSelectedCheckBox, typeForAge: newArr };
      }

      if (category) {
        resetCheckBox('category', category);
        const newArr = category.split(',');
        if (newArr.length === 1) {
          const selctCategory = filters.category.find(
            (v) => v.value === category
          );
          const newBreadCrubText = breadCrubText.map((v) => {
            if (v.id === 'search') {
              return { ...v, text: `> ${selctCategory.label}列表` };
            } else return { ...v };
          });
          setBreadCrubText(newBreadCrubText);
        }
        newSelectedCheckBox = {
          ...newSelectedCheckBox,
          category: newArr,
        };
      }

      if (brand) {
        resetCheckBox('brand', brand);
      }

      if (!typeForPet && !typeForAge && !category && !brand) {
        setFilters(copyFilters);
      }

      setSelectedCheckBox(newSelectedCheckBox);
    }

    if (filtersReady || first) {
      if (auth.token) {
        getData(router.query, auth.token);
      } else {
        getData(router.query);
      }
    }

    // if (filtersReady && auth.token && first) {
    //   setMemberJWT(auth.token);
    //   getData(router.query, memberJWT);
    // }
  }, [router.query, filtersReady, first]);

  const brandFilterBySelected = (brands, obj) => {
    let newBrand = JSON.parse(JSON.stringify(brands));
    if (obj.typeForPet.length > 0) {
      newBrand = newBrand.filter((v1) => {
        return v1.typeForPet.some((s) => obj.typeForPet.includes(s));
      });
    }
    if (obj.typeForAge.length > 0) {
      newBrand = newBrand.filter((v1) => {
        return v1.typeForAge.some((s) => obj.typeForAge.includes(s));
      });
    }

    if (obj.category.length > 0) {
      newBrand = newBrand.filter((v1) => {
        return v1.category.some((s) => obj.category.includes(s));
      });
    }

    if (
      obj.typeForPet.length === 0 &&
      obj.typeForAge.length === 0 &&
      obj.category.length === 0
    ) {
      newBrand = brands;
    }
    return newBrand;
  };

  //監看點擊愛心收藏的相關控制
  useEffect(() => {
    if (!isClickingLike && addLikeList.length > 0) {
      sendLikeList(addLikeList, auth.token).then(() => {
        //在成功送資料到後端後重置addLikeList
        setAddLikeList([]);
      });
    }
  }, [isClickingLike, addLikeList]);

  //若未登入會員而點擊收藏，要跳轉至會員登入
  const toSingIn = () => {
    const from = router.query;
    router.push(
      `/member/sign-in?from=${
        process.env.WEB
      }/product/list?${new URLSearchParams(from).toString()}`
    );
  };

  //卡片愛心收藏的相關函式-------------------------------------------------------
  const clickHeartHandler = (id) => {
    setIsClickingLike(true);
    const timeClick = new Date().getTime();
    const newData = datas.rows.map((v) => {
      if (v.product_sid === id) {
        const insideInLikeList = addLikeList.find(
          (item) => item.product_sid === id
        );
        if (insideInLikeList) {
          setAddLikeList((preV) => preV.filter((v2) => v2.product_sid !== id));
        } else {
          setAddLikeList((preV) => [
            ...preV,
            { product_sid: id, time: timeClick },
          ]);
        }
        return { ...v, like: !v.like };
      } else return { ...v };
    });
    setDatas({ ...datas, rows: newData });
    setTimeout(() => {
      setIsClickingLike(false);
    }, 1500);
  };

  //將資料送到後端
  const sendLikeList = async (arr, token = '') => {
    try {
      const res = await fetch(
        `${process.env.API_SERVER}/shop-api/handle-like-list`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: arr }),
        }
      );
      const data = await res.json();

      if (data.success) {
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //收藏列表相關的函式-------------------------------------------------------
  //取得蒐藏列表資料
  const getLikeList = async (token = '') => {
    try {
      const res = await fetch(
        `${process.env.API_SERVER}/shop-api/show-like-list`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      const data = await res.json();

      // if (data.likeDatas.length > 0) {
        setLikeDatas(data.likeDatas);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  //控制展開收藏列表
  const toggleLikeList = () => {
    const newShowLikeList = !showLikeList;
    setShowLikeList(newShowLikeList);
    if (newShowLikeList) {
      document.body.classList.add('likeList-open');
      getLikeList(auth.token);
    } else {
      document.body.classList.remove('likeList-open');
    }
  };

  const closeLikeList = () => {
    setShowLikeList(false);
    document.body.classList.remove('likeList-open');
  };

  // 刪除所有收藏
  const removeAllLikeList = (token) => {
    if (likeDatas.length > 0) {
      //將列表顯示為空的
      setLikeDatas([]);
      //將畫面上的愛心清除
      const newData = datas.rows.map((v) => {
        return { ...v, like: false };
      });
      setDatas({ ...datas, rows: newData });
      //將請求送到後端作業
      removeLikeListToDB('all', token);
    }
  };

  // 刪除單一收藏
  const removeLikeListItem = (pid, token = '') => {
    //將列表該項目刪除
    const newLikeList = likeDatas.filter((arr) => {
      return arr.product_sid !== pid;
    });
    setLikeDatas(newLikeList);
    //將若取消的為畫面上的，則須將愛心清除
    const newData = datas.rows.map((v) => {
      if (v.product_sid === pid) {
        return { ...v, like: false };
      } else {
        return { ...v };
      }
    });
    setDatas({ ...datas, rows: newData });
    //將請求送到後端作業
    removeLikeListToDB(pid, token);
  };

  //將刪除收藏的請求送到後端作業
  const removeLikeListToDB = async (pid = '', token = '') => {
    try {
      const removeAll = await fetch(
        `${process.env.API_SERVER}/shop-api/likelist/${pid}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      const result = await removeAll.json();
      // console.log(JSON.stringify(result, null, 4));
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
    let copyURL = { page: 1 };
    const searchText = e.target.value;

    if (!searchText) {
      const newKeywordDatas = [...keywordDatas];
      setShowKeywordDatas(false);
      setKeywordDatats(newKeywordDatas);
    }

    if (e.key === 'Enter') {
      setShowKeywordDatas(false);
      if (!keyword) {
        copyURL;
      } else {
        copyURL = { keyword: searchText, ...copyURL };
      }
      router.push(`?${new URLSearchParams(copyURL).toString()}`);
    }
  };

  const searchBarClickHandler = (keyword = '') => {
    let obj = { page: 1 };

    if (keyword) {
      obj.keyword = keyword;
    }
    router.push(`?${new URLSearchParams(obj).toString()}`);
  };

  const autocompleteHandler = (selectkeyword) => {
    setKeyword(selectkeyword);
    setShowKeywordDatas(false);
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

  //設定目前被check的類別有那些
  const brandDisplayHandler = (obj = {}, name, id, prechecked = false) => {
    if (name !== 'brand') {
      const insideSelected = obj[name].includes(id);
      if (insideSelected) {
        const newBrandList = obj[name].filter((v) => v !== id);
        setSelectedCheckBox({ ...obj, [name]: newBrandList });
      } else {
        if (id === 'both') {
          if (prechecked) {
            setSelectedCheckBox({ ...obj, [name]: [] });
          } else {
            setSelectedCheckBox({ ...obj, [name]: ['cat', 'dog'] });
          }
        } else if (id === 'all') {
          if (prechecked) {
            setSelectedCheckBox({ ...obj, [name]: [] });
          } else {
            setSelectedCheckBox({
              ...obj,
              [name]: ['younger', 'adult', 'elder'],
            });
          }
        } else {
          obj[name].push(id);
          setSelectedCheckBox({ ...obj });
        }
      }
    }
  };

  //管理checkbox勾選的狀態
  const checkboxToggleHandler = (arr, name, id) => {
    let newBrand = filters.brand;
    if (name === 'brand') {
      arr = newBrand;
    } else {
      newBrand = newBrand.map((v) => ({ ...v, checked: false }));
    }
    const arrLength = arr.length - 1;
    let countTrue = 0;
    let newFilters = [];

    if (id === '皆可') {
      const prechecked = arr[arr.length - 1].checked;
      brandDisplayHandler(
        selectedCheckBox,
        name,
        arr[arr.length - 1].value,
        prechecked
      );
      newFilters = arr.map((v) => {
        if (!prechecked) {
          return { ...v, checked: true };
        } else return { ...v, checked: false };
      });
    } else {
      newFilters = arr.map((v) => {
        if (v.label === id) {
          brandDisplayHandler(selectedCheckBox, name, v.value);
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

    if (
      (name === 'typeForPet' || name === 'typeForAge') &&
      countTrue === arrLength
    ) {
      newFilters[arrLength].checked = true;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      brand: newBrand,
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
    setTimeout(toggleFilter, 30);
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
    } else if (inputType === 'maxPrice') {
      setPriceErrorText = setPriceErrorText2;
      setShowErrorMessage = setShowErrorMessage2;
      setOutlineStatus = setOutlineStatus2;
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

  //刪除瀏覽紀錄相關函式-----------
  const clearHistoryViews = () => {
    setLocalStorageHistory([]);
    localStorage.removeItem('petProductHistory');
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
            <SearchBar
              keywordDatas={filterKeywordDatas(keywordDatas, keyword, isTyping)}
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
              clickHandler={() => {
                searchBarClickHandler(keyword);
              }}
              autocompleteHandler={autocompleteHandler}
              showKeywordDatas={showKeywordDatas}
              blurHandler={() => {
                setTimeout(() => {
                  setShowKeywordDatas(false);
                }, 200);
              }}
              clearHandler={() => {
                setKeyword('');
                searchBarClickHandler();
              }}
            />
          </div>
          <div className={styles.nav_head_list}>
            <BreadCrumb breadCrubText={breadCrubText} />
            <div className={styles.btns}>
              {auth.token ? (
                <IconBtn
                  icon={faHeart}
                  text={'收藏列表'}
                  clickHandler={toggleLikeList}
                />
              ) : (
                <Modal1
                  btnType="iconBtn"
                  btnText="收藏列表"
                  title="貼心提醒"
                  content={<ModoalReminder text="登入，才能看收藏列表喔~" />}
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
            {showLikeList && (
              <Likelist
                datas={likeDatas}
                customCard={
                  <ShopLikelistCard
                    datas={likeDatas}
                    token={auth.token}
                    removeLikeListItem={removeLikeListItem}
                    closeLikeList={closeLikeList}
                  />
                }
                closeHandler={toggleLikeList}
                removeAllHandler={() => {
                  removeAllLikeList(auth.token);
                }}
              />
            )}
          </div>
          <div className={styles.filter_box}>
            {showfilter && (
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
                  data={brandFilterBySelected(filters.brand, selectedCheckBox)}
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
          totalItems={datas.totalRows}
          onRankChange={orderByHandler}
          orderBy={orderBy}
          items={orderByOptions}
          searchText={breadCrubText}
        />
        {datas.rows.length > 0 ? (
          <Row gutter={[32, 36]} className={styles.cards_list}>
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
                      tag_display={showFlag}
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
        {datas.rows.length > 0 && (
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
}
