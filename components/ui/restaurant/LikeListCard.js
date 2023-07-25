import React from 'react';
import Styles from './LikeListCard.module.css';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import HashTag from '../hashtag/hashtag';
import Link from 'next/link';

export default function LikeListCard({
  datas = [], //需要渲染的陣列資料
  token = '',
  removeLikeListItem = () => {}, //用來清除某一項蒐藏清單的函式
}) {
  const router = useRouter();
  return datas.map((v) => {
    const { rest_sid, name, image, city, area, rule_names, service_names } = v;
    return (
      <div className={Styles.like_rest} key={rest_sid}>
        <div>
          <FontAwesomeIcon
            icon={faTrashCan}
            className={Styles.trash_icon}
            onClick={() => {
              removeLikeListItem(rest_sid, token);
            }}
          />
        </div>
        <div
          role="presentation"
          className={Styles.like_img}
          onClick={() => {
            router.push(`http://localhost:3000/restaurant/${rest_sid}`);
          }}
        >
          <img src={`http://localhost:3000/rest-img/image/${img}`} alt="" />
        </div>
        <div
          role="presentation"
          className={Styles.like_content_box}
          onClick={() => {
            router.push(`http://localhost:3000/restaurant/${rest_sid}`);
          }}
        >
          <h5 className={Styles.like_title}>{name}</h5>
          <p className={Styles.like_detail}>
            {city}‧{area}
          </p>
        </div>
      </div>
    );
  });
  // return (
  //   <>
  //     {/* <div className={Styles.card}>
  //       <div className={Styles.rest_img}>
  //         <img src="/rest_image/sunshine.jpeg" alt="rest_image" />
  //       </div>
  //       <div className={Styles.info}>
  //         <h3 className={Styles.rest_name}>我家我家呦</h3>
  //         <div className={Styles.rest_title}>
  //           <p className={Styles.rest_location}>台北市‧大同區</p>
  //         </div>
  //         <div className={Styles.hash_tag_group}>
  //               {rules.map((v1, i1) => {
  //                 return <HashTag key={i1} text={v1} />;
  //               })}
  //               {services.map((v2, i2) => {
  //                 return <HashTag key={i2} text={v2} />;
  //               })}
  //             </div>
  //       </div>
  //     </div> */}
  //   </>
  // );
}
