import React, { useEffect, useState } from 'react';
import Style from '@/styles/index.module.css';
import PostCard from '@/components/ui/PostCard/postCard';
import PostBanner from '@/components/ui/postBanner/postBanner';
import BoardNav from '@/components/ui/BoardNav/boardNav';
import PostNav from '@/components/ui/postNav/postNav';
import PostBottom from '@/components/ui/postBottom/postBottom';
import Link from 'next/link';
import { Pagination } from 'antd';

export default function Post() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [board_sid, setBoardSid] = useState(null);
  const [forumData, setForumData] = useState({
    totalRows: 0,
    perPage: 15,
    totalPages: 0,
    page: 1,
    rows: [],
  });

  useEffect(() => {
    fetchData();
  }, [page, perPage]);

  useEffect(() => {
    if (board_sid !== null) {
      fetchBoardData();
    } else {
      fetchData();
    }
  }, [board_sid]);

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.API_SERVER}/forum-api?page=${page}&perpage=${perPage}&board_sid=${board_sid}`,
      { method: 'GET' }
    );
    const responseData = await response.json();
    setForumData(responseData);
  };

  const fetchBoardData = async () => {
    const response = await fetch(
      `${process.env.API_SERVER}/forum-api/board/${board_sid}?page=${page}&perpage=${perPage}`,
      { method: 'GET' }
    );
    const responseData = await response.json();
    setForumData(responseData);
  };

  const PageChangeHandler = (page, perpage) => {
    setPerPage(perpage);
    setPage(page);
  };

  const BoardPageChangeHandler = (page, perpage) => {
    setPage(page);
    setPerPage(perpage);
  };

  // Filter by board_sid
  const filterByBoardSid = (board_sid) => {
    setBoardSid(board_sid);
    setPage(1); // Reset page to 1 when applying a filter
  };

  // 醫療版
  const doctor = () => filterByBoardSid(1);
  // 住宿版
  const home = () => filterByBoardSid(2);
  // 景點版
  const site = () => filterByBoardSid(3);
  // 餐廳版
  const restaurant = () => filterByBoardSid(8);
  // 美容版
  const salon = () => filterByBoardSid(4);
  // 學校版
  const school = () => filterByBoardSid(7);
  // 狗貓聚版
  const hang = () => filterByBoardSid(5);
  // 幼犬貓板
  const young = () => filterByBoardSid(11);
  // 老犬貓板
  const old = () => filterByBoardSid(12);
  // 好物版
  const product = () => filterByBoardSid(9);
  // 毛孩日記
  const diary = () => filterByBoardSid(6);

  return (
    <>
      <div className="container-outer">
        <div className={Style.body}>
          <PostBanner />
          <BoardNav
            doctor={doctor}
            home={home}
            site={site}
            restaurant={restaurant}
            salon={salon}
            school={school}
            hang={hang}
            young={young}
            old={old}
            product={product}
            diary={diary}
          />
          <div className="container-inner">
            <PostNav postNav='熱門文章' optionCh='熱門文章' op1='最新文章' />
            {forumData.rows.map((v, index) => (
              <Link key={`post_${index}`} href={`/forum/${v.post_sid}`}>
                <PostCard
                  key={`post_card_${index}`} // 只在 PostCard 元件中保持唯一的 key
                  profile='./forum_img/victor-grabarczyk-N04FIfHhv_k-unsplash.jpg'
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
          </div>
          <Pagination
            current={board_sid !== null ? forumData.page : page}
            total={board_sid !== null ? forumData.totalRows : forumData.totalRows}
            pageSize={perPage}
            onChange={board_sid !== null ? BoardPageChangeHandler : PageChangeHandler}
          />
        </div>
        <PostBottom />
      </div>
    </>
  );
}
