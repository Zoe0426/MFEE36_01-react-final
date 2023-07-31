import React, {useState,useContext,useEffect} from 'react'
import { useRouter } from 'next/router'
import AuthContext from '@/context/AuthContext'
import Style from './postArticleContent.module.css';
// import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart, faCommentDots, faBookmark, faShareNodes} from '@fortawesome/free-solid-svg-icons';
import Modal from '../modal/modal';


export default function PostArticleContent({postContent='', likes=0, comments=0, isLiked={setIsLiked}, setIsLiked=()=>{}, postSid='', memberId='', listName='', Fav={setFav}, setFav=()=>{}}) {

  // 判斷登入
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();
  const from = router.asPath;
  const { pathname } = router; //看路徑
  const {query} = router;

  // 記錄讚（+-1）
  const [likeAmount, setLikeAmount] = useState(likes);

  console.log(auth);
  
  // 按讚功能
  useEffect(()=>{
    console.log(auth);
  // 判斷這個會員有沒有按過這篇文章讚
  if(auth.id){
    fetch(`${process.env.API_SERVER}/forum-api/forum/favStatus?post_sid=${postSid}&member_sid=${auth.id}`, {
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
    .then((r) => r.json())
    .then((data)=>{
      data.length==0 ? setIsLiked(false):setIsLiked(true)
      console.log('data',data);
    });
  }
  },[auth]);
  // 按讚與取消讚的處理函數
    const handleLikeClick = () => {
      if(auth.id){
        setIsLiked(!isLiked); // 切換按讚狀態
        if(isLiked==false){
          setLikeAmount(likeAmount+1);
          const r = fetch(`${process.env.API_SERVER}/forum-api/forum/postLike`, {
            method:'POST',
            body:JSON.stringify(
              {post_sid:postSid,
              member_sid:memberId,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
      
            })
            .then((r) => r.json())
            .then((data)=>{
              console.log(data);
            })
          }else{
            setLikeAmount(likeAmount-1);
            const delR = fetch(`${process.env.API_SERVER}/forum-api/forum/likeDel`,{
              method:'DELETE',
              body:JSON.stringify(
              {post_sid:postSid,
              member_sid:memberId,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
      
            })
            .then((r) => r.json())
            .then((data)=>{
              console.log(data);
            })
          }

      }else{
        router.push(`/member/sign-in?from=${from}`);
      }
      }

    // 收藏功能
    useEffect(() => {
      console.log(auth);

      // 判斷此會員有沒有收藏過文章    
      if (auth.id) {
        fetch(`${process.env.API_SERVER}/forum-api/forum/favStatus?post_sid=${postSid}&member_sid=${auth.id}`, {
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        })
          .then((r) => r.json())
          .then((data) => {
            data.length === 0 ? setFav(false) : setFav(true);
            console.log('data', data);
          });
      }
    }, [auth]);
    // 收藏及取消收藏的函數
    const handleFavClick = () => {
      if (auth.id) {
        setFav(!Fav); // 切換收藏狀態
        const apiEndpoint = Fav ? '/forum-api/forum/delFav' : '/forum-api/forum/addFav';
        const requestData = {
          post_sid: postSid,
          member_sid: memberId,
          list_name: listName,
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
            console.log(data);
          });
      } else {
        router.push(`/member/sign-in?from=${from}`);
      }
    };

    // 收藏按讚前要登入會員
    const goLogin = ()=>{  
      const from = router.asPath;
      router.push(`/member/sign-in?from=${from}`);
    }
    


  


  return (
    <div className={Style.articleBody}>
    <div className={Style.articleContent}>
        <div className={Style.postContent}>{postContent}</div>
    </div>
    <div className={Style.articleDatas}>
    <div className={Style.postLike} onClick={handleLikeClick}>
                <FontAwesomeIcon
                  icon={faHeart} // 使用 faHeart 圖示作為愛心圖示
                  className={isLiked ? Style.likeRed : Style.likeGray} // 根據按讚狀態切換愛心的顏色
                />
                <p className={Style.postNum}>{likeAmount}</p>                        
            </div>
            <div className={Style.postCom}>
                <FontAwesomeIcon icon={faCommentDots} className={Style.comment}/>
                <p className={Style.postNum}>{comments}</p>                        
            </div>
        {/*根據收藏狀態切換顏色 */}
        {auth.id ? (
          <FontAwesomeIcon
            onClick={handleFavClick}
            icon={faBookmark}
            className={Fav ? Style.favoriteGreen : Style.favoriteGray}
          />
        ) : (
          <Modal btnType="bookmark" title = '前往登入頁面' content='收藏功能需要登入會員噢～是否前往登入頁面？' confirmHandler={goLogin}/>
        )}
        <FontAwesomeIcon icon={faShareNodes} className={Style.shareGray}/>
    </div>
    </div>
  )
}
