import React from 'react'
import Style from '@/styles/blogPost.module.css'
import PostBanner from '@/components/ui/postBanner/postBanner'
import BoardNav from '@/components/ui/BoardNav/boardNav'

export default function BlogPost() {
  return (
    <div  className="container-outer">
      <div className={Style.body}>
        <PostBanner/>
        <BoardNav/>
      </div>
    </div>
  )
}
