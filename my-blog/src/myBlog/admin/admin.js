import axios from "axios";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AdminHeader } from "../admin/adminHeader";
import "./admin.css";
import { Blog } from "./blog/blog";
import { Blogs } from "./blog/blogs";
import { EditBlog } from "./blog/editBlog";
import { CategoryAdd } from "./category/categoryAdd";

export function Admin() {
  if (!localStorage.getItem("loginToken")) {
    return <Login />;
  }
  return (
    <>
      <AdminHeader />
      <Routes>
        <Route path={"/category"} element={<CategoryAdd />} />
        <Route path={"/blog"} element={<Blog />} />
        <Route path={"/blogs"} element={<Blogs />} />
        <Route path={"/edit/:id"} element={<EditBlog />} />
      </Routes>
    </>
  );
}

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function changePath() {
    navigate(`/register`);
  }

  function handleLogin() {
    axios
      .post("http://localhost:8000/users/login", { username, password })
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          const { token } = data;
          localStorage.setItem("loginToken", token);
          window.location.reload();
        }
      })
      .catch(({ response, code }) => {});
  }

  return (
    <div style={{ width: 200, margin: "2em auto" }}>
      <input
        className="form-control"
        placeholder="Хэрэглэгчийн нэр"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="form-control"
        placeholder="Нууц үг"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleLogin}>
        Нэвтрэх
      </button>
      <button onClick={changePath}>burtguuleh</button>
    </div>
  );
}
