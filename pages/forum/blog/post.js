import React,{ useState } from 'react'
import Style from './post.module.css'
import BlogBanner from '@/components/ui/blogBanner/blogBanner'
import { Col, Row } from 'antd';
import BlogSidebar from '@/components/ui/blogSidebar/blogSidebar';
import PostNavPure from '@/components/ui/postNavPure/postNavPure';
import BlogBoardNav from '@/components/ui/blogBoardNav/blogBoardNav';
import BlogPost from '@/components/ui/blogPost/blogPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLayerGroup} from '@fortawesome/free-solid-svg-icons';
import MainBtn from '@/components/ui/buttons/MainBtn';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
// Ant design 輸入文字
import { Input } from 'antd';
const { TextArea } = Input;

// Ant design 上傳圖片
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function Post() {
  const currentDateTime = new Date().toLocaleString(); // 取得現在的日期和時間

  // Ant design上傳圖片
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-2',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-3',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-4',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-xxx',
    //   percent: 50,
    //   name: 'image.png',
    //   status: 'uploading',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-5',
    //   name: 'image.png',
    //   status: 'error',
    // },
  ]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
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
  
  return (
    <div className="container-outer">
      <div className={Style.body}>
      <BlogBanner/>
      <Row className={Style.antRow}>
        <Col span={6}>
          <BlogSidebar profile='/forum_img/kabo-p6yH8VmGqxo-unsplash.jpg' memberName='莉莉安'/>
        </Col>
        <Col span={16}>
            <div className={Style.blogContent}>
                <PostNavPure postNav='發佈文章'/>
                <div className={Style.postContent}>
                  <p>{currentDateTime}</p>
                  <div><FontAwesomeIcon icon={faLayerGroup} />選擇發文看板</div>
                  <div><BlogBoardNav/><div/>
                  <div><FontAwesomeIcon icon={faLayerGroup} />發佈文章內容</div>
                  <Input placeholder="文章標題" />
                  <br/>
                  <TextArea rows={20} placeholder="撰寫新文章內容" maxLength={50} />  
                  <div><FontAwesomeIcon icon={faLayerGroup} />新增相片</div>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                  <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img
                      alt="example"
                      style={{
                        width: '100%',
                      }}
                      src={previewImage}
                    />
                  </Modal>
                  <div><FontAwesomeIcon icon={faLayerGroup} />新增話題</div>
                  <MainBtn text = '發佈文章'/> 
                  <SecondaryBtn text = '取消'/>    
                </div>
            </div>
            </div>

        </Col>
      </Row>
      </div>
      
    </div>
  )
}




