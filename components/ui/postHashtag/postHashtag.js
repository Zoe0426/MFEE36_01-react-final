import React from 'react'
import Style from './postHashtag.module.css'

export default function PostHashtag({text=''}) {
  return (
    <div className={Style.body}>
        <div className={Style.hashtag}>#{text}</div>   
    </div>
  )
}
