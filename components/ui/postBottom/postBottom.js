import React, {useEffect, useState } from 'react'
import Style from './postBottom.module.css'
import PostPhotoCard from '../postPhotoCard/postPhotoCard'

export default function PostBottom() {
  const [data, setData] = useState([]);
  const fetchData = async()=>{
    const response = await fetch ('http://localhost:3002/forum-api/recommend', {method:"GET"});
    const data = await response.json();
    setData(data);
    console.log('data',data);
  };
  useEffect(()=>{
    fetchData();
  }, []);

  return (
<div className={Style.bottom}>
    <div className={Style.bottomWord}>＃你可能感興趣的文章</div>
    <img className={Style.wave} src="/forum_img/wave.png"/>
    <div className={Style.bottomBlock}>
    <div className={Style.bottomContent}>
    {data.map((v)=>(

      <PostPhotoCard key={v.post_sid} 
      img={`http://localhost:3000/forum_img/post_img/${v.file}`} 
      boardImg={`http://localhost:3000/forum_img/board_img/${v.board_img}`}
      boardName={v.board_name} 
      bc='var(--main)' 
      title={v.post_title} 
      content={v.post_content}/>
    ))}

    </div>
    </div>       
</div>
  )
}
