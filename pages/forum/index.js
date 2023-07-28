import React, { useEffect, useState } from 'react'
import Style from '@/styles/index.module.css'
import PostCard from '@/components/ui/PostCard/postCard'
import PostBanner from '@/components/ui/postBanner/postBanner'
import BoardNav from '@/components/ui/BoardNav/boardNav'
import PostNav from '@/components/ui/postNav/postNav'
import PostBottom from '@/components/ui/postBottom/postBottom'
import Link from 'next/link'
import { Pagination } from 'antd'
export default function Post() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [board_sid, setBoardSid] = useState(null); // Define the board_sid state
  const [forumData, setForumData] = useState({
    totalRows: 0,
    perPage: 15,
    totalPages: 0,
    page: 1,
    rows: [], // 使用 rows 屬性來存放資料陣列
  });

  const [data, setData] = useState([]); //儲存篩選後的資料

  const fetchHotData = async () => {
    const response = await fetch(
      `${process.env.API_SERVER}/forum-api?page=${page}&perpage=${perPage}&board_sid=${board_sid}`, // Include board_sid in the query string
      { method: "GET" }
    );
    const forumData = await response.json();
    setForumData(forumData);
    setData(forumData.rows);
    console.log('forumData', forumData);
  };

  useEffect(() => {
    fetchHotData();
  }, [page, perPage, board_sid]);

  // Pagination
  const PageChangeHandler = async (page, perpage) => {
    setPerPage(perpage);
    setPage(page);
  };

  // Filter by board_sid
  const filterByBoardSid = (board_sid) => {
    setBoardSid(board_sid);
    setPage(1); // Reset page to 1 when applying a filter
  };

 //醫療版
  const doctor = ()=>{
    const newData = forumData.rows.filter((forumData) => forumData.board_sid === 1);
    setData(newData);
  }
  //住宿版
  const home = ()=>{
    const newData = forumData.rows.filter((data) => data.board_sid === 2);
    setData(newData);
  }
  //景點版
  const site = ()=>{
    const newData = forumData.rows.filter((data) => data.board_sid === 3);
    setData(newData);
  }
  //餐廳版
  const restaurant=()=>{
    const newData = forumData.rows.filter((data) => data.board_sid === 8);
    setData(newData);
  }
  //美容版
  const salon=()=>{
    const newData = forumData.rows.filter((data) => data.board_sid === 4);
    setData(newData);
  }
  //學校版
  const school=()=>{
    const newData = forumData.rows.filter((data) => data.board_sid === 7);
    setData(newData);
  }
  //狗貓聚版
  const hang=()=>{
    const newData = forumData.rows.filter((data) => data.board_sid === 5);
    setData(newData);
  }
  //幼犬貓板
  const young=()=>{
    const newData = forumData.rows.filter((data) => data.board_sid === 11);
    setData(newData);
  }
  //老犬貓板
  const old=()=>{
    const newData = forumData.rows.filter((data) => data.board_sid === 12);
    setData(newData);
  }
  //好物版
  const product=()=>{
    const newData = forumData.rows.filter((data) => data.board_sid === 9);
    setData(newData);
  }
  //毛孩日記
  const diary=()=>{
    const newData = forumData.rows.filter((data) => data.board_sid === 6);
    setData(newData);
  }
  // 在進行篩選時，只需更新 forumData.rows 和 forumData.totalRows
  // forumData.page 和 forumData.perPage 由 Pagination 控制
  useEffect(() => {
    // 預設顯示全部資料
    setData(forumData.rows);
  }, [forumData.rows]);

  return (
    <>
      <div className="container-outer">
        <div className={Style.body}>
          <PostBanner/>
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
          />
          <div className="container-inner">
          <PostNav postNav='熱門文章' optionCh='熱門文章' op1='最新文章'/>
          {data.map((v,i)=>(
          // <Link href={`/forum/${i+1}`}>
          <Link key={v.post_sid} href={`/forum/${v.post_sid}`}>
          <PostCard key={v.post_sid}
          profile='./forum_img/victor-grabarczyk-N04FIfHhv_k-unsplash.jpg' 
          boardName={v.board_name} 
          author={v.nickname}
          postTitle={v.post_title} 
          postContent={v.post_content} 
          img={`http://localhost:3000/forum_img/post_img/${v.file}`} 
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