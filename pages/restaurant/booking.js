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
            <IconBtn icon={faHeart} text="收藏列表" />
          </div>
        </div>
      </div>
      <div className="container-inner">
        <h1 className={Styles.timetable}>{}預約時間表</h1>

        {/* <Image
          src={faArrowLeft}
          className={Styles.arrow_left}
          alt="faArrowLeft"
        />

        <Image
          src={arrowRight}
          className={Styles.arrow_right}
          alt="arrowRight"
        /> */}
      </div>
      <div className="container-inner">
        <div className={Styles.week_calendar}>
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
                              people={item.remaining_slots}
                              datas={item}
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
