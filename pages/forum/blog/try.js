import React from 'react';
import { Form, Input, Button } from 'antd';

function PostForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const handlePublish = () => {
    form.setFieldsValue({ postStatus: 'published' });
    form.submit();
  };

  const handleDraft = () => {
    form.setFieldsValue({ postStatus: 'draft' });
    form.submit();
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="title" rules={[{ required: true }]}>
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item name="content" rules={[{ required: true }]}>
        <Input.TextArea placeholder="Content" />
      </Form.Item>
      <Form.Item name="status" hidden>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handlePublish}>
          Publish
        </Button>
        <Button onClick={handleDraft}>
          Save as Draft
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PostForm;