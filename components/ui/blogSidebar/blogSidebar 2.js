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
          <BlogFuncBtn img='/forum_img/blog_func_img/發布文章.png' func='發布文章'/>
          <BlogFuncBtn img='/forum_img/blog_func_img/草稿夾.png' func='  草稿夾'/>
          <BlogFuncBtn img='/forum_img/blog_func_img/成效分析.png' func='成效分析'/>
        </div>
        </div>
      </div>
    </>
  );
}
