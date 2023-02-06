import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

export function AdminHeader() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <NavLink to={"/admin"}>Admin</NavLink>
        <Nav className="me-auto">
          <NavLink to={"/admin/category"}>Angilal</NavLink>
          <NavLink to={"/admin/blog"}>Medee</NavLink>
          <NavLink to={"/admin/blogs"}>Medeenuud</NavLink>

          {/* <NavDropdown title="Medee" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
        </Nav>
        <Nav>
          <NavLink to={"/admin"}>Garah</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}
