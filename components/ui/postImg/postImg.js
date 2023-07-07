import React from 'react'
import Style from './postImg.module.css'

export default function PostImg({img=''}) {
  return(
      <img className={Style.imgPic} src={img}/>
  )
}
