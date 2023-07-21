import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Style from '@/styles/post.module.css'
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
    commentData:[]
  })
  // 文章
  // const [postData, setPostData] = useState(
  //   {
  //   post_title:'',
  //   post_content:'',
  //   nickname:'',
  //   member_ID:'',
  //   profile:'',
  //   board_name:'',
  //   board_img:'',
  //   post_date:'',
  //   update_date:'',
  //   postLike:'',
  //   postComment:''
  // });
  const [postData, setPostData] = useState([]); // 初始值設為空陣列

  // 話題
  // const [hashtagData, setHashtagData] = useState({
  //   hashtag_name:''
  // });
  const [hashtagData, setHashtagData] = useState([]);
  // 留言
  // const [commentData, setCommentData] = useState({
  //   comment_content:'',
  //   comment_date:'',
  //   nickname:'',
  //   profile:''
  // });
  const [commentData, setCommentData] = useState([]);

  const fetchData = async (postid) => {
    try {
      const response = await fetch(`${process.env.API_SERVER}/forum-api/${postid}`, { method: "GET" });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('data', data);
    setData(data); // 將整個回應的 JSON 物件設定到 data 狀態變數中
    console.log('data', setData);

      // 然後分別將相關資料設定到對應的狀態變數中
    setPostData(data.postData);
    setHashtagData(data.hashtagData);
    setCommentData(data.commentData);

    console.log('data', data);
    console.log('postData', data.postData);
    console.log('hashtagData', data.hashtagData);
    console.log('commentData', data.commentData);

    // 確保 data.postData 是陣列後再設定狀態
    if (Array.isArray(data.postData)) {
      setPostData(data.postData);
    }
    // 確保 data.hashtagData 是陣列後再設定狀態
    if (Array.isArray(data.hashtagData)) {
      setHashtagData(data.hashtagData);
    }

    // 確保 data.commentData 是陣列後再設定狀態
    if (Array.isArray(data.commentData)) {
      setCommentData(data.commentData);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }


    // const postData = await response.json();
    // setPostData(postData);
    // console.log('postData', postData);

    // const hashtagData = await response.json();
    // setHashtagData(hashtagData);
    // console.log('hashtagData', hashtagData);

    // const commentData = await response.json();
    // setCommentData(commentData);
    // console.log("commentData", commentData);

    console.log(postid);
  };
  

  useEffect(()=>{
    console.log("postid in useEffect");
    console.log(postid);
    if (postid){
      fetchData(postid);
    //   fetchData(`${process.env.API_SERVER}/forum-api/${postid}`)
    //   .then((r)=>r.json())
    //   .then((data)=>{
    //     const {
    //       postData,
    //       hashtagData,
    //       commentData
    //     } = data;
    //   })
    }
    }, [postid]); // Fetch data when the post ID changes
  

  const images = [
    '/forum_img/狗活動.jpeg',
    '/forum_img/狗活動.jpeg',
    '/forum_img/狗活動.jpeg',
    '/forum_img/狗活動.jpeg',
    '/forum_img/狗活動.jpeg',   
  ];

  return (
    <div className="container-outer">
        <div className={Style.body}>
            <PostBanner/>
            <BoardNav/>
            <div className={Style.postAll}>
              <div className="container-inner">
              {postData && Array.isArray(postData) && (
                postData.map((v, i) => (
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
                ))
                )}

                <div className={Style.hashtag}>
                {hashtagData && Array.isArray(hashtagData) && (
                  hashtagData.map((v, i) => (
                  <PostHashtag text={v.hashtag_name}/>
                  ))
                  )}
                </div>

                <div className={Style.postImg}>
                  <PostImg images={images}/>
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
                  <div className={Style.commentNum}>共 200 則留言</div>
                  <div className={Style.line}>
                    <img className={Style.commentLine} src='/forum_img/commentLine.png'/>
                  </div>
                  <div className={Style.comments}>
                  {commentData.map((v,i)=>(
                    <PostComment profile={v.profile} author={v.nickname} comment={v.comment_content} floor='B1' date={v.comment_date} moreComments=''/>
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
