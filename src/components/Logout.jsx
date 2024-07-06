import React from 'react'
import { auth } from '../firebase/Firebase';
import { signOut } from 'firebase/auth';
import { logger } from './logging/Logging';

function Logout() {

    const getLogout =  ()=>{
        signOut(auth)
        
        logger.info("user sign out");
      }
  return (
    <div>
      <button onClick={getLogout} className="bg-brand-primary text-white px-4 py-2 rounded">Logout</button>
    </div>
  )
}

export default Logout
