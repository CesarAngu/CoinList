import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const { isDarkMode, toggleTheme } = useTheme();
  const [randomCoin, setRandomCoin] = useState(null);

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
      setCoins(res.data);
    } catch (error) {
      console.error("Error al traer las criptos", error);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const toggleSortOrder = () => {
    const sorted = [...coins].sort((a, b) =>
      sortAscending ? b.current_price - a.current_price : a.current_price - b.current_price
    );
    setCoins(sorted);
    setSortAscending(!sortAscending);
  };

  const toggleFavorite = (coin) => {
    const exists = favorites.some((fav) => fav.id === coin.id);
    const updatedFavorites = exists
      ? favorites.filter((fav) => fav.id !== coin.id)
      : [...favorites, coin];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const pickRandomCoin = () => {
    if (coins.length > 0) {
      const random = coins[Math.floor(Math.random() * coins.length)];
      setRandomCoin(random);
    }
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: isDarkMode ? "#121212" : "#f2f2f2", minHeight: "100vh", color: isDarkMode ? "#fff" : "#000" }}>
      <div style={{ padding: "20px" }}>
        <input
          type="text"
          placeholder="Buscar criptomoneda..."
          value={searchText}
          onChange={handleSearch}
          style={{
            padding: "10px",
            width: "100%",
            borderRadius: "10px",
            border: "1px solid #ccc",
            marginBottom: "10px",
            backgroundColor: isDarkMode ? "#333" : "#fff",
            color: isDarkMode ? "#fff" : "#000",
          }}
        />

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            onClick={toggleSortOrder}
            style={{
              flex: 1,
              backgroundColor: "#8e44ad",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
            }}
          >
            {sortAscending ? "🔽 Ordenar Mayor Precio" : "🔼 Ordenar Menor Precio"}
          </button>

          <button
            onClick={toggleTheme}
            style={{
              flex: 1,
              backgroundColor: isDarkMode ? "#555" : "#2196F3",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
            }}
          >
            {isDarkMode ? "🌞 Modo Claro" : "🌙 Modo Oscuro"}
          </button>

          <button
            onClick={pickRandomCoin}
            style={{
              flex: 1,
              backgroundColor: "#27ae60",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
            }}
          >
            🎲 Cripto Aleatoria
          </button>
        </div>

        {randomCoin && (
          <div style={{
            backgroundColor: isDarkMode ? "#333" : "#fff",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
            textAlign: "center"
          }}>
            <h3>{randomCoin.name}</h3>
            <p>${randomCoin.current_price.toLocaleString()}</p>
          </div>
        )}

        {filteredCoins.map((coin) => (
          <div key={coin.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={coin.image} alt={coin.name} style={{ width: "30px", height: "30px", marginRight: "10px" }} />
              <div>
                <div>{coin.name}</div>
                <div style={{ fontSize: "12px", color: isDarkMode ? "#ccc" : "#666" }}>
                  ${coin.current_price.toLocaleString()}
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleFavorite(coin)}
              style={{
                backgroundColor: favorites.some((fav) => fav.id === coin.id) ? "gold" : "gray",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                fontSize: "18px",
              }}
            >
              ⭐
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
