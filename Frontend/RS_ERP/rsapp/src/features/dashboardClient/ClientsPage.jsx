import React, { useState } from 'react';
import './ClientsPage.css';
import { 
    Eye, 
    ArrowRight, 
    Table, 
    User, 
    CreditCard, 
    ExternalLink ,
    Home
} from 'lucide-react';

const ClientsPage = () => {
    const [selectedClient, setSelectedClient] = useState(null);
    const [openInstallments, setOpenInstallments] = useState(null);

    const allClients = [
        { 
            id: "CUST-9901", 
            name: "توقا أشرف", 
            phone1: "01012345678", 
            phone2: "01555667788", 
            nationalId: "29901010000000",
            nationalIdImage: "https://via.placeholder.com/150",
            address: "القاهرة، مدينة نصر، الحي السابع", 
            units: [
                { 
                    unitId: "A-101", projectName: "زد ريزيدنس", price: "2,400,000", 
                    installments: [
                        { id: 1, amount: "50,000", date: "2024-03-01", status: "مدفوع" },
                        { id: 2, amount: "50,000", date: "2024-04-01", status: "متأخر" }
                    ] 
                }
            ]
        }
    ];

    if (!selectedClient) {
        return (
            <div className="erp-container">
                <h2 className="section-title">قائمة العملاء</h2>
                <table className="erp-table">
                    <thead>
                        <tr>
                            <th>كود العميل</th>
                            <th>الاسم</th>
                            <th>رقم الهاتف</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allClients.map(c => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.name}</td>
                                <td>{c.phone1}</td>
                                <td>
                                    <button className="btn-table-action" onClick={() => setSelectedClient(c)}>
                                        <Eye size={14}/> فتح الملف
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className="erp-container animate-fade">
            <div className="erp-header">
                <button className="btn-back" onClick={() => {setSelectedClient(null); setOpenInstallments(null);}}>
                    <ArrowRight size={18}/> العودة للجدول الرئيسي
                </button>
                <h3>ملف العميل: {selectedClient.name}</h3>
            </div>

            {/* قسم البيانات الشخصية في Inputs */}
            <div className="erp-card">
                <div className="card-header"><User size={18}/> البيانات الأساسية</div>
                <div className="inputs-grid">
                    <div className="input-group">
                        <label>الاسم الكامل</label>
                        <input type="text" value={selectedClient.name} readOnly />
                    </div>
                    <div className="input-group">
                        <label>الرقم القومي</label>
                        <input type="text" value={selectedClient.nationalId} readOnly />
                    </div>
                    <div className="input-group">
                        <label>رقم الهاتف 1</label>
                        <input type="text" value={selectedClient.phone1} readOnly />
                    </div>
                    <div className="input-group">
                        <label>رقم الهاتف 2</label>
                        <input type="text" value={selectedClient.phone2} readOnly />
                    </div>
                    <div className="input-group full-width">
                        <label>العنوان بالكامل</label>
                        <input type="text" value={selectedClient.address} readOnly />
                    </div>
                    <div className="input-group">
                        <label>صورة البطاقة</label>
                        <button className="btn-id-view" onClick={() => window.open(selectedClient.nationalIdImage)}>
                            <ExternalLink size={14}/> عرض المرفق
                        </button>
                    </div>
                </div>
            </div>

            {/* قسم الوحدات في جدول */}
            <div className="erp-card">
                <div className="card-header"><Home size={18}/> الوحدات المحجوزة</div>
                <table className="erp-table inner">
                    <thead>
                        <tr>
                            <th>كود الوحدة</th>
                            <th>اسم المشروع</th>
                            <th>إجمالي السعر</th>
                            <th>الأقساط</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedClient.units.map(unit => (
                            <React.Fragment key={unit.unitId}>
                                <tr>
                                    <td>{unit.unitId}</td>
                                    <td>{unit.projectName}</td>
                                    <td>{unit.price} ج.م</td>
                                    <td>
                                        <button 
                                            className="btn-tiny" 
                                            onClick={() => setOpenInstallments(openInstallments === unit.unitId ? null : unit.unitId)}
                                        >
                                            <CreditCard size={14}/> {openInstallments === unit.unitId ? 'إغفاء' : 'عرض'}
                                        </button>
                                    </td>
                                </tr>
                                {/* جدول الأقساط الصغير اللي بيظهر تحت الصف */}
                                {openInstallments === unit.unitId && (
                                    <tr className="sub-table-row">
                                        <td colSpan="4">
                                            <div className="mini-table-wrapper animate-slide">
                                                <table className="mini-table">
                                                    <thead>
                                                        <tr>
                                                            <th>م</th>
                                                            <th>المبلغ</th>
                                                            <th>التاريخ</th>
                                                            <th>الحالة</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {unit.installments.map(ins => (
                                                            <tr key={ins.id}>
                                                                <td>{ins.id}</td>
                                                                <td>{ins.amount} ج.م</td>
                                                                <td>{ins.date}</td>
                                                                <td><span className={`status-text ${ins.status}`}>{ins.status}</span></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientsPage;