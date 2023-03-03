import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

export function ClientBlog() {
  const [blog, setBlog] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get("page");

  useEffect(() => {
    axios.get(`http://localhost:8000/blog?page=${page}`).then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setBlog(data);
      } else {
        alert("Error");
      }
    });
  }, [page]);

  function readOneBlog(id) {
    navigate(`/blog/${id}`);
  }
  return (
    <>
      <div className="d-flex gap-5 flex-wrap justify-content-evenly">
        {blog.map((blog) => (
          <Card key={blog.categoryId} style={{ width: "25rem" }}>
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
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          {[1, 2, 3, 4, 5].map((page) => (
            <Link to={`?page=${page}`}>
              <Pagination.Item>{page}</Pagination.Item>
            </Link>
          ))}

          <Pagination.Ellipsis disabled />
          <Pagination.Item>{9}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </>
  );
}
