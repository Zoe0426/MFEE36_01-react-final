import React from 'react';
import Styles from './blogSidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import BlogFuncBtn from '../blogFuncBtn/blogFuncBtn';

export default function BlogSidebar({profile='',memberName=''}) {
  return (
    <>
      <div className={Styles.sideBar}>
        <div className={Styles.memberInfo}>
          <div className={Styles.profile}>
            <img src={profile} alt="" />
          </div>
          <div className={Styles.member}>
            <div className={Styles.memberName}>{memberName}</div>
            <FontAwesomeIcon icon={faPen} />
          </div>
        </div>
        <div className={Styles.blogFunc}>
        <div className={Styles.func}>
          <BlogFuncBtn img='/forum_img/blog_func_img/我的文章.png' func='我的文章'/>
          <BlogFuncBtn img='/forum_img/blog_func_img/收藏文章.png' func='收藏文章'/>
          <BlogFuncBtn img='/forum_img/blog_func_img/毛孩日記.png' func='毛孩日記'/>
          <BlogFuncBtn img='/forum_img/blog_func_img/我的文章.png' func='我的文章'/>
        </div>
        </div>
        <div className={Styles.gameInfo}>
          <div className={Styles.gameImg}>
            <img
              src="/member-center-images/nn.jpg"
              alt=""
              className={Styles.gameImg}
            />
          </div>
          <div className={Styles.gameName}>爆擊小狗狗</div>
          <div className={Styles.gameLevel}>
            <img src="/member-center-images/Icon/crown.svg" alt="" />
            <div className={Styles.gameTitle}>Lv. 10</div>
          </div>
        </div>
      </div>
    </>
  );
}
