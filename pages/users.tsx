import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Badge, ListGroup } from "react-bootstrap";
import Layout from "../components/Layout";
import { Configuration, UsersApi } from "./api/dist";
import { User } from "./api/dist/models";

const UserList = (props: { users: User[] }) => {
  const { users } = props;

  return (
    <>
      <h2>Users</h2>
      <ListGroup as="ol" numbered>
        {users.map((user) => (
          <>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{user.name}</div>
                {user.comment}
                {user.created_at}
              </div>
              <div>{user.createdAt}</div>
              <Badge bg="primary" pill>
                {/* {user.updatedAt} */}
              </Badge>
            </ListGroup.Item>
          </>
        ))}
      </ListGroup>
    </>
  );
};

const UsersPage: NextPage = () => {
  const config = new Configuration();
  config.basePath = "https://ryikku.meew.me";
  const usersApi = new UsersApi(config);

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    usersApi.listUsersUsersGet(token).then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <Layout>
      <UserList users={users} />
    </Layout>
  );
};

export default UsersPage;
