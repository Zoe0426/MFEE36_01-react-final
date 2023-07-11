import React from 'react';
import Style from './postBanner.module.css';
import SearchBar from '../buttons/SearchBar';


export default function PostBanner() {
  return (
    <>
    <div className={Style.banner}>
      <img className={Style.bannerImg} src="/forum_img/new banner.png" />
    </div>
    <div className={Style.searchArea}>
      <SearchBar placeholder = '搜尋寵物相關文章' btn_text = '搜尋文章'></SearchBar>
    </div>
    
    </>
  )
}
