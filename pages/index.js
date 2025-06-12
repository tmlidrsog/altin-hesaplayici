import React, { useState } from 'react';

export default function Home() {
  const [dolar, setDolar] = useState('');
  const [ons, setOns] = useState('');
  const [altinGram, setAltinGram] = useState(null);

  const hesapla = () => {
    const dolarNum = parseFloat(dolar);
    const onsNum = parseFloat(ons);
    if (!isNaN(dolarNum) && !isNaN(onsNum)) {
      const sonuc = (onsNum / 31.1035) * dolarNum;
      setAltinGram(sonuc.toFixed(2));
    } else {
      setAltinGram(null);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Altın Hesaplayıcı</h1>
      
      <div style={styles.inputGroup}>
        <label>Dolar/TL Kuru:</label>
        <input
          type="number"
          value={dolar}
          onChange={(e) => setDolar(e.target.value)}
          style={styles.input}
          placeholder="Örn: 32.5"
        />
      </div>

      <div style={styles.inputGroup}>
        <label>Ons Altın (USD):</label>
        <input
          type="number"
          value={ons}
          onChange={(e) => setOns(e.target.value)}
          style={styles.input}
          placeholder="Örn: 2300"
        />
      </div>

      <button onClick={hesapla} style={styles.button}>Hesapla</button>

      {altinGram && (
        <div style={styles.result}>
          <strong>1 gram altın (TL):</strong> {altinGram}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif'
  },
  title: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333'
  },
  inputGroup: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginTop: '5px'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '10px'
  },
  result: {
    marginTop: '20px',
    fontSize: '18px',
    textAlign: 'center'
  }
};
