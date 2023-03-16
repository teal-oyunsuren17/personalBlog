import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

export function ClientHeader() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/category").then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setCategories(data);
      } else {
        alert("Error");
      }
    });
  }, []);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <NavLink to={"*"}>Home</NavLink>

        <Nav className="me-auto">
          {categories.map((category) => (
            <NavLink key={category._id} to={`/blog/${category.name}`}>
              {category.name}
            </NavLink>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
}
