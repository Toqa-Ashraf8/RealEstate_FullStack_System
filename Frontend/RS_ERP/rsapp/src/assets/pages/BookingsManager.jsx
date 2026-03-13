import React from 'react';
import { UserCheck, FileEdit, Calculator, Printer, User } from 'lucide-react';
import '../css/BookingsManager.css';

const BookingsManager = () => {
    // مثال لطلب وافق عليه المدير وجاهز للاستكمال
    const approvedRequests = [
        { id: 1, name: "أحمد محمد علي", project: "تاج سلطان", unit: "A1-4", price: "2,500,000", deposit: "250,000" }
    ];

    return (
        <div className="bk-manage-wrapper">
            <div className="bk-header">
                <h2><UserCheck size={24} /> إدارة الحجوزات (استكمال التعاقد)</h2>
                <p>الطلبات المعتمدة من الإدارة وبانتظار جدولة الأقساط</p>
            </div>

            <div className="bk-container">
                {approvedRequests.map((req) => (
                    <div key={req.id} className="bk-card">
                        <div className="bk-main-info">
                            <div className="bk-user-avatar"><User size={20} /></div>
                            <div>
                                <h3>{req.name}</h3>
                                <span>مشروع: {req.project} | وحدة: {req.unit}</span>
                            </div>
                        </div>

                        <div className="bk-price-info">
                            <p className="label">السعر المعتمد</p>
                            <p className="value">{req.price} ج.م</p>
                        </div>

                        <div className="bk-actions">
                            <button className="btn-complete">
                                <FileEdit size={16} /> استكمال بيانات الحجز
                            </button>
                            <button className="btn-schedule">
                                <Calculator size={16} /> إنشاء جدول الأقساط
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingsManager;