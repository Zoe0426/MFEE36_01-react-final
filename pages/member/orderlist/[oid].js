import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Style from '@/styles/orderdetail.module.css';
import MemberCenterLayout from '@/components/layout/member-center-layout';
import AuthContext from '@/context/AuthContext';
import OrderDetailCard from '@/components/ui/cards/OrderDetailCard';
import Head from 'next/head';

export default function OrderDetail() {
  const { auth, setAuth } = useContext(AuthContext);
  const { query, asPath } = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    // //console.log(query);
    if (query.oid) {
      fetch(`${process.env.API_SERVER}/member-api/orderdetail/${query.oid}`, {
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      })
        .then((r) => r.json())
        .then((data) => {
          //console.log(data);
          ////console.log(data[0].post_status);
          setData(data);
        });
    }
  }, [query]);

  ////console.log('data', data);

  //運送狀態
  if (data.length > 0) {
    ////console.log(data[0].post_status);
    let statusName = '';
    switch (data[0].post_status) {
      case 1:
        statusName = '備貨中';
        break;

      case 2:
        statusName = '運送中';
        break;

      case 3:
        statusName = '已到店';
        break;

      case 4:
        statusName = '未取貨';
        break;

      case 5:
        statusName = '已完成';
        break;

      case 6:
        statusName = '已完成';
        break;
    }

    //運送方式
    let postType = '';
    switch (data[0].post_type) {
      case 1:
        postType = '黑貓宅急便';
        break;

      case 2:
        postType = '7-11';
        break;

      case 3:
        postType = '全家';
        break;
    }

    //付款方式
    let treadType = '';
    switch (data[0].tread_type) {
      case 1:
        treadType = '信用卡';
        break;

      case 2:
        treadType = 'LINE Pay';
        break;
    }

    return (
      <>
        <Head>
          <title>狗with咪 | 詳細訂單</title>
        </Head>
        <div className="content">
          <div className={Style.orderCardContent}>
            <div className={Style.orderSid}>
              <div className={Style.sidTitle}>
                訂單編號 : {data[0].order_sid}
              </div>
              <div className={Style.orderStatus}>
                <img
                  src={
                    data[0].post_status >= 5
                      ? '/member-center-images/Icon/ok.svg'
                      : '/member-center-images/Icon/deliver.svg'
                  }
                  alt=""
                />
                <div className={Style.text}>{statusName}</div>
              </div>
            </div>
            <div className={Style.icons}>
              <div className={Style.iconBtn}>
                <svg
                  width="71"
                  height="68"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 71 68"
                  style={{ enableBackground: 'new 0 0 71 68' }}
                  xmlSpace="preserve"
                >
                  <path
                    d="M8,16.8C15.5,8.2,25,2.9,38,1.3c13-1.6,22.3,3.4,27,16.4c4.7,13,6.5,22,3.5,32.5c-3,10.5-13.5,16.9-36,16c-22.5-0.9-29.6-14-31-23.5C0.2,33.2,1.1,24.7,8,16.8z"
                    fill="#FFF"
                    stroke={data[0].post_status > 0 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                  />
                  <path
                    fill="#FFF"
                    stroke={data[0].post_status > 0 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    d="M8,16.8C15.5,8.2,25,2.9,38,1.3c13-1.6,22.3,3.4,27,16.4c4.7,13,6.5,22,3.5,32.5c-3,10.5-13.5,16.9-36,16
	c-22.5-0.9-29.6-14-31-23.5C0.2,33.2,1.1,24.7,8,16.8z"
                  />
                  <path
                    fill={data[0].post_status > 0 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    d="M35,27.4c0.7,0,1.3-0.6,1.3-1.3v-3.2c0-0.7-0.6-1.3-1.3-1.3c-0.7,0-1.3,0.6-1.3,1.3v3.2
	C33.7,26.8,34.3,27.4,35,27.4z"
                  />
                  <path
                    fill={data[0].post_status > 0 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    d="M29.9,27.4c0.7,0,1.3-0.6,1.3-1.3v-3.2c0-0.7-0.6-1.3-1.3-1.3c-0.7,0-1.3,0.6-1.3,1.3v3.2
	C28.6,26.8,29.2,27.4,29.9,27.4z"
                  />
                  <path
                    fill={data[0].post_status > 0 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    d="M40.2,27.4c0.7,0,1.3-0.6,1.3-1.3v-3.2c0-0.7-0.6-1.3-1.3-1.3c-0.7,0-1.3,0.6-1.3,1.3v3.2
	C38.8,26.8,39.4,27.4,40.2,27.4z"
                  />
                  <path
                    fill={data[0].post_status > 0 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    d="M45.3,27.4c0.7,0,1.3-0.6,1.3-1.3v-3.2c0-0.7-0.6-1.3-1.3-1.3c-0.7,0-1.3,0.6-1.3,1.3v3.2
	C43.9,26.8,44.5,27.4,45.3,27.4z"
                  />
                  <path
                    fill={data[0].post_status > 0 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    d="M42.3,46.9v5.3l7.3-7.1h-5.5C43.2,45.1,42.3,45.9,42.3,46.9z"
                  />
                  <path
                    fill={data[0].post_status > 0 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    d="M47.9,23.1v3c0,1.4-1.2,2.6-2.6,2.6c-1.2,0-2.3-0.8-2.6-1.9c-0.3,1.1-1.3,1.9-2.6,1.9c-1.2,0-2.3-0.8-2.6-1.9
	c-0.3,1.1-1.3,1.9-2.6,1.9c-1.2,0-2.3-0.8-2.6-1.9c-0.3,1.1-1.3,1.9-2.6,1.9c-1.5,0-2.6-1.2-2.6-2.6v-3h-2.4v25.6
	c0,2.2,1.8,3.9,4,3.9h11.8v-5.8c0-1.9,1.5-3.4,3.5-3.4h6.1V23.1H47.9z M37.3,46.1h-7.5v-2h7.5V46.1z M45.4,40.7H29.8v-2h15.5V40.7z
	M45.4,35.4H29.8v-2h15.5V35.4z"
                  />
                </svg>
                <div className={Style.statusTitle}>確認付款</div>
                <div className={Style.statusTime}>
                  {data[0].post_status > 0 ? data[0].order_create_time : ''}
                </div>
              </div>
              <div className={Style.iconBtn}>
                <svg
                  width="91"
                  height="3"
                  viewBox="0 0 91 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="2.9887"
                    y1="2.00055"
                    x2="89.9887"
                    y2="1.01178"
                    stroke={data[0].post_status > 0 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <div className={Style.div}></div>
              </div>
              <div className={Style.iconBtn}>
                <svg
                  width="71"
                  height="68"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 71 68"
                  style={{ enableBackground: 'new 0 0 71 68' }}
                  xmlSpace="preserve"
                >
                  <path
                    fill="#FFF"
                    stroke={data[0].post_status >= 2 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    d="M8,16.8C15.5,8.2,25,2.9,38,1.3c13-1.6,22.3,3.4,27,16.4c4.7,13,6.5,22,3.5,32.5c-3,10.5-13.5,16.9-36,16
	c-22.5-0.9-29.6-14-31-23.5C0.2,33.2,1.1,24.7,8,16.8z"
                  />
                  <path
                    fill={data[0].post_status >= 2 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    d="M51.1,22.5H36.2c-0.5,0-0.9,0.4-0.9,0.8v13.3c0,0.5,0.4,0.8,0.9,0.8h14.9c0.5,0,0.9-0.4,0.9-0.8V23.3
	C52,22.9,51.6,22.5,51.1,22.5z"
                  />
                  <path
                    fill={data[0].post_status >= 2 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    d="M28,39.8c-1.6,0-2.9,1.3-2.9,2.9c0,1.6,1.3,2.9,2.9,2.9c1.6,0,2.9-1.3,2.9-2.9C31,41.1,29.7,39.8,28,39.8z
	M28,43.9c-0.7,0-1.3-0.6-1.3-1.3c0-0.7,0.6-1.3,1.3-1.3c0.7,0,1.3,0.6,1.3,1.3C29.4,43.4,28.8,43.9,28,43.9z"
                  />
                  <path
                    fill={data[0].post_status >= 2 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    d="M45.4,39.8c-1.6,0-2.9,1.3-2.9,2.9c0,1.6,1.3,2.9,2.9,2.9c1.6,0,2.9-1.3,2.9-2.9C48.4,41.1,47,39.8,45.4,39.8z
	M45.4,43.9c-0.7,0-1.3-0.6-1.3-1.3c0-0.7,0.6-1.3,1.3-1.3c0.7,0,1.3,0.6,1.3,1.3C46.7,43.4,46.2,43.9,45.4,43.9z"
                  />
                  <path
                    fill={data[0].post_status >= 2 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    d="M33.1,26.5h-6.6c-0.2,0-0.4,0.1-0.6,0.3l-4.8,5.5C21,32.4,21,32.6,21,32.8v4.9v2.5c0,0.4,0.3,0.7,0.7,0.7h2.2
	c0.7-1.5,2.3-2.6,4.1-2.6c1.8,0,3.4,1.1,4.1,2.6h1.7V27.2C33.8,26.8,33.5,26.5,33.1,26.5z M23.6,32.8c0-0.2,0.1-0.3,0.2-0.5l3-3.6
	c0.1-0.2,0.4-0.3,0.6-0.3h3c0.4,0,0.8,0.3,0.8,0.7v4.1c0,0.4-0.3,0.7-0.8,0.7h-6c-0.4,0-0.8-0.3-0.8-0.7V32.8z"
                  />
                  <path
                    fill={data[0].post_status >= 2 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    d="M35.7,38.9c-0.2,0-0.4,0.2-0.4,0.4v1.2c0,0.2,0.2,0.4,0.4,0.4h5.6c0.4-0.8,1-1.5,1.8-2H35.7z"
                  />
                  <path
                    fill={data[0].post_status >= 2 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    d="M51.5,38.9h-3.8c0.8,0.5,1.5,1.2,1.8,2h2c0.2,0,0.4-0.2,0.4-0.4v-1.2C51.9,39,51.7,38.9,51.5,38.9z"
                  />
                </svg>
                <div className={Style.statusTitle}>訂單已出貨</div>
                <div className={Style.statusTime}>
                  {data[0].post_status >= 2 ? data[0].order_create_time : ''}
                </div>
              </div>
              <div className={Style.iconBtn}>
                <svg
                  width="91"
                  height="3"
                  viewBox="0 0 91 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="1.9887"
                    y1="2.00055"
                    x2="89.9887"
                    y2="1.01178"
                    stroke={data[0].post_status >= 2 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <div className={Style.div}></div>
              </div>
              <div className={Style.iconBtn}>
                <svg
                  width="71"
                  height="68"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 71 68"
                  style={{ enableBackground: 'new 0 0 71 68' }}
                  xmlSpace="preserve"
                >
                  <path
                    fill="#FFF"
                    stroke={data[0].post_status >= 5 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    d="M8,16.8C15.5,8.2,25,2.9,38,1.3c13-1.6,22.3,3.4,27,16.4c4.7,13,6.5,22,3.5,32.5c-3,10.5-13.5,16.9-36,16
	c-22.5-0.9-29.6-14-31-23.5C0.2,33.2,1.1,24.7,8,16.8z"
                  />
                  <path
                    fill={data[0].post_status >= 5 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    d="M25,34c0-1.6,0.4-3.1,1.2-4.5c0.8-1.4,1.9-2.6,3.3-3.5c1.4-0.9,2.9-1.5,4.6-1.7c1.7-0.2,3.4-0.1,4.9,0.5
	c0.4,0.1,0.8,0.1,1.1-0.1s0.6-0.4,0.8-0.8c0.1-0.4,0.1-0.7-0.1-1.1c-0.2-0.3-0.5-0.6-0.9-0.7c-2.8-0.9-5.8-0.9-8.6-0.1
	c-2.8,0.8-5.2,2.5-6.9,4.7c-1.7,2.2-2.6,4.9-2.5,7.6c0.1,2.7,1.1,5.4,2.9,7.5c1.8,2.1,4.3,3.7,7.2,4.3c2.8,0.7,5.8,0.5,8.5-0.6
	s5-2.9,6.5-5.2c1.5-2.4,2.1-5.1,1.8-7.8c0-0.2-0.1-0.4-0.2-0.5c-0.1-0.2-0.2-0.3-0.4-0.4c-0.2-0.1-0.3-0.2-0.5-0.3
	c-0.2-0.1-0.4-0.1-0.6,0c-0.2,0-0.4,0.1-0.6,0.2c-0.2,0.1-0.3,0.2-0.4,0.4C46.1,32,46,32.2,46,32.4c-0.1,0.2-0.1,0.4-0.1,0.5
	c0.2,1.3,0,2.7-0.4,3.9c-0.4,1.3-1.1,2.5-2,3.5c-0.9,1-2.1,1.8-3.3,2.4c-1.3,0.6-2.7,0.9-4.1,1c-1.4,0.1-2.9-0.1-4.2-0.6
	c-1.3-0.5-2.6-1.2-3.6-2.1c-1-0.9-1.9-2-2.4-3.2C25.3,36.7,25,35.3,25,34z M47.1,26.5c0.3-0.3,0.4-0.6,0.4-1c0-0.4-0.2-0.7-0.5-1
	c-0.3-0.2-0.7-0.4-1.1-0.3c-0.4,0-0.8,0.2-1,0.5l-9.7,10.2l-4.8-3.6c-0.2-0.1-0.3-0.2-0.5-0.3c-0.2-0.1-0.4-0.1-0.6-0.1
	c-0.4,0-0.8,0.2-1,0.5c-0.1,0.1-0.2,0.3-0.3,0.5C28,32.1,28,32.3,28,32.5c0,0.4,0.2,0.7,0.5,0.9l5.9,4.5c0.3,0.2,0.7,0.3,1.1,0.3
	c0.4,0,0.7-0.2,1-0.5L47.1,26.5z"
                  />
                </svg>
                <div className={Style.statusTitle}>訂單已完成</div>
                <div className={Style.statusTime}>
                  {data[0].post_status >= 5 ? data[0].order_create_time : ''}
                </div>
              </div>
              <div className={Style.iconBtn}>
                <svg
                  width="91"
                  height="3"
                  viewBox="0 0 91 3"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="1.9887"
                    y1="2.00055"
                    x2="89.9887"
                    y2="1.01178"
                    stroke={data[0].post_status >= 5 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <div className={Style.div}></div>
              </div>
              <div className={Style.iconBtn}>
                <svg
                  width="71"
                  height="68"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 71 68"
                  style={{ enableBackground: 'new 0 0 71 68' }}
                  xmlSpace="preserve"
                >
                  <path
                    fill="#FFF"
                    stroke={data[0].post_status >= 6 ? '#A1D429' : '#DDDDDD'}
                    strokeWidth="2"
                    d="M8,16.8C15.5,8.2,25,2.9,38,1.3c13-1.6,22.3,3.4,27,16.4c4.7,13,6.5,22,3.5,32.5c-3,10.5-13.5,16.9-36,16
	c-22.5-0.9-29.6-14-31-23.5C0.2,33.2,1.1,24.7,8,16.8z"
                  />
                  <g>
                    <defs>
                      <rect
                        id="SVGID_1_"
                        x="21.2"
                        y="18.3"
                        width="30"
                        height="30"
                      />
                    </defs>
                    <clipPath id="SVGID_00000042737315818605218800000000221362305816191631_"></clipPath>

                    <path
                      fill={data[0].post_status >= 6 ? '#A1D429' : '#DDDDDD'}
                      strokeWidth="2"
                      d="M51.2,30.5c0-0.3,0-0.5-0.1-0.8l0,0c-0.4-1.1-1.4-1.9-2.5-1.9H41l-2.3-7.1c-0.4-1.1-1.4-1.9-2.5-1.9
			c-1.2,0-2.2,0.8-2.5,1.9l1.2,0.4l-1.2-0.4l-2.3,7.1h-7.5c-1.2,0-2.2,0.7-2.5,1.9l0,0c-0.1,0.3-0.1,0.5-0.1,0.8
			c0,0.8,0.4,1.7,1.1,2.2l0,0l6.1,4.4L26,44.2l0,0c-0.1,0.3-0.1,0.6-0.1,0.8c0,0.8,0.4,1.6,1.1,2.2l0,0c0.5,0.3,1,0.5,1.6,0.5
			c0.6,0,1.1-0.2,1.6-0.5l0,0l6-4.4l6,4.4l0,0c0.5,0.3,1,0.5,1.6,0.5c0.5,0,1.1-0.2,1.6-0.5l0,0c0.7-0.5,1.1-1.3,1.1-2.2
			c0-0.3,0-0.6-0.1-0.8L44,37.1l6.1-4.4l0,0C50.8,32.2,51.2,31.4,51.2,30.5z M48.7,30.7L48.7,30.7l-6.8,4.9
			c-0.4,0.3-0.6,0.9-0.4,1.4l2.6,7.9l0,0.1c0,0.1,0,0.2-0.1,0.2l0,0c0,0-0.1,0-0.1,0c-0.1,0-0.1,0-0.1,0l0,0l-6.7-4.9
			c-0.4-0.3-1-0.3-1.4,0l-6.7,4.9c0,0-0.1,0-0.1,0c-0.1,0-0.1,0-0.1,0c-0.1,0-0.1-0.1-0.1-0.2l0-0.1l0,0L31,37
			c0.2-0.5,0-1.1-0.4-1.4l-6.8-4.9l0,0c-0.1,0-0.1-0.1-0.1-0.2l0-0.1c0-0.1,0.1-0.2,0.2-0.2h8.4c0.5,0,1-0.3,1.2-0.8l2.6-8
			c0-0.1,0.1-0.2,0.2-0.2c0.1,0,0.2,0.1,0.2,0.2l2.6,8c0.2,0.5,0.6,0.8,1.2,0.8h8.4c0.1,0,0.2,0.1,0.2,0.2l0,0.1
			C48.8,30.6,48.7,30.7,48.7,30.7z"
                    />
                  </g>
                </svg>
                <div className={Style.statusTitle}>
                  {data[0].post_status >= 6 ? '已評價' : '待評價'}
                </div>
                <div className={Style.statusTime}>
                  {data[0].post_status >= 6 ? data[0].order_create_time : ''}
                </div>
              </div>
            </div>
            <div className={Style.orderInfo}>
              <div className={Style.infoItem}>
                <div className={Style.infoText}>
                  <p>收件人 ：</p>
                  <p>{data[0].member_name}</p>
                </div>
                <div className={Style.infoText}>
                  <p>聯絡電話 ：</p>
                  <p>{data[0].member_mobile}</p>
                </div>
                <div className={Style.infoText}>
                  <p>訂單成立時間 ：</p>
                  <p>{data[0].order_create_time}</p>
                </div>
              </div>
              {data[0].rel_type === 'shop' ? (
                <>
                  <div className={Style.infoItem}>
                    <div className={Style.infoText}>
                      <p>運送方式 ：</p>
                      <p>
                        {postType}
                        {data[0].postStore}
                      </p>
                    </div>
                    <div className={Style.infoText}>
                      <p>運送地址 ：</p>
                      <p>{data[0].postAddress}</p>
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
            <div className={Style.filed}>
              <div className={Style.filedL}>
                <div className={Style.filedProduct}>商品名稱</div>
              </div>
              <div className={Style.filedR}>
                {data[0].rel_type === 'shop' ? (
                  <>
                    <div className={Style.filedItem}>單價</div>
                    <div className={Style.filedItem}>數量</div>
                  </>
                ) : (
                  <>
                    <div className={Style.filedItem}>成人</div>
                    <div className={Style.filedItem}>人數</div>
                    <div className={Style.filedItem}>小孩</div>
                    <div className={Style.filedItem}>人數</div>
                  </>
                )}
                <div className={Style.filedItem}>小計</div>
              </div>
            </div>
            {data.map((data) => {
              return (
                <OrderDetailCard
                  key={data.order_detail_sid}
                  memberSid={data.member_sid}
                  odSid={data.order_detail_sid}
                  actSid={data.activity_sid}
                  prodSid={data.product_sid}
                  relName={data.rel_name}
                  relSeqName={data.rel_seq_name}
                  productQty={data.product_qty}
                  productPrice={data.product_price}
                  relSubtotal={data.rel_subtotal}
                  adultQty={data.adult_qty}
                  adultPrice={data.adult_price}
                  childQty={data.child_qty}
                  childPrice={data.child_price}
                  img={data.img}
                  actImg={data.activity_pic}
                  relType={data.rel_type}
                  actAddress={data.actAddress}
                  prodCommentSid={data.prodCommentSid}
                  shopStar={data.shopStar}
                  shopContent={data.shopContent}
                  actCommentSid={data.actCommentSid}
                  actStar={data.actStar}
                  actContent={data.actContent}
                  status={data.post_status}
                  pcSid={data.pcSid}
                  acRaSid={data.acRaSid}
                />
              );
            })}
            <div className={Style.priceContent}>
              <div className={Style.priceItem}>
                <p className={Style.priceTitle}>商品小計</p>
                <p>${data[0].originRelS.toLocaleString()}</p>
              </div>
              {data[0].rel_type === 'shop' ? (
                <>
                  <div className={Style.priceItem}>
                    <p className={Style.priceTitle}>運費</p>
                    <p>${data[0].post_price}</p>
                  </div>
                </>
              ) : (
                ''
              )}

              <div className={Style.priceItem}>
                <p className={Style.priceTitle}>優惠券折抵</p>
                <p>-{data[0].coupon_price}</p>
              </div>
              <div className={Style.priceItem}>
                <p className={Style.priceTitle}>訂單金額</p>
                <p>${data[0].orderRelS.toLocaleString()}</p>
              </div>
              <div className={Style.priceItem}>
                <p className={Style.priceTitle}>付款方式</p>
                <p>{treadType}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
OrderDetail.getLayout = MemberCenterLayout;
