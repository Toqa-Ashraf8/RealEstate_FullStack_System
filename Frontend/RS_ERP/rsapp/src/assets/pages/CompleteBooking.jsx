import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { User, CreditCard, Phone, MapPin, Calendar, Image as ImageIcon, CheckCircle, FileText } from 'lucide-react';
import '../css/CompleteBooking.css';

const CompleteBooking = () => {
    const db = useSelector((state) => state.negotiation);
    // بيانات الأوتوفيل من الـ Row اللي اخترناه
    const [formData, setFormData] = useState({
        clientName: db.detailsOfRow?.ClientName || "",
        projectName: db.detailsOfRow?.ProjectName || "",
        unitNo: db.detailsOfRow?.Unit || "",
        nationalID: '',
        address: '',
        secondaryPhone: '',
        installmentYears: '1',
        paymentMethod: 'cash', // default
    });

    const [idImage, setIdImage] = useState(null);
    const [checkImage, setCheckImage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="booking-container">
            <div className="booking-card animate__animated animate__fadeIn">
                <div className="booking-header">
                    <h2>استكمال بيانات الحجز النهائي</h2>
                    <p>يرجى مراجعة بيانات العميل واستكمال المستندات المطلوبة</p>
                </div>

                <form className="booking-form">
                  
                    <div className="form-section">
                        <h3 className="section-title"><User size={20} /> بيانات الوحدة والعميل</h3>
                        <div className="grid-3">
                            <div className="input-group">
                                <label>اسم العميل</label>
                                <input type="text" value={formData.clientName} readOnly className="autofill-input" />
                            </div>
                            <div className="input-group">
                                <label>المشروع</label>
                                <input type="text" value={formData.projectName} readOnly className="autofill-input" />
                            </div>
                            <div className="input-group">
                                <label>رقم الوحدة</label>
                                <input type="text" value={formData.unitNo} readOnly className="autofill-input" />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="section-title"><CreditCard size={20} /> البيانات الشخصية والمستندات</h3>
                        <div className="grid-2">
                            <div className="input-group">
                                <label>رقم البطاقة </label>
                                <input type="text" name="nationalID"onChange={handleInputChange} />
                            </div>
                            <div className="input-group">
                                <label>رقم تليفون إضافي</label>
                                <input type="tel" name="secondaryPhone" onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="grid-2">
                            <div className="input-group">
                                <label>العنوان بالتفصيل</label>
                                <div className="input-with-icon">
                                    <MapPin size={18} className="icon" />
                                    <input type="text" name="address" onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="upload-group">
                                <label>صورة البطاقة الشخصية</label>
                                <div className="file-dropzone">
                                    <input type="file" onChange={(e) => setIdImage(e.target.files[0])} />
                                    <ImageIcon size={24} />
                                    <span>{idImage ? idImage.name : "اسحب صورة البطاقة هنا"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="section-title"><Calendar size={20} /> تفاصيل السداد</h3>
                        <div className="grid-3">
                            <div className="input-group">
                                <label>طريقة الدفع</label>
                                <select name="paymentMethod" onChange={handleInputChange}>
                                    <option value="cash">كاش</option>
                                    <option value="check">شيكات</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>سنوات التقسيط</label>
                                <select name="installmentYears" onChange={handleInputChange}>
                                    {[1, 2, 3, 4, 5, 7, 10].map(y => <option key={y} value={y}>{y} سنوات</option>)}
                                </select>
                            </div>
                            
                            {formData.paymentMethod === 'check' && (
                                <div className="upload-group animate__animated animate__flipInX">
                                    <label>إدراج صورة الشيك</label>
                                    <div className="file-dropzone check-zone">
                                        <input type="file" onChange={(e) => setCheckImage(e.target.files[0])} />
                                        <FileText size={24} />
                                        <span>{checkImage ? checkImage.name : "صورة الشيك"}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-installments">
                            <CheckCircle size={20} />
                            إنشاء جدول الأقساط
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompleteBooking;