import { useEffect, useState, useContext } from 'react';
import Styles from '@/styles/profile.module.css';
import MemberCenterLayout from '@/components/layout/member-center-layout';
import AuthContext from '@/context/AuthContext';
import { useRouter } from 'next/router';
import MainBtn from '@/components/ui/buttons/MainBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
import Loading from '@/components/ui/loading/loading';
import Head from 'next/head';
import {
  Form,
  Input,
  Radio,
  ConfigProvider,
  DatePicker,
  Upload,
  Modal,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

export default function Profile() {
  const { auth, setPhoto } = useContext(AuthContext);
  const [first, setFirst] = useState(false);
  const router = useRouter();
  const from = router.asPath;

  const [data, setData] = useState([]);
  const [imgType, setImgType] = useState(true);
  const [imgSize, setImgSize] = useState(true);
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [memProfileImg, setMemProfileImg] = useState(`/default-profile.jpg`);

  //咦進來就要把嗟到的照片變成ＦＩＬＥ
  //const [avatar, setAvatar] = useState([]);

  // //console.log('avatar', avatar);
  ////console.log('memProfileImg1', memProfileImg);

  const [fileList, setFileList] = useState([]);

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
        console.log('token', auth.token);
        fetch(`${process.env.API_SERVER}/member-api/edit`, {
          headers: {
            Authorization: 'Bearer ' + auth.token,
          },
        })
          .then((r) => r.json())
          .then((data) => {
            console.log(data);
            setData(data);
            let array = data;
            let obj = array[0];
            setInitialValues({
              memberSid: obj ? obj.memberSid : '',
              name: obj ? obj.name : '',
              mobile: obj ? obj.mobile : '',
              avarta: obj ? obj.profile : '',
              email: obj ? obj.email : '',
              gender: obj ? obj.gender : '',
              birthday: obj ? moment(obj.birthday) : '',
              pet: obj ? obj.pet : '',
            });
            setLoading(false);
            setMemProfileImg(obj.profile);
            if (memProfileImg) {
              setFileList([
                {
                  uid: '-1',
                  name: 'memProfileImg.jpg',
                  status: 'done',
                  url: `${process.env.API_SERVER}/img/${memProfileImg}`,
                },
              ]);
            }
            //console.log('obj', obj.profile);
          });
      } else {
        //console.log('User is not logged in. Cannot fetch coupons.');
      }
    }
  }, [auth, first, memProfileImg]);

  //console.log('token', auth.token);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      //message.error('You can only upload JPG/PNG file!');
      setImgType(false);
    } else {
      setImgType(true);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      //message.error('Image must smaller than 2MB!');
      setImgSize(false);
    } else {
      setImgSize(true);
    }
    return isJpgOrPng && isLt2M;
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const onFinish = (values) => {
    //console.log('選中的值:', values);
  };
  const onFinishFailed = (errorInfo) => {
    //console.log('Failed:', errorInfo);
  };

  if (loading) {
    return <div>Loading...</div>; // Or any loading component you prefer...
  }

  let obj;
  if (data.length > 0) {
    let array = data;
    obj = array[0];
  }

  //console.log('obj', obj);

  // 表單送出
  const handleSubmit = (values) => {
    //console.log(values);
    const formData = new FormData();

    formData.append('email', values.email);
    formData.append('avatar', values.avatar.file.originFileObj);
    console.log('first', values.avatar.file.originFileObj);
    formData.append('memberSid', values.memberSid);
    formData.append('name', values.name);
    formData.append('mobile', values.mobile);
    formData.append('birthday', values.birthday);
    formData.append('gender', values.gender);
    formData.append('pet', values.pet);

    // //console.log(formData.has('avatar')); // 应该输出 true

    // //console.log('formData', formData.get('email'));
    console.log('formData', formData.get('avatar'));
    // //console.log('formData', formData.get('memberSid'));
    console.log('formData', formData.get('name'));
    // //console.log('formData', formData.get('mobile'));
    // //console.log('formData', formData.get('birthday'));
    // //console.log('formData', formData.get('gender'));
    // //console.log('formData', formData.get('pet'));

    fetch('http://localhost:3002/member-api/updateInfo', {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: 'Bearer ' + auth.token,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        //console.log('l-204', data[0].profile);
        setMemProfileImg(data[0].profile);
        const photo = `${process.env.API_SERVER}/img/${data[0].profile}`;
        localStorage.setItem(`${auth.id}photoUrl`, JSON.stringify(photo));
        setPhoto(photo);
      });
    ////console.log('memProfileImg2', memProfileImg);

    router.push(from);
  };

  if (pageLoading) {
    return <Loading />;
  } else if (!pageLoading) {
    return (
      <>
        <Head>
          <title>狗with咪 | 會員編輯</title>
        </Head>
        <div className={Styles.content}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#FD8C46',
                colorText: 'rgb(81, 81, 81)',
                fontSize: 18,
                controlInteractiveSize: 18,
              },
              components: {
                Radio: {
                  colorPrimary: '#FD8C46',
                },
              },
            }}
          >
            <Form
              name="editForm"
              initialValues={initialValues}
              className={Styles.editForm}
              onFinish={handleSubmit}
              onFinishFailed={onFinishFailed}
            >
              <div className={Styles.title}>基本資料</div>
              <div className={Styles.nameMobile}>
                <div className={Styles.name}>
                  <Form.Item name="memberSid" style={{ display: 'none' }}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="姓名"
                    className={Styles.formItem}
                    name="name"
                    rules={[
                      {
                        type: 'string',
                        message: '請輸入姓名',
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item
                    label="手機"
                    className={Styles.formItem}
                    name="mobile"
                    rules={[
                      {
                        message: '請輸入手機',
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </div>
                <div className={Styles.photo}>
                  <Form.Item
                    name="avatar"
                    style={{ marginBottom: '0px', padding: '0px' }}
                  >
                    <Upload
                      action={`${process.env.API_SERVER}/updateInfo`}
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      beforeUpload={beforeUpload}
                    >
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                  </Form.Item>
                  <Modal
                    open={previewOpen}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt="example"
                      style={{
                        width: '100%',
                      }}
                      src={previewImage}
                    />
                  </Modal>
                  {!imgType && (
                    <div className={Styles.warning}>
                      照片格式要 JPG & PNG 唷！
                    </div>
                  )}
                  {!imgSize && !imgSize && (
                    <div className={Styles.warning}>
                      照片大小不能超過2MB唷！{' '}
                    </div>
                  )}
                </div>
              </div>
              <Form.Item
                label="帳號"
                className={Styles.formItem}
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: '請輸入正確Email',
                  },
                ]}
              >
                <Input placeholder="請輸入Email" size="large" />
              </Form.Item>

              <Form.Item label="生日" name="birthday">
                <DatePicker
                  size="large"
                  style={{
                    width: '100%',
                  }}
                />
              </Form.Item>
              <Form.Item label="性別" name="gender">
                <Radio.Group>
                  <Radio value="男"> 男 </Radio>
                  <Radio value="女"> 女 </Radio>
                  <Radio value="其他"> 其他 </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="寵物" name="pet">
                <Radio.Group>
                  <Radio value="狗"> 狗 </Radio>
                  <Radio value="貓"> 貓 </Radio>
                  <Radio value="狗貓"> 狗貓 </Radio>
                  <Radio value="其他"> 其他 </Radio>
                </Radio.Group>
              </Form.Item>

              <div className={Styles.btns}>
                <div className={Styles.btn}>
                  <SecondaryBtn text="取消變更" htmltype="reset" />
                </div>
                <div className={Styles.btn}>
                  <MainBtn
                    text="確定更新"
                    htmltype="submit"
                    disable={!imgSize && !imgSize}
                  />
                </div>
              </div>
            </Form>
          </ConfigProvider>
        </div>
      </>
    );
  }
}
Profile.getLayout = MemberCenterLayout;
