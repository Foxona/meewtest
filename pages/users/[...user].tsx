import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../../components/Layout";
import {
  AuthApi,
  UsersApi,
  createConfiguration,
  ServerConfiguration,
  StationsApi,
  User,
  UpdateUser,
} from "../../api";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/router";

const cfg = createConfiguration({
  baseServer: new ServerConfiguration("https://ryikku.meew.me", {}),
});
const usersApi = new UsersApi(cfg);

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.nuILLQ7XJaxFMhhzPP9u-tID7S5opHSA9qaDCmAqE-I";

const UserForm = () => {
  const router = useRouter();

  const [userEntity, setUserEntity] = useState<User>();

  useEffect(() => {
    // const id = parseInt(router?.query?.station[1]);

    usersApi.getUserByIdUsersIdGet(1, token).then((res) => {
      setUserEntity(res);
    });
  }, [router.query]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<UpdateUser>({
    defaultValues: {
      name: userEntity?.name,
      login: userEntity?.login,
      comment: userEntity?.comment,
    },
  });

  const onSubmitEdit: SubmitHandler<UpdateUser> = (data) => {
    usersApi
      .updateUserUsersIdPatch(
        1,
        {
          name: data.name,
          login: data.login,
          comment: data.comment,
          password: data.password,
        },
        token
      )
      .then((res) => {
        console.log(res);
        window.location.href = "/users";
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Link href={"/users"} passHref>
        <Button variant="outline-secondary" size="sm">
          Back
        </Button>
      </Link>
      <Form className="mt-2" onSubmit={handleSubmit(onSubmitEdit)}>
        <Form.Group controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            {...register("name", { required: true })}
          />
        </Form.Group>
        <Form.Group controlId="login" className="mt-2">
          <Form.Label>User Login</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user login"
            {...register("login", { required: true })}
          />
        </Form.Group>
        <Form.Group className="mt-2" controlId="comment">
          <Form.Label>User Comment</Form.Label>
          <Form.Control as="textarea" rows={3} {...register("comment")} />
        </Form.Group>
        <Form.Group className="mt-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control {...register("password")} type="password" />
        </Form.Group>
        <div className="d-flex flex-column mt-2">
          <span>User Id: {userEntity?.id}</span>
          <span>Created At: {userEntity?.created_at.toUTCString()}</span>
          {userEntity?.updated_at && (
            <span>Updated At: {userEntity?.updated_at?.toUTCString()}</span>
          )}
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
        <Col xs={12} md={4}>
          <UserForm />
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
