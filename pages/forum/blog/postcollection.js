import React, { useContext, useState, useEffect } from 'react';
import Style from './postcollection.module.css';
import BlogBanner from '@/components/ui/blogBanner/blogBanner';
import { Col, Row, Pagination} from 'antd';
import BlogSidebar from '@/components/ui/blogSidebar/blogSidebar';
import PostNav from '@/components/ui/postNav/postNav';
import PostCard from '@/components/ui/PostCard/postCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
// 下拉選單
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';

export default function PostCollection() {
  const [postNum, setPostNum] = useState(0); // 新增文章數量的 state

  // router
  const router = useRouter();

  //分頁
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  //收藏列表名稱
  const [listName, setListName] = useState('');
  //下拉選單值
  const [obText, setObText] = useState('收藏列表')
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
        listName: listName,
        keyword: keyword
      }).toString()}`
    );
    console.log('newData:',newData);
    console.log('postNum',postNum);
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
    const response = await fetch(`${process.env.API_SERVER}/forum-api/forum/blog/favlist?${usp.toString()}`, {
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setData(data);
        setNewData(data.rows);
        // setAllData(data.rows); // 將所有文章數據存儲在 allData 中
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
              // setPage(currentPage);
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
      listName,
      keyword
    } = router.query;
    if(keyword){
      setKeyword(keyword);
    }
    if(listName){
      setListName(listName);
      setObText(listName);
    }
    fetchData(router.query)
  }, [router.query])



  

  
    // 下拉選單：熱門/最新

    const handleMenuClick = (e) => {
      const { key } = e; // 獲取點選的下拉選單項目的 key
      router.push(
        `?${new URLSearchParams({
          ...router.query,
          page:1,
          listName: key, // 使用點選項目的 key 更新 listName
          keyword: keyword
        }).toString()}`
      );
      setListName(listName);
      setNewData(newData);
      console.log('click', e);
      console.log('newData',newData);
    };

      const items = [
        // {
        //   label: data.listName,
        //   key: data.listName,
        // },
        {
          label: '寵物健康知識',
          key: '寵物健康知識',
        },
        {
          label: '寵物心理知識',
          key: '寵物心理知識',
        },
        {
          label: '帶寶貝出去玩😍',
          key: '帶寶貝出去玩😍',
        },
        {
          label: '寵物安親照顧',
          key: '寵物安親照顧',
        },
        {
          label: '寵物訓練',
          key: '寵物訓練',
        },
      ]

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  // Pagination
  const PageChangeHandler = async (page) => {
    // 更新 URL 中的 page 參數
    router.push(
      `?${new URLSearchParams({
        ...router.query,
          page:page,
          listName: listName,
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
            {/*{data.rows.length > 0 && ( */}
              <BlogSidebar
                profile="/forum_img/kabo-p6yH8VmGqxo-unsplash.jpg"
                memberName="莉莉安"
              />
            {/* )} */}
          </Col>
        <Col span={16}>
            <div className={Style.blogContent}>
                {/*<PostNav postNav='收藏文章' optionCh='收藏文章列表' op1='寵物醫院' op2='寵物住宿'/>*/}
                <div>
                <Dropdown menu={menuProps}>
                <Button>
                  <Space>
                    {obText}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
                <div className={Style.postContent}>

                {newData.map((v, i) => (
                  <Link key={v.post_sid} href={`/forum/${v.post_sid}`}>
                    <PostCard
                      profile="/forum_img/victor-grabarczyk-N04FIfHhv_k-unsplash.jpg"
                      boardName={v.board_name}
                      author={v.author_nickname}
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
                        <FontAwesomeIcon icon={faPenToSquare} className={Style.editIcon}/>
                    </div>
                    <Pagination
                      current={page}
                      total={postNum} // 使用新的 state postNum 來設置 total
                      pageSize={perPage}
                      onChange={PageChangeHandler}
                    />     
                </div>
            </div>
        </Col>
      </Row>
      </div>
      
    </div>
  )
}




