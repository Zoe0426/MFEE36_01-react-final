
import React, {useState}  from 'react';
import Style from './blogBoardNav.module.css';
import SubBtnBoard from '../buttons/subBtnBoard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronRight,faChevronLeft} from '@fortawesome/free-solid-svg-icons';

export default function BlogBoardNav({changeBoardSid, boardSid=1
}) {
  console.log('nav BoardSid', boardSid)
  const [move, setMove] = useState(0);
  const right = ()=>{
    setMove(1)
  }
  const left = ()=>{
    setMove(0)
  }
  return (
    <div className={Style.boardNavbar}>
      <div className={Style.boardNav}>
        <div className={Style.nav}>
        <div className={Style.left}>
          <FontAwesomeIcon icon={faChevronLeft} onClick={left}/>
        </div>
        <div className={Style.navHidden}>
          <div className={Style.boardRange} style={{ left: move === 1 ? '-650px' : '0',  transition: 'left 0.3s ease-in-out'}}>
            <div className={Style.board} >
              <SubBtnBoard img="/forum_img/board_img/寵物醫療版.png" text="醫療板" boardSid={boardSid} isFill={boardSid===1?true:false} subBtnHandler={()=>{
                changeBoardSid(1)
              }}/>
            </div>
            <div className={Style.board} >
              <SubBtnBoard img="/forum_img/board_img/住宿版.png" text="住宿板" boardSid={boardSid} isFill={boardSid===2?true:false} subBtnHandler={()=>{
                changeBoardSid(2)
              }}/>
            </div>
            <div className={Style.board} >
              <SubBtnBoard img="/forum_img/board_img/景點版.png" text="景點板" boardSid={boardSid} isFill={boardSid===3?true:false} subBtnHandler={()=>{
                changeBoardSid(3)
              }}/>
            </div>
            <div className={Style.board} >
              <SubBtnBoard img="/forum_img/board_img/餐廳版.png" text="餐廳板" boardSid={boardSid} isFill={boardSid===8?true:false} subBtnHandler={()=>{
                changeBoardSid(8)
              }}/>
            </div>
            <div className={Style.board} >
              <SubBtnBoard img="/forum_img/board_img/美容版.png" text="美容板" boardSid={boardSid} isFill={boardSid===4?true:false} subBtnHandler={()=>{
                changeBoardSid(4)
              }}/>
            </div>
            <div className={Style.board} >
              <SubBtnBoard img="/forum_img/board_img/學校版.png" text="學校板" boardSid={boardSid} isFill={boardSid===7?true:false} subBtnHandler={()=>{
                changeBoardSid(7)
              }}/>
            </div>
            <div className={Style.board} >
              <SubBtnBoard img="/forum_img/board_img/狗貓聚.png" text="狗貓聚板" boardSid={boardSid} isFill={boardSid===5?true:false} subBtnHandler={()=>{
                changeBoardSid(5)
              }}/>
            </div>
            <div className={Style.board} >
              <SubBtnBoard img="/forum_img/board_img/幼犬貓板.png" text="幼犬貓板" boardSid={boardSid} isFill={boardSid===11?true:false} subBtnHandler={()=>{
                changeBoardSid(11)
              }}/>
            </div>
            <div className={Style.board} >
              <SubBtnBoard img="/forum_img/board_img/老狗貓版.png" text="老犬貓板" boardSid={boardSid} isFill={boardSid===12?true:false} subBtnHandler={()=>{
                changeBoardSid(12)
              }}/>
            </div>
            <div className={Style.board} >
              <SubBtnBoard img="/forum_img/board_img/好物分享版.png" text="好物板" boardSid={boardSid} isFill={boardSid===9?true:false} subBtnHandler={()=>{
                changeBoardSid(9)
              }}/>
            </div>
            <div className={Style.board} >
              <SubBtnBoard img="/forum_img/board_img/毛孩日記版.png" text="毛孩日記板" boardSid={boardSid} isFill={boardSid===6?true:false} subBtnHandler={()=>{
                changeBoardSid(6)
              }}/>
            </div>
            </div>
            </div>
            <div className={Style.right}>
              <FontAwesomeIcon icon={faChevronRight} onClick={right}/>
            </div>
        </div>
      </div>
    </div>
  );
}

