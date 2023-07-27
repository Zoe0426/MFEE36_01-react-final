import { useState, useEffect } from 'react';
import Styles from './booking.module.css';
import BookingModal from '@/components/ui/restaurant/Bookingmodal';
import IconBtn from '@/components/ui/buttons/IconBtn';
import {
  faHeart,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function WeekCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const MAX_RESERVATION_WEEKS = 2;
  const [currentWeek, setCurrentWeek] = useState(0);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();
  const weekDayList = ['日', '一', '二', '三', '四', '五', '六'];

  const firstDay = new Date(
    currentYear,
    currentMonth,
    currentDay - (currentWeek * 7 + 1) + 1
  );


  const maxReservationDate = new Date(now);
  maxReservationDate.setDate(now.getDate() + MAX_RESERVATION_WEEKS * 7);
  const daysDataArray = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(firstDay);
    date.setDate(firstDay.getDate() + i);
    return {
      date: date.getDate(),
      dayOfWeek: weekDayList[date.getDay()],
      month: date.getMonth() + 1,
      isSelectable: date <= maxReservationDate, // 新增 isSelectable 屬性
    };
  });

  {
    daysDataArray.map((item, idx) => (
      <div key={idx} className={Styles.date}>
        <p
          onClick={() => {
            if (item.isSelectable) {
              setSelectedDate(item.date);
            } else {
              // 在這裡可以顯示提示或者其他操作，告知使用者該日期不可預約
            }
          }}
        >
          {item.month}/{item.date}({item.dayOfWeek})
        </p>
      </div>
    ));
  }
}

export default WeekCalendar;
