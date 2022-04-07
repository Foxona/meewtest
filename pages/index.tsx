import type { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../components/Layout";

const Home: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.replace("/users");
  }, [router]);
  return <Layout><div/></Layout>;
};

export default Home;
