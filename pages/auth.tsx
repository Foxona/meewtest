import { NextPage } from "next";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { Configuration, UsersApi } from "./api/dist";
import { UserAuth } from "../api/dist/models";

const AuthPage: NextPage = () => {
  const config = new Configuration();
  config.basePath = "https://ryikku.meew.me";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserAuth>();
  const onSubmit: SubmitHandler<UserAuth> = (data) => {
    const userApi = new UsersApi(config);
    userApi
      .authUserUsersAuthPost({
        login: data.login,
        password: data.password,
      })
      .then((res) => {
        console.log(res.data);
        window.localStorage.setItem("token", res.data.user_jwt);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="login"
            placeholder="Enter email"
            {...register("login")}
          />
        </Form.Group>
        {errors.login && <span>Login is required</span>}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </Form.Group>
        {errors.password && <span>Password is required</span>}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Layout>
  );
};

export default AuthPage;
