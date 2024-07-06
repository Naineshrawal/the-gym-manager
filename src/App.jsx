import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';
import Dashboard from './pages/Dashboard';
import { UserProvider } from './context/UserContext.jsx'
import Overview from './components/Overview.jsx';
import Trainer from './components/trainer/Trainer.jsx';
import AddTrainer from './components/trainer/AddTrainer.jsx';
import ViewTrainer from './components/trainer/ViewTrainer.jsx';
import Members from './components/member/Members.jsx';
import ViewMembers from './components/member/ViewMembers.jsx';
import AddMember from './components/member/AddMember.jsx';
import Packages from './components/planpackages/Packages.jsx';
import Equipments from './components/equipments/Equipments.jsx';
import Attendance from './components/attendance/Attendance.jsx';
import Reports from './components/reports/Reports.jsx';
import SubscriptionsReport from './components/reports/SubscriptionsReport.jsx';
import InvoiceList from './components/invoices/InvoiceList.jsx';
import Notifications from './components/Notifications.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';


function App(){
  return(
    <>
    <Router>
      <div className="flex flex-col min-h-screen">
        
        <UserProvider>
        <Header />        
            
          <Routes>
            <Route path="/" element={<Home  />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />}>

              <Route path="overview" element={<Overview />} />
              <Route path='trainers' element={<Trainer/>} />
              <Route path='add-trainer' element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AddTrainer/>
                </ProtectedRoute>
                } />
              <Route path='view-trainer' element={<ViewTrainer/>} />

              <Route path='members' element={
                <ProtectedRoute allowedRoles={['admin', 'trainer']}>
                  <Members/>
                </ProtectedRoute>
              } />
              <Route path='view-members' element={
                <ProtectedRoute allowedRoles={['admin', 'trainer']}>
                  <ViewMembers/>
                </ProtectedRoute>
                } />
              <Route path='add-member' element={
                <ProtectedRoute allowedRoles={['admin','trainer' ]}>
                  <AddMember/>
                </ProtectedRoute>
                } />
              
              <Route path='packages' element={<Packages/>} />
              
              <Route path='equipments' element={<Equipments/>} />

              <Route path='attendance' element={
                <ProtectedRoute allowedRoles={['admin', 'trainer']}>
                  <Attendance/>
                </ProtectedRoute>
              } />

              <Route path='invoice-list' element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <InvoiceList/>
                </ProtectedRoute>
                } />

              <Route path='reports' element={
                <ProtectedRoute allowedRoles={['admin', 'trainer']}>
                  <Reports/>
                </ProtectedRoute>
                } />
              <Route path='subscriptions-report' element={
                <ProtectedRoute allowedRoles={['admin', 'trainer']}>
                  <SubscriptionsReport/>
                </ProtectedRoute>
            } />

              <Route path='notifications' element={
                <ProtectedRoute allowedRoles={['admin','trainer']}>
                  <Notifications/>
                </ProtectedRoute>
                } />
            </Route>

          </Routes>
        
        <Footer />
        </UserProvider>
        
      </div>
    </Router>
    </>
  );
};

export default App;
