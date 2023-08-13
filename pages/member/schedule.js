import React, { useEffect } from 'react';
//import Style from '@/styles/wallet.module.css';
import { useState, useContext } from 'react';
import MemberCenterLayout from '@/components/layout/member-center-layout';
import AuthContext from '@/context/AuthContext';
import Styles from '@/styles/schedule.module.css';
import AlertModal from '@/components/ui/modal/AlertModal';
import AlertInfo from '@/components/ui/infos/AlertInfo';
import { Badge, Calendar } from 'antd';
import Loading from '@/components/ui/loading/loading';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Schedule() {
  const { auth, setAuth } = useContext(AuthContext);
  const [first, setFirst] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);

  const [data, setData] = useState();
  const [name, setName] = useState(null);
  const [notice, setNotice] = useState(null);
  const [type, setType] = useState(null);
  const [date, setDate] = useState(null);
  const [peopleNum, setPeopleNum] = useState(null);
  const [petNum, setPetNum] = useState(null);
  const [phone, setPhone] = useState(null);
  const [city, setCity] = useState(null);
  const [area, setArea] = useState(null);
  const [address, setAddress] = useState(null);
  const [adultQty, setAdultQty] = useState(null);
  const [childQty, setChildQty] = useState(null);
  const [sectionTime, setSectionTime] = useState(null);
  const [odSid, setOdSid] = useState(null);
  const [memberSid, setMemberSid] = useState(null);
  const [actSid, setActSid] = useState(null);
  const [bkSid, setBkSid] = useState(null);
  const [restSid, setrestSid] = useState(null);

  useEffect(() => {
    setFirst(true);
  }, []);

  useEffect(() => {
    if (!auth.id && first) {
      const from = router.asPath;
      router.push(`/member/sign-in?from=${from}`);
    } else if (auth.id) {
      setPageLoading(false);
      if (auth.token) {
        fetch(`${process.env.API_SERVER}/member-api/schedule`, {
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        })
          .then((r) => r.json())
          .then((data) => {
            //console.log(data);
            setData(data);
            setLoading(false);
          });
      } else {
        console.log('User is not logged in. Cannot fetch coupons.');
      }
    }
  }, [auth, first]);

  if (loading) {
    return <div>Loading...</div>; // Or any loading component you prefer...
  }

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
        type: item.type === 'activity' ? 'success' : 'error',
        content: item.name,
        notice: item.notice,
        date: item.date,
        peopleNum: item.peopleNum,
        petNum: item.petNum,
        phone: item.phone,
        city: item.city,
        area: item.area,
        address: item.address,
        adultQty: item.adultQty,
        childQty: item.childQty,
        sectionTime: item.sectionTime,
        odSid: item.odSid,
        memberSid: item.memberSid,
        actSid: item.actSid,
        bkSid: item.bkSid,
        restSid: item.restSid,
      }));

      return listData;
    };

    //console.log(odSid);
    //console.log(memberSid);

    // const handleSubmit = (values) => {
    //   if (relType === 'activity') {
    //     fetch(`${process.env.API_SERVER}/member-api/actReviews`, {
    //       method: 'POST',
    //       body: JSON.stringify(values),
    //       headers: { 'Content-Type': 'application/json' },
    //     })
    //       .then((r) => r.json())
    //       .then((data) => {
    //         //console.log(data);
    //       });
    //   } else if (relType === 'shop') {
    //     fetch(`${process.env.API_SERVER}/member-api/prodReviews`, {
    //       method: 'POST',
    //       body: JSON.stringify(values),
    //       headers: { 'Content-Type': 'application/json' },
    //     })
    //       .then((r) => r.json())
    //       .then((data) => {
    //         //console.log(data);
    //       });
    //   }
    //   router.push(from);
    // };

    const info = (item) => {
      setName(item.content);
      setNotice(item.notice);
      setType(item.type);
      setDate(item.date);
      setPeopleNum(item.peopleNum);
      setPetNum(item.petNum);
      setPhone(item.phone);
      setCity(item.city);
      setArea(item.area);
      setAddress(item.address);
      setAdultQty(item.adultQty);
      setChildQty(item.childQty);
      setSectionTime(item.sectionTime);
      setOdSid(item.odSid);
      setMemberSid(item.memberSid);
      setActSid(item.actSid);
      setBkSid(item.bkSid);
      setrestSid(item.restSid);
    };

    // 定義 dateCellRender 函數
    const dateCellRender = (value) => {
      const listData = getListData(value, data);

      return (
        <ul className={Styles.events}>
          {listData.map((item, index) => (
            <li key={index} onClick={() => info(item)}>
              <Badge status={item.type} className={Styles.badge} size="small" />
              <AlertModal
                btnType="text"
                btnText={item.content}
                title={name}
                type={type}
                odSid={odSid}
                memberSid={memberSid}
                actSid={actSid}
                bkSid={bkSid}
                restSid={restSid}
                date={date}
                content={
                  <AlertInfo
                    notice={notice}
                    type={type}
                    date={date}
                    peopleNum={peopleNum}
                    petNum={petNum}
                    phone={phone}
                    city={city}
                    area={area}
                    address={address}
                    adultQty={adultQty}
                    childQty={childQty}
                    sectionTime={sectionTime}
                  />
                }
              />
            </li>
          ))}
        </ul>
      );
    };

    if (pageLoading) {
      return <Loading />;
    } else if (!pageLoading) {
      return (
        <>
          <Head>
            <title>狗with咪 | 我的預約</title>
          </Head>
          <div className={Styles.content}>
            <div className={Styles.title}>我的預約</div>
            <div className={Styles.calendar}>
              <Calendar cellRender={dateCellRender} />
            </div>
          </div>
        </>
      );
    }
  }
}
Schedule.getLayout = MemberCenterLayout;
