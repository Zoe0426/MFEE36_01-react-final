import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';
import Head from 'next/head';
import BookingModal from '@/components/ui/restaurant/Calendar';
import Styles from './calendar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import calendar from '@/assets/calendar.svg';
import Cloud from '@/assets/cloud.svg';
import Cat from '@/assets/cat_without_tail.svg';
import CatTail from '@/assets/cat_tail.svg';
import Dog from '@/assets/dog_without_tail.svg';
import DogTail from '@/assets/dog_tail.svg';
import SorryImg from '@/assets/no_found.svg';
import BreadCrumb from '@/components/ui/bread-crumb/breadcrumb';

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

function App() {
  const { auth } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingRows, setBookingRows] = useState([]); // 初始化為空陣列
  const [memberRows, setMemberRows] = useState([]);
  const [first, setFirst] = useState(false);
  const [data, setData] = useState({ bookingRows: [], memberRows: [] });
  // const [startDateIndex, setStartDateIndex] = useState(0);
  // const dateData = {};
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
  const router = useRouter();
  useEffect(() => {
    setFirst(true);
  }, []);
  useEffect(() => {
    if (first) {
      if (!auth.id) {
        // const from = router.asPath;
        //餐廳首頁
        // router.push(`${process.env.WEB}/restaurant`);
        //餐廳詳細頁
        // router.push(`${process.env.WEB}/restaurant/${bookingRows[0].rest_sid}`);
        router.push(`${process.env.WEB}/restaurant/4`);
      }
    }
  }, [auth, first]);

  useEffect(() => {
    fetch(`${process.env.API_SERVER}/restaurant-api/calendar`)
      .then((r) => r.json())
      .then((data) => {
        const { bookingRows, memberRows } = data;

        if (bookingRows && bookingRows.length > 0) {
          setBookingRows(bookingRows);
        }
        // console.log(bookingRows[0].name);
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
        // console.log(bookingRows[0].rest_sid);
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // 取得今天的日期
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDate = today.getDate();

  const [myYear, setMyYear] = useState(2023);
  const [myMonth, setMyMonth] = useState(8);
  const [myDate, setMyDate] = useState(todayDate);

  const collectDate = `${myYear}-${myMonth}-${myDate}`;
  // console.log(collectDate);

  const now = new Date();
  const nowY = myYear ? myYear : now.getFullYear();

  const nowM = myMonth ? myMonth : now.getMonth() + 1; //注意回
  const weekDayList = ['日', '一', '二', '三', '四', '五', '六'];

  const days = new Date(nowY, nowM, 0).getDate();
  const firstDay = new Date(nowY, nowM - 1, 1).getDay();

  const daysDataArray = [];

  for (let i = 0; i < firstDay; i++) {
    daysDataArray.push('');
  }

  for (let i = 0; i < days; i++) {
    daysDataArray.push(i + 1);
  }

  const daysDisplayArray = chunk(daysDataArray, 7);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [countPeople, setCountPeople] = useState(1);
  const [countPet, setCountPet] = useState(1);
  const [noteValue, setNoteValue] = useState('');
  const handleNoteChange = (event) => {
    // console.log('備註');
    setNoteValue(event.target.value);
  };

  const handleChangePeople = (newCount) => {
    // 在這裡處理人數的變更，不執行 handleSubmit
    // console.log('人數');
    setCountPeople(newCount);
  };

  const handleChangePet = (newCount) => {
    // 在這裡處理寵物數量的變更，不執行 handleSubmit
    // console.log('寵物');
    setCountPet(newCount);
  };
  // 處理日期點擊事件，顯示該日期對應的時間區段
  const handleDateClick = (date) => {
    setSelectedDate(date); // 設定所選日期
  };

  useEffect(() => {
    // 從 bookingRows 中找到與 collectDate 相等的日期
    const selectedDateSlots = bookingRows.filter(
      (booking) => booking.date === collectDate
    );
    setSelectedTimeSlots(selectedDateSlots);
  }, [collectDate]);

  //下個月
  const handleNextMonth = () => {
    if (myMonth === 12) {
      setMyYear((prevYear) => prevYear + 1);
      setMyMonth(1);
    } else {
      setMyMonth((prevMonth) => prevMonth + 1);
    }
  };

  //上個月
  const handlePreviousMonth = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (myYear === currentYear && myMonth === currentMonth) {
      return;
    }
    if (myMonth === 1) {
      setMyYear((prevYear) => prevYear - 1);
      setMyMonth(12);
    } else {
      setMyMonth((prevMonth) => prevMonth - 1);
    }
  };
  // 分類下午和晚上的時間區段
  const noonSlots = selectedTimeSlots.filter(
    (slot) => slot.time >= '12:00' && slot.time <= '14:00'
  );
  const afternoonSlots = selectedTimeSlots.filter(
    (slot) => slot.time >= '14:00' && slot.time < '18:00'
  );
  const eveningSlots = selectedTimeSlots.filter(
    (slot) => slot.time >= '18:00' && slot.time < '24:00'
  );

  // 判斷日期是否在今天之前
  const isPastDate = (year, month, date) => {
    const now = new Date();
    const selectedDate = new Date(year, month - 1, date + 1);
    return selectedDate.getTime() < now.getTime();
  };

  // 取得日期對應的星期幾
  // const getDayOfWeek = (dateStr) => {
  //   const date = new Date(dateStr);
  //   const dayOfWeek = date.toLocaleDateString('zh-TW', { weekday: 'long' });
  //   return dayOfWeek;
  // };

  const getDayOfWeek = (dateStr) => {
    const date = new Date(dateStr);
    const dayOfWeekIndex = date.getDay();
    const dayOfWeek = weekDayList[dayOfWeekIndex];
    return dayOfWeek;
  };

  // 判斷日期是否在 30 天之後
  const isFutureDate = (year, month, date) => {
    const now = new Date();
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(now.getDate() + 30);

    const selectedDate = new Date(year, month - 1, date);
    return selectedDate > thirtyDaysLater;
  };

  const showPreviousButton = !(myYear === todayYear && myMonth === todayMonth);
  return (
    <>
      <Head>
        <title>狗with咪 | 餐廳</title>
      </Head>
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
            <Image
              src={calendar}
              alt="calendar"
              className={Styles.calendar_icon}
            />
            曜日義式餐酒館預約時間表
          </h1>
        </div>
      </div>
      <div className="container-inner">
        <div className={Styles.section}>
          <div className={Styles.calendar}>
            <div className={Styles.header}>
              <button
                className={
                  showPreviousButton
                    ? Styles.month_btns
                    : Styles.disable_month_btn
                }
                onClick={handlePreviousMonth}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>

              <h2 id="yearAndMonth" className={Styles.date_text}>
                {nowY + '年' + nowM + '月'}
              </h2>
              <button className={Styles.month_btns} onClick={handleNextMonth}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
            <div className={Styles.date_date}>
              <table border="1">
                <thead id="title">
                  <tr>
                    {weekDayList.map(function (v, i) {
                      return (
                        <th key={i} className={Styles.weekly}>
                          {v}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody id="data">
                  {daysDisplayArray.map((v, i) => {
                    return (
                      <tr key={i}>
                        {v.map((item, idx) => (
                          <td key={idx}>
                            <div>
                              <p
                                className={
                                  collectDate === `${nowY}-${nowM}-${item}`
                                    ? Styles.selected_date
                                    : isPastDate(nowY, nowM, item)
                                    ? Styles.past_date
                                    : isFutureDate(nowY, nowM, item)
                                    ? Styles.past_date
                                    : todayYear === nowY &&
                                      todayMonth === nowM &&
                                      todayDate === item
                                    ? Styles.today_date
                                    : Styles.date
                                }
                                onClick={() => {
                                  handleDateClick(selectedDate);
                                  setMyDate(item);
                                }}
                              >
                                {item}
                              </p>
                            </div>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className={Styles.can_book}>
            <div className={Styles.select_date}>
              {collectDate} 可預約的時段
              {/* <div className={Styles.week_date}>
                ({getDayOfWeek(collectDate)})
              </div> */}
            </div>
            {/* 顯示所選日期對應的時間區段 */}
            {selectedTimeSlots.length > 0 ? (
              <>
                <div className={Styles.time_section1}>
                  <p className={Styles.afternoon_title}>中午時段</p>
                  {noonSlots.map((slot, index) => (
                    <div key={index} className={Styles.modal}>
                      <BookingModal
                        time={slot.time}
                        people={slot.remaining_slots}
                        datas={slot}
                        memberDatas={memberRows}
                        handleNoteChange={handleNoteChange}
                        noteValue={noteValue}
                        handleChangePeople={handleChangePeople}
                        handleChangePet={handleChangePet}
                        countPeople={countPeople}
                        countPet={countPet}
                      />
                      <div className={Styles.fake_modal}></div>
                    </div>
                  ))}{' '}
                </div>
                <div className={Styles.time_section}>
                  <p className={Styles.afternoon_title}>下午時段</p>
                  {afternoonSlots.map((slot, index) => (
                    <div key={index} className={Styles.modal}>
                      <BookingModal
                        time={slot.time}
                        people={slot.remaining_slots}
                        datas={slot}
                        memberDatas={memberRows}
                        handleNoteChange={handleNoteChange}
                        noteValue={noteValue}
                        handleChangePeople={handleChangePeople}
                        handleChangePet={handleChangePet}
                        countPeople={countPeople}
                        countPet={countPet}
                      />
                    </div>
                  ))}
                </div>
                <div className={Styles.time_section}>
                  <p className={Styles.afternoon_title}>晚上時段</p>
                  {eveningSlots.map((slot, index) => (
                    <div key={index} className={Styles.modal}>
                      <BookingModal
                        time={slot.time}
                        people={slot.remaining_slots}
                        datas={slot}
                        memberDatas={memberRows}
                        handleNoteChange={handleNoteChange}
                        noteValue={noteValue}
                        handleChangePeople={handleChangePeople}
                        handleChangePet={handleChangePet}
                        countPeople={countPeople}
                        countPet={countPet}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className={Styles.card_head}>
                <Image src={SorryImg} alt="cannot-found" />
                <p className={Styles.no_find_text}>尚無可預約的時間</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Image src={Cat} alt="cat" className={Styles.cat} draggable="false" />
      <Image src={Dog} alt="dog" className={Styles.dog} draggable="false" />
      <Image
        src={DogTail}
        alt="dog_tail"
        className={Styles.dog_tail}
        draggable="false"
      />
      <Image
        src={CatTail}
        alt="cat_tail"
        className={Styles.cat_tail}
        draggable="false"
      />
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
    </>
  );
}

export default App;
