import React from 'react'
import Style from './blogPost.module.css'
import PostCard from '../PostCard/postCard'

export default function BlogPost({Date=''}) {
  return (
    <div className={Style.blogCon}>
        <div className={Style.date}>{Date}</div>
        <PostCard profile='/forum_img/victor-grabarczyk-N04FIfHhv_k-unsplash.jpg' boardName='寵物醫療版' author='莉莉安' postTitle='狗狗奇怪飲食癖' postContent='我最近真的很困擾，我的小狗總是會亂吃自己的大便，請告訴我該如何處理這個小狗飲食問題。非常感謝！' img='/forum_img/chris-smith-vCPF8e_-JPg-unsplash.jpg' likes='100' comments='50' favorites='10'/>
        <PostCard profile='/forum_img/kabo-p6yH8VmGqxo-unsplash.jpg' boardName='友善景點版' author='艾摩斯' postTitle='探索寵物友善的自然樂園
        ' postContent='在寵物友善的自然樂園中，與毛孩共度天倫之樂，放鬆心情，一同探索自然美景。快來享受難忘的時刻吧！' img='/forum_img/狗活動.jpeg' likes='300' comments='100' favorites='30'/>  
    </div>
  )
}
