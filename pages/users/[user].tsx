import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../../components/Layout";
import * as api from "../../utils/swr";
import { toDate } from "../../utils/date";

const UserForm = () => {
  const router = useRouter();
  const id = parseInt("" + router.query.user);
  const { data: user, error } = api.useFetcher(api.GetUser, !!id && { id });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<api.CreateUserType>();

  const onSubmitEdit: SubmitHandler<api.CreateUserType> = (data) => {
    console.log(data);
    api.UpdateUser({ id: id, ...data }).then((res) => {
      router.push("/users");
    });
  };

  if (!user) {
    if (error) {
      return (
        <div className="alert alert-danger">
          Error: {error?.data?.error || JSON.stringify(error)}
        </div>
      );
    }
    return <div></div>;
  }
  return (
    <>
      <Link href={"/users"} passHref>
        <Button variant="outline-secondary" size="sm">
          <i className="bi bi-arrow-left"></i>
        </Button>
      </Link>
      <Form className="mt-2" onSubmit={handleSubmit(onSubmitEdit)}>
        <Form.Group controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            defaultValue={user.name}
            type="text"
            placeholder="Enter username"
            {...register("name", { required: true })}
          />
        </Form.Group>
        <p>
          {errors.name && <span className="text-danger">Name is required</span>}
        </p>
        <Form.Group controlId="login">
          <Form.Label>User Login</Form.Label>
          <Form.Control
            defaultValue={user.login}
            type="text"
            placeholder="Enter user login"
            {...register("login", { required: true })}
          />
        </Form.Group>
        <p>
          {errors.login && (
            <span className="text-danger">Login is required</span>
          )}
        </p>
        <Form.Group controlId="comment">
          <Form.Label>User Comment</Form.Label>
          <Form.Control
            defaultValue={user.comment}
            as="textarea"
            rows={3}
            {...register("comment")}
          />
        </Form.Group>
        <p> </p>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control {...register("password")} type="password" />
        </Form.Group>
        <p> </p>
        <div className="input-group mb-3">
          <span className="input-group-text col-5 col-lg-3"> User Id </span>
          <input disabled type="text" className="form-control" value={user.id} />
        </div>
        <p> </p>
        <div className="input-group mb-3">
          <span className="input-group-text col-5 col-lg-3"> Created </span>
          <input disabled type="text" className="form-control" value={toDate(user.created_at)} />
        </div>
        <p> </p>
        <div className="input-group mb-3">
          <span className="input-group-text col-5 col-lg-3"> Updated at </span>
          <input disabled type="text" className="form-control" value={user.updated_at && toDate(user.updated_at)} />
        </div>
        <Button className="mt-3" variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </>
  );
};

const UserPage: NextPage = () => {
  return (
    <Layout>
      <Row className="justify-content-md-center">
        <Col xs={12} lg={6}>
          <UserForm />
        </Col>
      </Row>
    </Layout>
  );
};

export default UserPage;
