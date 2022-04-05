import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";

const NavbarComponent = () => {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>
          <Link href={"/"}>Meew</Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Link href="/users">Users</Link>
          <Link href="/stations">Stations</Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
