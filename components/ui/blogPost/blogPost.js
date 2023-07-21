import React, { useContext, useEffect, useState } from 'react'
import Style from './blogPost.module.css'
import PostCard from '../PostCard/postCard'
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function BlogPost({Date=''}) {
  const [data, setData] = useState([]);
  const {auth, setAuth} = useContext(AuthContext);
  const router = useRouter();
  // const fetchData = async()=>{
  //   const response = await fetch(`${process.env.API_SERVER}/forum-api/blogPost`, {method:"GET"});
  //   const data = await response.json();
  //   setData(data);
  //   console.log('data',data);
  // };
  useEffect(()=>{
    let auth = {};
    const authStr = localStorage.getItem('petauth');
    if (authStr){
      try{
        auth = JSON.parse(authStr);
      }catch(ex){
        ('');
      }
      console.log(auth.id);
    }

    if(auth.token){
      fetch(`${process.env.API_SERVER}/forum-api/forum/blog`, {
        headers:{
          Authorization: 'Bearer '+ auth.token,
        },
      })
      .then((r)=>r.json())
      .then((data)=>{
        console.log(data);
        setData(data);
      });
    }else{
      console.log('User is not logged in. Cannot fetch posts.');
    }
  }, []);
  return (
    <div className={Style.blogCon}>
        <div className={Style.date}>{Date}</div>
        {data.map((v,i)=>(
          <PostCard profile='/forum_img/victor-grabarczyk-N04FIfHhv_k-unsplash.jpg' boardName={v.board_name} author={v.nickname} postTitle={v.post_title} postContent={v.post_content} img={v.file} likes={v.postLike} comments={v.postComment} favorites={v.postFavlist}/>
        ))}
    </div>
  )
}
