import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/products" className="btn">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h2>{item.title}</h2>
                  <p>{item.price}</p>
                </div>
                <div className="cart-item-actions">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    min="1"
                  />
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <p>Total: ${cartTotal}</p>
            <Link to="/checkout" className="btn checkout-btn">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
