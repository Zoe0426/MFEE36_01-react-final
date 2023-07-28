// import { useState } from 'react';
// import HomeMainBtns from '@/components/ui/home/homeMainBtns';
// import { Select, Space, Form, Input } from 'antd';
// import MainBtn from '@/components/ui/buttons/MainBtn';

// export default function Test() {
//   const hasTag = {
//     one: [
//       { label: '寵物健康', value: '寵物健康' },
//       { label: '寵物醫療', value: '寵物醫療' },
//     ],
//     two: [
//       { label: '寵物住宿', value: '寵物住宿' },
//       { label: '寵物飯店', value: '寵物飯店' },
//     ],
//   };
//   const [options, setOptions] = useState(hasTag.one);
//   const [boardSid, setBoardSid] = useState(1);

//   const handleChange = (value) => {
//     console.log(value);
//     //setChoseHashtag(value);
//     console.log(`selected ${value}`);
//   };
//   const updateOption1 = () => {
//     setOptions(hasTag.one);
//     setBoardSid(1);
//   };
//   const updateOption2 = () => {
//     setBoardSid(2);
//     setOptions(hasTag.two);
//   };

//   const onFinish = (values) => {
//     const newValue = { ...values, board_sid: boardSid, hashTags:  };

//     fetch('http://localhost:3002/cart-api/test', {
//       method: 'POST',
//       body: JSON.stringify(newValue),
//       headers: { 'Content-Type': 'application/json' },
//     })
//       .then((r) => r.json())
//       .then((data) => {
//         console.log('backData', data);
//       });
//     console.log('Success:', values);
//   };
//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };

//   return (
//     <>
//       <Form
//         name="basic"
//         labelCol={{
//           span: 8,
//         }}
//         wrapperCol={{
//           span: 16,
//         }}
//         style={{
//           maxWidth: 600,
//         }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//       >
//         <div>
//           <MainBtn text="寵物醫療" clickHandler={updateOption1}></MainBtn>
//           <MainBtn text="寵物醫療" clickHandler={updateOption2}></MainBtn>
//         </div>

//         <Space
//           style={{
//             width: '100%',
//           }}
//           direction="vertical"
//         >
//           <Select
//             mode="multiple"
//             allowClear
//             style={{
//               width: '100%',
//             }}
//             placeholder="Please select"
//             defaultValue={options}
//             onChange={handleChange}
//             options={options}
//           />
//         </Space>
//         <MainBtn text="完成" htmltype="submit" />
//       </Form>
//     </>
//   );
// }
