import React from 'react';
import { MdClose, MdWarning, MdDelete } from "react-icons/md";
import '../css/DeleteProjectModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetProjectForm, toggleDeleteProjectModal } from '../redux/projectSlice';
import { toast } from 'react-toastify';
import { deleteProject } from '../projectService';

const DeleteProjectModal = () => {
  const projectState = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const DeleteAll = async () => {
    await dispatch(deleteProject(projectState.project.ProjectCode));
    await dispatch(toggleDeleteProjectModal(false));
    await dispatch(resetProjectForm());
    toast.error("تم حذف البيانات !", {
      theme: "colored",
    });
  }

  return (
    <div className="delete-wrapper">
      <div className="delete-card">
        
        <div className="delete-close-btn" onClick={() => dispatch(toggleDeleteProjectModal(false))}>
          <MdClose />
        </div>

        <div className="delete-content">
          <div className="delete-icon-box">
            <MdWarning />
          </div>
          <h2 className="delete-title">تنبيه الحذف</h2>
          <p className="delete-description">
            هل أنت متأكد من حذف جميع بيانات هذا المشروع؟
            <br />
            <span className="project-id">كود المشروع: {projectState.project?.ProjectCode}</span>
          </p>
        </div>

        <div className="delete-actions">
           <button className="btn-action btn-yes-p" onClick={DeleteAll}>
            <MdDelete /> نعم، متأكد
          </button>
          <button className="btn-action btn-no" onClick={() => dispatch(toggleDeleteProjectModal(false))}>
            لا، إلغاء
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteProjectModal;