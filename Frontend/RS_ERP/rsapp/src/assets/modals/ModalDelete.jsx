import React from 'react';
import { MdClose, MdWarning, MdDelete } from "react-icons/md";
import '../css/ModalDelete.css';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteRow, hideDelmdl } from '../redux/projectSlice';

const ModalDelete = () => {
  const db = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  return (
    <div className="modal-overlay">
      <div className="modal-container" >
        <div className="modal-header">
         <span style={{fontSize:'25px',cursor:'pointer'}}>&times;</span>
        </div>
    
        <div className="modal-body">
          <div className="warning-icon">
            <MdWarning />
          </div>
          <p className="modal-message">
            هل أنت متأكد من عملية الحذف؟
          </p>
        </div>

        <div className="modal-footer">
          <button 
          className="btn-cancel" 
          onClick={()=>dispatch(hideDelmdl())}
          >
            لا
          </button>
          <button 
          className="btn-confirm"
          onClick={()=>dispatch(DeleteRow())}
          >
            <MdDelete /> نعم 
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;