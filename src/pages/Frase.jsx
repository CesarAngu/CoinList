import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Frase({ isDarkMode }) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://frasedeldia.azurewebsites.net/api/phrase");
      setQuote(res.data);
    } catch (error) {
      setQuote({ quote: "Error al obtener la frase 🥲", author: "🙏" });
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!quote) return;
    try {
      await navigator.share({
        title: "Frase del día",
        text: `"${quote.quote}" - ${quote.author}`,
      });
    } catch (err) {
      console.error("Error al compartir", err);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div style={{
      backgroundColor: isDarkMode ? "#121212" : "#f2f2f2",
      color: isDarkMode ? "#fff" : "#000",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: "20px",
    }}>
      {loading ? (
        <h2>Cargando frase...</h2>
      ) : (
        <div style={{
          backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "20px", fontStyle: "italic", marginBottom: "10px" }}>
            "{quote.quote}"
          </p>
          <p style={{ fontWeight: "bold", marginBottom: "20px" }}>
            - {quote.author}
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button
              onClick={fetchQuote}
              style={{
                backgroundColor: "#3498db",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                fontWeight: "bold",
              }}
            >
              📜 Nueva Frase
            </button>
            <button
              onClick={handleShare}
              style={{
                backgroundColor: "#2ecc71",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                fontWeight: "bold",
              }}
            >
              📤 Compartir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
