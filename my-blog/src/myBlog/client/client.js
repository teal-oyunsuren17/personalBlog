import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import parse from "html-react-parser";

export function Client() {
  const [blog, setBlog] = useState([]);
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

  return (
    <>
      {/* <div>
      {blog.map((blog) => (
      <div>{blog.}</div>
      ))}
     
    </div> */}
      <div className="d-flex gap-5">
        {blog.map((blog) => (
          <Card key={blog.id} style={{ width: "25rem" }}>
            {/* <Card.Img variant="top" src="" /> */}
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Text>{parse(blog.text)}</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}
