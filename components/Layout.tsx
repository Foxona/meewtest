import { Layout } from "antd";
import { ReactChildren } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutComponent = (props: LayoutProps) => {
  //  make responsive layout component with ant design
  return (
    <>
      <Navbar />
      <div className="bg-light border p-3 vh-100">
        <Container fluid className="container-sm">
          <Row>
            <Col>{props.children}</Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default LayoutComponent;
