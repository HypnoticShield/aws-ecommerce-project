// frontend/src/App.jsx

import { useState, useEffect } from 'react';
import './App.css';
import Cart from './Cart.jsx'; // Import our new Cart component

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // New state for the shopping cart
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch Products from API ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Could not load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  // --- Cart Management Functions ---

  const handleAddToCart = (productToAdd) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);
      if (existingItem) {
        // If item exists, update its quantity
        return prevCart.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // If item doesn't exist, add it to the cart with quantity 1
      return [...prevCart, { ...productToAdd, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // --- Render Logic ---

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="app-layout">
      <div className="product-list-container">
        <h1>Our Products</h1>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={`https://via.placeholder.com/200x200?text=${product.name.replace(/\s/g, '+')}`} alt={product.name} />
              <div className="product-card-content">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-price">${parseFloat(product.price).toFixed(2)}</div>
              </div>
              <button onClick={() => handleAddToCart(product)} className="add-to-cart-btn">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      <div className="cart-section">
        <Cart
          cartItems={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          cartTotal={getCartTotal()}
        />
      </div>
    </div>
  );
}

export default App;