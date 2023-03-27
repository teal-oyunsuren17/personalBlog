import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Admin } from "./myBlog/admin/admin";
import { Client } from "./myBlog/client/client";
import { Category } from "./myBlog/admin/category/category";
import { Blog } from "./myBlog/admin/blog/blog";
import { SingleBlog } from "./myBlog/client/singleBlog";
import { Blogs } from "./myBlog/admin/blog/blogs";
import { EditBlog } from "./myBlog/admin/blog/editBlog";
import { BlogOfCategory } from "./myBlog/client/blogOfCategory";
import { Register } from "./myBlog/Register";

export const UserContext = createContext("Guest");

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/admin/*"} element={<Admin />} />
          <Route path={"/admin/category"} element={<Category />} />
          <Route path={"/admin/blog"} element={<Blog />} />
          <Route path={"/admin/blogs"} element={<Blogs />} />
          <Route path={"/blog/:id"} element={<SingleBlog />} />
          <Route path={"/edit/:id"} element={<EditBlog />} />
          <Route path={"/register"} element={<Register />} />
          <Route
            path={"/blog/category/:categoryId"}
            element={<BlogOfCategory />}
          />
          <Route path={"*"} element={<Client />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
