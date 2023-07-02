import React from 'react'
import SearchBar from '@/components/ui/buttons/SearchBar'
import MainBtn from '@/components/ui/buttons/MainBtn'
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn'
import IconBtn from '@/components/ui/buttons/IconBtn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { faFaceLaugh } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import RestCard from '@/components/ui/cards/rest_card'
import { Col, Row } from 'antd'
import Styles from './index.module.css'

export default function Restindex() {
  return (
    <>
      <div className="container-outter">
        <div className={Styles.banner}>
          <img src="/rest_image/banner.jpg" alt="" />
          <div className={Styles.search}>
            <h1 className={Styles.jill_h1}>想知道哪裡有寵物餐廳？</h1>
            <SearchBar placeholder="搜尋餐廳" />
          </div>
        </div>
      </div>
      <div className={Styles.bgc}>
        <div className="container-inner">
          <div className={Styles.top_area}>
            <div className={Styles.breadcrumb}>餐廳列表/進階篩選</div>
            <div className={Styles.function_group}>
              <IconBtn icon={faMap} text="餐廳地圖" />
              <IconBtn icon={faHeart} text="收藏列表" />
              <IconBtn icon={faFilter} text="進階篩下" />
            </div>
          </div>
        </div>
      </div>

      <div className="container-inner">
        <div className={Styles.group}>
          <div className={Styles.explore_title}>
            <FontAwesomeIcon icon={faFaceLaugh} className={Styles.title_icon} />
            <h2 className={Styles.jill_h2}>最友善餐廳</h2>
          </div>
          <div className={Styles.show_more}>
            <p>顯示更多</p>
            <FontAwesomeIcon icon={faArrowLeft} className={Styles.arrow} />
            <FontAwesomeIcon icon={faArrowRight} className={Styles.arrow} />
          </div>
        </div>
      </div>

      <div className="container-inner">
        <Row gutter={[32, 32]}>
          <Col span={8}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
          <Col span={8}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
          <Col span={8}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
        </Row>
      </div>

      <div className="container-inner">
        <div className={Styles.group}>
          <div className={Styles.explore_title}>
            <FontAwesomeIcon icon={faFire} className={Styles.title_icon} />
            <h2 className={Styles.jill_h2}>熱門餐廳</h2>
          </div>
          <div className={Styles.show_more}>
            <p>顯示更多</p>
            <FontAwesomeIcon icon={faArrowLeft} className={Styles.arrow} />
            <FontAwesomeIcon icon={faArrowRight} className={Styles.arrow} />
          </div>
        </div>
      </div>

      <div className="container-inner">
        <Row gutter={[32, 32]}>
          <Col span={8}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
          <Col span={8}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
          <Col span={8}>
            <RestCard
              image="/rest_image/sunshine.jpeg"
              name="我家有休閒農場"
              city="台北市"
              location="大安區"
            />
          </Col>
        </Row>
      </div>
    </>
  )
}
