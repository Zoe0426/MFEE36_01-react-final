import React, { useEffect } from 'react';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import PageTag from '@/components/ui/pageTag/PageTag';
import OrderSearchBar from '@/components/ui/buttons/OrderSearchBar';
import OrderCard from '@/components/ui/cards/OrderCard';
import MemberCenterLayout from '@/components/layout/member-center-layout';
import AuthContext from '@/context/AuthContext';
import Loading from '@/components/ui/loading/loading';

export default function OrderList() {
  const [pageTag, setPageTag] = useState('shop');
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const { auth, setAuth } = useContext(AuthContext);
  const [first, setFirst] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

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
        fetch(`${process.env.API_SERVER}/member-api/order`, {
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        })
          .then((r) => r.json())
          .then((data) => {
            console.log(data);
            const firstData = data.filter((data) => data.rel_type === 'shop');
            setData(firstData);
            setAllData(data);
            setLoading(false);
          });
      } else {
        console.log('User is not logged in. Cannot fetch');
      }
    }
  }, [auth, first]);

  const shopOrder = () => {
    const newData = allData.filter((data) => data.rel_type === 'shop');
    console.log(newData);
    setData(newData);
  };

  const actOrder = () => {
    const newData = allData.filter((data) => data.rel_type === 'activity');
    console.log(newData);
    setData(newData);
  };

  if (loading) {
    return <div>Loading...</div>; // Or any loading component you prefer...
  }

  if (pageLoading) {
    return <Loading />;
  } else if (!pageLoading) {
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
                shopOrder();
              }}
            />
            <PageTag
              title="activity"
              text="活動訂單"
              pageTag={pageTag}
              onClick={() => {
                setPageTag('activity');
                actOrder();
              }}
            />
          </div>
          <div className="orderSearch">
            <OrderSearchBar placeholder="訂單編號、商品名稱" btn_text="搜尋" />
          </div>
        </div>
        <div className="content">
          {data.map((data, i) => {
            return (
              <OrderCard
                key={i}
                orderSid={data.order_sid}
                status={data.post_status}
                itemTitle={data.rel_name}
                itemText={data.rel_seqName}
                itemQty={data.product_qty}
                adultQty={data.adult_qty}
                childQty={data.child_qty}
                subTotal={data.orderRelS}
                img={data.img}
                actImg={data.activity_pic}
                length={data.order_product}
                type={data.rel_type}
                actAddress={data.actAddress}
              />
            );
          })}
        </div>
      </>
    );
  }
}
OrderList.getLayout = MemberCenterLayout;
