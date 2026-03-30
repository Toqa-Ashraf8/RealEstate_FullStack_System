import React, { useState } from 'react';
import '../css/ClientsPage.css';
import { User, Mail, Phone, MapPin, Calendar, CreditCard, Home, Activity } from 'lucide-react'; 

const ClientsPage = () => {
    const [activeTab, setActiveTab] = useState('summary');

    // بيانات تجريبية موسعة
    const client = {
        name: "توقا أشرف",
        id: "CUST-9901",
        phone: "01012345678",
        email: "toqa.dev@email.com",
        address: "القاهرة، مدينة نصر، الحي السابع",
        joinDate: "15 يناير 2024",
        totalPaid: "450,000",
        remaining: "1,200,000"
    };

    return (
        <div className="profile-page-wrapper">
            {/* --- هيدر الصفحة (كارت بيانات العميل العريض) --- */}
            <div className="profile-header-card">
                <div className="profile-main-info">
                    <div className="user-avatar-circle">
                        <User size={45} color="#fff" />
                    </div>
                    <div className="user-text-details">
                        <h1>{client.name}</h1>
                        <span className="id-tag">{client.id}</span>
                    </div>
                </div>

                <div className="quick-stats-grid">
                    <div className="stat-box">
                        <Phone size={18} />
                        <span>{client.phone}</span>
                    </div>
                    <div className="stat-box">
                        <Mail size={18} />
                        <span>{client.email}</span>
                    </div>
                    <div className="stat-box">
                        <MapPin size={18} />
                        <span>{client.address}</span>
                    </div>
                    <div className="stat-box">
                        <Calendar size={18} />
                        <span>انضم في: {client.joinDate}</span>
                    </div>
                </div>
            </div>

            {/* --- منطقة المحتوى الأساسي (Full Width) --- */}
            <div className="profile-content-section">
                <div className="tabs-navigation">
                    <button className={activeTab === 'summary' ? 'active' : ''} onClick={() => setActiveTab('summary')}>
                        <Activity size={18} /> ملخص النشاط
                    </button>
                    <button className={activeTab === 'installments' ? 'active' : ''} onClick={() => setActiveTab('installments')}>
                        <CreditCard size={18} /> جدول الأقساط
                    </button>
                    <button className={activeTab === 'units' ? 'active' : ''} onClick={() => setActiveTab('units')}>
                        <Home size={18} /> الوحدات المحجوزة
                    </button>
                </div>

                <div className="tab-body-card">
                    {activeTab === 'summary' && (
                        <div className="summary-view animate-fade">
                            <div className="info-grid-3">
                                <div className="info-card-small">
                                    <label>إجمالي المدفوعات</label>
                                    <p className="price-text text-green">{client.totalPaid} ج.م</p>
                                </div>
                                <div className="info-card-small">
                                    <label>المتبقي للتحصيل</label>
                                    <p className="price-text text-red">{client.remaining} ج.م</p>
                                </div>
                                <div className="info-card-small">
                                    <label>عدد الوحدات</label>
                                    <p className="price-text">2 وحدة</p>
                                </div>
                            </div>
                            <div className="logs-section">
                                <h3>آخر التحركات</h3>
                                <div className="log-item">تم دفع قسط شهر مارس بنجاح (فاتورة رقم 122)</div>
                                <div className="log-item">استفسار عن موعد استلام مرحلة "دريم"</div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'installments' && (
                        <div className="table-responsive animate-fade">
                            <table className="modern-table">
                                <thead>
                                    <tr>
                                        <th>رقم القسط</th>
                                        <th>قيمة القسط</th>
                                        <th>تاريخ الاستحقاق</th>
                                        <th>طريقة الدفع</th>
                                        <th>الحالة</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>01</td><td>50,000 ج.م</td><td>2024-03-01</td><td>تحويل بنكي</td><td><span className="badge-paid">تم السداد</span></td></tr>
                                    <tr><td>02</td><td>50,000 ج.م</td><td>2024-04-01</td><td>شيك</td><td><span className="badge-pending">متأخر</span></td></tr>
                                    <tr><td>03</td><td>100,000 ج.م</td><td>2024-05-01</td><td>---</td><td><span className="badge-waiting">مجدول</span></td></tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'units' && (
                        <div className="units-grid animate-fade">
                            <div className="unit-card">
                                <h4>مشروع زد ريزيدنس</h4>
                                <p>شقة A-101 الدور الرابع</p>
                                <div className="unit-footer"><span>المساحة: 140م</span> <strong>2,400,000 ج.م</strong></div>
                            </div>
                            <div className="unit-card">
                                <h4>مشروع الروضة</h4>
                                <p>فيلا V-12 - تاون هاوس</p>
                                <div className="unit-footer"><span>المساحة: 220م</span> <strong>5,800,000 ج.م</strong></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientsPage;