import React from 'react';
import Style from './blogBanner.module.css';
import SearchBar from '../buttons/SearchBar';
import BlogDecoration from './blogDecoration';
import BlogAuthor from '../blogAuthor/blogAuthor';



export default function BlogBanner() {
  return (
    <>
    <div className={Style.banner}>
      <img className={Style.bannerImg} src="/forum_img/new banner.png" />
    </div>
    <div className={Style.searchArea}>
      <div className={Style.searchBar}>
          <SearchBar placeholder = '搜尋寵物相關文章' btn_text = '搜尋文章'></SearchBar>
          <BlogAuthor profile='/forum_img/victor-grabarczyk-N04FIfHhv_k-unsplash.jpg' author='莉莉安' id='@lilian'/>
      </div>
      <div className={Style.blogDec}>
        <BlogDecoration/>     
      </div>
    </div>
    
    </>
  )
}
