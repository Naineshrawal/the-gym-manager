import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="w-full bg-brand-dark text-white py-4">
      <div className="section-container flex justify-between items-center">
        <h1 className="text-2xl font-bold text-brand-primary">THE GYM MANAGER</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-brand-secondary">Home</Link></li>
            <li><Link to="/about" className="hover:text-brand-secondary">About</Link></li>
            <li><Link to="/contact" className="hover:text-brand-secondary">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
