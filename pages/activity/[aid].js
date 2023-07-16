import { useState, useEffect } from 'react';
import styles from '../../styles/activitymain.module.css';
import ActivityCard4 from '@/components/ui/cards/ActivityCard4';
import { Row, Col } from 'antd';

export default function ActivityMain() {
  const [data, setData] = useState([]);

//test

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('http://localhost:3002/activity-api/:cid');
  //     const data = await response.json();
  //     setData(data);
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      {/* .........banner......... */}
      <div className={styles.banner}></div>

      <div className="container-inner">
        {/* .........小麵包屑+篩選btn+收藏btn......... */}
        {/* .........篩選btn展開......... */}
        {/* .........搜尋結果+篩選btn......... */}
        <div className={styles.quick_selector}>
          <div>
            <p className={styles.text_large}>搜尋活動「游泳課」</p>
            <p>50項活動</p>
          </div>
          <div>
            <button>最新</button>
          </div>
        </div>
        {/* .........section1......... */}

        <div className={styles.section_card}>
          <Row gutter={[0, 106]} className={styles.card}>
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
                content,
                feature_names,
                price_adult,
              } = i;
              return (
                <ActivityCard4
                key={activity_sid}
                  activity_sid={activity_sid}
                  type={type_name}
                  image={'/activity_img/'+activity_pic.split(',')[0]}
                  title={name}
                  rating={avg_star}
                  date_begin={recent_date}
                  date_end={farthest_date}
                  time={time}
                  city={city}
                  area={area}
                  address={address}
                  content={content}
                  features={feature_names.split(',')}
                  price={price_adult}
                />
              );
            })}
          </Row>
        </div>

        {/* <Row gutter={[16, 32]}>
          <ActivityCard4
            image="/activity_img/asian-young-girl-holding-kittens-park.jpg"
            type="市集展覽"
            title="寵物瑜珈課"
            rating={4.5}
            date_begin="2023-04-09"
            date_end="2023-05-09"
            time="每週六 8:00-18:00"
            content="寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。"
            city="台北市"
            area="大安區"
            address="大安路一段234號"
            feature="寵物健康餐提供"
            price={500}
          />

          <ActivityCard4
            image="/activity_img/asian-young-girl-holding-kittens-park.jpg"
            type="市集展覽"
            title="寵物瑜珈課"
            rating={4.5}
            date_begin="2023-04-09"
            date_end="2023-05-09"
            time="每週六 8:00-18:00"
            content="寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。"
            city="台北市"
            area="大安區"
            address="大安路一段234號"
            feature="寵物健康餐提供"
            price={500}
          />
          <ActivityCard4
            image="/activity_img/asian-young-girl-holding-kittens-park.jpg"
            type="市集展覽"
            title="寵物瑜珈課"
            rating={4.5}
            date_begin="2023-04-09"
            date_end="2023-05-09"
            time="每週六 8:00-18:00"
            content="寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。"
            city="台北市"
            area="大安區"
            address="大安路一段234號"
            feature="寵物健康餐提供"
            price={500}
          />

          <ActivityCard4
            image="/activity_img/asian-young-girl-holding-kittens-park.jpg"
            type="市集展覽"
            title="寵物瑜珈課"
            rating={4.5}
            date_begin="2023-04-09"
            date_end="2023-05-09"
            time="每週六 8:00-18:00"
            content="寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。"
            city="台北市"
            area="大安區"
            address="大安路一段234號"
            feature="寵物健康餐提供"
            price={500}
          />

          <div className={styles.section_card}>
            <ActivityCard4 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' title='寵物瑜珈課' rating={4.5} date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' content='寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。' city='台北市' area='大安區' address='大安路一段234號' feature='寵物健康餐提供' price={500} />
            <ActivityCard4 image='/activity_img/asian-young-girl-holding-kittens-park.jpg' type='市集展覽' title='寵物瑜珈課' rating={4.5} date_begin='2023-04-09' date_end='2023-05-09' time='每週六 8:00-18:00' content='寵物瑜珈可改善毛孩長期待在室內的壓力、情緒不穩、多吃少動的肥胖等問題外，飼主們也可與毛孩一起伸展肢體，增進人和毛孩之間的感情。' city='台北市' area='大安區' address='大安路一段234號' feature='寵物健康餐提供' price={500} />
          </div>
        </Row> */}
        {/* .........頁碼......... */}
        <div className={styles.pagination}>
          <p>頁碼</p>
        </div>
      </div>
    </div>
  );
}
