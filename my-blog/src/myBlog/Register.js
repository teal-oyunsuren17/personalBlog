import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    axios
      .post(`http://localhost:8000/users/register`, {
        username,
        password,
      })
      .then((res) => {
        const { data, status } = res;
        if (status === 201) {
          alert("amjilttai burtgegdlee");
          navigate("/admin");
        }
      })
      .catch(({ response, code }) => {
        const { data } = response;
        alert(data.message);
      });
    setUsername("");
    setPassword("");
  }

  return (
    <div style={{ width: 200, margin: "2em auto" }}>
      <input
        placeholder="Hereglegchiin ner"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Nuuts ug"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Burtguuleh</button>
    </div>
  );
}
