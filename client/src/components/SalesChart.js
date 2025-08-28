import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = ({ salesData }) => {
  const data = {
    labels: salesData.map(d => d._id), // Dates
    datasets: [
      {
        label: 'Daily Revenue',
        data: salesData.map(d => d.dailySales),
        fill: true,
        backgroundColor: 'rgba(3, 169, 244, 0.2)',
        borderColor: 'rgba(3, 169, 244, 1)',
        tension: 0.1
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Revenue Over Time',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default SalesChart;
