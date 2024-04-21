import React from 'react';
import './ProductCard.css'; // Import CSS file for additional styling if needed

const ProductCard = () => {
  const handleClick = () => {
    const profileURL = "https://t.me/Piyush";
    window.open(profileURL, "_blank");
  };

  return (
    <div className="product-card">
      <h3 className="product-title">Product</h3>
      <div className="product-content">
        <div className="product-image">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="product"
            width={150}
            height={150}
          />
        </div>
        <div className="product-details">
          <div>
            <p>Price</p>
            <p>&#8377; 1500</p>
            <p>Daily</p>
            <p>&#8377; 200.00</p>
          </div>
          <div>
            <p>Cycle</p>
            <p>50 days</p>
            <p>Hourly</p>
            <p>&#8377; 120.00</p>
          </div>
        </div>
      </div>
      <button onClick={handleClick} className="invest-button">Invest</button>
    </div>
  );
};

export default ProductCard;
