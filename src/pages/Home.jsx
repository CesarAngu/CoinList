import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
      );
      setCoins(response.data);
      setFilteredCoins(response.data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
    const filtered = coins.filter((coin) =>
      coin.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCoins(filtered);
  };

  const toggleSortOrder = () => {
    const sorted = [...filteredCoins].sort((a, b) => {
      if (sortAscending) {
        return a.current_price - b.current_price;
      } else {
        return b.current_price - a.current_price;
      }
    });
    setFilteredCoins(sorted);
    setSortAscending(!sortAscending);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Inicio - Lista de Criptos 🪙</h1>

      <input
        type="text"
        placeholder="Buscar criptomoneda..."
        value={searchText}
        onChange={handleSearch}
        style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
      />

      <button onClick={toggleSortOrder} style={{ marginBottom: "20px" }}>
        {sortAscending ? "⬇️ Ordenar Mayor Precio" : "⬆️ Ordenar Menor Precio"}
      </button>

      <ul>
        {filteredCoins.map((coin) => (
          <li key={coin.id} style={{ marginBottom: "10px" }}>
            <img
              src={coin.image}
              alt={coin.name}
              style={{ width: "25px", marginRight: "10px" }}
            />
            {coin.name} - ${coin.current_price.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
