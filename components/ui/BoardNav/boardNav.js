import React, { useState } from 'react'
import Style from './boardNav.module.css'
import SubBtnBoard from '../buttons/subBtnBoard'
import BGUpperDecoration from '../decoration/bg-upper-decoration'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronRight,faChevronLeft} from '@fortawesome/free-solid-svg-icons';

export default function BoardNav({changeBoardSid, board_sid=1, img='',text='',PostAuthorBTNHandler=()=>{}}) {

  const [move, setMove] = useState(0);

  const moveBoard = () => {
    setMove(move === 0 ? 1 : 0); // 切换状态
  };

  return (
    <div className={Style.boardNavbar}>
      <div className={Style.boardNav}>
      <div className={Style.nav}>
      <div className={Style.author}>
      <Link href={`http://localhost:3000/forum/blog`}>
      <div className={Style.PostAuthorBTNHandler}>
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="333"
          height="316"
          fill="none"
          viewBox="0 0 333 316"
          className={Style.PostAuthorBTNHandler_outline}
      >
          <path
          onClick={PostAuthorBTNHandler}
          fill="#FD8C46"
          stroke="#5F231B"
          d="M192.085 8.237l.147-.478-.147.478C171.084 1.767 147.677-.386 125.823.82c-18.416 1.018-36.972 5.026-53.11 14.088l-.245-.436.245.436C53.503 25.69 40.964 44.57 31.834 64.162c-10.023 21.51-17.942 44.53-23.418 67.584-3.802 16.007-6.392 32.304-7.519 48.715-3.374 49.249 14.47 100.347 64.052 118.58 40.254 14.8 85.779 19.295 128.325 14.763 17.059-1.816 33.93-5.454 50.087-11.208l.023-.008.024-.006.02.081-.019-.081.003-.001.013-.003.054-.014a5.117 5.117 0 00.218-.058c.194-.052.482-.132.859-.242a73.143 73.143 0 003.261-1.046c2.804-.967 6.795-2.501 11.529-4.766 9.47-4.53 21.91-11.98 33.787-23.658 23.735-23.338 45.282-63.616 36.285-131.403l.052-.007-.053.003.21-.023h0l-.21.023-.001-.003-.001-.011-.006-.049-.026-.199c-.023-.176-.061-.44-.115-.787a67.191 67.191 0 00-.553-3.043c-.538-2.644-1.449-6.47-2.938-11.185-2.977-9.432-8.267-22.42-17.514-36.63-18.489-28.409-52.814-61.728-116.178-81.243z"
          ></path>
      </svg>
      <img className={Style.icon} src={img} alt="icon" />
      <p className={Style.text}>{text}</p>
      </div>
      </Link>
      </div>


      <div className={Style.boardHidden}>
        <div className={Style.boardRange} style={{ left: move === 1 ? '-650px' : '0' }}>
            <div className={Style.board}>
            <SubBtnBoard img="/forum_img/board_img/寵物醫療版.png" text="醫療板" board_sid={board_sid} isFill={board_sid===1?true:false} subBtnHandler={()=>{
              changeBoardSid(1)
            }}/>
            </div>
            <div className={Style.board}>
            <SubBtnBoard img="/forum_img/board_img/住宿版.png" text="住宿板" board_sid={board_sid} isFill={board_sid===2?true:false} subBtnHandler={()=>{
              changeBoardSid(2)
            }}/>
            </div>
            <div className={Style.board}>
            <SubBtnBoard img="/forum_img/board_img/景點版.png" text="景點板" board_sid={board_sid} isFill={board_sid===3?true:false} subBtnHandler={()=>{
              changeBoardSid(3)
            }}/>
            </div>
            <div className={Style.board}>
            <SubBtnBoard img="/forum_img/board_img/餐廳版.png" text="餐廳板" board_sid={board_sid} isFill={board_sid===8?true:false} subBtnHandler={()=>{
              changeBoardSid(8)
            }}/>
            </div>
            <div className={Style.board}>
            <SubBtnBoard img="/forum_img/board_img/美容版.png" text="美容板" board_sid={board_sid} isFill={board_sid===4?true:false} subBtnHandler={()=>{
              changeBoardSid(4)
            }}/>
            </div>
            <div className={Style.board}>
            <SubBtnBoard img="/forum_img/board_img/學校版.png" text="學校板" board_sid={board_sid} isFill={board_sid===7?true:false} subBtnHandler={()=>{
              changeBoardSid(7)
            }}/>
            </div>
            <div className={Style.board}>
            <SubBtnBoard img="/forum_img/board_img/狗貓聚.png" text="狗貓聚板" board_sid={board_sid} isFill={board_sid===5?true:false} subBtnHandler={()=>{
              changeBoardSid(5)
            }}/>
            </div>
            <div className={Style.board}>
            <SubBtnBoard img="/forum_img/board_img/幼犬貓板.png" text="幼犬貓板" board_sid={board_sid} isFill={board_sid===11?true:false} subBtnHandler={()=>{
              changeBoardSid(11)
            }}/>
            </div>
            <div className={Style.board}>
            <SubBtnBoard img="/forum_img/board_img/老狗貓版.png" text="老犬貓板" board_sid={board_sid} isFill={board_sid===12?true:false} subBtnHandler={()=>{
              changeBoardSid(12)
            }}/>
            </div>
            <div className={Style.board}>
            <SubBtnBoard img="/forum_img/board_img/好物分享版.png" text="好物板" board_sid={board_sid} isFill={board_sid===9?true:false} subBtnHandler={()=>{
              changeBoardSid(9)
            }}/>
            </div>
            <div className={Style.board}>
            <SubBtnBoard img="/forum_img/board_img/毛孩日記版.png" text="毛孩日記板" board_sid={board_sid} isFill={board_sid===6?true:false} subBtnHandler={()=>{
              changeBoardSid(6)
            }}/>
            </div>
            </div>
          </div>
            <div className={Style.moveIcon} onClick={moveBoard}>
              <FontAwesomeIcon icon={move === 0 ? faChevronRight:faChevronLeft} />
            </div>
      </div>
        </div>
        <div className={Style.boardBTM}>
          <BGUpperDecoration/>
        </div>
    </div>
  )
}
