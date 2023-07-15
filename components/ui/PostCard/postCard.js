import React from "react";
import Style from "./postCard.module.css";
import PostImg from "../postImg/postImg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart, faCommentDots, faBookmark} from '@fortawesome/free-solid-svg-icons';
export default function PostCard({profile='', boardName='', author='', postTitle='', postContent='', img='', likes='', comments='', favorites=''}){
    return(
        <>
        <div className={Style.cardBody}>
            <div className={Style.left}>
                <div className={Style.author}>
                    <div className={Style.profile}><img className={Style.proImg} src={profile} alt=''/></div>
                    <div className={Style.aut}>{boardName} · {author}</div>
                </div>
                <div className={Style.postTit}>{postTitle}</div>
                <div className={Style.postCon}>{postContent}</div>
            <div>
            <div className={Style.postData}>
                <div className={Style.postLike}>
                    <FontAwesomeIcon icon={faHeart} className={Style.like}/>
                    <p>{likes}</p>                        
                </div>
                <div className={Style.postCom}>
                    <FontAwesomeIcon icon={faCommentDots} className={Style.comment}/>
                    <p>{comments}</p>                        
                </div>
                <div className={Style.postFav}>
                    <FontAwesomeIcon icon={faBookmark} className={Style.favorite}/>
                    <p>{favorites}</p>
                </div>
            </div>
                </div>
            </div>
            <div><img className={Style.postImg} src={img} alt=''/></div>
        </div>
        </>
    )
}