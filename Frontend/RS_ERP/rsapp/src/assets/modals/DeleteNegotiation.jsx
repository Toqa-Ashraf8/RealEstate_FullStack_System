import React from 'react';
import { MdClose, MdWarning, MdDelete } from "react-icons/md";
import '../css/DeleteNegotiation.css';
import { useDispatch, useSelector } from 'react-redux';
import {DeleteNegotiationModal, DeleteNegotiationRow} from '../redux/clientSlice'
const DeleteNegotiation = () => {
  const db = useSelector((state) => state.clients);
  const dispatch = useDispatch();
//************************************************ */
  return (
    <div className="neg-row-modal-overlay">
      <div className="neg-row-modal-card">
        
        <div className="neg-row-modal-close" 
        onClick={()=>dispatch(DeleteNegotiationModal(false))}
        >
          <MdClose />
        </div>

        <div className="neg-row-modal-content">
          <div className="neg-row-modal-icon">
            <MdWarning />
          </div>
          <p className="neg-row-modal-text">
            هل أنت متأكد من عملية الحذف؟
          </p>
        </div>

        <div className="neg-row-modal-btns">
          <button className="neg-row-btn-cancel" 
          onClick={()=>dispatch(DeleteNegotiationModal(false))}
          >
            لا
          </button>
           <button className="neg-row-btn-confirm"
            onClick={()=>dispatch(DeleteNegotiationRow())}
           >
            <MdDelete /> نعم
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteNegotiation;