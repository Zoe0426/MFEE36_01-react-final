import { useState, useEffect } from 'react';
import Styles from './calendar.module.css';
import BookingModal from '@/components/ui/restaurant/Bookingmodal';
import IconBtn from '@/components/ui/buttons/IconBtn';
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
  const [showPreviousWeek, setShowPreviousWeek] = useState(false);
  const [showNextWeek, setShowNextWeek] = useState(true);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();
  const weekDayList = ['日', '一', '二', '三', '四', '五', '六'];

  // const daysDataArray = [];
  // for (let i = 1; i <= 7; i++) {
  //   const date = new Date(
  //     currentYear,
  //     currentMonth,
  //     currentDay + currentWeek * 7 + i
  //   );
  //   daysDataArray.push({
  //     date: date.getDate(),
  //     dayOfWeek: weekDayList[date.getDay()],
  //     month: date.getMonth() + 1,
  //   });
  // }

  const firstDay = new Date(
    currentYear,
    currentMonth,
    currentDay - (currentWeek * 7 + 1) + 1
  );
  const daysDataArray = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(firstDay);
    date.setDate(firstDay.getDate() + i);
    return {
      date: date.getDate(),
      dayOfWeek: weekDayList[date.getDay()],
      month: date.getMonth() + 1,
    };
  });
  // 初始化每個週份的點擊次數為 0
  const [clickCounts, setClickCounts] = useState(Array(10).fill(0));

  const goToPreviousWeek = () => {
    setCurrentWeek((prevWeek) => prevWeek + 1);

    // 更新當前週份的點擊次數並重置為 0
    const updatedClickCounts = [...clickCounts];
    updatedClickCounts[currentWeek + 1] = 0;
    setClickCounts(updatedClickCounts);
  };

  const goToNextWeek = () => {
    setCurrentWeek((prevWeek) => prevWeek - 1);

    // 更新當前週份的點擊次數並重置為 0
    const updatedClickCounts = [...clickCounts];
    updatedClickCounts[currentWeek - 1] = 0;
    setClickCounts(updatedClickCounts);
  };

  useEffect(() => {
    if (currentWeek < 0) {
      setShowPreviousWeek(true);
    } else {
      setShowPreviousWeek(false);
    }
  }, [currentWeek]);

  useEffect(() => {
    // 判斷是否超過兩次點擊，更新對應週份的點擊次數
    if (clickCounts[currentWeek] >= 2) {
      const updatedClickCounts = [...clickCounts];
      updatedClickCounts[currentWeek] = 2;
      setClickCounts(updatedClickCounts);
      setShowNextWeek(false);
    } else {
      setShowNextWeek(true);
    }
  }, [currentWeek, clickCounts]);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.API_SERVER}/restaurant-api/booking`)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.length > 0) {
          setData(data);
        }
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
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
        <h1 className={Styles.timetable}>{data.name}預約時間表</h1>
      </div>
      <div className="container-inner">
        <div className={Styles.week_calendar}>
          {showPreviousWeek && (
            <FontAwesomeIcon
              icon={faArrowLeft}
              className={Styles.arrow_left}
              onClick={goToPreviousWeek}
            />
          )}

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

          {showNextWeek && (
            <FontAwesomeIcon
              icon={faArrowRight}
              className={Styles.arrow_right}
              onClick={goToNextWeek}
            />
          )}
        </div>

        {/* 時間的部分 */}
        <div className="container-inner">
          {/* <BookingModal /> */}
          <div className={Styles.time_section}>
            <div className={Styles.column}>
              <BookingModal time={data[0]?.time} people={data[0]?.people_max} />
              <BookingModal time={data[1]?.time} people={data[1]?.people_max} />
              <BookingModal time={data[2]?.time} people={data[2]?.people_max} />
              <BookingModal time={data[3]?.time} people={data[3]?.people_max} />
              <BookingModal time={data[4]?.time} people={data[4]?.people_max} />
            </div>
            <div className={Styles.column}>
              <BookingModal time={data[5]?.time} people={data[5]?.people_max} />
              <BookingModal time={data[6]?.time} people={data[6]?.people_max} />
              <BookingModal time={data[7]?.time} people={data[7]?.people_max} />
              <BookingModal time={data[8]?.time} people={data[8]?.people_max} />
              <BookingModal time={data[9]?.time} people={data[9]?.people_max} />
            </div>
            <div className={Styles.column}>
              <BookingModal
                time={data[10]?.time}
                people={data[10]?.people_max}
              />
              <BookingModal
                time={data[11]?.time}
                people={data[11]?.people_max}
              />
              <BookingModal
                time={data[12]?.time}
                people={data[12]?.people_max}
              />
              <BookingModal
                time={data[13]?.time}
                people={data[13]?.people_max}
              />
              <BookingModal
                time={data[14]?.time}
                people={data[14]?.people_max}
              />
            </div>
            <div className={Styles.column}>
              <BookingModal
                time={data[15]?.time}
                people={data[15]?.people_max}
              />
              <BookingModal
                time={data[16]?.time}
                people={data[16]?.people_max}
              />
              <BookingModal
                time={data[17]?.time}
                people={data[17]?.people_max}
              />
              <BookingModal
                time={data[18]?.time}
                people={data[18]?.people_max}
              />
              <BookingModal
                time={data[19]?.time}
                people={data[19]?.people_max}
              />
            </div>
            <div className={Styles.column}>
              <BookingModal
                time={data[20]?.time}
                people={data[20]?.people_max}
              />
              <BookingModal
                time={data[21]?.time}
                people={data[21]?.people_max}
              />
              <BookingModal
                time={data[22]?.time}
                people={data[22]?.people_max}
              />
              <BookingModal
                time={data[23]?.time}
                people={data[23]?.people_max}
              />
              <BookingModal
                time={data[24]?.time}
                people={data[24]?.people_max}
              />
            </div>
            <div className={Styles.column}>
              <BookingModal
                time={data[25]?.time}
                people={data[25]?.people_max}
              />
              <BookingModal
                time={data[26]?.time}
                people={data[26]?.people_max}
              />
              <BookingModal
                time={data[27]?.time}
                people={data[27]?.people_max}
              />
              <BookingModal
                time={data[28]?.time}
                people={data[28]?.people_max}
              />
              <BookingModal
                time={data[29]?.time}
                people={data[29]?.people_max}
              />
            </div>
            <div className={Styles.column}>
              <BookingModal
                time={data[30]?.time}
                people={data[30]?.people_max}
              />
              <BookingModal
                time={data[31]?.time}
                people={data[31]?.people_max}
              />
              <BookingModal
                time={data[32]?.time}
                people={data[32]?.people_max}
              />
              <BookingModal
                time={data[33]?.time}
                people={data[33]?.people_max}
              />
              <BookingModal
                time={data[34]?.time}
                people={data[34]?.people_max}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeekCalendar;
