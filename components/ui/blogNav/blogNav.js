import React from 'react'
import Style from './blogNav.module.css'

export default function BlogNav({blogNav='', postNum=''}) {
  return (
    <div className={Style.postNav}>
      <div className={Style.postNavText}>{blogNav}</div>
      <div className={Style.postNum}>總計{postNum}篇文章</div>
    </div>
  )
}
