import axios from "axios";
import { useEffect, useState } from "react";
import { AdminHeader } from "../adminHeader";

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

  function editBlog() {}

  function deleteBlog() {
    if (window.confirm("ustgah uu? ")) {
      axios
        .delete(`http://localhost:8000/blog/${blogs.id}`)
        .then((res) => loadBlog());
    }
  }
  return (
    <>
      <AdminHeader />
      <div>
        {blogs.map((blog) => (
          <div key={blog.id} className={"d-flex flex-row gap-5"}>
            <p>{blog.id}</p>
            <p>{blog.title}</p>
            <button onClick={editBlog}>edit</button>
            <button onClick={deleteBlog}>delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
