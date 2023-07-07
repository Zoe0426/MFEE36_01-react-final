import styles from '../../styles/activitydetail.module.css';
import ActivityCard5 from '@/components/ui/cards/ActivityCard5';
import NavDetailPage from '@/components/ui/cards/NavDetailPage';
//import ActivityFeatureDetailPage from '@/components/ui/cards/ActivityFeatureDetailPage';

export default function ActivityDetail() {
  return (
    <div className="container-inner">
      <ActivityCard5 />

      <NavDetailPage
        text1="活動內容"
        text2="活動行程"
        text3="活動規範"
        text4="購買須知&取消政策"
        text5="顧客評價"
        text6="為您推薦"
      />
      {/* <ActivityFeatureDetailPage /> */}
    </div>
  );
}
