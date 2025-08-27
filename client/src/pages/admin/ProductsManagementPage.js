import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import AddProductForm from '../../components/AddProductForm';
import './ProductsManagementPage.css';

const ProductsManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
    fetchProducts(); // Refetch to get the latest list
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="products-management-page">
      <h1>Products Management</h1>
      <button className="add-product-btn" onClick={() => setIsModalOpen(true)}>
        Add New Product
      </button>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Product">
        <AddProductForm onProductAdded={handleProductAdded} onClose={() => setIsModalOpen(false)} />
      </Modal>

      <div className="product-list-admin">
        {products.map(product => (
          <div key={product._id} className="product-item-admin">
            <span className="product-title">{product.title}</span>
            <div className="product-actions">
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsManagementPage;
