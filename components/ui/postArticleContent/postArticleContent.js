import React from 'react'
import Style from './postArticleContent.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart, faCommentDots, faBookmark} from '@fortawesome/free-solid-svg-icons';

export default function PostArticleContent({postContent='', likes='', comments=''}) {
  return (
    <div className={Style.articleBody}>
    <div className={Style.articleContent}>
        <div className={Style.postContent}>{postContent}</div>
    </div>
    <div className={Style.articleDatas}>
            <div className={Style.postLike}>
                <FontAwesomeIcon icon={faHeart} className={Style.like}/>
                <p className={Style.postNum}>{likes}</p>                        
            </div>
            <div className={Style.postCom}>
                <FontAwesomeIcon icon={faCommentDots} className={Style.comment}/>
                <p className={Style.postNum}>{comments}</p>                        
            </div>
        <FontAwesomeIcon icon={faHeart} className={Style.likeGray}/>
        <FontAwesomeIcon icon={faBookmark} className={Style.favoriteGray}/>
    </div>
    </div>
  )
}
