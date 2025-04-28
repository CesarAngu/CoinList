import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Frase() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://frasedeldia.azurewebsites.net/api/phrase");
      setQuote(res.data);
    } catch (err) {
      setQuote({ quote: "Error al obtener la frase", author: "🙏" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>🧠 Frase del Día</h1>
      {loading ? (
        <p>Cargando frase...</p>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <p style={{ fontStyle: "italic" }}>"{quote.quote}"</p>
          <p style={{ fontWeight: "bold", marginTop: "10px" }}>- {quote.author}</p>
        </div>
      )}
      <button onClick={fetchQuote} style={{ marginTop: "20px", padding: "10px 20px" }}>
        🔄 Nueva Frase
      </button>
    </div>
  );
}
