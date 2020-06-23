import React from "react";
import { useSetRecoilState } from 'recoil';
import { Form, Input, Button } from "antd";
import { authState } from "../utils";

export default function UserApp() {

  const authenticate = useSetRecoilState(authState);
  const submit = ({ username }) => {
    authenticate(username);
  };

  const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };

  return (
    <>
        <div style={{ fontSize: '30px', marginBottom: '40px' }}>
            Welcome to smart classroom
        </div>
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={ submit }>
            <Form.Item
                name="username"
                rules={[{ required: true, message: "Please input your Name!" }]}>
                <Input placeholder="Name" />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                Get Started
                </Button>
            </Form.Item>
        </Form>
    </>
  );
}
