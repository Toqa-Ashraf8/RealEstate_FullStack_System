import React from "react";
import "../css/NegotiationModal.css";
import { useDispatch, useSelector } from "react-redux";
import { AddToNegotiationTable, calculateDiscount, changeNegotiation_values, showNegotiationModal } from "../redux/clientSlice";
const NegotiationModal = () => {
const db = useSelector((state) => state.clients);
const dispatch = useDispatch();

//-------------------------------------------------------------
const HandleChange=(e)=>{
    const{name,value}=e.target;
    dispatch(changeNegotiation_values({[name]:value}));
}
//**************************************************************************/
const AddToTable=()=>{
  dispatch(AddToNegotiationTable())
}

  return (
    <div dir="rtl">
      <div className="modaln">
        <div className="modalcnt_n">
          <div className="headern">
            <div className="mdl_titles">
              <span 
              className="close_b"
              onClick={()=>dispatch(showNegotiationModal(false))}
              >&times;</span>
              <h4 className="units_title">إرسال طلب تفاوض</h4>
            </div>
          </div>
          <div className="bodyn">
            <div className="row">
              <div className="col-8">
                <div className="input-group-modern data_cntu">
                  <label className="data_lbl">كود الطلب</label>
                  <input
                    type="text"
                    className="form-control-modern"
                    disabled
                    name="serialCode"
                    value={db.negotiation.serialCode || ""}
                    onChange={HandleChange}
                  />
                </div>

                <div className="input-group-modern data_cntu">
                  <label className="data_lbl">السعر الأصلي</label>
                  <input
                    type="text"
                    className="form-control-modern"
                    disabled
                    autoComplete="off"
                    name="OriginalPrice"
                    value={db.negotiation.OriginalPrice || ""}
                    onChange={HandleChange}
                  />
                </div>
                 <div className="input-group-modern data_cntu">
                  <label className="data_lbl">السعر المقترح</label>
                  <input
                    type="text"
                    className="form-control-modern"
                    autoComplete="off"
                    autoFocus
                    name="NegotiationPrice"
                    value={db.negotiation.NegotiationPrice || ""}
                    onChange={HandleChange}
                    onBlur={() => dispatch(calculateDiscount())}
                  />
                </div>
                 <div className="input-group-modern data_cntu">
                  <label className="data_lbl">قيمة الخصم %</label>
                  <input
                    type="text"
                    className="form-control-modern"
                    autoComplete="off"
                    name="DiscountAmount"
                    value={db.negotiation.DiscountAmount || ""}
                    onChange={HandleChange}
                  />
                </div> 
               
              </div>
            </div>
          </div>
          <div className="footern">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: "45px",
              }}
            >
              <button className="btn btn-primary btn_addu"
              style={{marginRight:'20px'}}
              onClick={()=>AddToTable()}
              >إضافة</button>
              <button 
              className="btn btn-danger"
              onClick={()=>dispatch(showNegotiationModal(false))}
              >إلغاء</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NegotiationModal;
