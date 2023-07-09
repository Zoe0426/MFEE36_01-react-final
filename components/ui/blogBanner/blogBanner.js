import React from 'react';
import Style from './blogBanner.module.css';
import SearchBar from '../buttons/SearchBar';
import BlogDecoration from './blogDecoration';



export default function BlogBanner() {
  return (
    <>
    <div className={Style.banner}>
      <img className={Style.bannerImg} src="/forum_img/new banner.png" />
    </div>
    <div className={Style.searchArea}>
      <SearchBar placeholder = '搜尋寵物相關文章' btn_text = '搜尋文章'></SearchBar>
      <BlogDecoration/>     
    </div>
    
    </>
  )
}
