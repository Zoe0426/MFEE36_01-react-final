import React from 'react'
import Style from './blogBoardNav.module.css'
import SubBtn from '../buttons/subBtn'
import PostAuthorBTN from '../postAuthorBtn/postAuthorBtn'
import BlogDecoration from '../blogBanner/blogDecoration'

export default function BlogBoardNav({doctor,home,site,restaurant,salon,school,hang,young,old,product,diary}) {
  return (
    <div className={Style.boardNavbar}>
      <div className={Style.boardNav}>
      <div className={Style.nav}>

        <div className={Style.boardRange}>
            <div className={Style.board} onClick={doctor}>
              <SubBtn img = '/forum_img/board_img/寵物醫療版.png' text ='醫療板'/>
            </div>
            <div className={Style.board} onClick={home}>
              <SubBtn img = '/forum_img/board_img/住宿版.png' text ='住宿板'/>
            </div>
            <div className={Style.board} onClick={site}>
              <SubBtn img = '/forum_img/board_img/景點版.png' text ='景點板'/>
            </div>
            <div className={Style.board} onClick={restaurant}>
              <SubBtn img = '/forum_img/board_img/餐廳版.png' text ='餐廳板'/>
            </div>
            <div className={Style.board} onClick={salon}>
              <SubBtn img = '/forum_img/board_img/美容版.png' text ='美容板'/>
            </div>
            <div className={Style.board} onClick={school}>
              <SubBtn img = '/forum_img/board_img/學校版.png' text ='學校板'/>
            </div>
            <div className={Style.board} onClick={hang}>
              <SubBtn img = '/forum_img/board_img/狗貓聚.png' text ='狗貓聚板'/>
            </div>
            <div className={Style.board} onClick={young}>
              <SubBtn img = '/forum_img/board_img/幼犬貓板.png' text ='幼犬貓板'/>
            </div>
            <div className={Style.board} onClick={old}>
              <SubBtn img = '/forum_img/board_img/老狗貓版.png' text ='老犬貓板'/>
            </div>
            <div className={Style.board} onClick={product}>
              <SubBtn img = '/forum_img/board_img/好物分享版.png' text ='好物板'/>
            </div>
            <div className={Style.board} onClick={diary}>
              <SubBtn img = '/forum_img/board_img/毛孩日記版.png' text ='毛孩日記板'/>
            </div>
          </div>
      </div>
        </div>
    </div>
  )
}
