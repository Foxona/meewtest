import { NextPage } from "next";
import React from "react";
import Layout from "../components/Layout";
import { Configuration } from "./api/dist";

const Stations: NextPage = () => {
  const config = new Configuration();
  config.basePath = "https://ryikku.meew.me";

  return <Layout></Layout>;
};

export default Stations;
