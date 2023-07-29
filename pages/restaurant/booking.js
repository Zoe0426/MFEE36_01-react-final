import { useState, useEffect } from 'react';
import Styles from './booking.module.css';
import BookingModal from '@/components/ui/restaurant/Bookingmodal';
import IconBtn from '@/components/ui/buttons/IconBtn';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import faArrowRight from '@/assets/arrow-right.svg';
import faArrowLeft from '@/assets/arrow-left.svg';
import calendar from '@/assets/calendar.svg';
import { Col, Row, Breadcrumb, ConfigProvider } from 'antd';

function WeekCalendar() {
  const uniqueDates = new Set();
  const [data, setData] = useState({ bookingRows: [], memberRows: [] });
  const [bookingRows, setBookingRows] = useState();
  const [memberRows, setMemberRows] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startDateIndex, setStartDateIndex] = useState(0); // 添加這個狀態變量

  // 新增處理下一個七天預約資訊的函式
  const goToNextWeek = () => {
    const nextIndex = startDateIndex + 35;
    if (nextIndex < bookingRows.length) {
      setStartDateIndex(nextIndex);
    }
  };

  // 新增處理返回前一個七天預約資訊的函式
  const goToPreviousWeek = () => {
    const previousIndex = startDateIndex - 35;
    if (previousIndex >= 0) {
      setStartDateIndex(previousIndex);
    }
  };

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
        setData(data);
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
          </div>
        </div>
      </div>
      <div>
        {/* <Image
          src={faArrowLeft}
          className={Styles.arrow_left}
          onClick={goToPreviousWeek}
          alt="faArrowLeft"
        />
        <Image
          src={faArrowRight}
          className={Styles.arrow_right}
          onClick={goToNextWeek}
          alt="arrowRight"
        /> */}
      </div>
      <div className="container-inner">
        <div className={Styles.head}>
          <h1 className={Styles.timetable}>
            <Image src={calendar} alt="calendar" className={Styles.calendar} />
            曜日義式餐酒館預約時間表
          </h1>
          <div className={Styles.btn_group}>
            <button
              onClick={goToPreviousWeek}
              className={
                startDateIndex > 0 ? Styles.last_week : Styles.no_last_week
              }
            >
              <Image src={faArrowLeft} alt="faArrowLeft" />
            </button>

            <button
              onClick={goToNextWeek}
              className={
                startDateIndex + 35 < bookingRows?.length
                  ? Styles.next_week
                  : Styles.no_next_week
              }
            >
              <Image src={faArrowRight} alt="faArrowRight" />
            </button>
          </div>
        </div>
      </div>
      <div className="container-inner">
        <div className={Styles.dates_modal}>
          {bookingRows?.slice(startDateIndex, startDateIndex + 35).map((v) => {
            {
              /* const currentDate = new Date(v.date); */
            }
            if (!uniqueDates.has(v.date)) {
              uniqueDates.add(v.date);
              return (
                <div key={v.section_sid}>
                  <div className={Styles.date_date}>{v.date}</div>
                  {bookingRows
                    .filter((item) => item.date === v.date)
                    .map((item) => (
                      <>
                        <div key={item.section_sid}>
                          <BookingModal
                            time={item.time}
                            people={item.remaining_slots}
                            datas={item}
                            memberDatas={memberRows}
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
      </div>
    </div>
  );
}
export default WeekCalendar;
