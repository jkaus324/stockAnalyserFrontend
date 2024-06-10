// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

const API_URL = 'http://localhost:5000'; // Adjust this URL based on your backend setup

const App = () => {
  const [index, setIndex] = useState('');
  const [percentage, setPercentage] = useState('');
  const [stocks, setStocks] = useState([]);

  const handleFetchStocks = async (index, percentage) => {
    try {
      const response = await axios.get(`${API_URL}/stocks/${index}/${percentage}`);
      setStocks(response.data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFetchStocks(index, percentage);
  };

  return (
    <div>
      <h1>Stock Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="index">Select Index:</label>
          <select id="index" value={index} onChange={(e) => setIndex(e.target.value)} required>
            <option value="">--Select--</option>
            <option value="NIFTY">NIFTY</option>
            <option value="SENSEX">SENSEX</option>
            {/* Add more indices as needed */}
          </select>
        </div>
        <div>
          <label htmlFor="percentage">Percentage:</label>
          <input
            type="number"
            id="percentage"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Calculate</button>
      </form>
      {stocks.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>All Time High</th>
              <th>Current Price</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.symbol}>
                <td>{stock.symbol}</td>
                <td>{stock.allTimeHigh}</td>
                <td>{stock.currentPrice}</td>
                <td>{stock.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
