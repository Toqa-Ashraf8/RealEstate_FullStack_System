import React, { useEffect } from 'react';
import { UserCheck, FileEdit, Calculator, Printer, User } from 'lucide-react';
import '../css/BookingsManager.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BookingsManager = () => {
   const db = useSelector((state) => state.negotiation);
    const dispatch = useDispatch();
    const navigate=useNavigate();
 //----------------------------------------------------------


    return (
        <div className="bk-manage-wrapper">
            <div className="bk-header">
                <h2><UserCheck size={24} /> إدارة الحجوزات (استكمال التعاقد)</h2>
                <p>الطلبات المعتمدة من الإدارة وبانتظار جدولة الأقساط</p>
            </div>

            <div className="bk-container">
                {db.acceptedRequests.map((req) => (
                    <div key={req.ClientID} className="bk-card">
                        <div className="bk-main-info">
                            <div className="bk-user-avatar"><User size={20} /></div>
                            <div>
                                <h3>{req.ClientName}</h3>
                                <span>مشروع: {req.ProjectName} | وحدة: {req.Unit}</span>
                            </div>
                        </div>

                        <div className="bk-price-info">
                            <p className="label">السعر المعتمد</p>
                            <p className="value">{req.NegotiationPrice} ج.م</p>
                        </div>

                        <div className="bk-actions">
                            <button 
                            className="btn-complete"
                            onClick={()=>navigate('/complete_booking')}
                            >
                                <FileEdit size={16} /> استكمال بيانات الحجز
                            </button>
                           
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingsManager;