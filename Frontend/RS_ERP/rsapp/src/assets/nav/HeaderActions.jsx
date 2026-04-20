import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut } from 'lucide-react';
import { Key } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { logOut, resetUserForm } from '../redux/authSlice';

const HeaderActions = () => {
  const {token}=useSelector((state)=>state.auth);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  if (!token) return null;

  const handleLogOut=()=>{
      dispatch(logOut());
      navigate('/login');
  }
  return (
    <div className="d-flex align-items-center gap-2">
  
        <button 
          type="button" 
          className="btn btn-danger"
          style={{width:'160px',borderRadius:'30px'}}
          onClick={handleLogOut}
        >
          <span><LogOut size={20}/></span> 
         <span>تسجيل الخروج</span> 
        </button>
  
    </div>
  );
};

export default HeaderActions;