import React from 'react';
import { Col, Row } from 'antd';

export default function MemberCenterLayout() {
  return (
    <>
      <Row className="antRow">
        <Col className="antCol" lg={2} md={1} sm={1}></Col>
        <Col className="antCol" lg={6} md={8} sm={0}>
          <div className="sideBar">
            <div className="memberInfo">
              <div className="profile">
                <img src="/member-center-images/nn.jpg" alt="" />
              </div>
              <div className="memberName">鍾沛怡</div>
              <div className="level">
                <img src="/member-center-images/Icon/crown.svg" alt="" />
                <div className="levelTitle">金牌會員</div>
              </div>
            </div>
            <div className="calendarInfo">
              <div className="calendar"></div>
              <div className="calendarCircle">
                <div className="red">
                  <div className="redCircle"></div>
                  <div className="text">餐廳</div>
                </div>
                <div className="green">
                  <div className="greenCircle"></div>
                  <div className="text">活動</div>
                </div>
                <div className="blue">
                  <div className="blueCircle"></div>
                  <div className="text">兩者</div>
                </div>
              </div>
            </div>
            <div className="gameInfo">
              <div className="gameImg">
                <img
                  src="/member-center-images/nn.jpg"
                  alt=""
                  className="gameImg"
                />
              </div>
              <div className="gameName">爆擊小狗狗</div>
              <div className="gameLevel">
                <img src="/member-center-images/Icon/crown.svg" alt="" />
                <div className="gameTitle">Lv. 10</div>
              </div>
            </div>
          </div>
        </Col>
        <Col className="antCol" lg={12} md={14} sm={22}>
          <div className="order">
            <div className="orderCard"></div>
            <div className="orderCard"></div>
            <div className="orderCard"></div>
            <div className="orderCard"></div>
            <div className="orderCard"></div>
            <div className="orderCard"></div>
          </div>
        </Col>
        <Col className="antCol" lg={4} md={1} sm={1}></Col>
      </Row>
    </>
  );
}
