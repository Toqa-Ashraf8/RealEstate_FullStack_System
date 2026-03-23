import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../css/Home.css';

const Home = () => {
  const barRef = useRef(null);
  const pieRef = useRef(null);
  const charts = useRef({});

  useEffect(() => {
    // أهم جزء: التأكد إن مكتبة Chart.js اشتغلت
    const renderCharts = () => {
      if (window.Chart && barRef.current && pieRef.current) {
        
        // تنظيف أي نسخة قديمة عشان Error الـ Canvas already in use
        if (charts.current.bar) charts.current.bar.destroy();
        if (charts.current.pie) charts.current.pie.destroy();

        // --- 1. الـ Bar Chart (توزيع الوحدات بالألوان) ---
        charts.current.bar = new window.Chart(barRef.current.getContext('2d'), {
          type: 'bar',
          data: {
            labels: ['سكني', 'إداري', 'طبي', 'تجاري'],
            datasets: [{
              label: 'عدد الوحدات',
              data: [45, 30, 15, 25],
              // ألوان مختلفة لكل عمود لإضافة شكل احترافي
              backgroundColor: ['#6366f1', '#a855f7', '#ec4899', '#f59e0b'], 
              borderRadius: 10,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false, // عشان يحترم حجم الـ Box
            plugins: { legend: { display: false } }
          }
        });

        // --- 2. الـ Pie Chart (حالة الإشغال) ---
        charts.current.pie = new window.Chart(pieRef.current.getContext('2d'), {
          type: 'doughnut',
          data: {
            labels: ['متاحة', 'محجوزة', 'مباعة'],
            datasets: [{
              data: [156, 42, 85],
              backgroundColor: ['#10b981', '#f59e0b', '#6366f1'],
              borderWidth: 2,
              borderColor: '#ffffff'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%'
          }
        });
      }
    };

    // تشغيل الرسم بعد وقت قصير للتأكد من تحميل الـ DOM
    const timer = setTimeout(renderCharts, 500);
    return () => clearTimeout(timer);
  }, []);

  const statsData = [
    { label: 'عدد المشاريع', value: '12' },
    { label: 'إجمالي العملاء', value: '1,240' },
    { label: 'طلبات الشراء', value: '85' },
    { label: 'وحدات محجوزة', value: '42' },
    { label: 'وحدات متاحة', value: '156' },
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>لوحة الإحصائيات العامة</h1>
      </header>

      <div className="stats-grid">
        {statsData.map((item, index) => (
          <motion.div 
            key={index}
            className="stat-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span>{item.label}</span>
            <h2>{item.value}</h2>
          </motion.div>
        ))}
      </div>

      <div className="charts-wrapper">
        {/* البوكس اليمين */}
        <div className="chart-box">
          <h4>توزيع الوحدات حسب النوع</h4>
          <div style={{ height: '250px' }}> {/* حددنا طول عشان الـ Canvas يظهر */}
            <canvas ref={barRef}></canvas>
          </div>
        </div>

        {/* البوكس الشمال */}
        <div className="chart-box">
          <h4>حالة إشغال الوحدات</h4>
          <div style={{ height: '250px' }}>
            <canvas ref={pieRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;