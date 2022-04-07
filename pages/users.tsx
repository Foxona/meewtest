import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { Button, Form, ListGroup, Modal, Accordion } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../components/Layout";
import * as api from "../utils/swr";
import { toDate } from "../utils/date";
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
    api.CreateUser(data).then((res) => {
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
                placeholder="John Doe"
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
                placeholder="johndoe_142"
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
                placeholder="enter password"
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
  const { data: users, mutate, error } = api.useFetcher(api.ListUsers, {});
  if (users) users.sort((a, b) => a.id - b.id);
  const handleRemove = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    api.DelUser({ id }).then((res) => {
      console.log(res);
      mutate();
    });
  };

  if (error) {
    return <div className="alert alert-danger">{error?.data?.error}</div>;
  }

  if (!users) {
    return <div></div>;
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
        <Accordion defaultActiveKey="0" alwaysOpen>
          {users.map((user) => (
            <Accordion.Item eventKey={`${user.id}`} key={user.id}>
              <Accordion.Header>{user.name}</Accordion.Header>
              <Accordion.Body className="p-0">
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start  overflow-scroll"
                >
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="row" className="col-md-1">Name</th>
                        <td className="col-md-6">{user.name}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="col-md-1">Login</th>
                        <td className="col-md-6">{user.login}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="col-md-1">User</th>
                        <td className="col-md-6">{user.id}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="col-md-1">Comment</th>
                        <td className="col-md-6">{user.comment}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="col-md-1">Created</th>
                        <td className="col-md-6">{toDate(user.created_at)}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="col-md-1">Updated&nbsp;at</th>
                        <td className="col-md-6">{user.updated_at && toDate(user.updated_at)}</td>
                      </tr>
                    </tbody>
                  </table>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                  <Link key={user.id} href={`/users/${user.id}`} passHref>
                    <button
                      type="button"
                      className="btn btn-outline-primary m-1"
                    >
                      edit user
                    </button>
                  </Link>
                  <button
                    onClick={(e) => handleRemove(e, user.id)}
                    type="button"
                    className="btn btn-outline-danger btn-sm m-1 ms-auto"
                  >
                    delete
                  </button>
                </ListGroup.Item>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
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
