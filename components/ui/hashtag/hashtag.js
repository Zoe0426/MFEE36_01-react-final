import React from 'react'
import Style from './hashtag.module.css'

export default function Hashtag({text=''}) {
  return (
    <div className={Style.body}>
        <div className={Style.hashtag}>#{text}</div>   
    </div>
  )
}
