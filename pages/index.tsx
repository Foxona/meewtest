import type { NextPage } from "next";
import { useEffect } from "react";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  useEffect(() => {
    window.location.href = "/users";
  }, []);
  return <Layout></Layout>;
};

export default Home;
