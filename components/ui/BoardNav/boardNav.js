import React from 'react'
import Style from './boardNav.module.css'

export default function BoardNav() {
  return (
    <div className={Style.boardNavbar}>
      <div className={Style.boardNav}>
          <div><img className={Style.board} src="/forum_img/new看板1.svg" /></div>
          <div><img className={Style.board} src="/forum_img/new看板1.svg" /></div>
          <div><img className={Style.board} src="/forum_img/new看板1.svg" /></div>
          <div><img className={Style.board} src="/forum_img/new看板1.svg" /></div>
          <div><img className={Style.board} src="/forum_img/new看板1.svg" /></div>
          <div><img className={Style.board} src="/forum_img/new看板1.svg" /></div>
          <div><img className={Style.board} src="/forum_img/new看板1.svg" /></div>
          <div><img className={Style.board} src="/forum_img/new看板1.svg" /></div>
          <div><img className={Style.board} src="/forum_img/new看板1.svg" /></div>
      </div>
      <div className={Style.boardBTM}>
        <img className={Style.BTMimg} src="/forum_img/bannerBTM.png"/>
      </div>
    </div>
  )
}
