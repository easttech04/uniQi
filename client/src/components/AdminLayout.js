import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>UniQi Admin</h2>
        </div>
        <nav className="admin-nav">
          <ul>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/orders">Orders</Link></li>
            <li><Link to="/admin/products">Products</Link></li>
            <li><Link to="/admin/users">Users</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="admin-main-content">
        <Outlet /> {/* This will render the child routes */}
      </main>
    </div>
  );
};

export default AdminLayout;
