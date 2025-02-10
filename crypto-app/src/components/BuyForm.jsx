// src/components/BuyForm.jsx
import React, { useState, useEffect } from 'react';
import { fetchCryptos } from '../api/cryptoApi';

const BuyForm = () => {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadCryptos = async () => {
      try {
        const data = await fetchCryptos();
        setCryptos(data);
      } catch (error) {
        setError('Failed to load cryptos');
      }
    };

    loadCryptos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/acheter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
        },
        body: JSON.stringify({ idCrypto: selectedCrypto, valeur: parseFloat(value) }),
      });

      if (!response.ok) {
        throw new Error('Failed to buy crypto');
      }

      setSuccess(true);
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Buy Crypto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="crypto-select">Select Crypto:</label>
          <select
            id="crypto-select"
            value={selectedCrypto}
            onChange={(e) => setSelectedCrypto(e.target.value)}
          >
            <option value="" disabled>Select a crypto</option>
            {cryptos.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>{crypto.nom_cryptomonnaie}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="value">Value:</label>
          <input
            type="number"
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>
        <button type="submit">Buy</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Crypto bought successfully!</p>}
    </div>
  );
};

export default BuyForm;
