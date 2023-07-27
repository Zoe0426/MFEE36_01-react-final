import React,{ useState, useEffect } from 'react'
import Style from './post.module.css'
import BlogBanner from '@/components/ui/blogBanner/blogBanner'
import { Col, Row } from 'antd';
import BlogSidebar from '@/components/ui/blogSidebar/blogSidebar';
import PostNavPure from '@/components/ui/postNavPure/postNavPure';
import BlogBoardNav from '@/components/ui/blogBoardNav/blogBoardNav';
import BlogPost from '@/components/ui/blogPost/blogPost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLayerGroup, faFileLines, faImage, faHashtag} from '@fortawesome/free-solid-svg-icons';
import MainBtn from '@/components/ui/buttons/MainBtn';
import PostHashtag from '@/components/ui/postHashtag/postHashtag';
import SecondaryBtn from '@/components/ui/buttons/SecondaryBtn';
// Ant design 輸入文字
import { Input, Form } from 'antd';
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

export default function Post({postSid='', memberId=''}
) {
  //紀錄body要放的東西：
  // 看板 (已做)
  const [boardSid, setBoardSid] = useState(1);
  // 文章標題 (onChange)
  const [title, setTitle] = useState('');
  // 文章內容 (onChange)
  const [content, setContent] = useState('');
  const [value, setValue] = useState('');
  // 選到的話題 (要click到的hashtag -> onclick)
  // const [choseHashtag, setChoseHashtag] = useState([]);
  // member...
  //-----------------
  const handleTitleChange = (event)=>{
    setTitle(event.target.value);
    console.log("title", event.target.value);
  };
  const handleContentChange = (event)=>{
    setContent(event.target.value);
    console.log("content", event.target.value); 
  };

  // const currentDateTime = new Date().toLocaleString(); // 取得現在的日期和時間

  //發布文章
  const sendPost = ()=> {
    console.log('clicked');
    const r = fetch(`${process.env.API_SERVER}/forum-api/forum/blog/post`,{
      method:'POST',
      body:JSON.stringify(
        {
        member_sid:memberId,
        board_sid:boardSid,
        post_title:title,
        post_content:content,
        // hashtag_name:choseHashtag,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((r) => r.json())
      .then((data)=>{
        console.log('data', data);
      })
  }

  
  

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




  // 選取看板出現相對應話題
  const [hashtag, setHashtag] = useState([]);
  const [data, setData] = useState([]); //儲存篩選後的data
  const fetchData = async()=>{
    const response = await fetch(`${process.env.API_SERVER}/forum-api/forum/blog/hashtag`, {method:"GET"});
    const hashtagData = await response.json();
    setHashtag(hashtagData);
    setData(hashtagData);
    // console.log('hashtag',hashtagData);
    // console.log('data',data);
  };
  useEffect(()=>{
    fetchData();
  }, []);

  // 篩選看板的話題
  //醫療版
  const doctor = ()=>{
    const newHashtag=hashtag.filter((data)=>
      data.board_sid===1
    );
    setData(newHashtag); //將篩選後的數據存入 newHashtag  //使用 setHashtag 更新 hashtag 狀態變數，將篩選後的數據存入其中
    setBoardSid(1);
    console.log('setBoardSid',setBoardSid);
  }
  //住宿版
  const home = ()=>{
    const newHashtag=hashtag.filter((data)=>
      data.board_sid===2
    );
    setData(newHashtag);
    setBoardSid(2);
  }
  //景點版
  const site = ()=>{
    const newHashtag=hashtag.filter((data)=>
      data.board_sid===3
    );
    setData(newHashtag);
    setBoardSid(3);
  }
  //餐廳版
  const restaurant=()=>{
    const newHashtag=hashtag.filter((data)=>
      data.board_sid===8
    );
    setData(newHashtag);
    setBoardSid(8);
  }
  //美容版
  const salon=()=>{
    const newHashtag=hashtag.filter((data)=>
      data.board_sid===4
    );
    setData(newHashtag);
    setBoardSid(4);
  }
  //學校版
  const school=()=>{
    const newHashtag=hashtag.filter((data)=>
      data.board_sid===7
    );
    setData(newHashtag);
    setBoardSid(7);
  }
  //狗貓聚版
  const hang=()=>{
    const newHashtag=hashtag.filter((data)=>
      data.board_sid===5
    );
    setData(newHashtag);
    setBoardSid(5);
  }
  //幼犬貓板
  const young=()=>{
    const newHashtag=hashtag.filter((data)=>
      data.board_sid===11
    );
    setData(newHashtag);
    setBoardSid(11);
  }
  //老犬貓板
  const old=()=>{
    const newHashtag=hashtag.filter((data)=>
      data.board_sid===12
    );
    setData(newHashtag);
    setBoardSid(12);
  }
  //好物版
  const product=()=>{
    const newHashtag=hashtag.filter((data)=>
      data.board_sid===9
    );
    setData(newHashtag);
    setBoardSid(9);
  }
  //毛孩日記
  const diary=()=>{
    const newHashtag=hashtag.filter((data)=>
      data.board_sid===6
    );
    setData(newHashtag);
    setBoardSid(6);
  }

  
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
                  {/*<p>{currentDateTime}</p>*/}
                  <div><FontAwesomeIcon icon={faLayerGroup} />選擇發文看板</div>
                  <div><BlogBoardNav
                  doctor={()=>{
                    doctor();
                  }}
                  home={()=>{
                    home();
                  }}
                  site={()=>{
                    site();
                  }}
                  restaurant={()=>{
                    restaurant();
                  }}
                  salon={()=>{
                    salon();
                  }}
                  school={()=>{
                    school();
                  }}
                  hang={()=>{
                    hang();
                  }}
                  young={()=>{
                    young();
                  }}
                  old={()=>{
                    old();
                  }}
                  product={()=>{
                    product();
                  }}
                  diary={()=>{
                    diary()
                  }}/><div/>
                  <div><FontAwesomeIcon icon={faFileLines} />發佈文章內容</div>
                  <Input placeholder="文章標題" onChange={handleTitleChange} value={title}/>
                  <br/>
                  <TextArea rows={20} placeholder="撰寫新文章內容" maxLength={50} onChange={handleContentChange} value={content}/>  
                  <div><FontAwesomeIcon icon={faImage} />新增相片</div>
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
                  <div><FontAwesomeIcon icon={faHashtag} />新增話題</div>
                  <div className={Style.hashtagField}>
                  {data.map((v,i)=>(
                    <PostHashtag key={i} text={v.hashtag_name}/>
                  ))}
                  </div>
                  <MainBtn className={Style.subBtn} text='發佈文章' clickHandler={sendPost}/> 
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




