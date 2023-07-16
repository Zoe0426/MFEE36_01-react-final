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
  
  // 用switch的方式判斷bg的顏色（在bg裡面塞function）
  var bc = data.bc;
  let bgc = ()=>{
    switch (bc){
      case data.board_name='醫療板':
        bc='#B5DDA4';
        console.log("board_name='醫療板':#B5DDA4");
        break;
      case data.board_name='住宿板':
        bc='#587D71';
        console.log("board_name='住宿板':#587D71");
        break;
      case data.board_name='景點板':
        bc='#FFD1BA';
        console.log("board_name='景點板':#FFD1BA");
        break;
      case data.board_name='美容板':
        bc='#A6CFD5';
        console.log("board_name='美容板':#A6CFD5");
        break;
      case data.board_name='狗貓聚板':
        bc='#EFBCD5';
        console.log("board_name='狗貓聚板':#EFBCD5");
        break;
      case data.board_name='毛孩日記板':
        bc='#92B4A7';
        console.log("board_name='毛孩日記板':#92B4A7");
        break;
      case data.board_name='學校板':
        bc='#BE97C6';
        console.log("board_name='學校板':#BE97C6");
        break;
      case data.board_name='餐廳板':
        bc='#FFE381';
        console.log("board_name='餐廳板':#FFE381");
        break;
      case data.board_name='好物板':
        bc='#6F8695';
        console.log("board_name='好物板':#6F8695");
        break;
      case data.board_name='幼犬貓板':
        bc='#BDDBD0';
        console.log("board_name='幼犬貓板':#BDDBD0");
        break;
      case data.board_name='老犬貓板':
        bc='#F4B393';
        console.log("board_name='老犬貓板':#F4B393");
        break;
    }

  }

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
      bc= {bgc()}
      title={v.post_title} 
      content={v.post_content}/>
    ))}

    </div>
    </div>       
</div>
  )
}
