import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

export function Client() {
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8000/blog").then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setBlog(data);
      } else {
        alert("Error");
      }
    });
  }, []);

  function readOneBlog(id) {
    navigate(`/blog/${id}`);
  }

  return (
    <>
      <div className="d-flex gap-5 flex-wrap justify-content-evenly">
        {blog.map((blog) => (
          <Card key={blog.id} style={{ width: "25rem" }}>
            <Card.Img variant="top" src={blog.picture} />
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title>{blog.title}</Card.Title>
              <Button onClick={() => readOneBlog(blog.id)} variant="primary">
                Мэдээг унших
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}
