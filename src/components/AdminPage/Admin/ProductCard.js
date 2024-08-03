import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductCard.css"; // Import the CSS file

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace get url /new-product => /get-products
        const response = await axios.get(
          `${process.env.REACT_APP_PATH_URL}/get-products`
        ); // Replace with your API endpoint
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleButtonClick = (product) => {
    if (selectedProduct && selectedProduct._id === product._id) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(product);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_PATH_URL}/new-product/${selectedProduct._id}`,
        selectedProduct
      ); // Replace with your API endpoint
      console.log("Form submitted:", selectedProduct);
      setModalMessage("Product updated successfully!");
      setIsModalVisible(true);
      setTimeout(() => window.location.reload(), 2000); // Reload the window after 2 seconds
    } catch (err) {
      console.error("Error updating product:", err);
      setModalMessage("Failed to update product.");
      setIsModalVisible(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="main_div">
      <h4 className="heading">Edit Products Data</h4>
      <div className="button_container">
        {products.map((product) => (
          <button key={product.id} onClick={() => handleButtonClick(product)}>
            {product.title}
          </button>
        ))}
      </div>
      {selectedProduct && (
        <form className="product_form">
          <div className="title_div">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={selectedProduct.title}
              onChange={handleInputChange}
              className="product_title"
            />
          </div>
          <div className="price_div">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={selectedProduct.price}
              onChange={handleInputChange}
              className="product_price"
            />
          </div>
          <div className="daily_div">
            <label>Daily Income</label>
            <input
              type="number"
              name="dailyIncome"
              value={selectedProduct.dailyIncome}
              onChange={handleInputChange}
              className="product_daily"
            />
          </div>
          <div className="cycle_div">
            <label>Cycle</label>
            <input
              type="text"
              name="cycle"
              value={selectedProduct.cycle}
              onChange={handleInputChange}
              className="product_cycle"
            />
          </div>
          <div className="income_div">
            <label>Total Income</label>
            <input
              type="number"
              name="totalAmount"
              value={selectedProduct.totalAmount}
              onChange={handleInputChange}
              className="product_income"
            />
          </div>
          {/* Add other fields similarly */}
          <button className="edit_button" onClick={handleFormSubmit}>
            Edit
          </button>
        </form>
      )}
      {isModalVisible && (
        <div className="modal">
          <div className="modal_content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
