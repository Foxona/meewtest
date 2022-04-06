import { NextPage } from "next";
import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../components/Layout";
import {
  AuthApi,
  UsersApi,
  createConfiguration,
  ServerConfiguration,
  UserAuth,
} from "../api/";

const cfg = createConfiguration({
  baseServer: new ServerConfiguration("https://ryikku.meew.me", {}),
});
const userApi = new UsersApi(cfg);
const authApi = new AuthApi(cfg);

const AuthPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserAuth>();

  const onSubmit: SubmitHandler<UserAuth> = (data) => {
    authApi
      .authUserUsersAuthPost({
        login: data.login,
        password: data.password,
      })
      .then((res) => {
        console.log(res.user_jwt);
        window.localStorage.setItem("token", res.user_jwt);
        window.location.href = "/users";
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <Row className="justify-content-md-center">
        <Col xs={12} md={4}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="login"
                placeholder="Enter email"
                {...register("login", { required: true })}
              />
            </Form.Group>
            <p>
              {errors.login && (
                <span className="text-danger">Login is required</span>
              )}
            </p>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </Form.Group>
            <p>
              {errors.password && (
                <span className="text-danger">Password is required</span>
              )}
            </p>
            <div className="d-flex align-items-center gap-3">
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <a className="primary-text">Or Register</a>
            </div>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default AuthPage;
