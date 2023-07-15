import React, { useEffect, useState } from 'react'
import Style from '@/styles/index.module.css'
import PostCard from '@/components/ui/PostCard/postCard'
import PostBanner from '@/components/ui/postBanner/postBanner'
import BoardNav from '@/components/ui/BoardNav/boardNav'
import PostNav from '@/components/ui/postNav/postNav'
import PostPhotoCard from '@/components/ui/postPhotoCard/postPhotoCard'
import PostBottom from '@/components/ui/postBottom/postBottom'
export default function Post() {
  const [forumData, setForumData] = useState([]);
  const fetchData = async()=>{
    const response = await fetch ('http://localhost:3002/forum-api', {method:"GET"});
    const forumData = await response.json();
    setForumData(forumData);
    console.log('forumData', forumData);
  };
  useEffect(()=>{
    fetchData();  
  }, []);

  

  return (
    <>
      <div className="container-outer">
        <div className={Style.body}>
          <PostBanner/>
          <BoardNav/>
          <div className="container-inner">
          <PostNav postNav='熱門文章' optionCh='熱門文章' op1='最新文章'/>
          {forumData.map((v)=>(
           
            <PostCard key={v.post_sid}
            profile='./forum_img/victor-grabarczyk-N04FIfHhv_k-unsplash.jpg' 
            boardName={v.board_name} 
            author={v.nickname}
            postTitle={v.post_title} 
            postContent={v.post_content} 
            img={`http://localhost:3000/forum_img/post_img/${v.file}`} 
            likes={v.postLike} 
            comments={v.postComment} 
            favorites={v.postFavlist}/>
      
            
  ))}         
           </div>
          <PostBottom/>
        </div>
        </div>
    </>
  )
}
