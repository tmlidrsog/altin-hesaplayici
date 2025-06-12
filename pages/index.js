import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Home() {
  const [usdData, setUsdData] = useState([]);
  const [goldData, setGoldData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
  try {
    const usdRes = await axios.get("https://api.exchangerate.host/latest?base=USD&symbols=TRY");
    const goldRes = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=try");

    const now = new Date().toLocaleTimeString();
    const usd = usdRes.data?.rates?.TRY;
    const goldUsd = 2350; // Ons altın fiyatını manuel koyduk (USD cinsinden)

    if (!usd) {
      setError("Dolar verisi alınamadı.");
      return;
    }

    setUsdData((prev) => [...prev.slice(-9), usd]);
    setGoldData((prev) => [...prev.slice(-9), goldUsd]);
    setLabels((prev) => [...prev.slice(-9), now]);
    setError(null);
  } catch (err) {
    setError("Veri çekme hatası: " + err.message);
  }
};


  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const usdChart = {
    labels,
    datasets: [
      {
        label: "USD/TRY",
        data: usdData,
        borderColor: "lime",
        tension: 0.4,
      },
    ],
  };

  const goldChart = {
    labels,
    datasets: [
      {
        label: "Ons Altın (USD)",
        data: goldData,
        borderColor: "gold",
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ backgroundColor: "#111", color: "#fff", minHeight: "100vh", padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>Altın Hesaplayıcı</h1>

      {error ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : (
        <div style={{ maxWidth: "800px", margin: "auto" }}>
          <h2>Dolar/TL</h2>
          <Line data={usdChart} />
          <h2 style={{ marginTop: "2rem" }}>Ons Altın (USD)</h2>
          <Line data={goldChart} />
        </div>
      )}
    </div>
  );
}
