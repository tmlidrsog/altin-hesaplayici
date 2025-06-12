import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Switch } from "@/components/ui/switch";

const fetchLivePrices = async () => {
  const res = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=TRY");
  const data = await res.json();
  const dolarTl = data.rates.TRY;

  const resGold = await fetch("https://api.metals.live/v1/spot");
  const goldData = await resGold.json();
  const onsAltin = goldData[0].gold;

  return { dolarTl, onsAltin };
};

export default function AltinHesaplayici() {
  const [dolarTl, setDolarTl] = useState(0);
  const [onsAltin, setOnsAltin] = useState(0);
  const [gramAltin, setGramAltin] = useState(0);
  const [gramMiktar, setGramMiktar] = useState(0);
  const [toplamDeger, setToplamDeger] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [history, setHistory] = useState([]);

  const fetchData = async () => {
    const { dolarTl, onsAltin } = await fetchLivePrices();
    setDolarTl(dolarTl);
    setOnsAltin(onsAltin);
    const gram = (onsAltin / 31.1035) * dolarTl;
    setGramAltin(gram);

    setHistory((prev) => [
      ...prev.slice(-9),
      {
        time: new Date().toLocaleTimeString(),
        dolarTl,
        onsAltin,
      },
    ]);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // 60 saniyede bir güncelle
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setToplamDeger(gramAltin * gramMiktar);
  }, [gramMiktar, gramAltin]);

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen p-4" : "bg-white text-black min-h-screen p-4"}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Altın Hesaplayıcı</h1>
        <div className="flex items-center gap-2">
          <span>🌙</span>
          <Switch checked={darkMode} onCheckedChange={() => setDarkMode(!darkMode)} />
          <span>☀️</span>
        </div>
      </div>

      <Card className="mb-4">
        <CardContent className="p-4 space-y-2">
          <p>Canlı Dolar/TL: {dolarTl.toFixed(2)}</p>
          <p>Canlı Ons Altın: {onsAltin.toFixed(2)} $</p>
          <p>Hesaplanan Gram Altın: {gramAltin.toFixed(2)} TL</p>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              placeholder="Gram altın miktarı"
              value={gramMiktar}
              onChange={(e) => setGramMiktar(parseFloat(e.target.value) || 0)}
            />
            <Button onClick={() => setToplamDeger(gramMiktar * gramAltin)}>Hesapla</Button>
          </div>
          <p className="mt-2">Toplam Değer: {toplamDeger.toFixed(2)} TL</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-2">Canlı Fiyat Grafiği</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={history}>
              <XAxis dataKey="time" stroke={darkMode ? "white" : "black"} />
              <YAxis stroke={darkMode ? "white" : "black"} />
              <Tooltip />
              <Line type="monotone" dataKey="dolarTl" stroke="#00bcd4" name="Dolar/TL" />
              <Line type="monotone" dataKey="onsAltin" stroke="#ff9800" name="Ons Altın" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
