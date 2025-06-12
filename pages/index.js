import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Home() {
  const [usdTry, setUsdTry] = useState("");
  const [onsUsd, setOnsUsd] = useState("");
  const [gramAltin, setGramAltin] = useState(null);
  const [history, setHistory] = useState([]);
  const [gramMiktari, setGramMiktari] = useState("");
  const [toplamDeger, setToplamDeger] = useState(null);

  const hesapla = () => {
    const usd = parseFloat(usdTry);
    const ons = parseFloat(onsUsd);

    if (!usd || !ons) {
      alert("Geçerli değerler giriniz.");
      return;
    }

    const gram = (ons / 31.10) * usd;
    setGramAltin(gram.toFixed(2));

    const zaman = new Date().toLocaleTimeString();
    setHistory((prev) => [...prev.slice(-9), { zaman, gram }]);
  };

  const hesaplaToplam = () => {
    const miktar = parseFloat(gramMiktari);
    const fiyat = parseFloat(gramAltin);
    if (!miktar || !fiyat) return;
    setToplamDeger((miktar * fiyat).toFixed(2));
  };

  const grafikData = {
    labels: history.map((h) => h.zaman),
    datasets: [
      {
        label: "Gram Altın (TL)",
        data: history.map((h) => h.gram),
        borderColor: "gold",
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ backgroundColor: "#111", color: "#fff", minHeight: "100vh", padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>Altın Hesaplayıcı (Manuel Giriş)</h1>

      <div style={{ maxWidth: "600px", margin: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <label>
          Dolar/TL Kuru:
          <input type="number" value={usdTry} onChange={(e) => setUsdTry(e.target.value)} style={inputStyle} />
        </label>

        <label>
          Ons Altın (USD):
          <input type="number" value={onsUsd} onChange={(e) => setOnsUsd(e.target.value)} style={inputStyle} />
        </label>

        <button onClick={hesapla} style={buttonStyle}>Gram Altın Hesapla</button>

        {gramAltin && (
          <p>
            📌 Hesaplanan Gram Altın Fiyatı: <strong>{gramAltin} TL</strong>
          </p>
        )}

        <hr />

        <label>
          Sahip Olduğun Gram Altın:
          <input type="number" value={gramMiktari} onChange={(e) => setGramMiktari(e.target.value)} style={inputStyle} />
        </label>

        <button onClick={hesaplaToplam} style={buttonStyle}>Toplam Değeri Hesapla</button>

        {toplamDeger && (
          <p>
            💰 Toplam Değer: <strong>{toplamDeger} TL</strong>
          </p>
        )}
      </div>

      {history.length > 0 && (
        <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
          <h2>📊 Gram Altın Fiyat Geçmişi</h2>
          <Line data={grafikData} />
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  marginTop: "0.25rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "0.5rem",
  backgroundColor: "#444",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
