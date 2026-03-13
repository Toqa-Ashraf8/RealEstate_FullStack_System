import React, { useState } from 'react';
import '../css/ConfirmModal.css';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import { showModal_reconfrim } from '../redux/negotiationSlice';


const ReConfirmModal = () => {
     const db = useSelector((state) => state.negotiation);
    const dispatch = useDispatch();
    //******************************************************************* */

  return (
    <div className="modal-o">
      <div className="modal-container">
        <p className="modal-message">هل أنت متأكد من هذه العملية؟</p>
        <div className="modal-actions">
          <button className="btn btn-danger"  onClick={()=>dispatch(showModal_reconfrim(false))}>لا</button>
          <button className="btn-yes">نعم</button>
        </div>
      </div>
    </div>
  );
};

export default ReConfirmModal;