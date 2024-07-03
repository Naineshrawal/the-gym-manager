import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import TrainerLogin from './pages/TrainerLogin';
import MemberLogin from './pages/MemberLogin';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';
import Dashboard from './pages/Dashboard';
import SupplementsStore from './pages/SupplementsStore';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext.jsx'
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


function App(){
  return(
    <>
    <Router>
      <div className="flex flex-col min-h-screen">
        <CartProvider>
        <UserProvider>
        <Header />        
            
          <Routes>
            <Route path="/" element={<Home  />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/trainer-login" element={<TrainerLogin />} />
            <Route path="/member-login" element={<MemberLogin />} />
            <Route path="/dashboard" element={<Dashboard />}>

              <Route path="overview" element={<Overview />} />
              <Route path='trainers' element={<Trainer/>} />
              <Route path='add-trainer' element={<AddTrainer/>} />
              <Route path='view-trainer' element={<ViewTrainer/>} />

              <Route path='members' element={<Members/>} />
              <Route path='view-members' element={<ViewMembers/>} />
              <Route path='add-member' element={<AddMember/>} />
              
              <Route path='packages' element={<Packages/>} />
              
              <Route path='equipments' element={<Equipments/>} />

              <Route path='attendance' element={<Attendance/>} />

              <Route path='invoice-list' element={<InvoiceList/>} />

              <Route path='reports' element={<Reports/>} />
              <Route path='subscriptions-report' element={<SubscriptionsReport/>} />

              <Route path='notifications' element={<Notifications/>} />
            </Route>
            <Route path="/store" element={<SupplementsStore />} />
            <Route path="/cart" element={<Cart />} />

          </Routes>
        
        <Footer />
        </UserProvider>
        </CartProvider>
      </div>
    </Router>
    </>
  );
};

export default App;
