import { NextPage } from "next";
import Router from "next/router";
import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../components/Layout";
import * as api from "../utils/swr";


const RegistrationWindow = (props: { setCreateUser: (_: boolean) => void }) => {
  const { setCreateUser } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<api.CreateUserType>();

  const [show, setShow] = useState(false);

  const onSubmit: SubmitHandler<api.CreateUserType> = (data) => {
    api
      .CreateUser(data)
      .then((res) => {
        console.log(res);
        setShow(true);
        api
          .Login({
            login: data.login,
            password: data.password,
          })
          .then((res) => {
            window.localStorage.setItem("token", res.data.user_jwt);
            Router.push("/users");
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
    formState: { errors },
  } = useForm<api.LoginType>();

  const [wrongCred, setWrongCred] = useState(false);

  const onSubmit: SubmitHandler<api.LoginType> = (data) => {
    setWrongCred(false);
    api
      .Login(data)
      .then((res) => {
        window.localStorage.setItem("token", res.data.user_jwt);
        Router.push("/users")
      })
      .catch((err) => {
        console.log(err);
        setWrongCred(true);
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Login</Form.Label>
        <Form.Control
          type="login"
          placeholder="johndoe"
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
          placeholder="password"
          {...register("password", { required: true })}
        />
      </Form.Group>
      <p>
        {errors.password && (
          <span className="text-danger">Password is required</span>
        )}
      </p>
      {wrongCred && (
        <div className="mb-3 alert alert-danger">Wrong login or password</div>
      )}
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
