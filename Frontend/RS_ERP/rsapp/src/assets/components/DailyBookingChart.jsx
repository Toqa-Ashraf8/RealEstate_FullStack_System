import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

const DailyBookingChart = ({ bookingData }) => {
  const data = {
    labels: ['20 مارس', '21 مارس', '22 مارس', '23 مارس (اليوم)'], 
    datasets: [
      {
        fill: true,
        label: 'حجوزات جديدة',
        data: bookingData || [5, 12, 8, 45], 
        borderColor: '#198754', 
        backgroundColor: 'rgba(25, 135, 84, 0.1)',
        tension: 0.3,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { position: 'right', beginAtZero: true },
      x: { reverse: true }
    }
  };

  return <Line data={data} options={options} />;
};

export default DailyBookingChart;