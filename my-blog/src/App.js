import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Admin } from "./myBlog/admin/admin";
import { Client } from "./myBlog/client/client";
import { Register } from "./myBlog/Register";

export const UserContext = createContext("Guest");

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/admin/*"} element={<Admin />} />
          <Route path={"*"} element={<Client />} />
          <Route path={"/register"} element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
