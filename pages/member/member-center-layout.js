import React from 'react';
import { Col, Row } from 'antd';

export default function MemberCenterLayout() {
  return (
    <>
      <Row className="antRow">
        <Col className="antCol" span={2}>
          2
        </Col>
        <Col className="antCol" span={6}>
          <div className="sideBar">
            6<div className="memberInfo">memberInfo</div>
            <div className="calendar">calendar</div>
            <div className="gameInfo">gameInfo</div>
          </div>
        </Col>
        <Col className="antCol" span={12}>
          12
					<div className="order">
						<div className="orderCard"></div>
						<div className="orderCard"></div>
						<div className="orderCard"></div>
						<div className="orderCard"></div>
						<div className="orderCard"></div>
						<div className="orderCard"></div>
					</div>
        </Col>
        <Col className="antCol" span={4}>
          4
        </Col>
      </Row>
    </>
  );
}
