import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Button, Form, Col, Row, ListGroup } from "react-bootstrap";
import { set, SubmitHandler, useForm } from "react-hook-form";
import Layout from "../../components/Layout";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/router";
import * as api from "../../utils/swr";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.nuILLQ7XJaxFMhhzPP9u-tID7S5opHSA9qaDCmAqE-I";

const UserForm = (props: { mutate: () => void; id: number; user }) => {
  const { mutate, id, user } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<>({});

  api.GetUser({ id: id }).then((res) => {
    console.log(res);
    mutate();
  });

  const onSubmitEdit: SubmitHandler<> = (data) => {
    console.log(data);
    api
      .UpdateUser(
        { id: id },
        {
          name: data.name,
          login: data.login,
          comment: data.comment,
          password: data.password,
        }
      )
      .then((res) => {
        console.log(res);
        mutate();
      });
    // usersApi
    //   .updateUserUsersIdPatch(
    //     1,
    //     {
    //       name: data.name,
    //       login: data.login,
    //       comment: data.comment,
    //       password: data.password,
    //     },
    //     token
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     window.location.href = "/users";
    //   })
    //   .catch((err) => console.log(err));
  };
  return (
    <>
      <Link href={"/users"} passHref>
        <Button variant="outline-secondary" size="sm">
          {"<-"}
        </Button>
      </Link>
      {user && (
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
            {errors.name && (
              <span className="text-danger">Name is required</span>
            )}
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
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control {...register("password")} type="password" />
          </Form.Group>
          <div className="d-flex flex-column mt-2">
            <span>User Id: {user.id}</span>
            <span>Created At: {user.created_at}</span>
            {user.updated_at && <span>Updated At: {user.updated_at}</span>}
          </div>
          <Button className="mt-3" variant="primary" type="submit">
            Save
          </Button>
        </Form>
      )}
    </>
  );
};

const UserPage: NextPage = () => {
  const router = useRouter();
  const { data: user, mutate } = api.useFetcher(api.GetUser, {
    id: router.query.user,
  });

  return (
    <Layout>
      <Row className="justify-content-md-center">
        <Col xs={12} md={4}>
          {user && (
            <UserForm user={user} mutate={mutate} id={router.query.user} />
          )}
        </Col>
      </Row>
    </Layout>
  );
};

export default UserPage;

// {
/* <Button
variant="outline-secondary"
onClick={() => handleUpdate(station.id)}
>
Update <i className="bi bi-trash3"></i>
</Button> */
// }

// const handleUpdate = (id: number) => {
//   stationsApi.deleteStationStationsIdDelete(id, token).then((res) => {
//     console.log(res);
//   });
// };
