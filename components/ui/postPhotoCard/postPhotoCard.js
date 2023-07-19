import React from 'react'
import Style from './postPhotoCard.module.css'

export default function PostPhotoCard({img='', boardImg='', boardName='', bc='',title='', content=''}) {


  switch (boardName){
    case '醫療板':
      bc='#B5DDA4';
      // console.log("board_name='醫療板':#B5DDA4");
      break;
    case '住宿板':
      bc='#587D71';
      // console.log("board_name='住宿板':#587D71");
      break;
    case '景點板':
      bc='#FFD1BA';
      // console.log("board_name='景點板':#FFD1BA");
      break;
    case '美容板':
      bc='#A6CFD5';
      // console.log("board_name='美容板':#A6CFD5");
      break;
    case '狗貓聚板':
      bc='#EFBCD5';
      // console.log("board_name='狗貓聚板':#EFBCD5");
      break;
    case '毛孩日記板':
      bc='#92B4A7';
      // console.log("board_name='毛孩日記板':#92B4A7");
      break;
    case '學校板':
      bc='#BE97C6';
      // console.log("board_name='學校板':#BE97C6");
      break;
    case '餐廳板':
      bc='#FFE381';
      // console.log("board_name='餐廳板':#FFE381");
      break;
    case '好物板':
      bc='#6F8695';
      // console.log("board_name='好物板':#6F8695");
      break;
    case '幼犬貓板':
      bc='#BDDBD0';
      // console.log("board_name='幼犬貓板':#BDDBD0");
      break;
    case '老犬貓板':
      bc='#F4B393';
      // console.log("board_name='老犬貓板':#F4B393");
      break;
  }
  return (
    <div className={Style.card}>
        <div className={Style.sticker}></div>
        <div className={Style.top}><img className={Style.img} src={img}/></div>
        <div className={Style.boardName} style={{'background':`${bc}`}}>
          <img className={Style.boardImg} src={boardImg}></img>
          {boardName}
        </div>
        <div className={Style.title}>{title}</div>
        <div className={Style.content}>{content}</div>      
    </div>
  )
}
