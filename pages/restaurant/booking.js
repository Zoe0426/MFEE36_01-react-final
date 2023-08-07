import { useState, useEffect } from 'react';
import Styles from './booking.module.css';
import BookingModal from '@/components/ui/restaurant/Bookingmodal';
import Image from 'next/image';
import faArrowRight from '@/assets/arrow-right.svg';
import faArrowLeft from '@/assets/arrow-left.svg';
import calendar from '@/assets/calendar.svg';
import BreadCrumb from '@/components/ui/bread-crumb/breadcrumb';
import Cat from '@/assets/cat_with_body.svg';
import Dog from '@/assets/dog_with_body.svg';
import Cloud from '@/assets/cloud.svg';

function WeekCalendar() {
  const uniqueDates = new Set();
  const [data, setData] = useState({ bookingRows: [], memberRows: [] });
  const [bookingRows, setBookingRows] = useState();
  const [memberRows, setMemberRows] = useState();

  const [startDateIndex, setStartDateIndex] = useState(0); // 添加這個狀態變量

  //麵包屑
  const [breadCrubText, setBreadCrubText] = useState([
    {
      id: 'restaurant',
      text: '餐廳首頁',
      href: `${process.env.WEB}/restaurant`,
      show: true,
    },
    { id: 'search', text: '> 餐廳列表', href: '', show: true },
    { id: 'rid', text: '', href: '', show: true },
    { id: 'booking', text: '> 預約時間表', href: '', show: true },
  ]);

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

        // 麵包屑
        const newBreadCrubText = breadCrubText.map((v) => {
          if (v.id === 'search') {
            return {
              ...v,
              text: `> ${bookingRows[0].city}餐廳`,
              href: `${process.env.WEB}/restaurant/list?city=${bookingRows[0].city}`,
            };
          }
          if (v.id === 'rid') {
            return {
              ...v,
              text: `> ${bookingRows[0].name}`,
              href: `${process.env.WEB}/restaurant/${bookingRows[0].rest_sid}`,
            };
          } else return { ...v };
        });
        setBreadCrubText(newBreadCrubText);
        console.log(bookingRows[0].rest_sid);
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
              <BreadCrumb breadCrubText={breadCrubText} />
            </div>
          </div>
        </div>
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
        <Image src={Cat} alt="cat" className={Styles.cat} draggable="false" />
        <Image src={Dog} alt="dog" className={Styles.dog} draggable="false" />
        <Image
          src={Cloud}
          alt="cloud"
          className={Styles.cloud1}
          draggable="false"
        />
        <Image
          src={Cloud}
          alt="cloud"
          className={Styles.cloud2}
          draggable="false"
        />
        <Image
          src={Cloud}
          alt="cloud"
          className={Styles.cloud3}
          draggable="false"
        />
        <Image
          src={Cloud}
          alt="cloud"
          className={Styles.cloud4}
          draggable="false"
        />
      </div>
    </div>
  );
}
export default WeekCalendar;
