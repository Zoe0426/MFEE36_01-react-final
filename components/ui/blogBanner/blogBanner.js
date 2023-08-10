import React from 'react';
import Style from './blogBanner.module.css';
import SearchBar from '../buttons/SearchBar';
import BGUpperDecoration from '../decoration/bg-upper-decoration';
import BlogAuthor from '../blogAuthor/blogAuthor';



export default function BlogBanner(
  {changeHandler=()=>{}, 
  clickHandler=()=>{}, 
  keyDownHandler=()=>{},
  inputText=''
}
) {
  return (
    <>
    <div className={Style.bannerWhole}>
      <div className={Style.banner}>
        <img className={Style.bannerImg} src="/forum_img/new banner.png" />
        <div className={Style.searchArea}>
          <div className={Style.searchBar}>
              <SearchBar placeholder = '搜尋寵物相關文章' btn_text = '搜尋文章' inputText={inputText}
              changeHandler={changeHandler} 
              clickHandler={clickHandler} 
              keyDownHandler={keyDownHandler}>
            </SearchBar>
          </div>
      </div>
        <div  className={Style.blogDec}>
          <BGUpperDecoration/>     
        </div>
      </div>
    </div>
    
    </>
  )
}
