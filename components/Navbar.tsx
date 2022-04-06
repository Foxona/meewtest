import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const NavbarComponent = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
  }, []);

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>
          <Link href="/auth">Auth</Link>
        </Navbar.Brand>
        <Navbar.Brand>
          <Link href="/users">Users</Link>
        </Navbar.Brand>
        <Navbar.Brand>
          <Link href="/stations">Stations</Link>
        </Navbar.Brand>
        {token ? (
          <Nav className="d-flex gap-3 ms-auto">
            <Button
              onClick={() => {
                window.localStorage.removeItem("token");
                window.location.href = "/auth";
              }}
            >
              Logout
            </Button>
          </Nav>
        ) : (
          <div className="d-flex gap-3 ms-auto"></div>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
