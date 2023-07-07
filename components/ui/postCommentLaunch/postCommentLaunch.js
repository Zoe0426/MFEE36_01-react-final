import React from 'react'
import Style from './postCommentLaunch.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart,faBookmark} from '@fortawesome/free-solid-svg-icons';

export default function PostCommentLaunch({profile=''}) {
  return (
    <div className={Style.comments}>
        <div className={Style.commentBody}>
            <div className={Style.author}>
                <div className={Style.profile}><img className={Style.proImg} src={profile}/></div>
                <p className={Style.comment}>撰寫留言...</p>
                <div className={Style.icon}>
                <FontAwesomeIcon icon={faHeart} className={Style.likeGray}/>
                <FontAwesomeIcon icon={faBookmark} className={Style.favoriteGray}/>
                </div>
            </div>
        </div>
    </div>
  )
}
