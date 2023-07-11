import React from 'react';
import style from './bg-cartHead.module.css';
import { Row, Col } from 'antd';
import Image from 'next/image';
import walkingDog from '@/assets/walking-dog.svg';
import bgc01 from '@/assets/bgc01.svg';
import trees from '@/assets/trees.svg';
export default function BgCartHead({ text = '' }) {
  return (
    <div className={style.head_decoration}>
      <Row className={style.header}>
        <Col xs={2} sm={2} md={4}></Col>
        <Col xs={20} sm={20} md={18}>
          <h2 className={style.heading}>{text}</h2>
        </Col>
      </Row>
      <Image src={bgc01} className={style.headbg} alt="" />
      <Image src={walkingDog} className={style.headcat} alt="" />
      <Image src={trees} className={style.headtrees} alt="" />
    </div>
  );
}
