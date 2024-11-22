import React, { useEffect, useState } from 'react';
import { Form, Input, Layout, Row, Col, Card, Button, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchAuth } from '../../redux/slices/auth';
import { fetchRegister } from '../../redux/slices/auth';


const SignInUp = () => {
  const dispatch = useDispatch<any>();
  const [activeKey, setActiveKey] = useState("signin");  // Инициализация с активной вкладкой 1

  // Обработчик изменения активной вкладки
  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  const onFinish = (values: any) => {
    if (activeKey == "signin") {
      dispatch(fetchAuth(values))
    }

    if (activeKey == "signup") {
      dispatch(fetchRegister(values))
    }

  };




  return (
    <>
      <Tabs activeKey={activeKey}
        onChange={handleTabChange}>
        <TabPane tab="Sign up" key="signup">
          <Form
            name="registration"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
              email: '',
              name: '',
              password: '',
            }}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'The input is not a valid email!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="username"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  min: 6,
                  message: 'Password must be at least 6 characters!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Sign in" key="signin">
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
              email: '',
              password: '',
            }}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'The input is not a valid email!',
                },
              ]}
            >
              <Input />
            </Form.Item>


            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  min: 6,
                  message: 'Password must be at least 6 characters!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </>
  );
};

export default SignInUp;