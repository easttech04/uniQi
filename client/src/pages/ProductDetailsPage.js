import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  // In a real app, you would fetch product data based on the id.
  // For now, we'll use placeholder data.
  const product = {
    id: id,
    title: `Sample Product ${id}`,
    description: "This is a detailed description of the sample product. It highlights the key features, benefits, and specifications of the item.",
    price: "$99.99",
    imageUrl: `https://via.placeholder.com/600x400/03A9F4/FFFFFF?text=Product+${id}`
  };

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <div className="product-image-container">
          <img src={product.imageUrl} alt={product.title} className="product-image" />
        </div>
        <div className="product-info-container">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">{product.price}</p>
          <p className="product-description">{product.description}</p>
          <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
