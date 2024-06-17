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
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/login-form" element={<LoginForm />} />
            <Route path="/trainer-login" element={<TrainerLogin />} />
            <Route path="/member-login" element={<MemberLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
