import axios from "axios";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export function AdminHeader() {
  function logout() {
    localStorage.removeItem("loginToken");
    window.location.reload();
  }
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
          {/* <NavLink to={"/"}>Garah</NavLink> */}
          <button onClick={logout}>garah</button>
        </Nav>
      </Container>
    </Navbar>
  );
}
