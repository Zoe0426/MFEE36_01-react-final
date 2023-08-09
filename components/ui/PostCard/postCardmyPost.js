import React from "react";
import Style from "./postCardDraft.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart, faCommentDots, faBookmark , faTrashCan, faEye, faPen} from '@fortawesome/free-solid-svg-icons';
export default function PostCardBlog({profile='', boardName='', author='', postTitle='', postContent='', img='', likes='', comments='', favorites='', deletePost=()=>{}, viewPost=()=>{}, editPost=()=>{}}){
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

            {/* 顯示 icon 容器 */}
            <div className={Style.iconContainer}>
            {/* 刪除、查看、編輯 icon */}
            <div className={Style.icon} onClick={deletePost}>
                <div><FontAwesomeIcon icon={faTrashCan} /></div>
                <div className={Style.word}>刪除</div>
            </div>
            <div className={Style.icon} onClick={viewPost}>
                <div><FontAwesomeIcon icon={faEye} /></div>
                <div className={Style.word}>查看</div>
            </div>
            <div className={Style.icon} onClick={editPost}>
                <div><FontAwesomeIcon icon={faPen} /></div>
                <div className={Style.word}>編輯</div>
            </div>
            </div>
        </div>
        </>
    )
}