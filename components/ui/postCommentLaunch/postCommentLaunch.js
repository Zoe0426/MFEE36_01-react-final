import React, {useState, useContext} from 'react'
import AuthContext from '@/context/AuthContext'
import Style from './postCommentLaunch.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart,faBookmark} from '@fortawesome/free-solid-svg-icons';
import { Input, ConfigProvider } from 'antd';
import CommentLogin from '../post_login/login';
import Modal from '../modal/modal';
import Router, { useRouter } from 'next/router';
import { check } from 'prettier';
import MainBtn from '../buttons/MainBtn';
const { TextArea } = Input;


export default function PostCommentLaunch({profile='',comments=0,commentData=[], setCommentData=()=>{}, postSid='', memberId='' ,commentAmount='', setCommentAmount=()=>{} }) {
  const router = useRouter();
  const [value, setValue] = useState('');
  console.log(value);



  //留言登入
  const [showLogin, setShowLogin] = useState(false);
  const sendComment = () =>{
    // console.log('clicked');
    //   console.log(postSid);
    //   console.log(memberId);
      const r = fetch(`${process.env.API_SERVER}/forum-api/forum/addcomment`, {
        method:'POST',
        body:JSON.stringify(
          {post_sid:postSid,
          member_sid:memberId,
          comment_content:value
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((r) => r.json())
      .then((data)=>{
          console.log(data.newCommentData);
          setCommentData(data.newCommentData);
          // 清空留言
          setValue('');
          setCommentAmount(commentAmount+1);
        })
      console.log('Send Comment');

      
      
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
    <>
    <div className={Style.comments}>
        <div className={Style.commentBody}>
            <div className={Style.author}>
                <div className={Style.profile}><img className={Style.proImg} src={profile}/></div>
                {/*<Input className={Style.comment} placeholder='撰寫留言...'/>*/}
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: '#FD8C46',
                      colorText: 'rgb(81, 81, 81)',
                      fontSize: 18,
                      controlInteractiveSize: 18,
                    }
                  }}
                >
                {auth.id? <TextArea className={Style.comment}
                  placeholder="撰寫留言..."
                  onChange={(e) => setValue(e.target.value)}
                  // onKeyDown={sendComment}                 
                  value={value}  //為了要清空留言的內容
                  onFocus={checkLogin}
                  autoSize={{
                    minRows: 2,
                    maxRows: 6,
                  }}
                  rules={[
                    {
                      required:true,
                      message:'請輸入留言再送出噢！'
                    }
                  ]}
                  />
                  :<Modal btnType='input' title='前往登入會員' mainBtnText = '確認' subBtnText = '取消' content='留言需要會員登入，是否要繼續留言?' confirmHandler={goLogin} btnText = '撰寫留言...'/>}
                  <div className={Style.subBtn} >
                  {auth.id? <MainBtn
                  text = '送出'
                  clickHandler = {sendComment}
                  /> : <Modal btnType = 'main' btnText = '送出'/>}
                  </div>
                </ConfigProvider>
                </div>
                </div>
                </div>
                {/*{showLogin && (
                //   // <CommentLogin className={Style.loginbox} goLogin={goLogin} cancel={cancel} text='留言需要會員登入，是否要繼續留言?'/>
                  
                //   )} */}
                </>
                )
              }

