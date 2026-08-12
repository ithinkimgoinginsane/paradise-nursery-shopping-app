import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <h1 className="landing-title">Paradise Nursery</h1>
          <p className="landing-description">
            Where Green Meets Serenity. Discover our curated collection of indoor plants to transform your space.
          </p>
          <button className="get-started-btn" onClick={handleGetStarted}>
            Get Started
          </button>
          <div style={{ marginTop: '40px', maxWidth: '800px' }}>
            <AboutUs />
          </div>
        </div>
      ) : (
        <ProductList onHomeClick={() => setShowProductList(false)} />
      )}
    </div>
  );
}

export default App;