import React from 'react'
import Style from './postCommentBtn.module.css'

export default function PostCommentBtn({text='', bc=''}) {
  return (
    <>
    <div style={{'background':`${bc}`}} className={Style.postCommentBtn}>{text}</div>   
    </>
  )
}
