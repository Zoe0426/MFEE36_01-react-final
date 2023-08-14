import React, { useEffect, useState } from 'react'
import Style from '@/styles/index.module.css'
import PostCard from '@/components/ui/PostCard/postCard'
import PostBanner from '@/components/ui/postBanner/postBanner'
import BoardNav from '@/components/ui/BoardNav/boardNav'
import PostBottom from '@/components/ui/postBottom/postBottom'
import Link from 'next/link'
import { Pagination } from 'antd'
import { useRouter } from 'next/router'
// 下拉選單
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown,ConfigProvider, message, Space, Tooltip } from 'antd';
// 找不到結果的卡片
import NotFindCard from '@/components/ui/cards/not-find-card';
import Head from 'next/head';
export default function Post() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [orderBy, setOrderBy] = useState('postLike')
  const [board_sid, setBoardSid] = useState(0); // Define the board_sid state
  //下拉選單值
  const [obText, setObText] = useState('熱門文章')
  //關鍵字
  const [keyword, setKeyword] = useState('');
  //關鍵字動作
  const getSearchbarValue = (e) => {
    setKeyword(e.target.value);
    // console.log('e.target.value',e.target.value);
  }
  const keyEnter = (e) =>{
    if(e.key === 'Enter'){
      console.log('enter');
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
        orderBy: orderBy,
        board_sid: board_sid,
        keyword: keyword
        // perPage: perpage,
      }).toString()}`
    );
  } 

  const [forumData, setForumData] = useState([]);
  const [data, setData] = useState([]);

  const fetchData = async (obj={}) => {
    const usp = new URLSearchParams(obj);
    const response = await fetch(
      `${process.env.API_SERVER}/forum-api?${usp.toString()}`, // Include board_sid in the query string
      { method: "GET" }
    );
    const forumData = await response.json();
    setData(forumData.rows);
    setForumData(forumData);
    setPage(forumData.page);
  
    // setData(forumData.rows);
    // console.log('forumData', forumData);
  };

  useEffect(()=>{
    //取得用戶拜訪的資料
    const {
      page,
      keyword,
      orderBy
    } = router.query;
    if(keyword){
      setKeyword(keyword);
    }
    // console.log('router.query',router.query.orderBy);
    // console.log('orderBy',orderBy);
    if(orderBy && orderBy==='postLike'){
      setObText('熱門文章')
      setOrderBy('postLike')
    }else if(orderBy && orderBy==='post_date'){
      setObText('最新文章')
      setOrderBy('post_date')
    }
    fetchData(router.query)
  }, [router.query])
  
  //看板篩選
  const changeBoardSid=(board_sid)=>{
    // console.log('inchangebs function, ', board_sid);
    switch (board_sid){
      case 1:
        router.push(
          `?${new URLSearchParams({
            ...router.query,
            page:1,
            orderBy: orderBy,
            board_sid: 1,
            // perPage: perpage,
          }).toString()}`
        );
        break;
      case 2:
        router.push(
          `?${new URLSearchParams({
            ...router.query,
            page:1,
            orderBy: orderBy,
            board_sid: 2,
            // perPage: perpage,
          }).toString()}`
        );
        break;
      case 3:
        router.push(
          `?${new URLSearchParams({
            ...router.query,
            page:1,
            orderBy: orderBy,
            board_sid: 3,
            // perPage: perpage,
          }).toString()}`
        );
        break;
        case 4:
          router.push(
            `?${new URLSearchParams({
              ...router.query,
              page:1,
              orderBy: orderBy,
              board_sid: 4,
              // perPage: perpage,
            }).toString()}`
          );
        break;
        case 5:
          router.push(
            `?${new URLSearchParams({
              ...router.query,
              page:1,
              orderBy: orderBy,
              board_sid: 5,
              // perPage: perpage,
            }).toString()}`
          );
        break;
        case 6:
          router.push(
            `?${new URLSearchParams({
              ...router.query,
              page:1,
              orderBy: orderBy,
              board_sid: 6,
              // perPage: perpage,
            }).toString()}`
          )
        break;
        case 7:
          router.push(
            `?${new URLSearchParams({
              ...router.query,
              page:1,
              orderBy: orderBy,
              board_sid: 7,
              // perPage: perpage,
            }).toString()}`
          );
        break;
        case 8:
          router.push(
            `?${new URLSearchParams({
              ...router.query,
              page:1,
              orderBy: orderBy,
              board_sid: 8,
              // perPage: perpage,
            }).toString()}`
          );
        break;
        case 9:
          router.push(
            `?${new URLSearchParams({
              ...router.query,
              page:1,
              orderBy: orderBy,
              board_sid: 9,
              // perPage: perpage,
            }).toString()}`
          );
        break;
        case 11:
          router.push(
            `?${new URLSearchParams({
              ...router.query,
              page:1,
              orderBy: orderBy,
              board_sid: 11,
              // perPage: perpage,
            }).toString()}`
          );
        break;
        case 12:
          router.push(
            `?${new URLSearchParams({
              ...router.query,
              page:1,
              orderBy: orderBy,
              board_sid: 12,
              // perPage: perpage,
            }).toString()}`
          );
        break;
    }
    setBoardSid(board_sid);
    
  }

  // 下拉選單：熱門/最新

  const handleMenuClick = (e) => {
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page:1,
        orderBy: e.key,
        // perPage: perpage,
      }).toString()}`
    );
    // console.log('click', e);
  };

  const items = [
    {
      label: '熱門文章',
      key: 'postLike',
    },
    {
      label: '最新文章',
      key: 'post_date',
    }]
