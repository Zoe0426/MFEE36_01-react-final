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
import MainBtn from '@/components/ui/buttons/MainBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import { Input } from 'antd';
const { TextArea } = Input;

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
                  <p>文章標題：</p>
                  <Input placeholder="文章標題" />
                  <p>文章內容：</p>
                  <TextArea rows={20} placeholder="撰寫新文章內容" maxLength={50} />  
                  <MainBtn text = '發佈文章'/> 
                  <SecondaryBtn text = '取消'/>    
                </div>
            </div>
            </div>

        </Col>
      </Row>
      </div>
      
    </div>
  )
}




