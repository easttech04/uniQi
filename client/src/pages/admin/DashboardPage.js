import React, { useState, useEffect } from 'react';
import StatsCard from '../../components/StatsCard';
import SalesChart from '../../components/SalesChart';
import './DashboardPage.css';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!stats) return <p>Could not load dashboard statistics.</p>;

  return (
    <div className="dashboard-page">
      <h1>Admin Dashboard</h1>
      <div className="stats-grid">
        <StatsCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
          icon="💰"
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          icon="📦"
        />
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon="👥"
        />
        <StatsCard
          title="Total Products"
          value={stats.totalProducts}
          icon="🏷️"
        />
      </div>
      <div className="chart-container">
        {stats.salesOverTime && stats.salesOverTime.length > 0 ? (
          <SalesChart salesData={stats.salesOverTime} />
        ) : (
          <p>No sales data available to display chart.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
