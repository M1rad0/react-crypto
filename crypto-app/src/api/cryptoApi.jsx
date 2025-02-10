// src/api/cryptoApi.js
export async function fetchCryptos() {
    const response = await fetch('http://localhost:8000/api/cryptos'); // Replace with your actual endpoint
    if (!response.ok) {
        throw new Error('Failed to fetch cryptos');
    }
    return await response.json();
}  