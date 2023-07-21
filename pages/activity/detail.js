import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faCalendarDays,faClock,faLocationDot,faHeart,faUserPlus } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/activitydetail.module.css';
import NavDetailPage from '@/components/ui/cards/NavDetailPage';
import ActivityFeatureDetail from '@/components/ui/cards/ActivityFeatureDetail';
import IconMainBtn from '@/components/ui/buttons/IconMainBtn';
import IconSeconBtn from '@/components/ui/buttons/IconSeconBtn';

// import CommentCard from '@/componets/ui/cards/comment-card.js';

export default function ActivityDetail() {
  return (
    <div>

      {/* .........上方資訊......... */}
        <div className="container-inner">
          <div className={styles.card}>
            {/* -------右邊------- */}
            <div className={styles.left}>
              <img
                src="/activity_img/act1_1.jpg"
                alt="Activity"
                className={styles.image}
              />
              <div className={styles.overlay_left}></div>
              <div className={styles.overlay_right}></div>
              <div className={styles.icon}></div>
            </div>

            {/* -------左邊------- */}
            <div className={styles.right}>
              {/* 第一行 */}
              <div>
                <p className={styles.row_text_title}>2022台北與毛家庭有約</p>
              </div>

              {/* 第二行 */}
              <div className={styles.row}>
                <p className={styles.row_price}>$250/大人 $125/小孩</p>
              </div>

              {/* 第三行 */}
              <div className={styles.row}>
                <div className={styles.review}>
                  <FontAwesomeIcon icon={faStar} className={styles.star_icon} />
                  <p className={styles.row_text_medium}>4.3</p>
                </div>

                <div>
                  <p className={styles.row_text_medium}>(30人參加過)</p>
                </div>
              </div>

              {/* 第四行 */}
              <div className={styles.row}>
                <FontAwesomeIcon icon={faCalendarDays} className={styles.row_icon} />
                <div>
                  <p className={styles.row_text_small}>
                    2023-04-09(六)~2023-05-09(六)
                  </p>
                </div>
              </div>

              {/* 第五行 */}
              <div className={styles.row}>
                <FontAwesomeIcon icon={faClock} className={styles.row_icon} />
                <div>
                  <p className={styles.row_text_small}>13:00-15:00</p>
                </div>
              </div>

              {/* 第六行 */}
              <div className={styles.row}>
                <FontAwesomeIcon icon={faLocationDot} className={styles.row_icon} />
                <div>
                  <p className={styles.row_text_small}>
                    台北市大安區大安路一段24巷420號3樓
                  </p>
                </div>
              </div>

              {/* 第七行 */}
              <div className={styles.row}>
                <div className={styles.row_date}>
                  <p className={styles.row_text_small}>選擇日期：</p>
                  <input></input>
                </div>
              </div>

              {/* 第八行 */}
              <div className={styles.ppl_qty}>
                {/* 左邊 */}
                <div>
                  <p className={styles.row_text_small}>報名人數：</p>
                </div>

                {/* 右邊 */}
                <div>
                  <div>
                    <p className={styles.ppl_qty_row}>大人：</p>
                    <input className={styles.ppl_qty_row}></input>
                  </div>
                  <div>
                    <p className={styles.ppl_qty_row}>小孩：</p>
                    <input className={styles.ppl_qty_row}></input>
                  </div>
                </div>
              </div>

              {/* 第九行 */}
              <div className={styles.row_total_price}>
                <p className={styles.total_price}>總金額：</p>
                <p className={styles.total_price}>$123</p>
              </div>

              {/* 第十行 */}
              <div className={styles.row_btn}>
                <div  className={styles.btn}>
                  <IconSeconBtn icon={faHeart} text='加入收藏' />
                </div>
                
                <IconMainBtn icon={faUserPlus} text='我要報名' />
              </div>
            </div>
          </div>

          <div className={styles.nav_detail}>
            <NavDetailPage
              text1="活動內容"
              text2="活動行程"
              text3="活動規範"
              text4="購買須知&取消政策"
              text5="顧客評價"
              text6="為您推薦"
            />
          </div>

          <div className={styles.feature}>
            <ActivityFeatureDetail feature="專屬攝影師隨拍" />
            <ActivityFeatureDetail feature="專屬好禮" />
            <ActivityFeatureDetail feature="提供寵物健康下午茶" />
            <ActivityFeatureDetail feature="提供瑜珈墊" />
            <ActivityFeatureDetail feature="一人一間更衣室及置物櫃" />
          </div>
        </div>


      {/* .........下方資訊......... */}

      {/* ....銜接處圖片1.... */}
      <img src="/activity_img/detail_bg_1.jpg" alt="Activity" />

      <div className="container-inner">
        <div className={styles.content}>
            <div>
              <p className={styles.subtitle}>活動內容＆行程：</p>

              <p className={styles.row_text_small}>
                今夏最大「毛小孩都市水樂園」活動即將在圓山花博公園盛大登場！覺得海太遠？幫你搬過來不用跑到墾丁衝到離島，就在台北圓山捷運站1號出口。歡迎帶
                毛小孩 來參加 圓山花博廣場 的 台北海洋水樂園
                現場免費開放寵物游泳池
                、玩SUP、寵物義剪服務，盡情享受美好午後時光。請自備毛巾，捷運圓山站1號出口世界海洋日台北海洋水樂園、寵物義剪、寵物水上活動、寵物水中跑步、寵物趣味闖關遊戲、寵物自助洗吹體驗現場還有寵物市集～前所未有的都市海洋驚艷
                ，歡迎大家一起來共襄盛舉。
              </p>
              <br />
              <br />
              <p>
                行程行程行程--行程行程行程--行程行程行程--程行程行程--行程行程行程--行程行程行程--行程行程行程
              </p>
            </div>

            <img
              className={styles.content_image}
              src="/activity_img/act1_1.jpg"
              alt=""
            />
        </div>
      </div>

      {/* ....銜接處圖片2.... */}
      <img src="/activity_img/detail_bg_2.jpg" alt="Activity" />

      <div className="container-inner">
        <div className={styles.content}>
            <img
              className={styles.content_image_reverse}
              src="/activity_img/act1_1.jpg"
              alt=""
            />

            <div>
              <p className={styles.subtitle}>活動規範：</p>

              <p className={styles.row_text_small}>
                寵物於園區內活動時，須全程置於提袋、提籠、推車等限制活動範圍的器具內，或是妥善繫上最長1.5公尺的繫繩，並禁止與野生動物接觸。非指定區域，寵物不得進入。寵物如產生不聽指令、攻擊行為，飼主應立即將寵物帶離園區。園區內發生的衝突情事，若涉及訴訟或賠償問題，由飼主負責。寵物食品禁止遺留園區。寵物若產生糞便，飼主應隨手清理並丟置垃圾桶。飼主應善盡維護園區清潔和安全秩序的責任。上述規範飼主經勸導若仍拒絕遵守，管理單位得要求飼主立即攜帶寵物離開園區，且不得要求退費或賠償。
              </p>
            </div>
        </div>
      </div>

      {/* ....銜接處圖片3.... */}
      <img src="/activity_img/detail_bg_3.jpg" alt="Activity" />

      <div className="container-inner">
        <div className={styles.content}>
            <div>
              <p className={styles.subtitle}>購買須知&取消政策：</p>

              <p className={styles.row_text_small}>
                寵物於園區內活動時，須全程置於提袋、提籠、推車等限制活動範圍的器具內，或是妥善繫上最長1.5公尺的繫繩，並禁止與野生動物接觸。非指定區域，寵物不得進入。寵物如產生不聽指令、攻擊行為，飼主應立即將寵物帶離園區。園區內發生的衝突情事，若涉及訴訟或賠償問題，由飼主負責。寵物食品禁止遺留園區。寵物若產生糞便，飼主應隨手清理並丟置垃圾桶。飼主應善盡維護園區清潔和安全秩序的責任。上述規範飼主經勸導若仍拒絕遵守，管理單位得要求飼主立即攜帶寵物離開園區，且不得要求退費或賠償。
              </p>
            </div>

            <img
              className={styles.content_image}
              src="/activity_img/act1_1.jpg"
              alt=""
            />
        </div>
      </div>


      {/* ....銜接處圖片4.... */}
      <img src="/activity_img/detail_bg_1.jpg" alt="Activity" />


      {/* .........為您推薦......... */}

      {/* <CommentCard  member_sid = 'mem0001' date='2023-01-10' rating='' content='' name='' profile='' /> */}
      
    </div>
  );
}
