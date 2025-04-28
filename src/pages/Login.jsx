import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      alert("✅ ¡Inicio de sesión exitoso!");
    } else {
      alert("❌ Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔒 Login</h1>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: "block", marginBottom: "10px", padding: "8px", width: "200px" }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "10px", padding: "8px", width: "200px" }}
      />
      <button onClick={handleLogin} style={{ padding: "10px 20px" }}>
        Iniciar sesión
      </button>
    </div>
  );
}
