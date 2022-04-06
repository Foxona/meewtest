import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Badge, Button, Form, ListGroup, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createConfiguration,
  CreateStation,
  ServerConfiguration,
  User,
  UsersApi,
  CreateUser,
} from "../api";
import Layout from "../components/Layout";
import Link from "next/link";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.nuILLQ7XJaxFMhhzPP9u-tID7S5opHSA9qaDCmAqE-I";

const cfg = createConfiguration({
  baseServer: new ServerConfiguration("https://ryikku.meew.me", {}),
});
const usersApi = new UsersApi(cfg);

const UserModal = (props: {
  showModal: boolean;
  setShowModal: (_: boolean) => void;
}) => {
  const { showModal, setShowModal } = props;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateUser>();

  const onSubmit: SubmitHandler<CreateUser> = (data) => {
    usersApi
      .createUserUsersPost({
        name: data.name,
        comment: data.comment,
        login: data.login,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Create New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                placeholder="Enter Username"
                autoFocus
                {...register("name", { required: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="login">
              <Form.Label>Login</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter users login"
                autoFocus
                {...register("login", { required: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter users password"
                autoFocus
                {...register("password", { required: true })}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comment</Form.Label>
              <Form.Control as="textarea" rows={3} {...register("comment")} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Create User
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

const UserList = (props: { users: User[] }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { users } = props;

  const handleRemove = (e, id: number) => {
    e.preventDefault();
    e.stopPropagation();

    usersApi.deleteUserUsersIdDelete(id, token).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <div className="d-flex align-items-center mb-2">
        <h2>Users</h2>
        <Button className="ms-auto" onClick={() => setShowModal(true)}>
          Create User
        </Button>
      </div>
      <UserModal showModal={showModal} setShowModal={setShowModal} />
      <ListGroup as="ol" numbered>
        {users.map((user) => (
          <Link
            key={user.id}
            href={`/users/[...user]`}
            as={`/users/user/${user.id}`}
            passHref
          >
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div>
                  Name: <span className="fw-bold">{user.name}</span>
                </div>
                <div>
                  Login: <span className="fw-bold">{user.login}</span>
                </div>
                <div>
                  User Id: <span className="fw-bold">{user.id}</span>
                </div>
                <div>
                  Comment: <span className="fw-bold">{user.comment}</span>
                </div>
                <div>
                  Created at: <span className="fw-bold">{user.created_at.toUTCString()}</span>
                </div>
                {user.updated_at && (
                  <div>
                    Updated at: <span className="fw-bold">{user.updated_at.toUTCString()}</span>
                  </div>
                )}
              </div>
              <div>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-danger"
                    onClick={(e) => handleRemove(e, user.id)}
                  >
                    Remove <i className="bi bi-trash3"></i>
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
    </>
  );
};

const UsersPage: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    usersApi.listUsersUsersGet(token as string).then((res) => {
      setUsers(res);
    });
  }, []);

  return (
    <Layout>
      <UserList users={users} />
    </Layout>
  );
};

export default UsersPage;
