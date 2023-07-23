// [postid]原本的東西都放這邊
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Style from '@/styles/postid.module.css'
import PostBanner from '@/components/ui/postBanner/postBanner'
import BoardNav from '@/components/ui/BoardNav/boardNav'
import PostArticle from '@/components/ui/postArticle/postArticle';
import PostHashtag from '@/components/ui/postHashtag/postHashtag';
import PostArticleContent from '@/components/ui/postArticleContent/postArticleContent';
import PostImg from '@/components/ui/postImg/postImg';
import PostCommentBtn from '@/components/ui/postCommentBtn/postCommentBtn';
import PostComment from '@/components/ui/postComment/postComment';
import PostCommentLaunch from '@/components/ui/postCommentLaunch/postCommentLaunch';
import PostBottom from '@/components/ui/postBottom/postBottom';


export default function Post() {
  const router = useRouter();
  const { pathname } = router; //看路徑
  const {query} = router; 
  // console.log("query",query);
  // console.log("pathname",pathname);
  const postid = router.query.postid; 
  const [data, setData] =useState({
    postData:[],
    hashtagData:[],
    commentData:[],
    imgData:[]
  })


  // 文章
  const [postData, setPostData] = useState([]);
  // 話題
  const [hashtagData, setHashtagData] = useState([]);
  // 留言
  const [commentData, setCommentData] = useState([]);
  // 圖片
  const [imgData, setImgData] = useState([]);

  const fetchData = async (postid) => {
    try {
      const response = await fetch(`${process.env.API_SERVER}/forum-api/${postid}`, { method: "GET" });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
      // 從回傳的 data 物件中取得 postData、hashtagData 和 commentData，然後設定到對應的狀態
      setPostData(data.newData || []); //因為在node文章資料是叫data
      setHashtagData(data.tagData || []); //因為在node hashtag資料是叫tagData
      setCommentData(data.newCommentData || []);
      const newImgData = data.imgData.map(v=>v.file)
      setImgData(newImgData || []);
  
      console.log('postData', data.newData);
      console.log('hashtagData', data.tagData);
      console.log('commentData', data.newCommentData);
      console.log('newImgData', newImgData);
  
      console.log(postid);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  

  useEffect(()=>{
    console.log("postid in useEffect");
    console.log(postid);
    if (postid){
      fetchData(postid);
    }
    }, [postid]); // Fetch data when the post ID changes
  

  // const images = [
  //   // '/forum_img/狗活動.jpeg',
  //   // '/forum_img/狗活動.jpeg',
  //   // '/forum_img/狗活動.jpeg',
  //   // '/forum_img/狗活動.jpeg',
  //   // '/forum_img/狗活動.jpeg',   
  //   `${imgData}`
  // ];

  return (
    <div className="container-outer">
        <div className={Style.body}>
            <PostBanner/>
            <BoardNav/>
            <div className={Style.postAll}>
              <div className="container-inner">
              {postData.map((v,i)=>(
                <PostArticle key={v.post_sid} className={Style.title} 
                navTitle={v.post_title} 
                profile='/forum_img/victor-grabarczyk-N04FIfHhv_k-unsplash.jpg' 
                // profile={v.profile} 
                author={v.nickname} 
                id= {`@${v.member_ID}`} // 在這裡添加@符號
                postTitle= {v.post_title}
                boardImg= {v.board_img}
                board={v.board_name} 
                time={v.post_date}/>        
                ))}
                <div className={Style.hashtag}>
                {hashtagData.map((v,i)=>(
                  <PostHashtag text={v.hashtag_name}/>
                ))}
              
              </div>
                <div className={Style.postImg}>

                  <PostImg images={imgData}/>
                </div>
                <div className={Style.content}>
                {postData.map((v,i)=>(
                  <PostArticleContent postContent={v.post_content} likes={v.postLike} comments={v.postComment}/>
                ))}
                </div>


                <div className={Style.commentBlock}>
                  <div className={Style.commentBTN}>
                    <PostCommentBtn text="由舊至新" bc='white'/>
                    <PostCommentBtn text="由舊至新" bc='var(--secondary)'/>
                  </div>
                  {postData.map((v,i)=>(
                    <div className={Style.commentNum}>{`共 ${v.postComment} 則留言`}</div>
                  ))}
                  <div className={Style.line}>
                    <img className={Style.commentLine} src='/forum_img/commentLine.png'/>
                  </div>
                  <div className={Style.comments}>
                  {commentData.map((v,i)=>(
                    <PostComment profile={v.profile} author={v.nickname} comment={v.comment_content} floor={`B${i+1}`} date={v.comment_date} moreComments=''/>
                  ))}
                  </div>
                </div>
                <div className={Style.PostCommentLaunch}>
                  <PostCommentLaunch profile='/forum_img/victor-grabarczyk-N04FIfHhv_k-unsplash.jpg'/>
                </div>
                  
              </div>
            </div>
        </div>
        <PostBottom/>
    
    </div>
  )
}
