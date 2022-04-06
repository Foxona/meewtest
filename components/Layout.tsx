import { Layout } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./Navbar";

const LayoutComponent = (props) => {
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
