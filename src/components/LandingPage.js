import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';


function LandingPage() {
    return (
      <div className="LandingPage">
        <header>
          <div className="container">
            <h1>Stock Analyzer</h1>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </nav>
          </div>
        </header>
  
        <section className="hero">
          <div className="container">
            <h2>Analyze Stocks with Ease</h2>
            <p>A comprehensive tool to help you analyze stock performance and make informed decisions.</p>
            <Link to="/main"><button>Get Started</button></Link>
          </div>
        </section>
  
        <section className="features">
          <div className="container">
            <h2>Features</h2>
            <div className="feature-list">
              <div className="feature">
                <h3>Real-time Data</h3>
                <p>Access the latest stock data in real-time.</p>
              </div>
              <div className="feature">
                <h3>Comprehensive Analysis</h3>
                <p>Get detailed analysis and insights on stock performance.</p>
              </div>
              <div className="feature">
                <h3>Customizable Filters</h3>
                <p>Filter stocks based on your own criteria.</p>
              </div>
              <div className="feature">
                <h3>Email Reports</h3>
                <p>Receive analysis reports directly to your email.</p>
              </div>
            </div>
          </div>
        </section>
  
        <section className="how-it-works">
          <div className="container">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <h3>Step 1</h3>
                <p>Select the stock index you want to analyze.</p>
              </div>
              <div className="step">
                <h3>Step 2</h3>
                <p>Enter the percentage for filtering stocks.</p>
              </div>
              <div className="step">
                <h3>Step 3</h3>
                <p>Choose the companies for further analysis.</p>
              </div>
              <div className="step">
                <h3>Step 4</h3>
                <p>Get detailed reports and insights.</p>
              </div>
            </div>
          </div>
        </section>
  
        <section className="testimonials">
          <div className="container">
            <h2>What Our Users Say</h2>
            <div className="testimonial-list">
              <div className="testimonial">
                <p>"This tool has transformed how I analyze stocks. Highly recommended!"</p>
                <p><strong>- John Doe</strong></p>
              </div>
              <div className="testimonial">
                <p>"Accurate data and insightful analysis. A must-have for any investor."</p>
                <p><strong>- Jane Smith</strong></p>
              </div>
            </div>
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
  
  export default LandingPage;