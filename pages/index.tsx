import type { NextPage } from "next";
import Layout from "../components/Layout";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Home: NextPage = () => {
  // useEffect(() => {
  //   const userApi = new UsersApi();
  //   userApi
  //     .createUserUsersPost({
  //       name: "Vedergo2",
  //       login: "ryikku",
  //       password: "123456",
  //       comment: "test",
  //     })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }, []);

  return <Layout></Layout>;
};

export default Home;