const menuProps = {
  items,
  onClick: handleMenuClick,
};
  

  // Pagination
  const PageChangeHandler = async (page) => {
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page:page,
        orderBy: orderBy,
        board_sid: board_sid,
        keyword: keyword
      }).toString()}`
    );
  };

  const PostAuthorBTNHandler =()=>{
    router.push(`/forum/blog`)
  }

  return (
    <>
      <div className="container-outer">
      <Head>
        <title>狗with咪 | 論壇</title>
      </Head>
        <div className={Style.body}>
          <PostBanner changeHandler={getSearchbarValue} 
          clickHandler={searchKeyword} 
          keyDownHandler={keyEnter}
          inputText={keyword}/>
          <BoardNav 
          changeBoardSid={changeBoardSid}
          board_sid={board_sid}
          PostAuthorBTNHandler={PostAuthorBTNHandler}
          img='/forum_img/board_img/個人頁面.png' text='個人頁面'/>
          <div className="container-inner">
            <div className={Style.postNav}>
              <div className={Style.postNavText}>論壇文章</div>
              <ConfigProvider
                    theme={{
                      token: {
                        colorBorder: '#DDDDDD',
                        colorPrimary: '#FD8C46',
                        colorBgContainer: 'rgba(255,255,255)',
                        borderRadius: 10,
                        controlHeight: 50,
                        fontSize: 16,
                        borderRadiusOuter: 10,
                      },
                    }}
                  >
                  <Dropdown menu={menuProps} className={Style.dropdown}>
                  <Button>
                    <Space>
                      {obText}
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </ConfigProvider>
            </div>
            <div className={Style.postBody}>
            {data.length > 0 ? (
              data.map((v,i)=>(
              <Link key={v.post_sid} href={`/forum/${v.post_sid}`}>
              <PostCard className={Style.postCard} key={v.post_sid}
              profile={`${process.env.API_SERVER}/img/${v.profile}`} 
              boardName={v.board_name} 
              author={v.nickname}
              postTitle={v.post_title} 
              postContent={v.post_content} 
              img={`${process.env.API_SERVER}/img/${v.file}`}
              likes={v.postLike} 
              comments={v.postComment} 
              favorites={v.postFavlist}/>          
              </Link>
              ))  
            ): (<NotFindCard textForCat="非常抱歉!" textForDog="沒有找到相關文章!" />)
          }
              <div className={Style.page}>
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
                total={forumData.totalRows}
                pageSize={perPage}
                onChange={PageChangeHandler}
                />   
                </ConfigProvider>  
              </div>
              </div>

  </div>
  <PostBottom/>
        </div>
        </div>
    </>
  )
}