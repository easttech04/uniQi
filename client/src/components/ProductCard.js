import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const getButtonState = () => {
    switch (product.status) {
      case 'On Sale':
        return { text: 'Add to Cart', className: 'on-sale', disabled: false, label: 'On Sale!' };
      case 'Out of Stock':
        return { text: 'Out of Stock', className: 'out-of-stock', disabled: true, label: 'Sold Out' };
      default:
        return { text: 'Add to Cart', className: 'available', disabled: false, label: '' };
    }
  };

  const buttonState = getButtonState();

  return (
    <div className="product-card">
      {buttonState.label && <div className="status-label">{buttonState.label}</div>}
      <Link to={`/product/${product._id}`} className="product-card-link">
        <img src={product.imageUrl} alt={product.title} className="product-card-image" />
        <div className="product-card-content">
          <h3 className="product-card-title">{product.title}</h3>
          <p className="product-card-price">{product.price}</p>
        </div>
      </Link>
      <div className="product-card-actions">
        <button
          className={`action-btn ${buttonState.className}`}
          onClick={() => addToCart(product)}
          disabled={buttonState.disabled}
        >
          {buttonState.text}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
