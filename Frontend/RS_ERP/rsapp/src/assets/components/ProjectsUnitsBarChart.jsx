import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ProjectsUnitsBarChart = ({ projectsData }) => {
  const data = {
    // أسماء المشاريع اللي عندك في الداتابيز
    labels: ['مشروع لؤلؤة', 'كمبوند الرواد', 'برج الياسمين', 'مشروع النخيل'], 
    datasets: [
      {
        label: 'عدد الوحدات',
        // الأرقام دي هي اللي هتتغير لما تضيفي وحدات
        data: projectsData || [45, 80, 20, 55], 
        backgroundColor: '#0d6efd', // لون أزرق بروفيشنال
        borderRadius: 8, // بيخلي الأعمدة شكلها مودرن (Rounded)
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // مش محتاجين ليجند لأنها واضحة
    },
    scales: {
      y: {
        beginAtZero: true,
        position: 'right', // عشان الأرقام عربي
      },
      x: {
        reverse: true, // ترتيب المشاريع من اليمين
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default ProjectsUnitsBarChart;