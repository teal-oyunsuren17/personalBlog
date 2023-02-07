import axios from "axios";
import { useEffect, useState } from "react";
import { AdminHeader } from "../adminHeader";
import { OneBlog } from "./oneBlog";

export function Blogs() {
  const [blogs, setBlogs] = useState([]);
  function loadBlog() {
    axios.get("http://localhost:8000/blog").then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setBlogs(data);
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
      <AdminHeader />
      <div>
        {blogs.map((blog) => (
          <OneBlog key={blog.id} blog={blog} load={loadBlog} />
        ))}
      </div>
    </>
  );
}
