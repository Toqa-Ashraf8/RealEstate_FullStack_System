import React from 'react';
import { User, Phone, MapPin, CreditCard, Home, Calendar, Printer } from 'lucide-react';
import '../css/ClientProfile.css';

const ClientProfile = () => {
    // بيانات تجريبية لعميل عنده وحدتين
    const clientData = {
        name: "أحمد محمد علي",
        phone: "01023456789",
        nationalId: "29010101234567",
        address: "التجمع الخامس - القاهرة",
        purchases: [
            {
                unitName: "شقة A-10",
                projectName: "ماونتن فيو",
                totalPrice: "3,500,000",
                installments: [
                    { id: 1, title: "مقدم حجز", date: "2026-01-01", amount: "350,000", status: "paid" },
                    { id: 2, title: "قسط شهر 2", date: "2026-02-01", amount: "20,000", status: "paid" },
                    { id: 3, title: "قسط شهر 3", date: "2026-03-01", amount: "20,000", status: "unpaid" },
                ]
            },
            {
                unitName: "محل G-05",
                projectName: "مول ذا ريفت",
                totalPrice: "1,200,000",
                installments: [
                    { id: 1, title: "مقدم تعاقد", date: "2026-03-10", amount: "120,000", status: "paid" },
                ]
            }
        ]
    };

    return (
        <div className="cp-wrapper">
            {/* الجزء العلوي: بيانات العميل الشخصية */}
            <div className="cp-header-card">
                <div className="cp-avatar-large"><User size={40} /></div>
                <div className="cp-main-info">
                    <h1>{clientData.name}</h1>
                    <div className="cp-info-grid">
                        <span><Phone size={14} /> {clientData.phone}</span>
                        <span><CreditCard size={14} /> {clientData.nationalId}</span>
                        <span><MapPin size={14} /> {clientData.address}</span>
                    </div>
                </div>
                <button className="cp-print-btn" onClick={() => window.print()}>
                    <Printer size={16} /> طباعة التقرير الشامل
                </button>
            </div>

            <h2 className="cp-section-title">الوحدات والتعاقدات</h2>

            {/* عرض الوحدات بشكل منفصل */}
            <div className="cp-units-list">
                {clientData.purchases.map((unit, uIdx) => (
                    <div key={uIdx} className="cp-unit-card">
                        <div className="cp-unit-header">
                            <h3><Home size={18} /> {unit.unitName} - {unit.projectName}</h3>
                            <span className="cp-total-tag">إجمالي: {unit.totalPrice} ج.م</span>
                        </div>

                        <div className="cp-table-container">
                            <table className="cp-table">
                                <thead>
                                    <tr>
                                        <th>بند الدفع</th>
                                        <th>التاريخ</th>
                                        <th>المبلغ</th>
                                        <th>الحالة</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {unit.installments.map((inst, iIdx) => (
                                        <tr key={iIdx}>
                                            <td>{inst.title}</td>
                                            <td><Calendar size={12} /> {inst.date}</td>
                                            <td>{inst.amount} ج.م</td>
                                            <td>
                                                <span className={`cp-status ${inst.status}`}>
                                                    {inst.status === 'paid' ? 'تم التحصيل' : 'مستحق'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientProfile;