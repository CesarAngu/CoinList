import React, { useState, useEffect } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  };

  const removeFavorite = (coinId) => {
    const updated = favorites.filter((fav) => fav.id !== coinId);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>⭐ Mis Criptomonedas Favoritas</h1>

      {favorites.length === 0 ? (
        <p>No tienes criptomonedas favoritas aún.</p>
      ) : (
        <ul>
          {favorites.map((coin) => (
            <li key={coin.id} style={{ marginBottom: "10px" }}>
              <img
                src={coin.image}
                alt={coin.name}
                style={{ width: "25px", marginRight: "10px" }}
              />
              {coin.name} - ${coin.current_price.toLocaleString()}
              <button
                onClick={() => removeFavorite(coin.id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
