import React from 'react'
import SearchBar from '@/components/ui/buttons/SearchBar'
import IconBtn from '@/components/ui/buttons/IconBtn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { faFaceLaugh } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import RestCard from '@/components/ui/cards/rest_card'
import { Col, Row } from 'antd'
import RestTitle from '@/components/ui/restaurant/RestTitle'
import LocationCard from '@/components/ui/restaurant/LocationCard'
import Styles from './index.module.css'
import Banner from '@/components/ui/restaurant/Banner'
import FunctionArea from '@/components/ui/restaurant/FunctionArea'

export default function Restindex() {
  return (
    <>
      <Banner />
      <FunctionArea />
      <div className="container-inner">
        <div className={Styles.explore_title}>
          <FontAwesomeIcon icon={faLocationDot} className={Styles.title_icon} />
          <h2 className={Styles.jill_h2}>探索各地友善餐廳</h2>
        </div>
        <div className={Styles.location_group}>
          <LocationCard
            rest_image="/rest_image/city/taipei.png"
            location="台北市"
          />
          <LocationCard
            rest_image="/rest_image/city/newtaipei.png"
            location="新北市"
          />
          <LocationCard
            rest_image="/rest_image/city/keelung.png"
            location="基隆市"
          />
          <LocationCard
            rest_image="/rest_image/city/taoyuan.png"
            location="桃園市"
          />
          <LocationCard
            rest_image="/rest_image/city/taichung.png"
            location="台中市"
          />
          <LocationCard
            rest_image="/rest_image/city/hsinchu.png"
            location="新竹市"
          />
        </div>
        <div className={Styles.location_group}>
          <LocationCard
            rest_image="/rest_image/city/kaohsiung.png"
            location="高雄市"
          />
          <LocationCard
            rest_image="/rest_image/city/tainan.png"
            location="台南市"
          />
          <LocationCard
            rest_image="/rest_image/city/miaoli.png"
            location="苗栗市"
          />
          <LocationCard
            rest_image="/rest_image/city/chiayi.png"
            location="嘉義市"
          />
          <LocationCard
            rest_image="/rest_image/city/changhua.png"
            location="彰化市"
          />
          <LocationCard
            rest_image="/rest_image/city/yilan.png"
            location="宜蘭市"
          />
        </div>
        <div className={Styles.location_group}>
          <LocationCard
            rest_image="/rest_image/city/pingtung.png"
            location="屏東市"
          />
          <LocationCard
            rest_image="/rest_image/city/hualien.png"
            location="花蓮市"
          />
          <LocationCard
            rest_image="/rest_image/city/taitung.png"
            location="台東市"
          />
          <LocationCard
            rest_image="/rest_image/city/nantou.png"
            location="南投市"
          />
          <LocationCard
            rest_image="/rest_image/city/yunlin.png"
            location="雲林市"
          />
          <LocationCard rest_image="/rest_image/dog_paw.png" />
        </div>
      </div>
      <div className={Styles.cloud_bgc}>
        <div className="container-inner">
          <div className={Styles.explore_title}>
            <FontAwesomeIcon icon={faFaceLaugh} className={Styles.title_icon} />
            <h2 className={Styles.jill_h2}>友善條件</h2>
          </div>
          <Row gutter={[48, 48]}>
            <Col span={4}>
              <div className={Styles.box}>
                <img src="/rest_image/friendly/friendly1.png" alt="" />
              </div>
            </Col>
            <Col span={4}>
              <div className={Styles.box}>
                <img src="/rest_image/friendly/friendly1.png" alt="" />
              </div>
            </Col>
            <Col span={4}>
              <div className={Styles.box}>
                <img src="/rest_image/friendly/friendly1.png" alt="" />
              </div>
            </Col>
            <Col span={4}>
              <div className={Styles.box}>
                <img src="/rest_image/friendly/friendly1.png" alt="" />
              </div>
            </Col>
            <Col span={4}>
              <div className={Styles.box}>
                <img src="/rest_image/friendly/friendly1.png" alt="" />
              </div>
            </Col>
            <Col span={4}>
              <div className={Styles.box}>
                <img src="/rest_image/friendly/friendly1.png" alt="" />
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className="container-inner">
        <RestTitle icon={faFire} text="熱門餐廳" />
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
        <RestTitle icon={faFaceLaugh} text="最友善餐廳" />
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
