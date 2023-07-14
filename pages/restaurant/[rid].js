import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Styles from './[rid].module.css';
import IconBtn from '@/components/ui/buttons/IconBtn';
import IconSeconBtn from '@/components/ui/buttons/IconSeconBtn';
import IconMainBtn from '@/components/ui/buttons/IconMainBtn';
import RateStar from '@/components/ui/rateStar/RateStar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faFileLines,
  faPhone,
  faLocationDot,
  faClock,
  faPaw,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import Tab from '@/components/ui/restaurant/Tab';
import FeatureCard from '@/components/ui/restaurant/featureCard';
import ActivityCard from '@/components/ui/restaurant/ActivityCard';
import Image from 'next/image';
import CloudTop from '@/assets/cloud_top.svg';
import NotionAreaBgc from '@/components/ui/restaurant/NotionAreaBgc';
import PinkBtn from '@/components/ui/restaurant/PinkBtn';
import { Col, Row } from 'antd';
import CommentCard from '@/components/ui/cards/comment-card';

export default function RestInfo() {
  const { qurey, asPath } = useRouter();

  const [dataForRest, setDataForRest] = useState({
    rest_sid: '',
    name: '',
    phone: '',
    city: '',
    area: '',
    acceptType: '',
    info: '',
    feature_title: '',
    feature_content: '',
    feature_img: '',
  });

  // useEffect(() => {
  //   const { rid } = qurey;

  //   if(rid){
  //     (async function getData(){

  //     })
  //   }
  // });

  //圖片輪播取照片
  const [restImage, setRestImage] = useState([]);

  const toggleDisplayForImg = (restImage, id) => {
    return restImage.map((v) => {
      if (v.img_sid === id) {
        return { ...v, display: true };
      } else {
        return { ...v, display: true };
      }
    });
  };
  return (
    <>
      <div className={Styles.abc}>
        <div className="container-inner">
          <div className={Styles.bgc}>
            <div className="breadcrumb">餐廳列表/我們家有農場</div>
            <IconBtn icon={faHeart} text="收藏列表" />
          </div>
        </div>
      </div>

      <div className="container-inner">
        <div className={Styles.rest_detail}>
          <div className={Styles.rest_image}>
            <div className={Styles.rest_image_main}>
              {restImage.map((v) => {
                return (
                  v.display && (
                    <img
                      key={v.img_sid}
                      src={`http://localhost:3000/rest_image/image/${v.img}`}
                      alt={v.img}
                    />
                  )
                );
              })}
            </div>
            <div className={Styles.rest_image_group}>
              <div className={Styles.rest_image_single}>
                <img src="/rest_image/sunshine_detail1.jpeg" alt="" />
              </div>
              <div className={Styles.rest_image_single}>
                <img src="/rest_image/sunshine_detail2.jpeg" alt="" />
              </div>
              <div className={Styles.rest_image_single}>
                <img src="/rest_image/sunshine_detail3.jpeg" alt="" />
              </div>
              <div className={Styles.rest_image_single}>
                <img src="/rest_image/sunshine_detail4.jpeg" alt="" />
              </div>
            </div>
          </div>
          <div className={Styles.rest_info}>
            <h1 className={Styles.jill_h1}>陽光莊園</h1>
            <RateStar score="4.8" className={Styles.rate_star} />
            <p className={Styles.information}>
              一群熱愛生命有夢想的青年，在這2200平方的土地上開始建構毛小孩的奔跑空間，健康自製的料理飲品，無毒自然的溯源食材，我們知道，我們還有很多可以進步的地方，因為我們熱愛我們的家，熱愛每一個回家的家人~當歡迎光臨聲起，我們的微笑綻放，心裡默默念著…歡迎回家!!
            </p>
            <div className={Styles.info_text_group}>
              <div className={Styles.contact_group}>
                <div className={Styles.contact}>
                  <FontAwesomeIcon
                    icon={faPhone}
                    className={Styles.info_icon}
                  />
                  <p className={Styles.information_detail}>02-2268-1031</p>
                </div>
                <div className={Styles.contact}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={Styles.info_icon}
                  />
                  <p className={Styles.information_detail}>
                    新北市土城區承天路103號
                  </p>
                </div>
                <div className={Styles.contact}>
                  <FontAwesomeIcon
                    icon={faClock}
                    className={Styles.info_icon}
                  />
                  <p className={Styles.information_detail}>
                    11:00~22:00，週日公休
                  </p>
                </div>
                <div className={Styles.contact}>
                  <FontAwesomeIcon icon={faPaw} className={Styles.info_icon} />
                  <p className={Styles.information_detail}>
                    大型/中型/小型犬與貓
                  </p>
                </div>
              </div>
              {/* button */}
              <div className={Styles.detail_main_buttom}>
                <IconSeconBtn icon={faHeart} text="收藏餐廳" />
                <IconSeconBtn icon={faFileLines} text="餐廳菜單" />
                <IconMainBtn icon={faCalendar} text="我要預約" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-inner">
        <Tab
          text1="服務項目"
          text2="攜帶規範"
          text3="餐廳特色"
          text4="優惠/活動"
          text5="店家叮嚀"
          text6="饕客評價"
        />
      </div>
      <div className="container-inner">
        <h2 className={Styles.jill_h2}>服務項目</h2>
        <Row gutter={[48, 48]} className={Styles.row_gutter}>
          <Col xl={4} xs={8}>
            <PinkBtn text="可放繩" img="/rest_image/friendly/rope.png" />
          </Col>
          <Col xl={4} xs={8}>
            <PinkBtn text="可自由活動" img="/rest_image/friendly/dog_run.png" />
          </Col>
          <Col xl={4} xs={8}>
            <PinkBtn
              text="有賣寵物餐"
              img="/rest_image/friendly/sell_food.png"
            />
          </Col>
          <Col xl={4} xs={8}>
            <PinkBtn
              text="附寵物餐具"
              img="/rest_image/friendly/tableware.png"
            />
          </Col>
          <Col xl={4} xs={8}>
            <PinkBtn text="幫忙鏟屎" img="/rest_image/friendly/clean.png" />
          </Col>
          <Col xl={4} xs={8}>
            <PinkBtn text="可上座椅" img="/rest_image/friendly/onchair.png" />
          </Col>
        </Row>
      </div>
      <div className="container-inner">
        <h2 className={Styles.jill_h2}>攜帶規則</h2>
        <Row gutter={[48, 48]}>
          <Col xl={4} xs={8}>
            <PinkBtn text="可放繩" img="/rest_image/friendly/rope.png" />
          </Col>
          <Col xl={4} xs={8}>
            <PinkBtn text="可自由活動" img="/rest_image/friendly/dog_run.png" />
          </Col>
          <Col xl={4} xs={8}>
            <PinkBtn
              text="有賣寵物餐"
              img="/rest_image/friendly/sell_food.png"
            />
          </Col>
          <Col xl={4} xs={8}>
            <PinkBtn
              text="附寵物餐具"
              img="/rest_image/friendly/tableware.png"
            />
          </Col>
          <Col xl={4} xs={8}>
            <PinkBtn text="幫忙鏟屎" img="/rest_image/friendly/clean.png" />
          </Col>
          <Col xl={4} xs={8}>
            <PinkBtn text="可上座椅" img="/rest_image/friendly/onchair.png" />
          </Col>
        </Row>
      </div>
      <div className="container-inner">
        <h2 className={Styles.jill_h2}>餐廳特色</h2>
      </div>
      <FeatureCard
        img="/rest_image/lawn.jpeg"
        title="戶外草皮區"
        feature_info=" 寬闊草皮適合狗狗、孩子自由奔跑水晶教堂下看著魚兒水中游，獻給愛陪伴毛小孩的你愛就是要分秒陪伴把用餐的放鬆時光與最親密的牠一起分享適合有帶寵物一起前來的你"
      />
      <div className="container-inner">
        <h2 className={Styles.jill_h2}>餐廳活動</h2>
      </div>
      <ActivityCard
        img="/rest_image/activity.png"
        title="毛孩的專屬粽子"
        date="2023/05/01 ~ 2023/05/26"
        activity_info="以端午節為主題推出寵物鮮食肉粽讓毛寶一起慶端午！特別選用手掌心×天然寵食的『紅趜豬肉粽』香噴噴的豬肉營養滿分的紅趜滿足了您毛小孩的口腹之欲專為寵物製作的美食，讓您的毛小孩開心地一口接一口！"
      />
      <div className={Styles.CloudTop}>
        <Image src={CloudTop} alt="CloudTop" />
      </div>
      <div className={Styles.notion_bgc}>
        <div className="container-inner">
          <h2 className={Styles.jill_h2_notion}>預約叮嚀</h2>
          <div className={Styles.notion_frame}>
            <p>
              1. 事先了解店家規範：不論是去任何餐廳都應該先詳細了解店內規範。
            </p>
            <p>
              2.
              配合餐廳規範：遵守不同餐廳的寵物規範，避免惡意違規造成店家不好的印象。
            </p>
            <p>
              3.
              保護毛兒安全：保護自己與他人毛兒的安全非常重要，攻擊性強的毛兒要加強管控，要摸別人家毛兒之前也要先問過毛爸媽。
            </p>
            <p>
              4.
              不影響他人用餐：管控好毛兒吠叫問題，也別讓毛兒四處亂跑（是餐廳友善程度而定），避免影響他人用餐。
            </p>
            <p>
              5.
              不共用餐具：為維護他人權益與用餐品質，除非店家有明確說可以，不然別讓毛兒上餐桌，也不要與毛兒共用餐廳餐具。
            </p>
            <p>
              6.
              維護環境整潔：自備毛兒坐墊，自行處理毛兒便溺，共同維護環境整潔。
            </p>
          </div>
        </div>
      </div>
      <NotionAreaBgc />
      <div className="container-inner">
        <h2 className={Styles.jill_h2}>饕客評價</h2>
      </div>
      <div className="container-inner">
        <div className={Styles.comment_cards}>
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
        </div>
      </div>
    </>
  );
}
