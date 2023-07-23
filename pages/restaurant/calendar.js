import { useState } from 'react';
import Styles from './calendar.module.css';
import BookingModal from '@/components/ui/restaurant/BookingModal';
import IconBtn from '@/components/ui/buttons/IconBtn';
import { Col, Row } from 'antd';
import {
  faHeart,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

function WeekCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(0);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();
  const weekDayList = ['日', '一', '二', '三', '四', '五', '六'];

  const daysDataArray = [];
  for (let i = 1; i <= 7; i++) {
    const date = new Date(
      currentYear,
      currentMonth,
      currentDay + currentWeek * 7 + i
    );
    daysDataArray.push({
      date: date.getDate(),
      dayOfWeek: weekDayList[date.getDay()],
      month: date.getMonth() + 1,
    });
  }

  const goToPreviousWeek = () => {
    setCurrentWeek((prevWeek) => prevWeek - 1);
  };

  const goToNextWeek = () => {
    setCurrentWeek((prevWeek) => prevWeek + 1);
  };

  return (
    <div>
      <div className={Styles.abc}>
        <div className="container-inner">
          <div className={Styles.bgc}>
            <div className="breadcrumb">餐廳列表/我們家有農場</div>
            <IconBtn icon={faHeart} text="收藏列表" />
          </div>
        </div>
      </div>
      <div className="container-inner">
        <h1 className={Styles.timetable}>我們的家休閒農場預約時間表</h1>
      </div>
      <div className="container-inner">
        <div className={Styles.week_calendar}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={Styles.arrow_left}
            onClick={goToPreviousWeek}
          />
          <div className={Styles.dates_container}>
            {daysDataArray.map((item, idx) => (
              <div key={idx} className={Styles.date}>
                <p
                  onClick={() => {
                    setSelectedDate(item.date);
                  }}
                >
                  {item.month}/{item.date}({item.dayOfWeek})
                </p>
              </div>
            ))}
          </div>
          {/* <div>{selectedDate && <p>你選擇的日期是：{selectedDate}日</p>}</div> */}
          <FontAwesomeIcon
            icon={faArrowRight}
            className={Styles.arrow_right}
            onClick={goToNextWeek}
          />
        </div>

        {/* 時間的部分 */}
        <div className="container-inner">
          <BookingModal />
          <div className={Styles.time_section}>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>10:00~12:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>10:00~12:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>10:00~12:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>10:00~12:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>10:00~12:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>10:00~12:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
            <div className={Styles.booking_card}>
              <div className={Styles.time_range}>10:00~12:00</div>
              <div className={Styles.rest_people}>
                剩餘<p className={Styles.rest_num}>12</p>人
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeekCalendar;
