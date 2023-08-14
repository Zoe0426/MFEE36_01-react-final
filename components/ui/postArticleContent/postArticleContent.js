import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import Style from './postArticleContent.module.css';
// import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faCommentDots,
  faBookmark,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons';
import Modal from '../modal/modal';
import FavListAlert from '../favListAlert/favListAlert';

export default function PostArticleContent({
  postContent = '',
  likes = 0,
  comments = 0,
  isLiked = { setIsLiked },
  setIsLiked = () => {},
  postSid = '',
  memberId = '',
  Fav = false,
  setFav = () => {},
}) {
  // 判斷登入
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();
  const from = router.asPath;
  const { pathname } = router; //看路徑
  const { query } = router;

  // 記錄讚（+-1）
  const [likeAmount, setLikeAmount] = useState(likes);
  const [listName, setListName] = useState('');
  const [obText, setObText] = useState('我的收藏列表');

  // 建立收藏清單
  // 定義一個 state 來控制是否顯示 FavListAlert 元件
  //const [showFavListAlert, setShowFavListAlert] = useState(false);

  console.log(auth);

  // 按讚功能
  useEffect(() => {
    console.log(auth);
    // 判斷這個會員有沒有按過這篇文章讚
    if (auth.id) {
      fetch(
        `${process.env.API_SERVER}/forum-api/forum/favStatus?post_sid=${postSid}&member_sid=${auth.id}`,
        {
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        }
      )
        .then((r) => r.json())
        .then((data) => {
          data.length == 0 ? setIsLiked(false) : setIsLiked(true);
          // console.log('data',data);
        });
    }
  }, [auth]);
  // 按讚與取消讚的處理函數
  const handleLikeClick = () => {
    if (auth.id) {
      setIsLiked(!isLiked); // 切換按讚狀態
      if (isLiked == false) {
        setLikeAmount(likeAmount + 1);
        const r = fetch(`${process.env.API_SERVER}/forum-api/forum/postLike`, {
          method: 'POST',
          body: JSON.stringify({ post_sid: postSid, member_sid: memberId }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((r) => r.json())
          .then((data) => {
            // console.log(data);
          });
      } else {
        setLikeAmount(likeAmount - 1);
        const delR = fetch(
          `${process.env.API_SERVER}/forum-api/forum/likeDel`,
          {
            method: 'DELETE',
            body: JSON.stringify({ post_sid: postSid, member_sid: memberId }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
          .then((r) => r.json())
          .then((data) => {
            // console.log(data);
          });
      }
    } else {
      router.push(`/member/sign-in?from=${from}`);
    }
  };

  // 收藏功能
  useEffect(() => {
    console.log(auth);

    // 判斷此會員有沒有收藏過文章
    if (auth.id) {
      fetch(
        `${process.env.API_SERVER}/forum-api/forum/favStatus?post_sid=${postSid}&member_sid=${auth.id}`,
        {
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        }
      )
        .then((r) => r.json())
        .then((data) => {
          data.length === 0 ? setFav(false) : setFav(true);
          // console.log('data', data);
        });
    }
  }, [auth]);
  // 收藏及取消收藏的函數
  const handleFavClick = (listText) => {
    if (auth.id) {
      console.log('add-delete');
      console.log('Fav', Fav);
      const apiEndpoint = Fav
        ? '/forum-api/forum/delFav'
        : '/forum-api/forum/addFav';
      const requestData = {
        post_sid: postSid,
        member_sid: memberId,
        list_name: listText ? listText : listName,
      };

      fetch(`${process.env.API_SERVER}${apiEndpoint}`, {
        method: Fav ? 'DELETE' : 'POST',
        body: JSON.stringify(requestData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log('add fav result:', data);
        });
    } else {
      router.push(`/member/sign-in?from=${from}`);
    }
  };

  // 收藏按讚前要登入會員
  const goLogin = () => {
    const from = router.asPath;
    router.push(`/member/sign-in?from=${from}`);
  };

  // 下拉選單
  const [items, setItems] = useState([]); // 初始化 items 狀態為一個空陣列

  // 定義 fetchData 函式
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const fetchData = async (obj = {}) => {
    const usp = new URLSearchParams(obj);
    const response = await fetch(
      `${
        process.env.API_SERVER
      }/forum-api/forum/blog/favlist?${usp.toString()}`,
      {
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      }
    )
      .then((r) => r.json())
      .then((data) => {
        setData(data);
        console.log(data);
        setNewData(data.rows);
        setItems(data.items); // 設定 items 的值為 data.items
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
  }, [auth]);
  // 下拉選單：熱門/最新
  const handleMenuClick = (e) => {
    const { key } = e; // 獲取點選的下拉選單項目的 key
    setListName(key);
    setNewData(newData);
    setObText(key);
  };

  const listNameDown = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className={Style.articleBody}>
      <div className={Style.articleContent}>
        <div className={Style.postContent}>{postContent}</div>
      </div>
      <div className={Style.articleDatas}>
        <div className={Style.postLike}>
          {auth.id ? (
            <FontAwesomeIcon
              onClick={handleLikeClick}
              icon={faHeart} // 使用 faHeart 圖示作為愛心圖示
              className={isLiked ? Style.likeRed : Style.likeGray} // 根據按讚狀態切換愛心的顏色
            />
          ) : (
            <FavListAlert
              btnType="heart"
              title="前往登入頁面"
              content="按讚功能需要登入會員噢～是否前往登入頁面？"
              confirmHandler={goLogin}
            />
          )}

          <p className={Style.postNum}>{likeAmount}</p>
        </div>
        <div className={Style.postCom}>
          <FontAwesomeIcon icon={faCommentDots} className={Style.comment} />
          <p className={Style.postNum}>{comments}</p>
        </div>
        {/*根據收藏狀態切換顏色 */}
        {/* {auth.id ? (
          <FontAwesomeIcon
            onClick={handleFavClick}
            icon={faBookmark}
            className={Fav ? Style.favoriteGreen : Style.favoriteGray}
          />
        ) : (
          <FavListAlert btnType="bookmark" title = '前往登入頁面' content='收藏功能需要登入會員噢～是否前往登入頁面？' confirmHandler={goLogin}/>
        )} */}

        {/*根據收藏狀態切換顏色 */}
        {auth.id ? (
          <FavListAlert
            btnType="bookmark"
            title="收藏"
            content="建立收藏列表清單"
            inputText="新增收藏列表名稱"
            menuProps={listNameDown}
            obText={obText}
            Fav={Fav}
            setFav={setFav}
            confirmHandler={handleFavClick}
            // color={Fav ? `Style.favoriteGreen` : `Style.favoriteGray`}
          />
        ) : (
          <Modal
            btnType="bookmark"
            title="前往登入頁面"
            content="收藏功能需要登入會員噢～是否前往登入頁面？"
            confirmHandler={goLogin}
            inputText=""
          />
        )}
        {/*)} */}
      </div>
    </div>
  );
}
