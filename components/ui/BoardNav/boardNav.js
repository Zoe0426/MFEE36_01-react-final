import React from 'react'
import Style from './boardNav.module.css'
import SubBtn from '../buttons/subBtn'
import PostAuthorBTN from '../postAuthorBtn/postAuthorBtn'

export default function BoardNav() {
  return (
    <div className={Style.boardNavbar}>
      <div className={Style.boardNav}>
      <div className={Style.nav}>
        <div className={Style.author}>
          <PostAuthorBTN img = '/forum_img/board_img/個人頁面shadow.png' text = '個人頁面'/>
        </div>
        <div className={Style.boardRange}>
            <div className={Style.board}>
              <SubBtn img = '/forum_img/board_img/寵物醫療版.png' text ='醫療板'/>
            </div>
            <div className={Style.board}>
              <SubBtn img = '/forum_img/board_img/住宿版.png' text ='住宿板'/>
            </div>
            <div className={Style.board}>
              <SubBtn img = '/forum_img/board_img/景點版.png' text ='景點板'/>
            </div>
            <div className={Style.board}>
              <SubBtn img = '/forum_img/board_img/餐廳版.png' text ='餐廳板'/>
            </div>
            <div className={Style.board}>
              <SubBtn img = '/forum_img/board_img/美容版.png' text ='美容板'/>
            </div>
            <div className={Style.board}>
              <SubBtn img = '/forum_img/board_img/學校版.png' text ='學校板'/>
            </div>
            <div className={Style.board}>
              <SubBtn img = '/forum_img/board_img/狗貓聚.png' text ='狗貓聚板'/>
            </div>
            <div className={Style.board}>
              <SubBtn img = '/forum_img/board_img/幼犬貓板.png' text ='幼犬貓板'/>
            </div>
            <div className={Style.board}>
              <SubBtn img = '/forum_img/board_img/老狗貓版.png' text ='老犬貓板'/>
            </div>
            <div className={Style.board}>
              <SubBtn img = '/forum_img/board_img/好物分享版.png' text ='好物板'/>
            </div>
            <div className={Style.board}>
              <SubBtn img = '/forum_img/board_img/毛孩日記版.png' text ='毛孩日記板'/>
            </div>
          </div>
      </div>
        </div>
        <div className={Style.boardBTM}>
          <img className={Style.BTMimg} src="/forum_img/bannerBTM.png"/>
        </div>
    </div>
  )
}
