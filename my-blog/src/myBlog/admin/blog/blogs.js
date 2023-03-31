import axios from "axios";
import { useEffect, useState } from "react";
import { OneBlog } from "./oneBlog";

export function Blogs() {
  const [blogs, setBlogs] = useState([]);
  function loadBlog() {
    axios.get("http://localhost:8000/blog").then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setBlogs(data.list);
      } else {
        alert("Error");
      }
    });
  }

  useEffect(() => {
    loadBlog();
  }, []);

  return (
    <>
      <div>
        {blogs.map((blog) => (
          <OneBlog key={blog._id} blog={blog} load={loadBlog} />
        ))}
      </div>
    </>
  );
}
