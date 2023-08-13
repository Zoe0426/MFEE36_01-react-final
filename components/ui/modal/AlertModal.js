import { React, useEffect, useState } from 'react';
import Styles from '@/components/ui/modal/AlertModal.module.css';
import { Badge, Rate, Form, Input } from 'antd';
import MainBtn from '../buttons/MainBtn';
import SecondaryBtn from '../buttons/SecondaryBtn';
import CloseBtn from '../buttons/closeBtn';
import { useRouter } from 'next/router';

export default function AlertModal({
  btnType = 'main', //選點了展開modal的Btn類型，目前只有main(MainBtn)跟text(純文字)兩種
  btnText = '點我展開modal', // 選點了展開modal的Btn文字內容
  title = '標題', //Modal標題
  content = <></>,
  type,
  odSid,
  memberSid,
  actSid,
  bkSid,
  restSid,
  date,
}) {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [review, setReview] = useState(true);
  const router = useRouter();
  const from = router.asPath;
  const [form] = Form.useForm();
  let today = new Date();
  let formatToday = today.toISOString().slice(0, 10);
  let actday = new Date(date);
  let formatActday = actday.toISOString().slice(0, 10);
  //console.log(today > actday);
  // console.log('formatActday', formatActday);
  // console.log('formatToday', formatToday);

  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      document.body.classList.add('likeList-open');
    } else {
      document.body.classList.remove('likeList-open');
    }
  };

  const closeHandler = () => {
    setModal(!modal);
    if (!modal) {
      document.body.classList.add('likeList-open');
    } else {
      document.body.classList.remove('likeList-open');
    }
  };

  const getReviews = () => {
    setShow(!show);

    if (type === 'success') {
      fetch(`${process.env.API_SERVER}/member-api/getActReview/${odSid}`, {
        // headers: {
        //   Authorization: 'Bearer ' + auth.token,
        // },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data[0]?.star);
          setData(data);
          form.setFieldsValue({
            actStar: data[0]?.star,
            actContent: data[0]?.content,
          });
        });
    } else if (type === 'error') {
      fetch(`${process.env.API_SERVER}/member-api/getRestReview/${bkSid}`, {
        // headers: {
        //   Authorization: 'Bearer ' + auth.token,
        // },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          setData(data);
          form.setFieldsValue({
            environment: data[0]?.environment,
            food: data[0]?.food,
            friendly: data[0]?.friendly,
            restContent: data[0]?.content,
          });
        });
    }
    router.push(from);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleSubmit = (values) => {
    if (type === 'success') {
      fetch(`${process.env.API_SERVER}/member-api/actReviews`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((r) => r.json())
        .then((data) => {
          console.log(data);
          setShow(false);
          setReview(false);
        });
    } else if (type === 'error') {
      fetch(`${process.env.API_SERVER}/member-api/restReviews`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((r) => r.json())
        .then((data) => {
          //console.log(data);
          setShow(false);
          setReview(false);
        });
    }
    router.push(from);
  };

  const initialValues = {
    memberSid: memberSid,
    odSid: odSid,
    actSid: actSid,
    bkSid,
    restSid,
    // actStar: data[0]?.star,
    // actContent: data[0]?.content,
  };

  return (
    <>
      {btnType === 'main' ? (
        <MainBtn clickHandler={toggleModal} text={btnText} />
      ) : (
        <span onClick={toggleModal} className={Styles.edit}>
          {btnText}
        </span>
      )}

      {modal && (
        <>
          <div onClick={toggleModal} className={Styles.overlay}></div>
          <div className={Styles.modal}>
            <div className={Styles.modal_card}>
              <div className={Styles.modal_colse}>
                <CloseBtn closeHandler={closeHandler} />
              </div>
              <h2 className={Styles.modal_title}>
                <Badge status={type} className={Styles.badge} />
                {title}
              </h2>
              <div className={Styles.modal_content}>
                {content}
                <div className={Styles.modal_button}>
                  {formatToday > formatActday && (
                    <MainBtn text={'評價'} clickHandler={getReviews} />
                  )}
                </div>
              </div>

              <div className={Styles.line}></div>
              {show && (
                <div className={Styles.reviewContent}>
                  <Form
                    form={form}
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
                    {type === 'error' ? (
                      <>
                        <Form.Item
                          name={'restSid'}
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
                    {type === 'error' ? (
                      <Form.Item
                        name={'bkSid'}
                        style={{ padding: '0px', display: 'none' }}
                      >
                        <Input />
                      </Form.Item>
                    ) : (
                      <Form.Item
                        name={'odSid'}
                        style={{ padding: '0px', display: 'none' }}
                      >
                        <Input />
                      </Form.Item>
                    )}

                    {type === 'error' ? (
                      <>
                        <Form.Item
                          label={'環境品質'}
                          name={'environment'}
                          style={{ padding: '0px', margin: '5px' }}
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
                            disabled={data[0]?.environment}
                          />
                        </Form.Item>
                        <Form.Item
                          label={'餐點品質'}
                          name={'food'}
                          style={{ padding: '0px', margin: '5px' }}
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
                            disabled={data[0]?.food}
                          />
                        </Form.Item>
                        <Form.Item
                          label={'寵物友善'}
                          name={'friendly'}
                          style={{ padding: '0px', margin: '5px' }}
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
                            disabled={data[0]?.friendly}
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
                            disabled={data[0]?.star}
                          />
                        </Form.Item>
                      </>
                    )}
                    {type === 'error' ? (
                      <>
                        <Form.Item
                          name={'restContent'}
                          style={{ padding: '0px' }}
                        >
                          <Input.TextArea
                            rows={4}
                            style={{ backgroundColor: 'transparent' }}
                            readOnly={data[0]?.rest_commtent_id}
                          />
                        </Form.Item>
                      </>
                    ) : (
                      <>
                        <Form.Item
                          name={'actContent'}
                          style={{ padding: '0px' }}
                        >
                          <Input.TextArea
                            rows={4}
                            style={{ backgroundColor: 'transparent' }}
                            readOnly={data[0]?.activity_rating_sid}
                          />
                        </Form.Item>
                      </>
                    )}
                    {!data[0]?.activity_rating_sid &&
                      !data[0]?.rest_commtent_id && (
                        <div className={Styles.btns}>
                          <div className={Styles.secondaryBtn}>
                            <SecondaryBtn text="重填" htmltype="reset" />
                          </div>
                          <div className={Styles.mainBtn}>
                            <MainBtn text="送出" htmltype="submit" />
                          </div>
                        </div>
                      )}
                  </Form>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
