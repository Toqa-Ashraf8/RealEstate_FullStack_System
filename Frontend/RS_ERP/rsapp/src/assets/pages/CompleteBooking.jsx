import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { User, CreditCard, Phone, MapPin, Calendar, Image as ImageIcon, CheckCircle, FileText, Hash, Activity, Underline } from 'lucide-react';
import '../css/CompleteBooking.css';
import { RiSave3Fill } from "react-icons/ri";
import { AiOutlineClear } from "react-icons/ai";
import { FiPrinter } from "react-icons/fi";

const CompleteBooking = () => {
    const db = useSelector((state) => state.negotiation);
    
    const [formData, setFormData] = useState({
        clientName: db.detailsOfRow?.ClientName || "",
        projectName: db.detailsOfRow?.ProjectName || "",
        unitNo: db.detailsOfRow?.Unit || "",
        nationalID: '',
        address: '',
        secondaryPhone: '',
        installmentYears: '1',
        paymentMethod: 'cash', 
    });

    const [previews, setPreviews] = useState({ idPreview: null, checkPreview: null });

    const handleFileChange = (e, fileType) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({
                    ...prev,
                    [fileType === 'id' ? 'idPreview' : 'checkPreview']: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="final_page_wrapper">
            <div className="final_booking_container">
                <div className="final_header_area">
                    <h2 className="final_main_title">استكمال بيانات الحجز النهائي</h2>
                </div>

                <div className="final_content_box animate__animated animate__fadeIn">
                    <form className="final_form_body">
                        
                        {/* Row 1: Read-only Data */}
                        <div className="row mb-4">
                            <div className="col-md-4">
                                <div className="final_field_group">
                                    <label className="final_label"><User size={18} /> إسم العميل</label>
                                    <input type="text" value={formData.clientName} readOnly className="final_input_modern final_disabled" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="final_field_group">
                                    <label className="final_label"><Hash size={18} /> المشروع</label>
                                    <input type="text" value={formData.projectName} readOnly className="final_input_modern final_disabled" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="final_field_group">
                                    <label className="final_label"><Activity size={18} /> الوحدة</label>
                                    <input type="text" value={formData.unitNo} readOnly className="final_input_modern final_disabled" />
                                </div>
                            </div>
                        </div>
                        
                        <hr className="final_divider" />

                        {/* Row 2: ID Data & Preview */}
                        <div className="row mt-4">
                            <div className="col-lg-8">
                                <div className="final_field_group">
                                    <label className="final_label"><CreditCard size={18} /> رقم البطاقة</label>
                                    <input type="text" name="nationalID" className="final_input_modern" onChange={handleInputChange} />
                                </div>
                                   <div className="final_field_group mt-3">
                                    <label className="final_label"><ImageIcon size={18} /> صورة البطاقة</label>
                                    <div className="final_upload_btn">
                                        <input type="file" onChange={(e) => handleFileChange(e, 'id')} />
                                        <div className="final_upload_label">
                                            <span>إضغط لرفع صورة البطاقة الشخصية</span>
                                            <ImageIcon size={18} />
                                        </div>
                                    </div>
                                </div>
                                <div className="final_field_group mt-3">
                                    <label className="final_label"><Phone size={18} /> تليفون إضافي</label>
                                    <input type="tel" name="secondaryPhone" className="final_input_modern" onChange={handleInputChange} />
                                </div>
                                <div className="final_field_group mt-3">
                                    <label className="final_label"><MapPin size={18} /> العنوان بالتفصيل</label>
                                    <input type="text" name="address" className="final_input_modern" onChange={handleInputChange} />
                                </div>
                             
                            </div>
                            <div className="col-lg-4">
                                <div className="final_image_preview_big">
                                    {previews.idPreview ? (
                                        <img src={previews.idPreview} className="final_img_fluid" alt="ID" />
                                    ) : (
                                        <div className="final_empty_msg">
                                            <ImageIcon size={40} className="final_icon_fade" />
                                            <p>معاينة البطاقة</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <hr className="final_divider" />

                        {/* Row 3: Payment & Check Preview */}
                        <div className="row mt-4">
                        
                            <div className="col-lg-8">
                                <div className="final_field_group">
                                    <label className="final_label"><Calendar size={18} /> طريقة الدفع</label>
                                    <select name="paymentMethod" className="final_select_modern" onChange={handleInputChange}>
                                        <option value="cash">كاش (نقدي)</option>
                                        <option value="check">شيكات بنكية</option>
                                    </select>
                                </div>
                                <div className="final_field_group mt-3">
                                    <label className="final_label"><Calendar size={18} /> مدة التقسيط (بالسنوات)</label>
                                    <select name="installmentYears" className="final_select_modern" onChange={handleInputChange}>
                                        {[1, 2, 3, 4, 5, 7, 10].map(y => <option key={y} value={y}>{y} سنوات</option>)}
                                    </select>
                                </div>
                                {formData.paymentMethod === 'check' && (
                                    <div className="final_field_group mt-3 animate__animated animate__fadeIn">
                                        <label className="final_label"><FileText size={18} /> إرفاق صورة الشيك</label>
                                        <div className="final_upload_btn">
                                            <input type="file" onChange={(e) => handleFileChange(e, 'check')} />
                                            <div className="final_upload_label">
                                                <span>رفع صورة الشيك</span>
                                                <FileText size={18} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                                <div className="col-lg-4">
                                <div className="final_image_preview_big" style={{height: '220px'}}>
                                    {previews.checkPreview ? (
                                        <img src={previews.checkPreview} className="final_img_fluid" alt="Check" />
                                    ) : (
                                        <div className="final_empty_msg">
                                            <FileText size={40} className="final_icon_fade" />
                                            <p>معاينة الشيك</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="final_action_center mt-5">
                            <button type="button" className="final_submit_btn">
                                <CheckCircle size={22} />
                                إنشاء جدول الأقساط
                            </button>
                        </div>
                    </form>
                </div>

                {/* Sidebar Buttons */}
                <div className="final_floating_actions">
                     <div className="final_circle_btn" title="تنظيف"> <AiOutlineClear size={28}  color="#14213d"/></div>
                      <div className="final_circle_btn" title="حفظ"><RiSave3Fill size={24} color="#10b981" /></div>
                    <div className="final_circle_btn" title="طباعة" onClick={() => window.print()}><FiPrinter size={24} color="#00b4d8" /></div>
                </div>
            </div>
        </div>
    );
};

export default CompleteBooking;