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
  const [data, setData] = useState({
    totalRows: 0,
    perPage: 15,
    totalPages: 0,
    page: 1,
    rows: [], // 使用 rows 屬性來存放資料陣列
  });
  const [postNum, setPostNum] = useState(0); // 新增文章數量的 state
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    let auth = {};
    const authStr = localStorage.getItem('petauth');
    if (authStr) {
      try {
        auth = JSON.parse(authStr);
      } catch (ex) {
        console.error(ex);
      }
      console.log(auth.id);
    }
    // 從 URL 中讀取 page 參數，若不存在，預設為 1
  const currentPage = router.query.page ? parseInt(router.query.page) : 1;

    if (auth.token) {
      fetch(`${process.env.API_SERVER}/forum-api/forum/blog?page=${currentPage}`, {
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          setData(data);
          const postNum = data.totalRows;
          setPostNum(postNum); // 設定文章數量
          setPage(currentPage);
        });
    } else {
      console.log('User is not logged in. Cannot fetch posts.');
    }
  }, []);

  // Pagination
  const PageChangeHandler = (page, perpage) => {
    setPerPage(perpage);
    setPage(page);
    router.push(
      `
      ?${new URLSearchParams({
        ...router.query,
        page: page,
      }).toString()}
      `
    );
    // 呼叫後端 API 來獲取新的資料
  const authStr = localStorage.getItem('petauth');
  if (authStr) {
    try {
      const auth = JSON.parse(authStr);
      if (auth.token) {
        fetch(`${process.env.API_SERVER}/forum-api/forum/blog?page=${page}`, {
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        })
          .then((r) => r.json())
          .then((data) => {
            setData(data);
          });
      } else {
        console.log('User is not logged in. Cannot fetch posts.');
      }
    } catch (ex) {
      console.error(ex);
    }
  }
  };

  return (
    <div className="container-outer">
      <div className={Style.body}>
        <BlogBanner />
        <Row className={Style.antRow}>
          <Col span={6}>
            {data.rows.length > 0 && (
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
                {data.rows.map((v, i) => (
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
          total={data.totalRows}
          pageSize={data.perPage}
          onChange={PageChangeHandler}
        />
      </div>
    </div>
  );
}
