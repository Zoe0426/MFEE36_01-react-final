import React from 'react'
import Style from './post.module.css'
import BlogBanner from '@/components/ui/blogBanner/blogBanner'
import { Col, Row } from 'antd';
import BlogSidebar from '@/components/ui/blogSidebar/blogSidebar';
import PostNavPure from '@/components/ui/postNavPure/postNavPure';
import BlogBoardNav from '@/components/ui/blogBoardNav/blogBoardNav';
import BlogPost from '@/components/ui/blogPost/blogPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLayerGroup} from '@fortawesome/free-solid-svg-icons';
// import SubBtn from '@/components/ui/'

export default function Post() {
  const currentDateTime = new Date().toLocaleString(); // 取得現在的日期和時間
  
  return (
    <div className="container-outer">
      <div className={Style.body}>
      <BlogBanner/>
      <Row className={Style.antRow}>
        <Col span={6}>
          <BlogSidebar profile='/forum_img/kabo-p6yH8VmGqxo-unsplash.jpg' memberName='莉莉安'/>
        </Col>
        <Col span={16}>
            <div className={Style.blogContent}>
                <PostNavPure postNav='發佈文章'/>
                <div className={Style.postContent}>
                  <p>{currentDateTime}</p>
                  <div><FontAwesomeIcon icon={faLayerGroup} />選擇發文看板</div>
                  <div><BlogBoardNav/><div/>             
                </div>
            </div>
            </div>

        </Col>
      </Row>
      </div>
      
    </div>
  )
}




