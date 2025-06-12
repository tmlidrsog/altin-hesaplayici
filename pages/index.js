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

  const fetchData = async () => {
    try {
      // Replace these with actual API calls if available
      const usdRes = await axios.get("https://api.exchangerate.host/latest?base=USD&symbols=TRY");
      const goldRes = await axios.get("https://api.metalpriceapi.com/v1/latest?base=USD&currencies=XAU&apikey=demo");

      const now = new Date().toLocaleTimeString();

      setUsdData((prev) => [...prev.slice(-9), usdRes.data.rates.TRY]);
      setGoldData((prev) => [...prev.slice(-9), goldRes.data.rates.XAU]);
      setLabels((prev) => [...prev.slice(-9), now]);
    } catch (err) {
      console.error("Veri çekme hatası:", err.message);
    }
  };

  useEffect(() => {
    fetchData(); // sayfa açılır açılmaz
    const interval = setInterval(fetchData, 10000); // her 10 saniyede bir
    return () => clearInterval(interval); // bileşen yok olunca durdur
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
      <div style={{ maxWidth: "800px", margin: "auto" }}>
        <h2>Dolar/TL</h2>
        <Line data={usdChart} />
        <h2 style={{ marginTop: "2rem" }}>Ons Altın (USD)</h2>
        <Line data={goldChart} />
      </div>
    </div>
  );
}
