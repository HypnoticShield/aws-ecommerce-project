// frontend/src/Cart.jsx

import React from 'react';

function Cart({ cartItems, onUpdateQuantity, onRemoveItem, cartTotal }) {
    if (cartItems.length === 0) {
    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <p>Your cart is currently empty.</p>
        </div>
    );
    }

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <div className="cart-items">
            {cartItems.map(item => (
            <div key={item.id} className="cart-item">
                <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>${parseFloat(item.price).toFixed(2)}</p>
                </div>
            <div className="cart-item-actions">
            <input
                type="number"
                value={item.quantity}
                onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10))}
                min="1"
                className="quantity-input"
            />
            <button onClick={() => onRemoveItem(item.id)} className="remove-btn">Remove</button>
            </div>
            </div>
        ))}
            </div>
        <div className="cart-total">
            <h3>Total: ${cartTotal.toFixed(2)}</h3>
        </div>
        </div>
    );
}

export default Cart;