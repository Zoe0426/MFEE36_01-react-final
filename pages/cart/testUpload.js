import React, { useState } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function PostForm() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    console.log('Success:', values);
    console.log('Uploaded files:', fileList);
  };

  const onUploadChange = ({ fileList }) => {
    if (fileList.length > 5) {
      alert('You can only upload a maximum of 5 images');
    } else {
      setFileList(fileList);
    }
  };

  return (
    <Form form={form} name="postForm" onFinish={onFinish}>
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="content" label="Content" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Upload Images">
        <Upload
          beforeUpload={() => false} // return false so file is not auto uploaded
          onChange={onUploadChange}
          fileList={fileList}
        >
          <Button icon={<UploadOutlined />}>Click to Upload (Max 5)</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PostForm;
