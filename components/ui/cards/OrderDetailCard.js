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
  memberSid,
  odSid,
  actSid,
}) {
  const [show, setShow] = useState(false);
  const initialValues = {
    memberSid: memberSid,
    odSid: odSid,
    actSid: actSid,
  };

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
    fetch(`${process.env.API_SERVER}/member-api/reviews`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      });
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
            name={`review${odSid}`}
            initialValues={initialValues}
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name={'memberSid'}
              style={{ padding: '0px', display: 'none' }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={'actSid'}
              style={{ padding: '0px', display: 'none' }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={'odSid'}
              style={{ padding: '0px', display: 'none' }}
            >
              <Input />
            </Form.Item>
            <Form.Item name={'starts'} style={{ padding: '0px' }}>
              <Rate allowClear={false} style={{ color: 'red' }} />
            </Form.Item>
            <Form.Item name={'content'} style={{ padding: '0px' }}>
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
