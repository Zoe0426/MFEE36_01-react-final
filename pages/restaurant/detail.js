import React from 'react'
import Styles from './detail.module.css'
import IconBtn from '@/components/ui/buttons/IconBtn'
import RateStar from '@/components/ui/rateStar/RateStar'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import Tab from '@/components/ui/restaurant/Tab'
import FeatureCard from '@/components/ui/restaurant/FeatureCard'
import ActivityCard from '@/components/ui/restaurant/ActivityCard'
import Image from 'next/image'
import CloudTop from '@/assets/cloud_top.svg'
import NotionAreaBgc from '@/components/ui/restaurant/NotionAreaBgc'

export default function RestInfo() {
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
            <div className={Styles.rest_image_group}></div>
          </div>
          <div className={Styles.rest_info}>
            <h1 className={Styles.jill_h1}>我家有休閒農場</h1>
            <RateStar score="4.8" />
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
                  <p>02-2268-1031</p>
                </div>
                <div className={Styles.contact}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={Styles.info_icon}
                  />
                  <p>新北市土城區承天路103號</p>
                </div>
                <div className={Styles.contact}>
                  <FontAwesomeIcon
                    icon={faClock}
                    className={Styles.info_icon}
                  />
                  <p>11:00~22:00，週日公休</p>
                </div>
                <div className={Styles.contact}>
                  <FontAwesomeIcon icon={faPaw} className={Styles.info_icon} />
                  <p>大型/中型/小型犬與貓</p>
                </div>
              </div>
              <div className={Styles.rest_group_btn}>
                <button className={Styles.icon_btn}>
                  <FontAwesomeIcon icon={faPaw} className={Styles.icon} />
                  我要預約
                </button>
                <button className={Styles.icon_btn}>
                  <FontAwesomeIcon icon={faPaw} className={Styles.icon} />
                  我要預約
                </button>
                <button className={Styles.icon_btn}>
                  <FontAwesomeIcon icon={faPaw} className={Styles.icon} />
                  我要預約
                </button>
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
      </div>
      <div className="container-inner">
        <h2 className={Styles.jill_h2}>攜帶規則</h2>
      </div>
      <div className="container-inner">
        <h2 className={Styles.jill_h2}>餐廳特色</h2>
      </div>
      <FeatureCard
        img="/rest_image/lawn.jpeg"
        title="戶外草皮區"
        feature_info=" 寬闊草皮適合狗狗、孩子自由奔跑水晶教堂下看著魚兒水中游，獻給愛陪伴毛小孩的你愛就是要分秒陪伴把用餐的放鬆時光與最親密的牠一起分享適合有帶寵物一起前來的你"
      />
      <ActivityCard
        img="/rest_image/activity.png"
        title="毛孩的專屬粽子"
        date="2023/05/01 ~ 2023/05/26"
        activity_info="以端午節為主題推出寵物鮮食肉粽讓毛寶一起慶端午！特別選用手掌心×天然寵食的『紅趜豬肉粽』香噴噴的豬肉營養滿分的紅趜滿足了您毛小孩的口腹之欲專為寵物製作的美食，讓您的毛小孩開心地一口接一口！"
      />
      <Image src={CloudTop} />
      <div className={Styles.notion_bgc}>
        <div className="container-inner">
          <h2 className={Styles.jill_h2}>店家叮嚀</h2>
          <div className={Styles.notion_frame}></div>
        </div>
      </div>
      <NotionAreaBgc />

      <div className="container-inner">
        <h2 className={Styles.jill_h2}>饕客評價</h2>
      </div>
    </>
  )
}
