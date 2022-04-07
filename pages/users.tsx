import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../components/Layout";
import * as api from "../utils/swr";

const UserModal = (props: {
  showModal: boolean;
  setShowModal: (_: boolean) => void;
  mutate: () => void;
}) => {
  const { showModal, setShowModal, mutate } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<api.CreateUserType>();

  const onSubmit: SubmitHandler<api.CreateUserType> = (data) => {
    api
      .CreateUser(data)
      .then((res) => {
        console.log(res);
        mutate();
        setShowModal(false);
      });
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
            <Form.Group controlId="username">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                placeholder="Enter Username"
                autoFocus
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
                placeholder="Enter users login"
                autoFocus
                {...register("login", { required: true })}
              />
            </Form.Group>
            <p>
              {errors.login && (
                <span className="text-danger">Login is required</span>
              )}
            </p>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter users password"
                autoFocus
                {...register("password", { required: true })}
              />
            </Form.Group>
            <p>
              {errors.password && (
                <span className="text-danger">Password is required</span>
              )}
            </p>
            <Form.Group controlId="comment">
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

const UserList = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data: users, mutate } = api.useFetcher(api.ListUsers, {});
  users?.sort((a, b) => a.id - b.id);
  const handleRemove = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    api.DelUser({ id }).then((res) => {
      console.log(res);
      mutate();
    });
  };

  if (!users) {
    return <></>;
  }

  return (
    <>
      <div className="d-flex align-items-center mb-2">
        <h2>Users</h2>
        <Button className="ms-auto" onClick={() => setShowModal(true)}>
          Create User
        </Button>
      </div>
      <UserModal
        showModal={showModal}
        setShowModal={setShowModal}
        mutate={mutate}
      />
      <ListGroup as="ol" numbered>
        {users.map((user) => (
          <Link key={user.id} href={`/users/${user.id}`} passHref>
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
                  Created at: <span className="fw-bold">{user.created_at}</span>
                </div>
                {user.updated_at && (
                  <div>
                    Updated at:{" "}
                    <span className="fw-bold">{user.updated_at}</span>
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
  return (
    <Layout>
      <UserList />
    </Layout>
  );
};

export default UsersPage;
