import React from 'react'
import Style from '@/styles/blogPost.module.css'
import BlogBanner from '@/components/ui/blogBanner/blogBanner'

export default function BlogPost() {
  return (
    <div className="container-outer">
      <div className={Style.body}>
      <BlogBanner/>
      </div>
      
    </div>
  )
}




