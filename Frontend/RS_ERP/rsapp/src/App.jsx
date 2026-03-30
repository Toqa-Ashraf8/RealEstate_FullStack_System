import './App.css'
import 'animate.css';
import { Routes,Route, Navigate }from 'react-router-dom'
import Header from './assets/nav/Header'
import AddProjects from './assets/pages/AddProjects'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProjectsCard from './assets/pages/ProjectsCard'
import NegotiationRequests from './assets/pages/NegotiationRequests'
import RejectedNegotiations from './assets/pages/RejectedNegotiations';
import AcceptedNegotiations from './assets/pages/AcceptedNegotiations';
import BookingsManager from './assets/pages/BookingsManager';
import UnitsCard from './assets/pages/UnitsCard';
import AddClients from './assets/pages/AddClients';
import CompleteBooking from './assets/pages/CompleteBooking';
import InstallmentsSchedule from './assets/pages/InstallmentsSchedule';
import BookedClients from './assets/pages/BookedClients';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import {clearGlobalError} from './assets/redux/uiSlice'
import Register from './assets/pages/Register';
import Login from './assets/pages/Login';
import ProtectedRoute from './assets/components/ProtectedRoute';
import DashboardPage from './assets/pages/DashboardPage';
import ClientsPage from './assets/pages/ClientsPage';
import BookingsReport from './assets/reports/BookingsReport';


function App() {
const dispatch = useDispatch();
const {token}=useSelector((state)=>state.auth);
const { isLoading, globalError, globalMessage } = useSelector((state) => state.ui);
const componentRef = useRef();
const db_b=useSelector((state)=>state.booking);
useEffect(() => {
    if (globalError) {
      toast.error(globalMessage || "حدث خطأ في السيرفر",);
      dispatch(clearGlobalError());
    }
  }, [globalError, globalMessage, dispatch]);

  return (
    <>
      <ToastContainer 
        position="top-left" 
        autoClose={3000} 
        rtl={true} 
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    <Header />
      <Routes>    
             <Route path="/" element={<Navigate to="/login" replace />} />  
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
           
            <Route path="/dashboard" 
              element={
              <ProtectedRoute>  
                <DashboardPage/>
              </ProtectedRoute>
              }
              />
           
             <Route path="/addprojects" 
              element={
              <ProtectedRoute allowedRoles={['Admin']} >  
                <AddProjects/>
                </ProtectedRoute>
              }
              />
              <Route path="/projects" 
              element={
                <ProtectedRoute>
                  <ProjectsCard/>
              </ProtectedRoute>
             }
              />
              <Route path="/units" 
              element={
                <ProtectedRoute>
                  <UnitsCard/>
                </ProtectedRoute>
               }
              />
              <Route path='/addclients' 
              element={
                <ProtectedRoute>
                  <AddClients/>
                 </ProtectedRoute>
              }/> 
              <Route path='/negotiation_requests' 
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                 <NegotiationRequests/>
                 </ProtectedRoute>
              }/>
              <Route path='/booking' 
              element={
                 <ProtectedRoute>
                   <BookingsManager/>
                 </ProtectedRoute>
              }
              /> 
              <Route path='/rejected_negotiations' 
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                 <RejectedNegotiations/>
                </ProtectedRoute>
               }
              /> 
              <Route path='/accepted_negotiations' 
              element={
                 <ProtectedRoute allowedRoles={['Admin']}>
                  <AcceptedNegotiations/>
                 </ProtectedRoute>
              }
              />  
              <Route path='/complete_booking' 
              element={
               <ProtectedRoute>
                <CompleteBooking/>
              </ProtectedRoute>
              }
              />
              <Route path='/installments_schedule' 
              element={
               <ProtectedRoute>
                  <InstallmentsSchedule/>
               </ProtectedRoute>
              }
              />
              <Route path='/booked_clients' 
              element={
                 <ProtectedRoute>
                  <BookedClients/>
                  </ProtectedRoute>
               }
              /> 
              <Route path='/clientpage' 
              element={
                 <ProtectedRoute>
                    <ClientsPage/>
                  </ProtectedRoute>
               }
              /> 
              <Route path='/bookingreport' 
               element={
                 <ProtectedRoute>
                     <BookingsReport 
                    ref={componentRef} 
                    client={db_b.bookingClient} 
                    installments={db_b.InstallmentDetails}
                  /> 
                  </ProtectedRoute>
                }
              />
      </Routes>
    </>
  )
}

export default App
