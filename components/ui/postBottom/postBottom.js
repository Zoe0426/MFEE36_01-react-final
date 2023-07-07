import React from 'react'
import Style from './postBottom.module.css'
import PostPhotoCard from '../postPhotoCard/postPhotoCard'

export default function PostBottom() {
  return (
<div className={Style.bottom}>
    <div className={Style.bottomWord}>＃你可能感興趣的文章</div>
    <img className={Style.wave} src="/forum_img/wave.png"/>
    <div className={Style.bottomBlock}>
    <div className={Style.bottomContent}>
        <PostPhotoCard img='/forum_img/chris-smith-vCPF8e_-JPg-unsplash.jpg' boardName='#友善景點版' bc='green' title='寵物友善景點推薦' content='十分推薦新莊寵物公園！就在新月橋附近，可以帶毛小孩去跑跑也可以...'/>
        <PostPhotoCard img='/forum_img/chris-smith-vCPF8e_-JPg-unsplash.jpg' boardName='#友善景點版' bc='green' title='寵物友善景點推薦' content='十分推薦新莊寵物公園！就在新月橋附近，可以帶毛小孩去跑跑也可以...'/>
        <PostPhotoCard img='/forum_img/chris-smith-vCPF8e_-JPg-unsplash.jpg' boardName='#友善景點版' bc='green' title='寵物友善景點推薦' content='十分推薦新莊寵物公園！就在新月橋附近，可以帶毛小孩去跑跑也可以...'/>
    </div>
    </div>       
</div>
  )
}
