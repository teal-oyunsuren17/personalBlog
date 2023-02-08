import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import Badge from "react-bootstrap/Badge";
import { ClientHeader } from "../../client/clientHeader";

export function SingleBlog() {
  const { id } = useParams();
  const [oneBlog, setOneBlog] = useState();

  useEffect(() => {
    axios.get(`http://localhost:8000/blog/${id}`).then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setOneBlog(data);
      } else {
        alert("Error");
      }
    });
  }, []);
  if (!oneBlog) return <div>Loading...</div>;
  return (
    <>
      <ClientHeader />
      <div className="text-center">
        <Badge bg="primary">{oneBlog.category.title}</Badge>{" "}
        <div>
          <img style={{ height: "300px" }} src={oneBlog.picture} alt="" />
        </div>
        <h1>{oneBlog.title}</h1>
        <div>{parse(oneBlog.text)}</div>
      </div>
    </>
  );
}
