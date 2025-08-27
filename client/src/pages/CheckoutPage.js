import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      customer: formData,
      products: cartItems.map(item => ({
        productId: item.id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: parseFloat(cartTotal),
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      alert('Thank you for your order!');
      clearCart();
      navigate('/'); // Redirect to home page

    } catch (error) {
      console.error('Error creating order:', error);
      alert('There was an error placing your order. Please try again.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <h1>Checkout</h1>
        <p>Your cart is empty. Please add items to your cart before proceeding to checkout.</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Shipping Information</h2>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Postal Code</label>
          <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn-submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
