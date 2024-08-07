import React, { useState } from 'react';
import axios from 'axios';
import './Main.css';

function MainPage() {
  const [indices, setIndices] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [percentage, setPercentage] = useState('');
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [applyEMA, setApplyEMA] = useState(false);
  const [applyMMA, setApplyMMA] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleGetIndices = () => {
    axios.get('http://localhost:5000/api/getindices') // Ensure this matches your backend URL
      .then(response => {
        setIndices(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the indices!', error);
      });
  };

  const handleGetStocks = () => {
    if (selectedIndex && percentage) {
      setLoading(true); // Start loading
      axios.get(`http://localhost:5000/api/stocks/${selectedIndex}/${percentage}`) // Ensure this matches your backend URL
        .then(response => {
          setStocks(response.data);
          console.log(stocks);
          console.log(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the stocks!', error);
        })
        .finally(() => {
          setLoading(false); // End loading
        });
    } else {
      alert('Please select an index and enter a percentage.');
    }
  };

  const handleSelectStock = (symbol) => {
    if (selectedStocks.includes(symbol)) {
      setSelectedStocks(selectedStocks.filter(stock => stock !== symbol));
    } else {
      setSelectedStocks([...selectedStocks, symbol]);
    }
  };

  const handleSelectAllStocks = () => {
    if (selectedStocks.length === stocks.length) {
      setSelectedStocks([]);
    } else {
      setSelectedStocks(stocks.map(stock => stock.symbol));
    }
  };

  const handleApplyIndicators = async () => {
    const indicators = [];
    if (applyEMA) indicators.push('EMA');
    if (applyMMA) indicators.push('MMA');
  
    if (indicators.length === 0) {
      alert('Please select at least one indicator.');
      return;
    }
  
    if (selectedStocks.length === 0) {
      alert('Please select at least one stock.');
      return;
    }
  
    try {
      const queryString = new URLSearchParams({
        stockList: JSON.stringify(selectedStocks),
        period: 10,
        calculateEMAFlag: applyEMA,
        calculateMMAFlag: applyMMA,
      }).toString();
  
      const response = await fetch(`http://localhost:5000/api/stocks/indicators?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Response Status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error Response:', errorText);
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('There was an error applying the indicators. Please try again later.');
    }
  };
  
  
  const handleSendEmail = () => {
    if (!email) {
      alert('Please enter an email address.');
      return;
    }
    if (!selectedIndex) {
      alert('Please select a category.');
      return;
    }
  
    // Send the request to the backend
    axios.get(`http://localhost:5000/api/stocks/report/${selectedIndex}/${email}`)
      .then(response => {
        alert('Email sent successfully!');
        setEmailSent(true);
      })
      .catch(error => {
        console.error('There was an error sending the email!', error);
        alert('There was an error sending the email. Please try again later.');
      });
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
          <h2>Main Functionality</h2>
          <div className="form-container">
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
          </div>

          {loading && <p className="loading-message">Loading... Please wait, it may take some time.</p>}

          {stocks.length > 0 && (
            <>
              <div className="indicators">
                <h3>Apply Indicators</h3>
                <label>
                  <input
                    type="checkbox"
                    checked={applyEMA}
                    onChange={() => setApplyEMA(!applyEMA)}
                  />
                  EMA
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={applyMMA}
                    onChange={() => setApplyMMA(!applyMMA)}
                  />
                  MMA
                </label>
                <button onClick={handleApplyIndicators}>Apply Indicators</button>
              </div>

              <div className="stocks-list">
                <h3>Stocks Below {percentage}%</h3>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          onChange={handleSelectAllStocks}
                          checked={selectedStocks.length === stocks.length}
                        />
                      </th>
                      <th>Index</th>
                      <th>Stock Symbol</th>
                      <th>Current Price</th>
                      <th>Highest Price</th>
                      <th>Percentage</th>
                      {applyEMA ? <th>EMA</th> : null}
                      {applyMMA ? <th>MMA</th> : null}
                      <th>Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocks.map((stock, index) => {
                      const diffPercentage = ((stock.allTimeHigh - stock.currentPrice) / stock.currentPrice) * 100;
                      return (
                        <tr key={stock.symbol}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedStocks.includes(stock.symbol)}
                              onChange={() => handleSelectStock(stock.symbol)}
                            />
                          </td>
                          <td>{index + 1}</td>
                          <td>{stock.symbol}</td>
                          <td>{stock.currentPrice}</td>
                          <td>{stock.allTimeHigh}</td>
                          <td>{diffPercentage.toFixed(2)}%</td>
                          {applyEMA ? <td>{stock.ema}</td> : null}
                          {applyMMA ? <td>{stock.mma}</td> : null}
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

              {!emailSent && (
                <div className="email-section">
                  <h3>Send Data via Email</h3>
                  <div className="form-group">
                    <label htmlFor="email">Enter Email:</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button onClick={handleSendEmail}>Send Email</button>
                </div>
              )}
            </>
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
