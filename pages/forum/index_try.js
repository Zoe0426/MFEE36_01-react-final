import React, { useEffect, useState } from 'react'
import Style from '@/styles/index.module.css'
import PostCard from '@/components/ui/PostCard/postCard'
import PostBanner from '@/components/ui/postBanner/postBanner'
import BoardNav from '@/components/ui/BoardNav/boardNav'
import PostNav from '@/components/ui/postNav/postNav'
import PostBottom from '@/components/ui/postBottom/postBottom'
export default function Post() {
  const [forumData, setForumData] = useState([]);
  const [data, setData] = useState([]);
  const [lateD, setlateD] = useState([]);
  const fetchData = async()=>{
    const response = await fetch ('http://localhost:3002/forum-api/index_try', {method:"GET"});
    const forumData = await response.json();
    setForumData(forumData);
    setData(forumData); //在 fetchData 函式中，將獲取的數據存入了 forumData 狀態變數，同時也將數據存入了 data 狀態變數
    console.log('forumData', forumData);
  };
  useEffect(()=>{
    const fetchData = async() => {
      try{
        const response = await fetch('')
      }
    };  
  }, []);
 //醫療版
  const doctor = ()=>{
    const newData=forumData.filter((data)=>
      data.board_sid===1
    );
    setData(newData); //將篩選後的數據存入 newData  //使用 setData 更新 data 狀態變數，將篩選後的數據存入其中
  }
  //住宿版
  const home = ()=>{
    const newData=forumData.filter((data)=>
      data.board_sid===2
    );
    setData(newData);
  }
  //景點版
  const site = ()=>{
    const newData=forumData.filter((data)=>
      data.board_sid===3
    );
    setData(newData);
  }
  //餐廳版
  const restaurant=()=>{
    const newData=forumData.filter((data)=>
      data.board_sid===8
    );
    setData(newData);
  }
  //美容版
  const salon=()=>{
    const newData=forumData.filter((data)=>
      data.board_sid===4
    );
    setData(newData);
  }
  //學校版
  const school=()=>{
    const newData=forumData.filter((data)=>
      data.board_sid===7
    );
    setData(newData);
  }
  //狗貓聚版
  const hang=()=>{
    const newData=forumData.filter((data)=>
      data.board_sid===5
    );
    setData(newData);
  }
  //幼犬貓板
  const young=()=>{
    const newData=forumData.filter((data)=>
      data.board_sid===11
    );
    setData(newData);
  }
  //老犬貓板
  const old=()=>{
    const newData=forumData.filter((data)=>
      data.board_sid===12
    );
    setData(newData);
  }
  //好物版
  const product=()=>{
    const newData=forumData.filter((data)=>
      data.board_sid===9
    );
    setData(newData);
  }
  //毛孩日記
  const diary=()=>{
    const newData=forumData.filter((data)=>
      data.board_sid===6
    );
    setData(newData);
  }
  return (
    <>
      <div className="container-outer">
        <div className={Style.body}>
          <PostBanner/>
          <BoardNav 
          doctor={()=>{
            doctor();
          }}
          home={()=>{
            home();
          }}
          site={()=>{
            site();
          }}
          restaurant={()=>{
            restaurant();
          }}
          salon={()=>{
            salon();
          }}
          school={()=>{
            school();
          }}
          hang={()=>{
            hang();
          }}
          young={()=>{
            young();
          }}
          old={()=>{
            old();
          }}
          product={()=>{
            product();
          }}
          diary={()=>{
            diary()
          }}
          />
          <div className="container-inner">
          <PostNav postNav='熱門文章' optionCh='熱門文章' op1='最新文章'/>
          {data.map((v)=>(
           
            <PostCard key={v.post_sid}
            profile='./forum_img/victor-grabarczyk-N04FIfHhv_k-unsplash.jpg' 
            boardName={v.board_name} 
            author={v.nickname}
            postTitle={v.post_title} 
            postContent={v.post_content} 
            img={`http://localhost:3000/forum_img/post_img/${v.file}`} 
            likes={v.postLike} 
            comments={v.postComment} 
            favorites={v.postFavlist}/>           
  ))}         
           </div>
          <PostBottom/>
        </div>
        </div>
    </>
  )
}