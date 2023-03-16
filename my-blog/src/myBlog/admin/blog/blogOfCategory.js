import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { ClientHeader } from "../../client/clientHeader";

export function BlogOfCategory() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8000/blog/${categoryId}`).then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setBlogs(data);
      } else {
        alert("Error");
      }
    });
  }, [blogs]);

  function changePath(id) {
    navigate(`/blog/${id}`);
  }
  if (!blogs) return <div>Loading...</div>;
  return (
    <>
      <ClientHeader />
      <div className="d-flex flex-wrap gap-5">
        {blogs.map((blog) => (
          <Card key={blog.id} style={{ width: "40rem", textAlign: "center" }}>
            <Card.Img variant="top" src={blog.picture} />
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Button
                variant="primary"
                onClick={() => {
                  changePath(blog._id);
                }}
              >
                Мэдээг унших уу?
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}
