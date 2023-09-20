import { Navbar, Nav, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="mb-3 sticky-top bg-body-tertiary">
      <Navbar>
        <Container fluid>
          <Navbar.Brand>
            <Link to={"/"}>Home</Link>
          </Navbar.Brand>
          <Nav as={"ul"}>
            <Nav.Item as={"li"}>
              <Link to={"/recipes"}>Recipe List</Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}