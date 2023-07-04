import React from 'react';
import Style from './postBanner.module.css'; 


export default function PostBanner() {
  return (
    <>
    <div className={Style.banner}>
    <img className={Style.bannerImg} src="/forum_img/new banner.png" />
    </div>
    <div className={Style.input}></div>
    </>
  )
}
