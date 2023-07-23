import React, {useState, useContext} from 'react'
import AuthContext from '@/context/AuthContext'
import Style from './postCommentLaunch.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart,faBookmark} from '@fortawesome/free-solid-svg-icons';
import { Input } from 'antd';
import CommentLogin from '../post_login/login';
import Router, { useRouter } from 'next/router';
import { check } from 'prettier';
const { TextArea } = Input;


export default function PostCommentLaunch({profile='',commentData=[], setCommentData=()=>{}}) {
  const router = useRouter();
  const [value, setValue] = useState('');

  //留言登入
  const [showLogin, setShowLogin] = useState(false);
  const sendComment = (e) =>{
    if(e.key === 'Enter'){
      console.log('Send Comment')
    }
  }
    // 登入狀態
  const { auth, setAuth } = useContext(AuthContext);
  console.log(auth);

  const checkLogin = ()=>{
    if(!auth.id){
      setShowLogin(true)
    }
  }

  const goLogin = ()=>{  
    const from = router.asPath;
    router.push(`/member/sign-in?from=${from}`);
  }
  const cancel = () =>{
    setShowLogin(false)
  }
  return (
    <div className={Style.comments}>
        <div className={Style.commentBody}>
            <div className={Style.author}>
                <div className={Style.profile}><img className={Style.proImg} src={profile}/></div>
                {/*<Input className={Style.comment} placeholder='撰寫留言...'/>*/}
                <TextArea className={Style.comment}
                  placeholder="撰寫留言..."
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={sendComment}
                  onFocus={checkLogin}
                  autoSize={{
                    minRows: 1,
                    maxRows: 6,
                  }}
                />
                {showLogin && (
                  <CommentLogin goLogin={goLogin} cancel={cancel}/>
                  )}
                <div className={Style.icon}>
                <FontAwesomeIcon icon={faHeart} className={Style.likeGray}/>
                <FontAwesomeIcon icon={faBookmark} className={Style.favoriteGray}/>
                </div>
            </div>
        </div>
    </div>
  )
}
