import { Form, Input, Button } from 'antd';

const Demo = () => {
  const [form] = Form.useForm();

  const getFieldValueExample = () => {
    // get the value of the field with name 'username'
    let usernameValue = form.getFieldValue('username');

    console.log(usernameValue);
  };

  return (
    <Form form={form}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Button onClick={getFieldValueExample}>Get Field Value</Button>
    </Form>
  );
};
