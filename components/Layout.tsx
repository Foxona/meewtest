import { Layout } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./Navbar";

const LayoutComponent = (props) => {
  //  make responsive layout component with ant design
  return (
    <Container fluid>
      <Navbar />
      <Row>
        <Col>
          <div className="bg-light border p-3">{props.children}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default LayoutComponent;
