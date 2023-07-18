import React from 'react'
import Style from './postNav.module.css'
import PostFilter from '../postFilter/postFilter'

export default function PostNav({postNav='', optionCh='', op1=''}) {
  return (
    <div className={Style.postNav}>
      <div className={Style.postNavText}>{postNav}</div>
      <select name="" id="" className={Style.filter}>
        <option className={Style.option} value="1">{optionCh}</option>
        <option className={Style.option} value="2">{op1}</option>
      </select>
    </div>
  )
}
