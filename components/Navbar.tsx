import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const NavbarComponent = () => {
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    setToken(window.localStorage.getItem("token") || "");
  }, []);

  return (
    <Navbar bg="light" variant="light" sticky="top" className="border-bottom">
      <Container>
        <Navbar.Brand>
          <Link href="/users">Users</Link>
        </Navbar.Brand>
        <Navbar.Brand>
          <Link href="/stations">Stations</Link>
        </Navbar.Brand>
        {token ? (
          <Nav className="d-flex gap-3 ms-auto">
            <Button
              variant="outline-primary"
              onClick={() => {
                window.localStorage.removeItem("token");
                router.push("/auth");
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
