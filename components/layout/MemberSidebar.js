import { useState, useEffect, useContext } from 'react';
import Styles from './MemberSidebar.module.css';
import { Calendar, ConfigProvider } from 'antd';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';

export default function MemberSidebar() {
  const { auth, setAuth, photo } = useContext(AuthContext);
  const [first, setFirst] = useState(false);
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [memProfileImg, setMemProfileImg] = useState(
    `${process.env.API_SERVER}/img/default-profile.jpg`
  );

  useEffect(() => {
    setFirst(true);
  }, []);

  useEffect(() => {
    if (auth.token && first) {
      fetch(`${process.env.API_SERVER}/member-api/schedule`, {
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      })
        .then((r) => r.json())
        .then((data) => {
          //console.log(data);
          setData(data);
        });
      fetch(`${process.env.API_SERVER}/member-api/edit`, {
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      })
        .then((r) => r.json())
        .then((data2) => {
          setData2(data2);
          //console.log('data2', data2[0].profile);
          if (data2[0].profile) {
            setMemProfileImg(data2[0].profile);
          } else {
            setMemProfileImg(`/default-profile.jpg`);
          }
        });
    } else {
      console.log('User is not logged in. Cannot fetch coupons.');
    }
  }, [auth, first]);

  if (data != undefined) {
    const getListData = (value, data) => {
      // 將calendar日期轉換為字符串格式的日期（只包含年月日）
      const valueStr = value.format('YYYY-MM-DD');

      // 根據 valueStr 過濾出對應日期的數據
      const filteredData = data.filter(
        (item) => item.date.split('T')[0] === valueStr
      );

      // 將過濾得到的數據映射為 getListData 所需的格式
      const listData = filteredData.map((item) => ({
        //type: 'error',

        //TODO 思考怎麼辨別活動餐廳
        type: item.type,
        restSid: item.restSid,
        actSid: item.actSid,
        date: item.date,
      }));

      return listData;
    };

    // 定義 dateCellRender 函數
    const dateCellRender = (value) => {
      const listData = getListData(value, data);

      return (
        <ul className={Styles.events}>
          {listData.map((item, index) => {
            const sameDate = (date) => {
              return listData.filter((item) => item.date === date);
            };
            let sameDayProjects = sameDate(item.date);
            let backgroundColor;
            if (sameDayProjects.length > 1) {
              backgroundColor = '#FEEBC1';
            } else if (item.type === 'activity') {
              backgroundColor = '#C8EFD6';
            } else {
              backgroundColor = '#FAC3C6';
            }

            return (
              <div
                className="ant-picker-cell-inner ant-picker-calendar-date ant-picker-calendar-date-today"
                key={index}
                style={{
                  backgroundColor: backgroundColor,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: -9,
                  // borderRadius: '50%',
                }}
              ></div>
            );
          })}
        </ul>
      );
    };

    if (data2 != undefined) {
      return (
        <>
          <div className={Styles.sideBar}>
            <Link href="/member/profile">
              <div className={Styles.memberInfo}>
                <div className={Styles.profile}>
                  <img src={photo} alt="profilePic" />
                </div>
                <div className={Styles.memberName}>{data2[0]?.name}</div>
                <div className={Styles.level}>
                  <img src="/member-center-images/Icon/crown.svg" alt="" />
                  <div className={Styles.levelTitle}>{data2[0]?.level}會員</div>
                </div>
              </div>
            </Link>
            <Link href="/member/schedule">
              <div className={Styles.calendarInfo}>
                <div className={Styles.calendar}>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: '#FD8C46',
                        colorText: 'rgb(81, 81, 81)',
                        fontSize: 14,
                        controlInteractiveSize: 14,
                      },
                    }}
                  >
                    <div className={Styles.calendarBox}>
                      <Calendar
                        fullscreen={false}
                        cellRender={dateCellRender}
                      />
                    </div>
                  </ConfigProvider>
                </div>

                <div className={Styles.calendarCircle}>
                  <div className={Styles.red}>
                    <div className={Styles.redCircle}></div>
                    <div className={Styles.text}>餐廳</div>
                  </div>
                  <div className={Styles.green}>
                    <div className={Styles.greenCircle}></div>
                    <div className={Styles.text}>活動</div>
                  </div>
                  <div className={Styles.blue}>
                    <div className={Styles.blueCircle}></div>
                    <div className={Styles.text}>兩者</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </>
      );
    }
  }
}
