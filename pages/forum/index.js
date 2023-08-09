import React, { useEffect, useState } from 'react'
import Style from '@/styles/index.module.css'
import PostCard from '@/components/ui/PostCard/postCard'
import PostBanner from '@/components/ui/postBanner/postBanner'
import BoardNav from '@/components/ui/BoardNav/boardNav'
import PostNav from '@/components/ui/postNav/postNav'
import PostBottom from '@/components/ui/postBottom/postBottom'
import Link from 'next/link'
import { Pagination } from 'antd'
import { useRouter } from 'next/router'
// 下拉選單
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
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
  
    // setData(forumData.rows);
    console.log('forumData', forumData);
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
    console.log('router.query',router.query.orderBy);
    console.log('orderBy',orderBy);
    if(orderBy && orderBy==='postLike'){
      setObText('熱門文章')
      setOrderBy('postLike')
    }else if(orderBy && orderBy==='post_date'){
      setObText('最新文章')
      setOrderBy('post_date')
    }
    fetchData(router.query)
  }, [router.query])
  

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
    console.log('click', e);
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



 //醫療版
  const doctor = ()=>{
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page:1,
        orderBy: orderBy,
        board_sid: 1,
        // perPage: perpage,
      }).toString()}`
    );
    // const newData = forumData.rows.filter((forumData) => forumData.board_sid === 1);
    // setData(newData);
  }
  //住宿版
  const home = ()=>{
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page:1,
        orderBy: orderBy,
        board_sid: 2,
        // perPage: perpage,
      }).toString()}`
    );
    // const newData = forumData.rows.filter((data) => data.board_sid === 2);
    // setData(newData);
  }
  //景點版
  const site = ()=>{
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page:1,
        orderBy: orderBy,
        board_sid: 3,
        // perPage: perpage,
      }).toString()}`
    );
    // const newData = forumData.rows.filter((data) => data.board_sid === 3);
    // setData(newData);
  }
  //餐廳版
  const restaurant=()=>{
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page:1,
        orderBy: orderBy,
        board_sid: 8,
        // perPage: perpage,
      }).toString()}`
    );
    // const newData = forumData.rows.filter((data) => data.board_sid === 8);
    // setData(newData);
  }
  //美容版
  const salon=()=>{
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page:1,
        orderBy: orderBy,
        board_sid: 4,
        // perPage: perpage,
      }).toString()}`
    );
    // const newData = forumData.rows.filter((data) => data.board_sid === 4);
    // setData(newData);
  }
  //學校版
  const school=()=>{
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page:1,
        orderBy: orderBy,
        board_sid: 7,
        // perPage: perpage,
      }).toString()}`
    );
    // const newData = forumData.rows.filter((data) => data.board_sid === 7);
    // setData(newData);
  }
  //狗貓聚版
  const hang=()=>{
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page:1,
        orderBy: orderBy,
        board_sid: 5,
        // perPage: perpage,
      }).toString()}`
    );
    // const newData = forumData.rows.filter((data) => data.board_sid === 5);
    // setData(newData);
  }
  //幼犬貓板
  const young=()=>{
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page:1,
        orderBy: orderBy,
        board_sid: 11,
        // perPage: perpage,
      }).toString()}`
    );
    // const newData = forumData.rows.filter((data) => data.board_sid === 11);
    // setData(newData);
  }
  //老犬貓板
  const old=()=>{
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page:1,
        orderBy: orderBy,
        board_sid: 12,
        // perPage: perpage,
      }).toString()}`
    );
    // const newData = forumData.rows.filter((data) => data.board_sid === 12);
    // setData(newData);
  }
  //好物版
  const product=()=>{
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page:1,
        orderBy: orderBy,
        board_sid: 9,
        // perPage: perpage,
      }).toString()}`
    );
    // const newData = forumData.rows.filter((data) => data.board_sid === 9);
    // setData(newData);
  }
  //毛孩日記
  const diary=()=>{
    router.push(
      `?${new URLSearchParams({
        ...router.query,
        page:1,
        orderBy: orderBy,
        board_sid: 6,
        // perPage: perpage,
      }).toString()}`
    );
    // const newData = forumData.rows.filter((data) => data.board_sid === 6);
    // setData(newData);
  }
  const PostAuthorBTNHandler =()=>{
    router.push(`/forum/blog`)
  }

  return (
    <>
      <div className="container-outer">
        <div className={Style.body}>
          <PostBanner changeHandler={getSearchbarValue} 
          clickHandler={searchKeyword} 
          keyDownHandler={keyEnter}
          inputText={keyword}/>
          <BoardNav 
          doctor={()=>{
            doctor();
          }}
          home={()=>{
            home();
          }}
          site={()=>{
            site();
          }}
          restaurant={()=>{
            restaurant();
          }}
          salon={()=>{
            salon();
          }}
          school={()=>{
            school();
          }}
          hang={()=>{
            hang();
          }}
          young={()=>{
            young();
          }}
          old={()=>{
            old();
          }}
          product={()=>{
            product();
          }}
          diary={()=>{
            diary()
          }}
          PostAuthorBTNHandler={PostAuthorBTNHandler}
          img='/forum_img/board_img/個人頁面.png' text='個人頁面'/>
          <div className="container-inner">
          <div className={Style.postNav}>
            <div className={Style.postNavText}>論壇文章</div>
                <Dropdown menu={menuProps} className={Style.dropdown}>
                <Button>
                  <Space>
                    {obText}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
          </div>
          {data.map((v,i)=>(
          <Link key={v.post_sid} href={`/forum/${v.post_sid}`}>
          <PostCard key={v.post_sid}
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
          ))}   
        <Pagination
          current={page}
          total={forumData.totalRows}
          pageSize={perPage}
          onChange={PageChangeHandler}
        />     
  </div>
  <PostBottom/>
        </div>
        </div>
    </>
  )
}