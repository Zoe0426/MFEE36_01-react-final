import React from 'react'
import SearchBar from '@/components/ui/buttons/SearchBar'
import MainBtn from '@/components/ui/buttons/MainBtn'
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn'
import IconBtn from '@/components/ui/buttons/IconBtn'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import HashTag from '@/components/ui/hashtag/HashTag'
import RateStarPill from '@/components/ui/rateStar/RateStarPill'
import RateStar from '@/components/ui/rateStar/RateStar'
import RestCard from '@/components/ui/cards/rest_card'
import { Col, Row } from 'antd'

export default function Restindex() {
  return (
    <>
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
