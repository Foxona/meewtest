import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import { UsersApi, AuthApi, StationsApi } from "./api/dist";
import { useEffect } from "react";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Home: NextPage = () => {
  useEffect(() => {
    const userApi = new UsersApi();
    userApi
      .createUserUsersPost({
        name: "Vedergo2",
        login: "ryikku",
        password: "123456",
        comment: "test",
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  // const { data, error } = useSWR("/api/user/123", fetcher);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  // return <div>hello {data.name}!</div>;
  return <div>hello</div>;
};

export default Home;
