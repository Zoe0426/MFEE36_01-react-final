import React, { useContext, useState, useEffect } from 'react';
import Style from './postcollection.module.css';
import BlogBanner from '@/components/ui/blogBanner/blogBanner';
import { Col, Row, Pagination} from 'antd';
import BlogSidebar from '@/components/ui/blogSidebar/blogSidebar';
import BlogNav from '@/components/ui/blogNav/blogNav';
import PostCard from '@/components/ui/PostCard/postCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function BlogIndex() {
  // const [data, setData] = useState({
  //   totalRows: 0,
  //   perPage: 15,
  //   totalPages: 0,
  //   page: 1,
  //   rows: [], // 使用 rows 屬性來存放資料陣列
  // });
    // router
  const router = useRouter();
  const [postNum, setPostNum] = useState(0); // 新增文章數量的 state
  //分頁
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

    //關鍵字
    const [keyword, setKeyword] = useState('');
    //關鍵字動作
    const getSearchbarValue = (e) => {
      setKeyword(e.target.value);
      console.log('e.target.value',e.target.value);
    }
    const keyEnter = (e) =>{
      if(e.key === 'Enter'){
        console.log('enter');
        getSearchData();
      }
      console.log(e);
    }
    const searchKeyword = (e) => {
      console.log("send search");
      getSearchData();
    }
    // 把keyEnter和searchKeyword並一起
    const getSearchData = ()=>{
      router.push(
        `?${new URLSearchParams({
          ...router.query,
          page:1,
          keyword: keyword
        }).toString()}`
      );
      console.log('newData:',newData);
      console.log('postNum',postNum);
    }

  // // 登入
  // const { auth, setAuth } = useContext(AuthContext);
  // const [first, setFirst] = useState(false);
  // const router = useRouter();

  // useEffect(() => {
  //   setFirst(true);
  // }, []);

  // useEffect(() => {
  //   console.log('token',auth.token);
  //   console.log('first', first);
  //   // 從 URL 中讀取 page 參數，若不存在，預設為 1
  // const currentPage = router.query.page ? parseInt(router.query.page) : 1;

  // if (!auth.id && first) {
  //   const from = router.asPath;
  //   router.push(`/member/sign-in?from=${from}`);
  // }else if (auth.token) {
  //     fetch(`${process.env.API_SERVER}/forum-api/forum/blog?page=${currentPage}`, {
  //       headers: {
  //         Authorization: 'Bearer ' + auth.token,
  //       },
  //     })
  //       .then((r) => r.json())
  //       .then((data) => {
  //         console.log(data);
  //         setData(data);
  //         const postNum = data.totalRows;
  //         setPostNum(postNum); // 設定文章數量
  //         setPage(currentPage);
  //       });
  //   } else {
  //     console.log('User is not logged in. Cannot fetch posts.');
  //   }
  // }, [auth,first]);
  // 會員登入的auth
  const [first, setFirst] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  // 文章數據（所有文章）
  // const [allData, setAllData] = useState([]);
  // 定義 fetchData 函式
  const fetchData = async (obj = {}) => {
    const usp = new URLSearchParams(obj);
    const response = await fetch(`${process.env.API_SERVER}/forum-api/forum/blog?${usp.toString()}`, {
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setData(data);
        setNewData(data.rows);
        console.log('newData', newData);
      });
  };

  // useEffect 呼叫 fetchData
  useEffect(() => {
    const authStr = localStorage.getItem('petauth');
    if (authStr) {
      const auth = JSON.parse(authStr);
      if (auth.token) {
        fetchData(router.query);
      } else {
        console.log('User is not logged in. Cannot fetch posts.');
      }
    }
  }, [auth, first]);

      useEffect(() => {
        console.log(auth); //第一次auth會寫進local storage裡面
    
        // 從 URL 中讀取 page 參數，若不存在，預設為 1
        // const currentPage = router.query.page ? parseInt(router.query.page) : 1;
        if (!auth.id && first) {
          const from = router.asPath;
          router.push(`/member/sign-in?from=${from}`);
        }else if (auth.token) {
          fetch(`${process.env.API_SERVER}/forum-api/forum/blog/favlist`, {
            headers: {
              Authorization: 'Bearer ' + auth.token,
            },
          })
            .then((r) => r.json())
            .then((newData) => {
              // console.log(newData);
              setData(newData);
              const postNum = newData.totalRows;
              setPostNum(postNum); // 設定文章數量
              console.log('postNum',postNum);
            });
        } else {
          console.log('User is not logged in. Cannot fetch posts.');
        }
      }, [auth, first]); //第二次才讀到auth，頁面才會渲染出來

      useEffect(() => {
        setFirst(true);
      }, []);

  useEffect(()=>{
    // 取得用戶拜訪的資料
    const {
      page,
      keyword
    } = router.query;
    if(keyword){
      setKeyword(keyword);
    }
    fetchData(router.query)
  }, [router.query])

  // // Pagination
  // const PageChangeHandler = (page, perpage) => {
  //   setPerPage(perpage);
  //   setPage(page);
  //   router.push(
  //     {
  //       pathname: router.pathname,
  //       query: {
  //         ...router.query,
  //         page: page,
  //       },
  //     },
  //     undefined,
  //     { shallow: true } // 使用 shallow 選項來進行無刷新頁面轉換
  //   ).then(() => {
  //     // 呼叫後端 API 來獲取新的資料
  //     const authStr = localStorage.getItem('petauth');
  //     if (authStr) {
  //       try {
  //         const auth = JSON.parse(authStr);
  //         if (auth.token) {
  //           fetch(`${process.env.API_SERVER}/forum-api/forum/blog?page=${page}`, {
  //             headers: {
  //               Authorization: 'Bearer ' + auth.token,
  //             },
  //           })
  //             .then((r) => r.json())
  //             .then((data) => {
  //               setData(data);
  //             });
  //         } else {
  //           console.log('User is not logged in. Cannot fetch posts.');
  //         }
  //       } catch (ex) {
  //         console.error(ex);
  //       }
  //     }
  //   });
  // };
  // Pagination
  const PageChangeHandler = async (page) => {
    // 更新 URL 中的 page 參數
    router.push(
      `?${new URLSearchParams({
        ...router.query,
          page:page,
          keyword: keyword
      }).toString()}`
    );
  };

  return (
    <div className="container-outer">
      <div className={Style.body}>
        <BlogBanner changeHandler={getSearchbarValue} 
        clickHandler={searchKeyword} 
        keyDownHandler={keyEnter}
        inputText={keyword}
        />
        <Row className={Style.antRow}>
          <Col span={6}>
            {newData.rows.length > 0 && (
              <BlogSidebar
                profile="/forum_img/kabo-p6yH8VmGqxo-unsplash.jpg"
                memberName={data.rows[0].nickname}
              />
            )}
          </Col>
          <Col span={16}>
            <div className={Style.blogContent}>
              <BlogNav blogNav="我的文章" postNum={postNum} />

              <div className={Style.postContent}>
                {newData.rows.map((v, i) => (
                  <Link key={v.post_sid} href={`/forum/${v.post_sid}`}>
                    <PostCard
                      profile="/forum_img/victor-grabarczyk-N04FIfHhv_k-unsplash.jpg"
                      boardName={v.board_name}
                      author={v.nickname}
                      postTitle={v.post_title}
                      postContent={v.post_content}
                      img={`http://localhost:3000/forum_img/post_img/${v.file}`}
                      likes={v.postLike}
                      comments={v.postComment}
                      favorites={v.postFavlist}
                    />
                  </Link>
                ))}
                <div className={Style.editBg}>
                  <FontAwesomeIcon icon={faPenToSquare} className={Style.editIcon} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className={Style.pagination}>
      <Pagination
      current={page}
      total={postNum} // 使用新的 state postNum 來設置 total
      pageSize={perPage}
      onChange={PageChangeHandler}
    /> 
      </div>
    </div>
  );
}
