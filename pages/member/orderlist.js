import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Style from '@/styles/wallet.module.css';
import PageTag from '@/components/ui/pageTag/PageTag';
import OrderSearchBar from '@/components/ui/buttons/OrderSearchBar';
import OrderCard from '@/components/ui/cards/OrderCard';
import MemberCenterLayout from '@/components/layout/member-center-layout';
import MainBtn from '@/components/ui/buttons/MainBtn';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';

export default function OrderList() {
  const [pageTag, setPageTag] = useState('coupon');
  const [data, setData] = useState([]);
  const [price, setPrice] = useState([]);
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();

  // // 分组
  // const groupedData = data.reduce((acc, cur) => {
  //   acc[cur.order_sid] = acc[cur.order_sid]
  //     ? [...acc[cur.order_sid], cur]
  //     : [cur];
  //   return acc;

  // }, {});

  // // 取出每组的第一项
  // const firstItems = Object.values(groupedData).map((items) => items[0]);

  const toSignIn = () => {
    const from = router.asPath;
    router.push(`/member/sign-in?from=${from}`);
  };

  useEffect(() => {
    let auth = {};
    const authStr = localStorage.getItem('petauth');
    if (authStr) {
      try {
        auth = JSON.parse(authStr);
      } catch (ex) {
        ('');
      }
      console.log(auth);
    }

    // if (auth.token) {
    fetch(`${process.env.API_SERVER}/member-api/order/mem00001`, {
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setData(data);
        const price = data.orderRelS + data.post_amount - data.coupon_amount;
        setPrice(price);
      });
    // } else {
    //   console.log('User is not logged in. Cannot fetch');
    // }
  }, []);

  return (
    <>
      <div className="orderPageTag">
        <div className="orderTag">
          <PageTag
            title="shop"
            text="商品訂單"
            pageTag={pageTag}
            onClick={() => {
              setPageTag('shop');
            }}
          />
          <PageTag
            title="activity"
            text="活動訂單"
            pageTag={pageTag}
            onClick={() => {
              setPageTag('activity');
            }}
          />
        </div>
        <div className="orderSearch">
          <OrderSearchBar placeholder="訂單編號、商品名稱" btn_text="搜尋" />
        </div>
      </div>
      <div className="content">
        {data.map((data, i) => (
          <OrderCard
            key={i}
            orderSid={data.order_sid}
            status={data.post_status}
            itemTitle={data.rel_name}
            itemText={data.rel_seqName}
            itemQty={data.product_qty}
            subTotal={price}
            img={data.img}
          />
        ))}
      </div>
    </>
  );
}
OrderList.getLayout = MemberCenterLayout;
