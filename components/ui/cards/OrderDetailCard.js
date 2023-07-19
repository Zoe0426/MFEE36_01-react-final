import { useState } from 'react';
import Style from '@/components/ui/cards/OrderDetailCard.module.css';
import MainBtn from '@/components/ui/buttons/MainBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import { Rate, Form, Input } from 'antd';

export default function OrderDetailCard({
  relName,
  relSeqName,
  productQty,
  productPrice,
  relSubtotal,
  adultQty,
  adultPrice,
  childQty,
  childPrice,
  img,
  actImg,
  relType,
}) {
  const [show, setShow] = useState(false);

  const showReviewContent = () => {
    setShow(!show);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleSubmit = (values) => {
    // fetch(`${process.env.API_SERVER}/member-api/login`, {
    //   method: 'POST',
    //   body: JSON.stringify(values),
    //   headers: { 'Content-Type': 'application/json' },
    // })
    //   .then((r) => r.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.success) {
    //       const obj = { ...data.data };
    //       localStorage.setItem('petauth', JSON.stringify(obj));
    //       setAuth(obj);
    //     } else {
    //       alert(data.error || '帳密錯誤');
    //     }
    //   });
  };
  return (
    <>
      <div className={Style.productCard}>
        <div className={Style.filedL}>
          <div className={Style.itemContent}>
            <div className={Style.items}>
              <img
                src={
                  relType === 'shop'
                    ? `/product-img/${img}`
                    : `/activity_img/${actImg}`
                }
                alt=""
                className={Style.img}
              />
              <div className={Style.itemInfo}>
                <div className={Style.itemTitle}>{relName}</div>
                <p>{relSeqName}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.filedR}>
          {relType === 'shop' ? (
            <>
              <div className={Style.filedItem}>{productPrice}</div>
              <div className={Style.filedItem}>{productQty}</div>
            </>
          ) : (
            <>
              <div className={Style.filedItem}>{adultPrice}</div>
              <div className={Style.filedItem}>{adultQty}</div>
              <div className={Style.filedItem}>{childPrice}</div>
              <div className={Style.filedItem}>{childQty}</div>
            </>
          )}
          <div className={Style.filedItem}>{relSubtotal}</div>
        </div>
      </div>
      <div className={Style.btn}>
        <MainBtn text="我要評價" clickHandler={showReviewContent} />
      </div>
      {show && (
        <div className={Style.reviewContent}>
          <Form
            name="reviewForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item name={'starts'} style={{ padding: '0px' }}>
              <Rate allowClear={false} style={{ color: 'red' }} />
            </Form.Item>
            <Form.Item name={'reviews'} style={{ padding: '0px' }}>
              <Input.TextArea
                rows={4}
                style={{ backgroundColor: 'transparent' }}
              />
            </Form.Item>
            <div className={Style.btns}>
              <div className={Style.secondaryBtn}>
                <SecondaryBtn text="取消" htmltype="reset" />
              </div>
              <div className={Style.mainBtn}>
                <MainBtn text="確定" htmltype="submit" />
              </div>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}
