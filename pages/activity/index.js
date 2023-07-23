import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Row, Col } from 'antd';
import Link from 'next/link';

import styles from '../../styles/activityindex.module.css';
import ActivityLikeWithSelector from '@/components/ui/cards/ActivityLikeWithSelector';
import SubBtn from '@/components/ui/buttons/subBtn';
import ActivityCard1 from '@/components/ui/cards/ActivityCard1';
import ActivityCard2 from '@/components/ui/cards/ActivityCard2';
import ActivityCard3 from '@/components/ui/cards/ActivityCard3';
import ActivityFormSelectors from '@/components/ui/cards/ActivityFormSelectors';
import SearchBar from '@/components/ui/buttons/SearchBar';

export default function ActivityHome() {
  const [data, setData] = useState([]);
  const [topCityData, setTopCityData] = useState([]);
  const [wish, setWish] = useState([]);

  // 下面卡片的資訊
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3002/activity-api');
        const { data, topCityData, wish } = await response.json();
        setData(data);
        setTopCityData(topCityData);
        setWish(wish);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* .........banner......... */}
      <div className={styles.banner}>
        <div className={styles.search}>
          <h1>想找活動嗎？來這裡就對了！</h1>
          <SearchBar placeholder="搜尋活動名稱" btn_text="尋找活動" />
        </div>

        {/* <img
          className={styles.banner_pic}
          src="/activity_img/index_banner.jpg"
          alt="banner"
        /> */}
      </div>

      {/* .........收藏列表/進階篩選 btn......... */}
      <div className={styles.selector}>
        <div className="container-inner">
          {/* <IconBtn
            icon={faHeart}
            text="收藏列表"
            clickHandler={openShowLikeList}
          />
          <IconBtn
            icon={faFilter}
            text="進階篩選"
            clickHandler={openShowLikeList}
          /> */}
          <ActivityLikeWithSelector />
          <ActivityFormSelectors />
        </div>
      </div>

      {/* .........分類bar......... */}
      {/* !!!!!!!!! 這邊要加入分類連結 !!!!!!!!! */}
      <div className={styles.type}>
        <div className="container-inner">
          <div className={styles.type_btn_group}>
            <img
              className={styles.type_decoration}
              src="./activity_img/decoration1.png"
              alt=""
            />
            <Link href="http://localhost:3000/activity/list?cid=1" className={styles.custom_link} >
                <SubBtn img="./activity_img/subicon_1.png" text="主題派對" />
            </Link>
            <Link href="http://localhost:3000/activity/list?cid=2" className={styles.custom_link} >
              <SubBtn img="./activity_img/subicon_2.png" text="在地活動" />
            </Link>
            <Link href="http://localhost:3000/activity/list?cid=3" className={styles.custom_link} >
              <SubBtn img="./activity_img/subicon_3.png" text="市集展覽" />
            </Link>
            <Link href="http://localhost:3000/activity/list?cid=4" className={styles.custom_link} >
              <SubBtn img="./activity_img/subicon_4.png" text="毛孩講座" />
            </Link>
            <Link href="http://localhost:3000/activity/list?cid=5" className={styles.custom_link} >
              <SubBtn img="./activity_img/subicon_5.png" text="寵物學校" />
            </Link>
            <Link href="http://localhost:3000/activity/list?cid=6" className={styles.custom_link} >
              <SubBtn img="./activity_img/subicon_6.png" text="願望清單" />
            </Link>
            <img
              className={styles.type_decoration}
              src="./activity_img/decoration1.png"
              alt=""
            />
          </div>
        </div>
      </div>

      {/* .........section1......... */}
      <div className={styles.section1}>
        <div className="container-inner">
          <div>
            <p className={styles.title}>TOP 4 熱門活動</p>
          </div>

          <Row gutter={[0, 64]} className={styles.section_card}>
            <ActivityCard1
              image="/activity_img/asian-young-girl-holding-kittens-park.jpg"
              type="市集展覽"
              name="2022台北與毛家庭有約"
              rating="4.5"
              date_begin="2023-04-09"
              date_end="2023-05-09"
              time="每週六 8:00-18:00"
              city="台北市"
              area="大安區"
              address="大安路一段234號"
              price="250"
            />
            <ActivityCard1
              image="/activity_img/asian-young-girl-holding-kittens-park.jpg"
              type="市集展覽"
              name="2022台北與毛家庭有約"
              rating="4.5"
              date_begin="2023-04-09"
              date_end="2023-05-09"
              time="每週六 8:00-18:00"
              city="台北市"
              area="大安區"
              address="大安路一段234號"
              price="250"
            />
            <ActivityCard1
              image="/activity_img/asian-young-girl-holding-kittens-park.jpg"
              type="市集展覽"
              name="2022台北與毛家庭有約"
              rating="4.5"
              date_begin="2023-04-09"
              date_end="2023-05-09"
              time="每週六 8:00-18:00"
              city="台北市"
              area="大安區"
              address="大安路一段234號"
              price="250"
            />
            <ActivityCard1
              image="/activity_img/asian-young-girl-holding-kittens-park.jpg"
              type="市集展覽"
              name="2022台北與毛家庭有約"
              rating="4.5"
              date_begin="2023-04-09"
              date_end="2023-05-09"
              time="每週六 8:00-18:00"
              city="台北市"
              area="大安區"
              address="大安路一段234號"
              price="250"
            />
          </Row>
        </div>
      </div>

      {/* .........銜接處圖片1......... */}
      <img src="/activity_img/index_bg_1.jpg" alt="Activity" />

      {/* .........section2......... */}
      <div className={styles.section2}>
        <div className="container-inner">
          <div>
            <p className={styles.title}>最新上架</p>
          </div>
          <Row gutter={[0, 64]} className={styles.section_card}>
            {data.map((i) => {
              const {
                activity_sid,
                type_name,
                activity_pic,
                name,
                avg_star,
                recent_date,
                farthest_date,
                time,
                city,
                area,
                address,
                feature_names,
                price_adult,
              } = i;
              return (
                <Col key={activity_sid} span={12}>
                <ActivityCard1
                  activity_sid={activity_sid}
                  type={type_name}
                  image={'/activity_img/' + activity_pic.split(',')[0]}
                  title={name}
                  rating={avg_star}
                  date_begin={recent_date}
                  date_end={farthest_date}
                  time={time}
                  city={city}
                  area={area}
                  address={address}
                  features={feature_names.split(',')}
                  price={price_adult}
                />
                </Col>
              );
            })}

            {/* <ActivityCard1 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' name='2022台北與毛家庭有約' rating='4.5' date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' city='台北市' area='大安區' address='大安路一段234號' price='250' /> */}
          </Row>
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

          <Row gutter={[0, 64]} className={styles.section_card}>
            {topCityData.map((i) => {
              const { city } = i;
              return <ActivityCard2 key={city} city={city} />;
            })}
          </Row>
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
          <Row gutter={[0, 64]} className={styles.section_card}>
            {wish.map((i) => {
              const { member_sid, profile, name, city, area, vote_count } = i;
              return (
                <Col key={member_sid} span={8}>
                <ActivityCard3
                  profile={profile}
                  title={name}
                  count={vote_count}
                  city={city}
                  area={area}
                />
               </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
}
