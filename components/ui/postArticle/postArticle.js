import React from 'react'
import Style from './postArticle.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleChevronLeft, faShareNodes} from '@fortawesome/free-solid-svg-icons';

export default function PostArticle({navTitle='', profile='', author='', id='', postTitle='',boardImg='', board='', time=''}) {
  return (
    <>
    <div className={Style.postNav}>
        <FontAwesomeIcon className={Style.navPre} icon={faCircleChevronLeft}/>
        <div className={Style.navTitle}>{navTitle}</div>
        <FontAwesomeIcon className={Style.navShare} icon={faShareNodes} />
    </div>
    <div className={Style.article}>
        <div className={Style.articleTop}>
            <img className={Style.profile} src={profile}/>
            <div className={Style.author}>
                <div className={Style.nickname}>{author}</div>
                <div className={Style.id}>{id}</div>
            </div>
        </div>
        <div>
            <div className={Style.articleTitle}>{postTitle}</div>
            <div className={Style.articleDetail}>
                <img className={Style.boardImg} src={boardImg}/>
                <div className={Style.board}>{board}</div>  
                <div className={Style.time}>{time}</div>          
            </div>
        </div>
    </div>
    </>
  )
}
