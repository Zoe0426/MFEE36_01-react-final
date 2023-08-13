import React from 'react';
import Styles from './blogSidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import BlogFuncBtn from '../blogFuncBtn/blogFuncBtn';
import Link from 'next/link';

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
          </div>
        </div>
        <div className={Styles.blogFunc}>
        <div className={Styles.func}>
        <Link href="http://localhost:3000/forum">
          <BlogFuncBtn img='/forum_img/blog_func_img/論壇首頁.png' func='論壇首頁'/>
        </Link>
        <Link href="http://localhost:3000/forum/blog">
          <BlogFuncBtn img='/forum_img/blog_func_img/我的文章.png' func='我的文章'/>
        </Link>
        <Link href="http://localhost:3000/forum/blog/postcollection">
          <BlogFuncBtn img='/forum_img/blog_func_img/收藏文章.png' func='收藏文章'/>
        </Link>
        <Link href="http://localhost:3000/forum/blog/diary">
          <BlogFuncBtn img='/forum_img/blog_func_img/毛孩日記.png' func='毛孩日記'/>
        </Link>
        <Link href="http://localhost:3000/forum/blog/post">
          <BlogFuncBtn img='/forum_img/blog_func_img/發布文章.png' func='發布文章'/>
        </Link>
        <Link href="http://localhost:3000/forum/blog/draft">
          <BlogFuncBtn img='/forum_img/blog_func_img/草稿夾.png' func=' 草稿夾'/>
        </Link>
        </div>
        </div>
      </div>
    </>
  );
}
