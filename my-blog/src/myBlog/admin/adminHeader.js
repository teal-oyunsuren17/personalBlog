import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    axios
      .get(
        `http://localhost:8000/login?username=${username}&password=${password}`
      )
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          const { token } = data;
          localStorage.setItem("loginToken", token);
          window.location.reload();
        }
      })
      .catch(({ response, code }) => {
        if (response.status === 401) {
          alert("Nuuts ug buruu baina");
        } else {
          alert(code);
        }
      });
  }
}
export function AdminHeader() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <NavLink to={"/admin"}>Admin</NavLink>
        <Nav className="me-auto">
          <NavLink to={"/admin/category"}>Angilal</NavLink>
          <NavLink to={"/admin/blog"}>Medee</NavLink>
          <NavLink to={"/admin/blogs"}>Medeenuud</NavLink>
        </Nav>
        <Nav>
          <NavLink to={"/"}>Garah</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}
