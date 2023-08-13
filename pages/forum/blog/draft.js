import React, { useContext, useState, useEffect } from 'react';
import Style from './postcollection.module.css';
import BlogBanner from '@/components/ui/blogBanner/blogBanner';
import { Col, Row, Pagination, ConfigProvider} from 'antd';
import BlogSidebar from '@/components/ui/blogSidebar/blogSidebar';
import BlogNav from '@/components/ui/blogNav/blogNav';
import PostCardDraft from '@/components/ui/PostCard/postCardDraft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';


export default function BlogIndex() {
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
      // console.log('e.target.value',e.target.value);
    }
    const keyEnter = (e) =>{
      if(e.key === 'Enter'){
        // console.log('enter');
        getSearchData();
      }
      // console.log(e);
    }
    const searchKeyword = (e) => {
      // console.log("send search");
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
      // console.log('newData:',newData);
      // console.log('postNum',postNum);
    }

  
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
    const response = await fetch(`${process.env.API_SERVER}/forum-api/forum/blog/draft?${usp.toString()}`, {
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setData(data);
        setNewData(data.rows);
        // console.log('data', data);
        // console.log('data.rows', data.rows);
        // console.log('newData', newData);
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
          fetch(`${process.env.API_SERVER}/forum-api/forum/blog/draft`, {
            headers: {
              Authorization: 'Bearer ' + auth.token,
            },
          })
            .then((r) => r.json())
            .then((newData) => {
              // console.log(newData);
              setData(newData.rows);
              const postNum = newData.totalRows;
              setPostNum(postNum); // 設定文章數量
              // console.log('postNum',postNum);
              // console.log('newData',newData);
              // console.log('newData.rows',newData.rows);
              // console.log('data',data);
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

  // view post
  const viewPost = (post_sid) => {
    router.push(`/forum/${post_sid}`);
  };

  //delete post
  const deletePost = (post_sid) => {
    fetch(`${process.env.API_SERVER}/forum-api/forum/blog/delete?post_sid=${post_sid}`,{
      method: 'DELETE',
    })
    .then((r)=> r.json())
    .then((data)=> {
      // console.log('data', data);
      if(data.result.affectedRows===1){
        router.push(`/forum/blog/draft`);
        setPostNum(postNum-1);
      }else{
        alert('刪除不成功')
      }
    })
    .catch((error) => {
      console.error('Error delete:', error);
    });
  }
  // edit post
  const editPost = (post_sid) => {
    router.push(`/forum/blog/edit/${post_sid}`)
  }

  return (
    <div className={Style.containerOuter}>
    <Head>
      <title>狗with咪 | 論壇</title>
    </Head>
      <div className={Style.body}>
        <BlogBanner changeHandler={getSearchbarValue} 
        clickHandler={searchKeyword} 
        keyDownHandler={keyEnter}
        inputText={keyword}
        />
        <Row className={Style.antRow}>
          <Col span={6}>
              <BlogSidebar
              profile={'/forum_img/9509de8d-407e-47c0-a500-b1cf4a27c919.jpg'}
                memberName={newData[0]?.nickname}
              />
          </Col>
          <Col span={16}>
            <div className={Style.blogContent}>
              <BlogNav blogNav="我的草稿夾" postNum={postNum} />

              <div className={Style.postContent}>
              {/*<Link key={v.post_sid} href={`/forum/${v.post_sid}`}> */}
              {newData.map((v, i) => ( 
                     <PostCardDraft
                       profile={`${process.env.API_SERVER}/img/${v.profile}`}
                       boardName={v.board_name}
                       author={v.nickname}
                       postTitle={v.post_title}
                       postContent={v.post_content}
                       img={`${process.env.API_SERVER}/img/${v.file}`}
                       deletePost={() => deletePost(v.post_sid)}
                       viewPost={() => viewPost(v.post_sid)}
                       editPost={() => editPost(v.post_sid)}
                     />
                     ))}             
                   {/* </Link> */}
              <Link href={'http://localhost:3000/forum/blog/post'}>
                <div className={Style.editBg}>
                  <FontAwesomeIcon icon={faPenToSquare} className={Style.editIcon} />
                </div>
              </Link>
                <div className={Style.pagination}>
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
                current={page}
                total={postNum} // 使用新的 state postNum 來設置 total
                pageSize={perPage}
                onChange={PageChangeHandler}
              /> 
              </ConfigProvider>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>


    </div>
  );
}
