import React, { useEffect, useRef } from "react";
import "../css/PaymentTypeModal.css";
import {Building2,Ungroup,Image as ImageIcon}from 'lucide-react'
import { useDispatch, useSelector } from "react-redux";
import { CiImageOn } from "react-icons/ci";
const PaymentTypeModal = () => {
const db_b = useSelector((state) => state.booking);
const dispatch = useDispatch();

//-------------------------------------------------------------


//********************************************************************************/

//--------------------------------------------

  return (
    <div dir="rtl">
      <div className="modalp">
        <div className="modalcnt_p">
          <div className="headerp">
            <div className="mdl_titles_p">
              <span 
              className="close_p"
              >&times;</span>
            </div>
          </div>
          <div className="bodyp">
              
          <div className="row">
        <div className="col-6">

             <div className="input-group-modern data_cntp">
                <label className='data_lbl'>طريقة الدفع </label>
                <select 
                className='form-select-modern'>
            
                  <option value="-1">-إختر-</option>
                  <option value="كاش">كاش</option>
                  <option value="شيك">شيك</option>
                </select>
              
              </div>
             <div className="input-group-modern data_cntp mb-0">
                  <label className='data_lbl'> صورة الشيك</label>
                  <div className="file-input-wrapper">
                    <input 
                     type="file"
                     className='form-control-modern' 
                     
                     />
                    <div className="custom-file-label">
                       <span>اضغط لرفع صورة الشيك</span>
                    </div>
                  </div>
                </div>
        </div>
                <div className="col-6">
                 <div className="final_image_preview_big">
                                   
                         <img src="" className="final_img_fluid" alt="" />
                         <div className="final_empty_msg">
                            <ImageIcon size={40} className="final_icon_fade" />
                            <p>معاينة البطاقة</p>
                            </div>
                    </div>
               </div>

          </div>


          </div>
          <div className="footerp">
          <div className="footer_btns_container">
            <button className="btn_modal success">تحديث الحالة</button>
            <button className="btn_modal danger">إلغاء</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTypeModal;
