import { useState } from "react";
import axios from "axios";

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    axios
      .post(`http://localhost:8000/users/register`, {
        username,
        password,
      })
      .then((res) => {
        const { data, status } = res;
      })
      .catch(({ response, code }) => {
        const { data } = response;
        alert(data.message);
      });
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
