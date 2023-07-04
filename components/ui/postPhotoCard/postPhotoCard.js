import React from 'react'
import Style from './postPhotoCard.module.css'

export default function PostPhotoCard({img='', boardName='', bc='',title='', content=''}) {
  return (
    <div className={Style.card}>
        <div className={Style.sticker}></div>
        <div className={Style.top}><img className={Style.img} src={img}/></div>
        <div className={Style.boardName} style={{'background':`${bc}`}}>{boardName}</div>
        <div className={Style.title}>{title}</div>
        <div className={Style.content}>{content}</div>      
    </div>
  )
}
