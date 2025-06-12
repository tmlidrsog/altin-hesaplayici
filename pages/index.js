import { useState } from "react";
import Script from "next/script";

export default function Home() {
  const [usdTry, setUsdTry] = useState(32.5);
  const [xauUsd, setXauUsd] = useState(2300);
  const [gramGold, setGramGold] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const handleCalculate = () => {
    const gramPrice = (xauUsd / 31.1035) * usdTry;
    setTotalValue((gramGold * gramPrice).toFixed(2));
  };

  return (
    <div style={{ backgroundColor: "#111", color: "#fff", minHeight: "100vh", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "2rem" }}>💰 Altın Hesaplayıcı</h1>

      {/* Dolar/TL Grafiği */}
      <section>
        <h2>💵 Dolar/TL Grafiği</h2>
        <div className="tradingview-widget-container" id="usdtry_widget"></div>
        <Script src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js" strategy="lazyOnload">
          {`
          {
            "symbol": "FX_IDC:USDTRY",
            "width": "100%",
            "height": "200",
            "locale": "tr",
            "colorTheme": "dark",
            "isTransparent": false,
            "autosize": true
          }
          `}
        </Script>
      </section>

      <hr style={{ margin: "2rem 0", borderColor: "#444" }} />

      {/* Ons Altın Grafiği */}
      <section>
        <h2>🥇 Ons Altın (XAU/USD) Grafiği</h2>
        <div className="tradingview-widget-container" id="xauusd_widget"></div>
        <Script src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js" strategy="lazyOnload">
          {`
          {
            "symbol": "OANDA:XAUUSD",
            "width": "100%",
            "height": "200",
            "locale": "tr",
            "colorTheme": "dark",
            "isTransparent": false,
            "autosize": true
          }
          `}
        </Script>
      </section>

      <hr style={{ margin: "2rem 0", borderColor: "#444" }} />

      {/* Manuel Giriş ve Hesaplama */}
      <section>
        <h2>📝 Manuel Veri Girişi</h2>
        <div style={{ marginBottom: "1rem" }}>
          <label>Dolar/TL: </label>
          <input type="number" value={usdTry} onChange={(e) => setUsdTry(parseFloat(e.target.value))} style={inputStyle} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Ons Altın ($): </label>
          <input type="number" value={xauUsd} onChange={(e) => setXauUsd(parseFloat(e.target.value))} style={inputStyle} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Gram Altın Miktarı: </label>
          <input type="number" value={gramGold} onChange={(e) => setGramGold(parseFloat(e.target.value))} style={inputStyle} />
        </div>
        <button onClick={handleCalculate} style={buttonStyle}>Toplam Değeri Hesapla</button>

        {totalValue > 0 && (
          <p style={{ marginTop: "1rem", fontSize: "1.2rem", color: "#0f0" }}>
            💸 Toplam TL Karşılığı: <strong>{totalValue} TL</strong>
          </p>
        )}
      </section>
    </div>
  );
}

const inputStyle = {
  marginLeft: "1rem",
  padding: "0.4rem",
  backgroundColor: "#222",
  border: "1px solid #555",
  color: "#fff",
  borderRadius: "4px",
};

const buttonStyle = {
  padding: "0.6rem 1.2rem",
  backgroundColor: "#0f0",
  color: "#000",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold"
};
import React, { useState } from 'react';

export default function Home() {
  const [dolar, setDolar] = useState('');
  const [ons, setOns] = useState('');
  const [gramAltin, setGramAltin] = useState('');
  const [geceModu, setGeceModu] = useState(true);

  const hesapla = () => {
    if (!dolar || !ons) return '';
    const dolarFloat = parseFloat(dolar.replace(',', '.'));
    const onsFloat = parseFloat(ons.replace(',', '.'));
    return ((onsFloat / 31.1035) * dolarFloat).toFixed(2);
  };

  const toplamDeger = () => {
    const gramFiyat = parseFloat(hesapla());
    const gramMiktar = parseFloat(gramAltin.replace(',', '.'));
    if (isNaN(gramFiyat) || isNaN(gramMiktar)) return '';
    return (gramFiyat * gramMiktar).toFixed(2);
  };

  const themeClass = geceModu ? 'dark' : '';

  return (
    <div className={`${themeClass}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-8">
        <div className="max-w-xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Altın Hesaplayıcı</h1>
            <button
              className="px-3 py-1 rounded bg-gray-700 text-white text-sm"
              onClick={() => setGeceModu(!geceModu)}
            >
              {geceModu ? 'Gündüz Modu' : 'Gece Modu'}
            </button>
          </div>

          <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <div>
              <label>Dolar/TL Kuru:</label>
              <input
                type="text"
                value={dolar}
                onChange={(e) => setDolar(e.target.value)}
                className="mt-1 block w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 focus:outline-none"
              />
            </div>

            <div>
              <label>Ons Altın ($):</label>
              <input
                type="text"
                value={ons}
                onChange={(e) => setOns(e.target.value)}
                className="mt-1 block w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 focus:outline-none"
              />
            </div>

            <div className="font-semibold text-lg">
              🧮 Gram Altın Fiyatı: {hesapla()} TL
            </div>
          </div>

          <div className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold">Toplam Değer Hesaplama</h2>
            <div>
              <label>Sahip Olduğun Gram Altın:</label>
              <input
                type="text"
                value={gramAltin}
                onChange={(e) => setGramAltin(e.target.value)}
                className="mt-1 block w-full px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 focus:outline-none"
              />
            </div>
            <div className="font-semibold text-lg">
              💰 Toplam TL Karşılığı: {toplamDeger()} TL
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow text-center text-sm text-gray-500">
            Verileri manuel girebilirsiniz. Grafik bileşenleri yakında eklenecektir.
          </div>
        </div>
      </div>
    </div>
  );
}
