import styles from '../../styles/activityindex.module.css';
import ActivityLikeWithSelector from '@/components/ui/cards/ActivityLikeWithSelector';
import SubBtn from '@/components/ui/buttons/subBtn';
import ActivityCard1 from '@/components/ui/cards/ActivityCard1';
import ActivityCard2 from '@/components/ui/cards/ActivityCard2';
import ActivityCard3 from '@/components/ui/cards/ActivityCard3';
import ActivityFormSelectors from '@/components/ui/cards/ActivityFormSelectors';


export default function ActivityHome() {

  return (
    <div>
      {/* .........banner......... */}
      <div className={styles.banner}>
        <img
          className={styles.banner_pic}
          src="/activity_img/index_banner.jpg"
          alt="banner"
        />
      </div>

      <ActivityFormSelectors />

      {/* .........收藏列表/進階篩選 btn......... */}
      <div className={styles.like_selector}>
        <div className="container-inner">
          <ActivityLikeWithSelector />
        </div>
      </div>

      {/* .........分類bar......... */}
      <div className={styles.type}>
        <div className="container-inner">
          <div className={styles.type_btn_group}>
            <img className={styles.type_decoration} src='./activity_img/decoration1.png' alt='' />
            <div>
               <SubBtn img='./activity_img/subicon_1.png' text='主題派對' />
            </div>
            <div>
              <SubBtn img='./activity_img/subicon_2.png' text='在地活動' />
            </div>
            <div>
              <SubBtn img='./activity_img/subicon_3.png' text='市集展覽' />
            </div>
            <div>
              <SubBtn img='./activity_img/subicon_4.png' text='毛孩講座' />
            </div>
            <div >
              <SubBtn img='./activity_img/subicon_5.png' text='寵物學校' />
            </div>
            <div>
              <SubBtn img='./activity_img/subicon_6.png' text='願望實現清單' />
            </div>
            <img className={styles.type_decoration} src='./activity_img/decoration1.png' alt='' />
          </div>
        </div>
      </div>



      {/* .........section1......... */}
      <div className={styles.section1}>
        <div className="container-inner">
          <div>
            <p className={styles.title}>TOP 4 熱門活動</p>
          </div>
          <div className={styles.section_card}>
          <ActivityCard1 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' name='2022台北與毛家庭有約' rating='4.5' date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' city='台北市' area='大安區' address='大安路一段234號' price='250' />
          <ActivityCard1 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' name='2022台北與毛家庭有約' rating='4.5' date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' city='台北市' area='大安區' address='大安路一段234號' price='250' />
          </div>
          
          <div className={styles.section_card}>
          <ActivityCard1 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' name='2022台北與毛家庭有約' rating='4.5' date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' city='台北市' area='大安區' address='大安路一段234號' price='250' />
          <ActivityCard1 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' name='2022台北與毛家庭有約' rating='4.5' date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' city='台北市' area='大安區' address='大安路一段234號' price='250' />
          </div>
         
        </div>
      </div>

      {/* .........銜接處圖片1......... */}
      <img src="/activity_img/index_bg_1.jpg" alt="Activity" />

      {/* .........section2......... */}
      <div className={styles.section2}>
        <div className="container-inner">
          <div>
            <p className={styles.title}>本月最新活動</p>
          </div>
          <div className={styles.section_card}>
          <ActivityCard1 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' name='2022台北與毛家庭有約' rating='4.5' date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' city='台北市' area='大安區' address='大安路一段234號' price='250' />
          <ActivityCard1 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' name='2022台北與毛家庭有約' rating='4.5' date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' city='台北市' area='大安區' address='大安路一段234號' price='250' />
          </div>
          <div className={styles.section_card}>
          <ActivityCard1 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' name='2022台北與毛家庭有約' rating='4.5' date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' city='台北市' area='大安區' address='大安路一段234號' price='250' />
          <ActivityCard1 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' name='2022台北與毛家庭有約' rating='4.5' date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' city='台北市' area='大安區' address='大安路一段234號' price='250' />
          </div>
          
        </div>
      </div>

      {/* .........銜接處圖片2......... */}
      <img src="/activity_img/index_bg_2.jpg" alt="Activity" />

      {/* .........section3......... */}
      <div className={styles.section3}>
        <div className="container-inner">
          <div>
            <p className={styles.title}>探索熱門城市</p>
          </div>
          <div className={styles.section_card}>
            <ActivityCard2 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' city='台北市' />
            <ActivityCard2 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' city='台北市' />
            <ActivityCard2 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' city='台北市' /> 
          </div>
          <div className={styles.section_card}>
            <ActivityCard2 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' city='台北市' />
            <ActivityCard2 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' city='台北市' />
            <ActivityCard2 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' city='台北市' /> 
          </div>
          
        </div>
      </div>

      {/* .........銜接處圖片3......... */}
      <img src="/activity_img/index_bg_3.jpg" alt="Activity" />

      {/* .........section4......... */}
      <div className={styles.section4}>
        <div className="container-inner">
          <div>
            <p className={styles.title}>會員願望投票區</p>
          </div>
          <div className={styles.section_card}>
            <ActivityCard3 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' title='2022台北與毛家庭有約' count={10} city='台北市' area='大安區' />
            <ActivityCard3 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' title='2022台北與毛家庭有約' count={10} city='台北市' area='大安區' />
            <ActivityCard3 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' title='2022台北與毛家庭有約' count={10} city='台北市' area='大安區' />
          </div>

          <div className={styles.section_card}>
            <ActivityCard3 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' title='2022台北與毛家庭有約' count={10} city='台北市' area='大安區' />
            <ActivityCard3 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' title='2022台北與毛家庭有約' count={10} city='台北市' area='大安區' />
            <ActivityCard3 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' title='2022台北與毛家庭有約' count={10} city='台北市' area='大安區' />
          </div>
          
        </div>
      </div>
    </div>
  )
}
