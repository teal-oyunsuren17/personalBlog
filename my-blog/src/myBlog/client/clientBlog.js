import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useBlog } from "../admin/blog/useBlog";

const size = 1;

export function ClientBlog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryId, setCategoryId] = useState();
  const [pages, setPages] = useState();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const { list, count } = useBlog(page, size, categoryId);
  const navigate = useNavigate();

  useEffect(() => {
    if (count) {
      setPages(Math.ceil(count / size));
    }
  }, [count]);

  useEffect(() => {
    setSearchParams({ page: 1 });
  }, [categoryId]);

  function readOneBlog(id) {
    navigate(`/blog/${id}`);
  }
  return (
    <>
      <div className="d-flex gap-5 flex-wrap justify-content-evenly">
        {list.map((blog) => (
          <Card key={blog._id} style={{ width: "25rem" }}>
            <Card.Img variant="top" src={blog.picture.path} height="250px" />
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title>{blog.title}</Card.Title>
              <Button onClick={() => readOneBlog(blog._id)} variant="primary">
                Мэдээг унших
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <nav
        aria-label="Page navigation example"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "30px",
        }}
      >
        <ul className="pagination" style={{ flexWrap: "wrap" }}>
          {page !== 1 && (
            <li className="page-item">
              <Link to={`?page=${page - 1}`} className="page-link">
                Өмнөх
              </Link>
            </li>
          )}

          {[...Array(pages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${page == index + 1 ? "active" : ""}`}
            >
              <Link to={`?page=${index + 1}`} className="page-link">
                {index + 1}
              </Link>
            </li>
          ))}

          {page !== pages && (
            <li className="page-item">
              <Link to={`?page=${page + 1}`} className="page-link">
                Дараах
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
