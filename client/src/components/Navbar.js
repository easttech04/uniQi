import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { cartItemCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          UniQi
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className="nav-links">
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/shop" className="nav-links">
              Shop
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-links cart-link">
              Cart ({cartItemCount})
            </Link>
          </li>
          {user ? (
            <>
              <li className="nav-item"><Link to="/admin/dashboard" className="nav-links">Dashboard</Link></li>
              <li className="nav-item"><button onClick={logout} className="nav-links logout-btn">Logout</button></li>
            </>
          ) : (
            <li className="nav-item"><Link to="/login" className="nav-links">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
