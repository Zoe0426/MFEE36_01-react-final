import React from 'react'
import Style from './index.module.css'
import BlogBanner from '@/components/ui/blogBanner/blogBanner'
import { Col, Row } from 'antd';
import BlogSidebar from '@/components/ui/blogSidebar/blogSidebar';
import PostNav from '@/components/ui/postNav/postNav';
import BlogPost from '@/components/ui/blogPost/blogPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';

export default function BlogIndex() {
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
                <PostNav postNav='收藏文章' optionCh='收藏文章列表' op1='寵物醫院' op2='寵物住宿'/>
                <div className={Style.postContent}>
                    <BlogPost Date='2月9日'/>
                    <BlogPost Date='6月9日'/>
                    <div className={Style.editBg}>
                        <FontAwesomeIcon icon={faPenToSquare} className={Style.editIcon}/>
                    </div>
                </div>
            </div>
        </Col>
      </Row>
      </div>
      
    </div>
  )
}




