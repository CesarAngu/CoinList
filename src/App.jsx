import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Frase from "./pages/Frase";

export default function App() {
    return (
      <>
        <nav style={{ display: "flex", justifyContent: "space-around", padding: "10px", background: "#eee" }}>
          <Link to="/">🏠 Inicio</Link>
          <Link to="/favorites">⭐ Favoritos</Link>
          <Link to="/login">🔐 Login</Link>
          <Link to="/frase">🧠 Frase</Link>
        </nav>
  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/frase" element={<Frase />} />
        </Routes>
      </>
    );
  }
  
