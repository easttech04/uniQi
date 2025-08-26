import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import './ProductsPage.css';

const ProductsPage = () => {
  const products = [
    {
      id: 1,
      title: "Industrial Safety Helmet",
      description: "Top-grade helmet for maximum protection in industrial environments.",
      imageUrl: "https://via.placeholder.com/300x200/FFC107/000000?text=Helmet"
    },
    {
      id: 2,
      title: "Conveyor Belt System",
      description: "Efficient and durable conveyor systems for various industrial applications.",
      imageUrl: "https://via.placeholder.com/300x200/03A9F4/FFFFFF?text=Conveyor"
    },
    {
      id: 3,
      title: "Security X-Ray Scanner",
      description: "High-resolution X-ray scanner for baggage and cargo screening.",
      imageUrl: "https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=X-Ray"
    },
    {
      id: 4,
      title: "CCTV Camera System",
      description: "Advanced CCTV cameras with night vision and remote monitoring.",
      imageUrl: "https://via.placeholder.com/300x200/E91E63/FFFFFF?text=CCTV"
    },
    {
      id: 5,
      title: "Fire Extinguisher",
      description: "Multi-purpose fire extinguisher for commercial and industrial use.",
      imageUrl: "https://via.placeholder.com/300x200/F44336/FFFFFF?text=Fire+Safety"
    },
    {
      id: 6,
      title: "Automated Parking Barrier",
      description: "Reliable and fast automated barrier for car parking systems.",
      imageUrl: "https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Parking"
    },
  ];

  return (
    <div className="products-page">
      <h1>Our Products</h1>
      <p className="products-intro">
        Browse our catalog of high-quality aviation and industrial products.
      </p>
      <div className="product-grid">
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-link">
            <Card
              title={product.title}
              description={product.description}
              imageUrl={product.imageUrl}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
