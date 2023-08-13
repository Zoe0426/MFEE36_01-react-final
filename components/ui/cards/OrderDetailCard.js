import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Style from '@/components/ui/cards/OrderDetailCard.module.css';
import MainBtn from '@/components/ui/buttons/MainBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import { Rate, Form, Input } from 'antd';
import AuthContext from '@/context/AuthContext';

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
  prodSid,
  actAddress,
  prodCommentSid,
  shopStar,
  shopContent,
  actCommentSid,
  actStar,
  actContent,
  status,
  pcSid,
  acRaSid,
}) {
  const router = useRouter();
  const from = router.asPath;

  const today = new Date();
  const actday = new Date(relSeqName);

  const [show, setShow] = useState(false);
  const initialValues = {
    memberSid: memberSid,
    odSid: odSid,
    actSid: actSid,
    prodSid: prodSid,
    shopStar: shopStar,
    shopContent: shopContent,
    actStar: actStar,
    actContent: actContent,
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
    if (relType === 'activity') {
      fetch(`${process.env.API_SERVER}/member-api/actReviews`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
        });
    } else if (relType === 'shop') {
      fetch(`${process.env.API_SERVER}/member-api/prodReviews`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
        });
    }
    router.push(from);
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
                {relType === 'activity' ? (
                  <>
                    <div className={Style.actAddress}>
                      <img
                        src="/member-center-images/Icon/getty.svg"
                        alt=""
                        className={Style.getty}
                      />
                      <p>{actAddress}</p>
                    </div>
                  </>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={Style.filedR}>
          {relType === 'shop' ? (
            <>
              <div className={Style.filedItemL}>
                {productPrice.toLocaleString()}
              </div>
              <div className={Style.filedItem}>
                {productQty.toLocaleString()}
              </div>
            </>
          ) : (
            <>
              <div className={Style.filedItem}>
                {adultPrice.toLocaleString()}
              </div>
              <div className={Style.filedItem}>{adultQty.toLocaleString()}</div>
              <div className={Style.filedItem}>
                {childPrice.toLocaleString()}
              </div>
              <div className={Style.filedItem}>{childQty.toLocaleString()}</div>
            </>
          )}
          <div className={Style.filedItemR}>{relSubtotal.toLocaleString()}</div>
        </div>
      </div>
      <div className={Style.btn}>
        {relType === 'shop' ? (
          status >= 5 ? (
            <MainBtn
              text={!pcSid ? '去評價' : '我的評價'}
              clickHandler={showReviewContent}
            />
          ) : (
            ''
          )
        ) : today > actday ? (
          <MainBtn
            text={!acRaSid ? '去評價' : '我的評價'}
            clickHandler={showReviewContent}
          />
        ) : (
          ''
        )}
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
            {relType === 'shop' ? (
              <>
                <Form.Item
                  name={'prodSid'}
                  style={{ padding: '0px', display: 'none' }}
                >
                  <Input />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item
                  name={'actSid'}
                  style={{ padding: '0px', display: 'none' }}
                >
                  <Input />
                </Form.Item>
              </>
            )}

            <Form.Item
              name={'odSid'}
              style={{ padding: '0px', display: 'none' }}
            >
              <Input />
            </Form.Item>
            {relType === 'shop' ? (
              <>
                <Form.Item
                  name={'shopStar'}
                  style={{ padding: '0px' }}
                  rules={[
                    {
                      required: true,
                      message: '請輸入星星數唷！',
                    },
                  ]}
                >
                  <Rate
                    allowClear={false}
                    style={{ color: '#FCC917' }}
                    disabled={shopStar}
                  />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item
                  name={'actStar'}
                  style={{ padding: '0px' }}
                  rules={[
                    {
                      required: true,
                      message: '請輸入星星數唷！',
                    },
                  ]}
                >
                  <Rate
                    allowClear={false}
                    style={{ color: '#FCC917' }}
                    disabled={actStar}
                  />
                </Form.Item>
              </>
            )}
            {relType === 'shop' ? (
              <>
                <Form.Item name={'shopContent'} style={{ padding: '0px' }}>
                  <Input.TextArea
                    rows={4}
                    style={{ backgroundColor: 'transparent' }}
                    readOnly={prodCommentSid}
                  />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item name={'actContent'} style={{ padding: '0px' }}>
                  <Input.TextArea
                    rows={4}
                    style={{ backgroundColor: 'transparent' }}
                    readOnly={actCommentSid}
                  />
                </Form.Item>
              </>
            )}
            {!prodCommentSid && !actCommentSid && (
              <div className={Style.btns}>
                <div className={Style.secondaryBtn}>
                  <SecondaryBtn text="重填" htmltype="reset" />
                </div>
                <div className={Style.mainBtn}>
                  <MainBtn text="送出" htmltype="submit" />
                </div>
              </div>
            )}
          </Form>
        </div>
      )}
    </>
  );
}
