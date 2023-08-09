import React from 'react'
import Style from './postNav.module.css'
import PostFilter from '../postFilter/postFilter'

export default function PostNav({postNav='', optionCh='', op1=''}) {
  return (
    <div className={Style.postNav}>
      <div className={Style.postNavText}>{postNav}</div>
    </div>
  )
}
