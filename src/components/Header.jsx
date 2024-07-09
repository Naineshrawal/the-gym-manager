import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
// import {  } from '@fortawesome/free-solid-svg-icons/faBars';
import { faX, faBars } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../context/UserContext';


function Header() {
  const {user} = useUser()
  const [hidden, setHidden] = useState("hidden")
  return (
    <header className=" w-full bg-brand-dark text-white py-4 relative">
      <div className="section-container flex justify-between items-center">
        <FontAwesomeIcon onClick={()=>setHidden("block")} icon={faBars} className={`absolute block sm:hidden right-5 top-5 text-xl font-medium cursor-pointer`} />
        <FontAwesomeIcon onClick={()=>setHidden("hidden")} icon={faX} className={`absolute ${hidden} z-10 right-5 top-5 text-xl font-medium cursor-pointer`} />
        <Link to={'/'}><img width={'100px'} src="/images/logo.png" alt="logo" /></Link>
        <nav className={`fixed ${hidden} sm:block sm:static bg-brand-dark/95 p-20 sm:p-0 top-0 right-0`} >
          <ul className="sm:flex space-y-3 sm:space-y-0 sm:space-x-4">
            <li><Link to="/" className="hover:text-brand-secondary text-xl">Home</Link></li>
            <li><Link to="/about" className="hover:text-brand-secondary text-xl">About</Link></li>
            <li><Link to="/contact" className=" text-xl">Contact</Link></li>
            {user && <li><Link to="/dashboard/overview" className="hover:text-brand-secondary text-xl">Dashboard</Link></li>}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
