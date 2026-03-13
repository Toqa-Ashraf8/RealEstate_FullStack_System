import React from 'react';
import { MdClose, MdWarning, MdDelete } from "react-icons/md";
import '../css/ModalDelAll.css';
import { useDispatch, useSelector } from 'react-redux';
import { ClearInputs, deleteAll, showDelAllm } from '../redux/projectSlice';
import { toast } from 'react-toastify';

const ModalDelAll = () => {
  const db = useSelector((state) => state.projects);
  const dispatch = useDispatch();


  const DelAll=async()=>{
    await dispatch(deleteAll(db.project.ProjectCode));
    await dispatch(showDelAllm(false))
    await dispatch(ClearInputs());
    toast.error("تم حذف البيانات !", {
         theme: "colored", 
    });
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container" >
        <div className="modal-header">
         <span 
         style={{fontSize:'25px',cursor:'pointer'}}
         onClick={()=>dispatch(showDelAllm(false))}
         >&times;</span>
        </div>
    
        <div className="modal-body">
          <div className="warning-icon">
            <MdWarning />
          </div>
          <p className="modal-message">
           هل أنت متأكد من حذف جميع بيانات هذا المشروع؟
          </p>
        </div>

        <div className="modal-footer">
          <button 
          className="btn-cancel" 
          onClick={()=>dispatch(showDelAllm(false))}
          >
            لا
          </button>
          <button 
          className="btn-confirm"
          onClick={()=>DelAll()}
          >
            <MdDelete /> نعم 
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelAll;