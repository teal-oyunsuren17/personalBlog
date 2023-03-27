import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminHeader } from "../admin/adminHeader";
import "./admin.css";

export function Admin() {
  if (!localStorage.getItem("loginToken")) {
    return <Login />;
  }
  return (
    <>
      <AdminHeader />
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
