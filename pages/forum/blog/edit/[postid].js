import React,{ useState, useEffect, useContext} from 'react'
import { useRouter } from 'next/router';
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
import AuthContext from '@/context/AuthContext';
// Ant design 輸入文字
import { Input, Form, Select, Space } from 'antd';
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

  const {auth, setAuth} = useContext(AuthContext);
  //紀錄body要放的東西：
  // 看板 (已做)
  const [boardSid, setBoardSid] = useState(1);
  // 文章標題 (onChange)
  // const [title, setTitle] = useState('');
  // 文章內容 (onChange)
  // const [content, setContent] = useState('');
  const [value, setValue] = useState('');
  // 選到的話題 (要click到的hashtag -> onclick)
  const [choseHashtag, setChoseHashtag] = useState([]);
  // member...
  //-----------------

    // 文章
    const [postData, setPostData] = useState([]);
    // 話題
    const [hashtagData, setHashtagData] = useState([]);
    // 圖片
    const [imgData, setImgData] = useState([]);

  // 動態路由
  const router = useRouter();
  const { pathname } = router; //看路徑
  const {query} = router; 
  // console.log("query",query);
  // console.log("pathname",pathname);
  const postid = router.query.postid; 
  console.log(auth.id);

  const [initialValues, setInitialValues] = useState({
    title: '',
    content: '',
  });

  const [content, setContent] = useState('');


  const fetchData = async (postid) => {
    try {
      const response = await fetch(`${process.env.API_SERVER}/forum-api/${postid}`, { method: "GET" });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
      // 從回傳的 data 物件中取得 postData、hashtagData 和 commentData，然後設定到對應的狀態
      setPostData(data.newData || []); //因為在node文章資料是叫data
      setHashtagData(data.tagData || []); //因為在node hashtag資料是叫tagData
      const newImgData = data.imgData.map(v=>v.file)
      setImgData(newImgData || []);
  
      console.log('postData', data.newData);
      console.log('hashtagData', data.tagData);
      console.log('commentData', data.newCommentData);
      console.log('newImgData', newImgData);
  
      console.log(postid);
      console.log('data.newData[0].post_title',data.newData[0].post_title);
      const post=data.newData[0];
      console.log('post',post);

      // setInitialValues({
      //   title: ,
      //   content: post.post_content,
      // });

      setContent(post.post_content);
      console.log('content',content);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  


  // useEffect(() => {
  //   if (postData.length > 0) {
  //     // Update initial values based on the fetched data
      
  //   }
  // }, [postData]);
  useEffect(()=>{
    if (postid){
      fetchData(postid);
      
    }

    }, [postid]); // Fetch data when the post ID changes

    // console.log(postData[0].post_content);
    // console.log(postData[0].post_title);
    


  // 給會員一個初始值
  // const initialValues = {
  //   memberSid: auth.id
  // };
  // console.log('data.newData',data.newData);
  // console.log('newData',newData);



  //發布文章

  const handleSubmit = (values) => {
    const formData = new FormData();
    // 後端用req.body...可以拿到以下資料
    // console.log('submitType', submitType);
    formData.append('title', values.title);
    formData.append('content', values.content); //values.XXX 是antd的表單資料
    formData.append('memberSid', auth.id);
    formData.append('boardSid', boardSid);
    formData.append('choseHashtag', choseHashtag);
    // 後端用req.files, 會拿到照片們的資料，記得append要用photo，因為後端這麼設定的
    fileList.forEach((file)=>{
      formData.append('photo', file.originFileObj);
    }); // ant design上傳照片時，會一直更新setFileList，我們送出，只要拿fileList的結果就好

    // console.log('選中的值:', values);
    // const newValue = { ...values, boardSid: boardSid, memberSid:auth.id, choseHashtag: choseHashtag};
    // console.log('送後端的值：',newValue);

    fetch(`${process.env.API_SERVER}/forum-api/forum/blog/post`,{
      method:'POST',
      // body:JSON.stringify(newValue),
      body: formData,
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    })
    .then((r) => r.json())
    .then((data)=>{
      console.log('data', data);
      // 拿到資料庫加文字的回傳結果後，成功的話router.push到你要的頁面去，失敗的話，看要怎麼處理
    })
  }

  
  

  // Ant design上傳圖片
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
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


  // Antd 點選看板篩選話題
  const antTag = {
    doctor:[
      {label:'寵物健康', value:'寵物健康'},
      {label:'寵物醫療', value:'寵物醫療'},
      {label:'寵物醫生', value:'寵物醫生'},
      {label:'寵物保健', value:'寵物保健'},
      {label:'寵物疾病', value:'寵物疾病'},
      {label:'寵物', value:'寵物'},
      {label:'毛小孩', value:'毛小孩'},
    ],
    home:[
      {label:'寵物度假', value:'寵物度假'},
      {label:'寵物住宿', value:'寵物住宿'},
      {label:'寵物旅館', value:'寵物旅館'},
      {label:'寵物寄宿', value:'寵物寄宿'},
      {label:'寵物民宿', value:'寵物民宿'},
      {label:'寵物', value:'寵物'},
      {label:'毛小孩', value:'毛小孩'},
    ],
    site:[
      {label:'寵物遊樂場', value:'寵物遊樂場'},
      {label:'寵物友善', value:'寵物友善'},
      {label:'寵物戶外活動', value:'寵物戶外活動'},
      {label:'寵物旅遊', value:'寵物旅遊'},
      {label:'寵物生態園區', value:'寵物生態園區'},
      {label:'寵物', value:'寵物'},
      {label:'毛小孩', value:'毛小孩'},
    ],
    salon:[
      {label:'寵物造型', value:'寵物造型'},
      {label:'寵物美容', value:'寵物美容'},
      {label:'寵物洗澡', value:'寵物洗澡'},
      {label:'寵物SPA', value:'寵物SPA'},
      {label:'寵物美髮', value:'寵物美髮'},
      {label:'寵物', value:'寵物'},
      {label:'毛小孩', value:'毛小孩'},
    ],
    hang:[
      {label:'狗聚會', value:'狗聚會'},
      {label:'貓聚會', value:'貓聚會'},
      {label:'寵物社交', value:'寵物社交'},
      {label:'狗狗交友', value:'狗狗交友'},
      {label:'貓咪聚會', value:'貓咪聚會'},
      {label:'寵物', value:'寵物'},
      {label:'毛小孩', value:'毛小孩'},
    ],
    diary:[
      {label:'寵物日記', value:'寵物日記'},
      {label:'毛孩生活', value:'毛孩生活'},
      {label:'寵物趣事', value:'寵物趣事'},
      {label:'寵物家居', value:'寵物家居'},
      {label:'毛孩故事', value:'毛孩故事'},
      {label:'寵物', value:'寵物'},
      {label:'毛小孩', value:'毛小孩'},
    ],
    school:[
      {label:'寵物培訓', value:'寵物培訓'},
      {label:'寵物學習', value:'寵物學習'},
      {label:'寵物教育', value:'寵物教育'},
      {label:'寵物訓練', value:'寵物訓練'},
      {label:'寵物行為', value:'寵物行為'},
      {label:'寵物', value:'寵物'},
      {label:'毛小孩', value:'毛小孩'},
    ],
    restaurant:[
      {label:'寵物餐廳', value:'寵物餐廳'},
      {label:'寵物用餐', value:'寵物用餐'},
      {label:'寵物友善餐廳', value:'寵物友善餐廳'},
      {label:'寵物美食', value:'寵物美食'},
      {label:'寵物餐點', value:'寵物餐點'},
      {label:'寵物', value:'寵物'},
      {label:'毛小孩', value:'毛小孩'},
    ],
    product:[
      {label:'寵物用品', value:'寵物用品'},
      {label:'寵物推薦', value:'寵物推薦'},
      {label:'寵物好物', value:'寵物好物'},
      {label:'寵物生活用品', value:'寵物生活用品'},
      {label:'寵物商品', value:'寵物商品'},
      {label:'寵物', value:'寵物'},
      {label:'毛小孩', value:'毛小孩'},
    ],
    young:[
      {label:'幼犬', value:'幼犬'},
      {label:'幼貓', value:'幼貓'},
      {label:'寵物新生活', value:'寵物新生活'},
      {label:'寵物小寶貝', value:'寵物小寶貝'},
      {label:'寵物幼寵成長', value:'寵物幼寵成長'},
      {label:'寵物', value:'寵物'},
      {label:'毛小孩', value:'毛小孩'},
    ],
    old:[
      {label:'老犬', value:'老犬'},
      {label:'老貓', value:'老貓'},
      {label:'寵物晚年', value:'寵物晚年'},
      {label:'寵物老年生活', value:'寵物老年生活'},
      {label:'老寵愛護', value:'老寵愛護'},
      {label:'寵物', value:'寵物'},
      {label:'毛小孩', value:'毛小孩'},
    ],


  } 

  const [options, setOptions] = useState([]);
  
    const handleChangeTag = (value) => {
      setChoseHashtag(value);
      console.log(`selected ${value}`);
    };

  // 篩選看板的話題
  //醫療版
  const doctor = ()=>{
    // const newHashtag=hashtag.filter((data)=>
    //   data.board_sid===1
    //   );
    //   setData(newHashtag); //將篩選後的數據存入 newHashtag  //使用 setHashtag 更新 hashtag 狀態變數，將篩選後的數據存入其中
      //antd
    setOptions(antTag.doctor);
    setBoardSid(1);
    console.log('setBoardSid',setBoardSid);
  }
  //住宿版
  const home = ()=>{
    // const newHashtag=hashtag.filter((data)=>
    //   data.board_sid===2
    // );
    // setData(newHashtag);
    //antd
    setOptions(antTag.home);
    setBoardSid(2);
  }
  //景點版
  const site = ()=>{
    // const newHashtag=hashtag.filter((data)=>
    //   data.board_sid===3
    // );
    // setData(newHashtag);
    //antd
    setOptions(antTag.site);
    setBoardSid(3);
  }
  //餐廳版
  const restaurant=()=>{
    // const newHashtag=hashtag.filter((data)=>
    //   data.board_sid===8
    // );
    // setData(newHashtag);
    //antd
    setOptions(antTag.restaurant);
    setBoardSid(8);
  }
  //美容版
  const salon=()=>{
    // const newHashtag=hashtag.filter((data)=>
    //   data.board_sid===4
    // );
    // setData(newHashtag);
    //antd
    setOptions(antTag.salon);
    setBoardSid(4);
  }
  //學校版
  const school=()=>{
    // const newHashtag=hashtag.filter((data)=>
    //   data.board_sid===7
    // );
    // setData(newHashtag);
    //antd
    setOptions(antTag.school);
    setBoardSid(7);
  }
  //狗貓聚版
  const hang=()=>{
    // const newHashtag=hashtag.filter((data)=>
    //   data.board_sid===5
    // );
    // setData(newHashtag);
    //antd
    setOptions(antTag.hang);
    setBoardSid(5);
  }
  //幼犬貓板
  const young=()=>{
    // const newHashtag=hashtag.filter((data)=>
    //   data.board_sid===11
    // );
    // setData(newHashtag);
    //antd
    setOptions(antTag.young);
    setBoardSid(11);
  }
  //老犬貓板
  const old=()=>{
    // const newHashtag=hashtag.filter((data)=>
    //   data.board_sid===12
    // );
    // setData(newHashtag);
    //antd
    setOptions(antTag.old);
    setBoardSid(12);
  }
  //好物版
  const product=()=>{
    // const newHashtag=hashtag.filter((data)=>
    //   data.board_sid===9
    // );
    // setData(newHashtag);
    //antd
    setOptions(antTag.product);
    setBoardSid(9);
  }
  //毛孩日記
  const diary=()=>{
    // const newHashtag=hashtag.filter((data)=>
    //   data.board_sid===6
    // );
    // setData(newHashtag);
    //antd
    setOptions(antTag.diary);
    setBoardSid(6);
  }
  console.log('initialValues',initialValues);



  
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
            <Form

            onFinish={handleSubmit}
            // onFinishFailed={onFinishFailed}
            >
            <PostNavPure postNav='發佈文章'/>
            <div className={Style.postContent}>
              {/*<p>{currentDateTime}</p>*/}
              <div><FontAwesomeIcon icon={faLayerGroup} />選擇發文看板</div>
              <BlogBoardNav
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
                }}/>
              <div><FontAwesomeIcon icon={faFileLines} style={{maxWidth:20, maxHeight:20}}/>發佈文章內容</div>
              <Form.Item name='title'>
                <Input placeholder="文章標題" />
              </Form.Item>
              <Form.Item name='content'>
                <TextArea rows={20} placeholder="撰寫新文章內容" maxLength={50} value='123'/> 
              </Form.Item>
              <div><FontAwesomeIcon icon={faImage} style={{maxWidth:20, maxHeight:20}}/>新增相片</div>
              <Form.Item name='photo'>
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
              </Form.Item>
              <div><FontAwesomeIcon icon={faHashtag} style={{maxWidth:20, maxHeight:20}}/>新增話題</div>
              {/*<div className={Style.hashtagField}>
              {data.map((v,i)=>(
                <PostHashtag key={i} text={v.hashtag_name}/>
              ))}
              </div>*/}
              {/*<Form.Item name={'value'}>*/}
                <Space
                  style={{
                    width: '100%',
                  }}
                  direction="vertical"
                >
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  placeholder="選擇話題"
                  // defaultValue={['a10', 'c12']}
                  onChange={handleChangeTag}
                  options={options}
                />
                </Space>
              {/*</Form.Item>*/}
            <MainBtn className={Style.subBtn} text='發佈文章' htmltype="button" 
            //clickHandler={setSubmitType(1)}
            /> 
            <MainBtn text='儲存至草稿夾' htmltype="button" 
            //clickHandler={setSubmitType(1)}
            /> 
            <SecondaryBtn text = '取消'/>    

          </div>
        </Form>
        </div>

          </Col>
        </Row>
        </div>
        
      </div>
  )
}