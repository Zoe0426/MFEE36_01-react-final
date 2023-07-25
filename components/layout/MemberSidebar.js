import React from 'react';
import Styles from './MemberSidebar.module.css';
import { Calendar, theme, ConfigProvider } from 'antd';

export default function MemberSidebar() {
  const wrapperStyle = {
    width: 300,
  };
  return (
    <>
      <div className={Styles.sideBar}>
        <div className={Styles.memberInfo}>
          <div className={Styles.profile}>
            <img src="/member-center-images/nn.jpg" alt="" />
          </div>
          <div className={Styles.memberName}>鍾沛怡</div>
          <div className={Styles.level}>
            <img src="/member-center-images/Icon/crown.svg" alt="" />
            <div className={Styles.levelTitle}>金牌會員</div>
          </div>
        </div>
        <div className={Styles.calendarInfo}>
          <div className={Styles.calendar}>
            <div style={wrapperStyle}>
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
                <Calendar fullscreen={false} />
              </ConfigProvider>
            </div>
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

        {/* <div className={Styles.gameInfo}>
          <div className={Styles.gameImg}>
            <img
              src="/member-center-images/nn.jpg"
              alt=""
              className={Styles.gameImg}
            />
          </div>
          <div className={Styles.gameName}>爆擊小狗狗</div>
          <div className={Styles.gameLevel}>
            <img src="/member-center-images/Icon/crown.svg" alt="" />
            <div className={Styles.gameTitle}>Lv. 10</div>
          </div>
        </div> */}
      </div>
    </>
  );
}
