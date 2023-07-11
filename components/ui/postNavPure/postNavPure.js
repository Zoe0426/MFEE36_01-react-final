import React from 'react'
import Style from './postNavPure.module.css'

export default function PostNavPure({postNav=''}) {
  return (
    <div className={Style.postNav}>
      <div className={Style.postNavText}>{postNav}</div>
    </div>
  )
}
