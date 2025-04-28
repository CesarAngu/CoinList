import React from "react";

export default function Favorites({ favorites, setFavorites, isDarkMode }) {
  const removeFavorite = (coinId) => {
    const updatedFavorites = favorites.filter((coin) => coin.id !== coinId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (favorites.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: isDarkMode ? "#fff" : "#000" }}>
        <h2>⭐ No tienes criptos en favoritos todavía</h2>
        <p>Agrega tus monedas favoritas desde el Home.</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: isDarkMode ? "#121212" : "#fff", minHeight: "100vh", padding: "20px" }}>
      <h2 style={{ color: isDarkMode ? "#fff" : "#000", textAlign: "center", marginBottom: "20px" }}>
        ⭐ Mis Criptomonedas Favoritas
      </h2>

      {favorites.map((coin) => (
        <div
          key={coin.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: isDarkMode ? "#1e1e1e" : "#f9f9f9",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={coin.image}
              alt={coin.name}
              style={{ width: "30px", height: "30px" }}
            />
            <div>
              <strong style={{ color: isDarkMode ? "#fff" : "#000" }}>{coin.name}</strong>
              <div style={{ color: isDarkMode ? "#ccc" : "#555" }}>
                ${coin.current_price.toLocaleString()}
              </div>
            </div>
          </div>

          <button
            onClick={() => removeFavorite(coin.id)}
            style={{
              backgroundColor: "red",
              color: "#fff",
              padding: "5px 10px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}
