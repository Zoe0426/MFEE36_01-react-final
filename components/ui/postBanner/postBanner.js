import React from 'react';
import Style from './postBanner.module.css';
import SearchBar from '../buttons/SearchBar';


export default function PostBanner({changeHandler=()=>{}, 
clickHandler=()=>{}, 
keyDownHandler=()=>{},
inputText=''
}) {
  return (
    <>
    <div className={Style.banner}>
      <img className={Style.bannerImg} src="/forum_img/new banner.png" />
    </div>
    <div className={Style.searchArea}>
      <SearchBar placeholder = '搜尋寵物相關文章' btn_text = '搜尋文章' inputText={inputText}
      changeHandler={changeHandler} 
      clickHandler={clickHandler} 
      keyDownHandler={keyDownHandler}> </SearchBar>
    </div>
    
    </>
  )
}
