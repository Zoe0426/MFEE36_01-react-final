import React from 'react'
import Style from './blogAuthor.module.css'

export default function BlogAuthor({profile='', author='', id=''}) {
  return (
    <div className={Style.articleTop}>
        <img className={Style.profile} src={profile}/>
        <div className={Style.author}>
            <div className={Style.nickname}>{author}</div>
            <div className={Style.id}>{id}</div>
        </div>
    </div>
  )
}
