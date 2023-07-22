import React, { useEffect } from 'react';
//import Style from '@/styles/wallet.module.css';
import { useState, useContext } from 'react';
import PageTag from '@/components/ui/pageTag/PageTag';
import CouponCard from '@/components/ui/cards/CouponCard';
import MemberCenterLayout from '@/components/layout/member-center-layout';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Calendar, Badge } from 'antd';
import { values } from 'lodash';

export default function Schedule() {
  const [data, setData] = useState();

  useEffect(() => {
    let auth = {};
    const authStr = localStorage.getItem('petauth');
    if (authStr) {
      try {
        auth = JSON.parse(authStr);
      } catch (ex) {
        ('');
      }
    }
    console.log(auth.id);

    if (auth.token) {
      fetch(`${process.env.API_SERVER}/member-api/schedule/mem00001`, {
        headers: {
          Authorization: 'Bearer ' + auth.token,
        },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          setData(data);
        });
    } else {
      console.log('User is not logged in. Cannot fetch coupons.');
    }
  }, []);

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
        type: 'error',
				
        //TODO 思考怎麼辨別活動餐廳
        //type: item.type === 'restaurant' ? 'error' : 'success'
        content: item.name,
      }));

      return listData;
    };

    // 定義 dateCellRender 函數
    const dateCellRender = (value) => {
      const listData = getListData(value, data);

      return (
        <ul className="events">
          {listData.map((item, index) => (
            <li key={index}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      );
    };

    return (
      <>
        <div className="content">
          <div className="title">我的行程</div>
          <div className="calendar">
            <Calendar cellRender={dateCellRender} />
          </div>
        </div>
      </>
    );
  }
}
Schedule.getLayout = MemberCenterLayout;
