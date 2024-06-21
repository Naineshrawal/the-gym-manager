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
// import DashboardLayout from './pages/DashboardLayout.jsx';
import Overview from './components/Overview.jsx';


function App() {
  return (
    <Router>
    <CartProvider>
    <UserProvider>
      <div className="flex flex-col min-h-screen">
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
            </Route>
            <Route path="/store" element={<SupplementsStore />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        
        <Footer />
      </div>
    </UserProvider>
    </CartProvider>
    </Router>
 );
}

export default App;
