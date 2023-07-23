import React, {useState} from 'react'
import Style from './postCommentLaunch.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart,faBookmark} from '@fortawesome/free-solid-svg-icons';
import { Input } from 'antd';
const { TextArea } = Input;

export default function PostCommentLaunch({profile=''}) {
  const [value, setValue] = useState('');
  return (
    <div className={Style.comments}>
        <div className={Style.commentBody}>
            <div className={Style.author}>
                <div className={Style.profile}><img className={Style.proImg} src={profile}/></div>
                {/*<Input className={Style.comment} placeholder='撰寫留言...'/>*/}
                <TextArea className={Style.comment}
                  placeholder="撰寫留言..."
                  autoSize={{
                    minRows: 1,
                    maxRows: 6,
                  }}
                />
                <div className={Style.icon}>
                <FontAwesomeIcon icon={faHeart} className={Style.likeGray}/>
                <FontAwesomeIcon icon={faBookmark} className={Style.favoriteGray}/>
                </div>
            </div>
        </div>
    </div>
  )
}
