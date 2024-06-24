import React, { useState } from 'react';
import axios from 'axios';
import './Main.css';

function MainPage() {
  const [indices, setIndices] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [percentage, setPercentage] = useState('');
  const [stocks, setStocks] = useState([]);

  const handleGetIndices = () => {
    axios.get('http://localhost:5000/api/getindices')
      .then(response => {
        setIndices(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the indices!', error);
      });
  };

  const handleGetStocks = () => {
    if (selectedIndex && percentage) {
      axios.get(`http://localhost:5000/api/stocks/${selectedIndex}/${percentage}`)
        .then(response => {
          setStocks(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the stocks!', error);
        });
    } else {
      alert('Please select an index and enter a percentage.');
    }
  };

  return (
    <div className="MainPage">
      <header>
        <div className="container">
          <h1>Stock Analyzer - Main Page</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="main-content">
        <div className="container">
          <h2>Analyzer</h2>
          <div className="form-group">
            <label htmlFor="index">Select Index:</label>
            <button onClick={handleGetIndices}>Get Indices</button>
            <select
              id="index"
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(e.target.value)}
              disabled={indices.length === 0}
            >
              <option value="">Select an index</option>
              {indices.map((index) => (
                <option key={index} value={index}>
                  {index}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="percentage">Enter Percentage:</label>
            <input
              id="percentage"
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
          </div>
          <button onClick={handleGetStocks}>Get Stocks</button>

          {stocks.length > 0 && (
            <div className="stocks-list">
              <h3>Stocks Below {percentage}%</h3>
              <table>
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Stock Symbol</th>
                    <th>Current Price</th>
                    <th>Highest Price</th>
                    <th>Percentage</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((stock, index) => {
                    const diffPercentage = ((stock.allTimeHigh - stock.currentPrice) / stock.currentPrice) * 100;
                    return (
                      <tr key={stock.symbol}>
                        <td>{index + 1}</td>
                        <td>{stock.symbol}</td>
                        <td>{stock.currentPrice}</td>
                        <td>{stock.allTimeHigh}</td>
                        <td>{diffPercentage.toFixed(2)}%</td>
                        <td>
                          <a href={`https://finance.yahoo.com/quote/${stock.symbol}.NS`} target="_blank" rel="noopener noreferrer">
                            Yahoo Finance
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; 2024 Stock Analyzer. All rights reserved.</p>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;
