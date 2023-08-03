import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function Page() {
    const {query, asPath} = useRouter()
    const [forum, setForum] = useState({postid:''})

// 與伺服器相連獲得資料的函式
const getForum = async(postid)=>{
    const response = await axios.get(
        `https://my-json-server.typicode.com/eyesofkpostids/json-fake-data/forum/${postid}`
    )
    console.log(response.data);
    setForum(response.data)
}

// mount(after):初次渲染之後
useEffect(()=>{
    console.log(query);
    const {postid} = query;

    if(postid){
        getForum(postid)
    }
}, [query])
  return (
    <div>
    <h1>Page</h1>
    <p>Path:{asPath}</p>
    <p>
      postid:{forum.postid}
    </p>
    </div>
  )
}

