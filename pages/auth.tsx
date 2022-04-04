import { NextPage } from "next";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form, Input, Button, Row, Col } from "antd";
import Layout from "../components/Layout";
import { Configuration, UsersApi } from "./api/dist";

const AuthPage: NextPage = () => {
  useEffect(() => {
    const config = new Configuration();
    config.basePath = "https://ryikku.meew.me";

    const userApi = new UsersApi(config);
    userApi
      .createUserUsersPost({
        name: "Vedergo2",
        login: "ryikku",
        password: "123456",
        comment: "test",
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  const onFinish = (data) => {
    console.log(data);
  };

  return (
    <Layout>
      <Row justify="center">
        <Col xs={20} sm={14} md={14} lg={8} xl={4}>
          {/* <Col span={12} offset={6}> */}
          <Form name="basic" onFinish={onFinish}>
            <Form.Item label="Username" name="username">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default AuthPage;
