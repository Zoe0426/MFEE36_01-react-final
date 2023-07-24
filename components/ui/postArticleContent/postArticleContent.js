import React, {useState} from 'react'
import Style from './postArticleContent.module.css';
// import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart, faCommentDots, faBookmark, faShareNodes} from '@fortawesome/free-solid-svg-icons';


export default function PostArticleContent({postContent='', likes=0, comments=0, isLiked=false, setIsLiked=()=>{}, postSid='', memberId=''}) {

  const [likeAmount, setLikeAmount] = useState(likes);
  
  
  // 按讚與取消讚的處理函數
  const handleLikeClick = () => {
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
        
        <FontAwesomeIcon icon={faBookmark} className={Style.favoriteGray}/>
        <FontAwesomeIcon icon={faShareNodes} className={Style.shareGray}/>
    </div>
    </div>
  )
}
