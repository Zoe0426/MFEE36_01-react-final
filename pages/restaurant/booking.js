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

  // // 新增處理下一個七天預約資訊的函式
  // const goToNextWeek = () => {
  //   const nextIndex = startDateIndex + 35;
  //   if (nextIndex < bookingRows.length) {
  //     setStartDateIndex(nextIndex);
  //   }
  // };

  // // 新增處理返回前一個七天預約資訊的函式
  // const goToPreviousWeek = () => {
  //   const previousIndex = startDateIndex - 35;
  //   if (previousIndex >= 0) {
  //     setStartDateIndex(previousIndex);
  //   }
  // };
  // 新增處理下一個七天預約資訊的函式
  const goToNextWeek = () => {
    const itemsPerPage = window.innerWidth < 768 ? 10 : 35;
    const nextIndex = startDateIndex + itemsPerPage;
    if (nextIndex < bookingRows.length) {
      setStartDateIndex(nextIndex);
    }
  };

  // 新增處理返回前一個七天預約資訊的函式
  const goToPreviousWeek = () => {
    const itemsPerPage = window.innerWidth < 768 ? 10 : 35;
    const previousIndex = startDateIndex - itemsPerPage;
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
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // //日期格式轉換回來
  // bookingRows.forEach((v) => {
  //   const dateStr = v.date;

  //   // 分割日期字串
  //   const [monthDay, weekday] = dateStr.split(' (');

  //   // 獲取月份、日期和星期幾
  //   const [month, day] = monthDay.split('/');
  //   const [, weekdayStr] = weekday.split(')');

  //   // 獲取星期幾對應的數字
  //   const weekdayNum = ['日', '一', '二', '三', '四', '五', '六'].indexOf(
  //     weekdayStr
  //   );

  //   // 構建新的日期字串，格式為 "yyyy-MM-dd"
  //   const year = 2023; // 這裡可以根據需要指定年份
  //   const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
  //     2,
  //     '0'
  //   )}`;

  //   v.date = formattedDate;
  // });
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   // 建立要傳遞到後端的預約資料物件
  //   const reservationData = {
  //     rest_sid: bookingRows.rest_sid,
  //     section_code: bookingRows.section_code,
  //     date: formattedDate,
  //     member_sid: memberRows.member_sid,
  //     people_num: countPeople,
  //     pet_num: countPet,
  //     note: noteValue,
  //   };

  //   // 發送 POST 請求到後端 API
  //   try {
  //     const response = await fetch(
  //       `${process.env.API_SERVER}/restaurant-api/booking_modal`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(reservationData),
  //       }
  //     );

  //     const responseData = await response.json();
  //     if (responseData.success) {
  //       //跳一個預約成功的視窗
  //       // setReservationSuccess(true);
  //       window.location.reload();
  //     } else {
  //       console.error('處理預約失敗的情況');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     // 處理錯誤情況
  //   }
  // };

  const [countPeople, setCountPeople] = useState(1);
  const [countPet, setCountPet] = useState(1);
  const [noteValue, setNoteValue] = useState('');
  const handleNoteChange = (event) => {
    console.log('備註');
    setNoteValue(event.target.value);
  };

  const handleChangePeople = (newCount) => {
    // 在這裡處理人數的變更，不執行 handleSubmit
    console.log('人數');
    setCountPeople(newCount);
  };

  const handleChangePet = (newCount) => {
    // 在這裡處理寵物數量的變更，不執行 handleSubmit
    console.log('寵物');
    setCountPet(newCount);
  };

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
      <div></div>
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
          {bookingRows
            ?.slice(
              startDateIndex,
              startDateIndex + (window.innerWidth < 768 ? 10 : 35)
            )
            .map((v) => {
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
                              handleNoteChange={handleNoteChange}
                              noteValue={noteValue}
                              handleChangePeople={handleChangePeople}
                              handleChangePet={handleChangePet}
                              countPeople={countPeople}
                              countPet={countPet}
                              // clickHandler={handleSubmit}
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
