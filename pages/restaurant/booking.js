import { useState, useEffect } from 'react';
import Styles from './booking.module.css';
import BookingModal from '@/components/ui/restaurant/Bookingmodal';
import IconBtn from '@/components/ui/buttons/IconBtn';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import arrowRight from '@/assets/arrow-right.svg';
import faArrowLeft from '@/assets/arrow-left.svg';
import { Col, Row, Breadcrumb, ConfigProvider } from 'antd';

function WeekCalendar() {
  const uniqueDates = new Set();
  const [currentWeek, setCurrentWeek] = useState(0);
  const [showPreviousWeek, setShowPreviousWeek] = useState(false);
  const [showNextWeek, setShowNextWeek] = useState(true);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();
  const weekDayList = ['日', '一', '二', '三', '四', '五', '六'];

  const [selectedDateData, setSelectedDateData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const clickHandler = (sectionSid) => {
    setSelectedDate(sectionSid);

    const selectedData = data.find((item) => item.section_sid === sectionSid);
    setSelectedDateData(selectedData);
  };

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

  const [data, setData] = useState({ bookingRows: [], memberRows: [] });
  const [bookingRows, setBookingRows] = useState();
  const [memberRows, setMemberRows] = useState();

  useEffect(() => {
    fetch(`${process.env.API_SERVER}/restaurant-api/booking`)
      .then((r) => r.json())
      .then((data) => {
        const { bookingRows, memberRows } = data;

        if (bookingRows && bookingRows.length > 0) {
          setBookingRows(bookingRows);
        }

        if (memberRows && memberRows.length > 0) {
          setMemberRows(...memberRows);
        }
        console.log(bookingRows);
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
            <div className={Styles.breadcrumb}>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#FD8C46',
                    colorBgContainer: 'transparent',
                    colorPrimaryTextHover: '#FFEFE8',
                    colorBgTextActive: '#FD8C46',
                    fontSize: 18,
                  },
                }}
              >
                <Breadcrumb
                  items={[
                    {
                      title: '餐廳列表',
                      href: 'http://localhost:3000/restaurant/list',
                    },
                    {
                      title: `曜日義式餐酒館`,
                      href: 'http://localhost:3000/restaurant/4',
                    },
                    {
                      title: `曜日義式餐酒館預約時間表`,
                    },
                  ]}
                />
              </ConfigProvider>
            </div>
            <IconBtn icon={faHeart} text="收藏列表" />
          </div>
        </div>
      </div>
      <div className="container-inner">
        <h1 className={Styles.timetable}>曜日義式餐酒館預約時間表</h1>

        <Image
          src={faArrowLeft}
          className={Styles.arrow_left}
          onClick={goToPreviousWeek}
          alt="faArrowLeft"
        />

        <Image
          src={arrowRight}
          className={Styles.arrow_right}
          onClick={goToNextWeek}
          alt="arrowRight"
        />
      </div>
      <div className="container-inner">
        <div className={Styles.week_calendar}>
          {/* {showPreviousWeek && (
            <Image
              src={faArrowLeft}
              className={Styles.arrow_left}
              onClick={goToPreviousWeek}
              alt="faArrowLeft"
            />
          )} */}
          {/* <div className={Styles.dates_container}>
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
          </div> */}
          <div className={Styles.dates_modal}>
            {bookingRows?.map((v) => {
              if (!uniqueDates.has(v.date)) {
                uniqueDates.add(v.date);
                return (
                  <div key={v.section_sid}>
                    <div>{v.date}</div>
                    {bookingRows
                      .filter((item) => item.date === v.date)
                      .map((item) => (
                        <>
                          <div key={item.section_sid}>
                            <BookingModal
                              time={item.time}
                              people={item.people_max}
                              datas={bookingRows[item.section_sid - 1]}
                            />
                          </div>
                        </>
                      ))}
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>

          {/* {showNextWeek && (
            <Image
              src={arrowRight}
              className={Styles.arrow_right}
              onClick={goToNextWeek}
              alt="arrowRight"
            />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default WeekCalendar;
