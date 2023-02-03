import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Admin } from "./myBlog/admin/admin";
import { Client } from "./myBlog/client/client";
import { Category } from "./myBlog/admin/category/category";
import { Blog } from "./myBlog/admin/blog/blog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/admin/*"} element={<Admin />} />
          <Route path={"/admin/category"} element={<Category />} />
          <Route path={"/admin/blog"} element={<Blog />} />
          <Route path={"*"} element={<Client />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
