import React, {useState}  from 'react';
import Style from './postPhotoCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronRight,faChevronLeft} from '@fortawesome/free-solid-svg-icons';

export default function PostDiary({img='',title='', content=''}) {
  const [move, setMove] = useState(0);
  const right = ()=>{
    setMove(1)
  }
  const left = ()=>{
    setMove(0)
  }

  return (
    <div className={Style.card}>
        <div className={Style.sticker}></div>
        <div className={Style.imgBorder}>
            <div className={Style.left}>
              <FontAwesomeIcon icon={faChevronLeft} onClick={left}/>
            </div>
            <div className={Style.imgHidden}>
              <div className={Style.imgRange} style={{ left: move === 1 ? '-200px' : '0',  transition: 'left 0.3s ease-in-out'}}>
                <img className={Style.img} src={img}/>
              </div>
            </div>
            <div className={Style.right}>
              <FontAwesomeIcon icon={faChevronRight} onClick={right}/>
            </div>
        </div>
        <div className={Style.diaryTitle}>{title}</div>
        <div className={Style.diaryContent}>{content}</div>      
    </div>
  )
}
