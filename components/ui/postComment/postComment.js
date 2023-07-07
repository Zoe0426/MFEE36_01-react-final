import React from 'react'
import Style from './postComment.module.css'

export default function PostComment({profile='',author='',comment='',floor='',date='',moreComments=''}) {
  return (
    <div className={Style.comments}>
        <div className={Style.commentBody}>
            <div className={Style.author}>
                <div className={Style.profile}><img className={Style.proImg} src={profile}/></div>
                <div className={Style.aut}>{author}</div>
            </div>
            <div>
                <p className={Style.comment}>{comment}</p>
            </div>
            <div className={Style.details}>
                <div className={Style.floor}>{floor}</div>
                <div className={Style.date}>{date}</div>
                <div className={Style.reply}>回覆</div>
            </div>
            <div>
                <div className={Style.moreComments}>⎯⎯⎯⎯⎯⎯⎯⎯ 查看其他{moreComments}則留言</div>
                <div className={Style.hideComment}>⎯⎯⎯⎯⎯⎯⎯⎯ 隱藏留言</div>
            </div>
        </div>
    </div>
  )
}
