import { Layout } from "antd";

const LayoutComponent = (props) => {
  //  make responsive layout component with ant design
  return (
    <Layout style={{ height: "100vh" }}>
      <Layout.Header>
        <h1>Header</h1>
      </Layout.Header>
      <Layout.Content>{props.children}</Layout.Content>
      <Layout.Footer>
        <h1>Footer</h1>
      </Layout.Footer>
    </Layout>
  );
};

export default LayoutComponent;
