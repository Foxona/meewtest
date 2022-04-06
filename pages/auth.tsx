import { NextPage } from "next";
import React, { useState } from "react";
import { Button, Form, Row, Col, Toast } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../components/Layout";
import {
  AuthApi,
  UsersApi,
  createConfiguration,
  ServerConfiguration,
  UserAuth,
  CreateUser,
} from "../api/";

const cfg = createConfiguration({
  baseServer: new ServerConfiguration("https://ryikku.meew.me", {}),
});
const authApi = new AuthApi(cfg);
const userApi = new UsersApi(cfg);

const RegistrationWindow = (props: { setCreateUser: (_: boolean) => void }) => {
  const { setCreateUser } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateUser>();

  const [show, setShow] = useState(false);

  const onSubmit: SubmitHandler<CreateUser> = (data) => {
    userApi
      .createUserUsersPost({
        name: data.name,
        comment: data.comment,
        login: data.login,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
        setShow(true);
        userApi
          .authUserUsersAuthPost({
            login: data.login,
            password: data.password,
          })
          .then((res) => {
            window.localStorage.setItem("token", res.user_jwt);
            window.location.href = "/users";
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="username">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          {...register("name", { required: true })}
        />
      </Form.Group>
      <p>
        {errors.name && (
          <span className="text-danger">Username is required</span>
        )}
      </p>
      <Form.Group controlId="login">
        <Form.Label>Login</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your login"
          {...register("login", { required: true })}
        />
      </Form.Group>
      <p>
        {errors.login && <span className="text-danger">Login is required</span>}
      </p>
      <Form.Group controlId="password">
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
      <Form.Group className="mb-3" controlId="comment">
        <Form.Label>Comment</Form.Label>
        <Form.Control as="textarea" rows={3} {...register("comment")} />
      </Form.Group>
      <div className="d-flex align-items-center gap-3">
        {!show && (
          <Button variant="primary" type="submit">
            Create User
          </Button>
        )}
        <a
          className="primary-text"
          onClick={() => {
            setCreateUser(false);
          }}
        >
          Go to Login
        </a>
      </div>
    </Form>
  );
};

const LoginWindow = (props: { setCreateUser: (_: boolean) => void }) => {
  const { setCreateUser } = props;
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
        {errors.login && <span className="text-danger">Login is required</span>}
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
          Login
        </Button>
        <a
          onClick={() => {
            setCreateUser(true);
          }}
          className="primary-text"
        >
          Create Account
        </a>
      </div>
    </Form>
  );
};

const AuthPage: NextPage = () => {
  const [createUser, setCreateUser] = useState<boolean>(false);

  return (
    <Layout>
      <Row className="justify-content-md-center">
        <Col xs={12} md={4}>
          {createUser ? (
            <RegistrationWindow setCreateUser={setCreateUser} />
          ) : (
            <LoginWindow setCreateUser={setCreateUser} />
          )}
        </Col>
      </Row>
    </Layout>
  );
};

export default AuthPage;
