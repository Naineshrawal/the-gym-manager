import React from 'react';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt} from '@fortawesome/free-solid-svg-icons';


function Reports() {
    
  return (
    <div className="p-8 section-container bg-gray-100 min-h-screen">
          <h2 className="text-3xl font-bold text-gray-800">Hello,Admin</h2>
          <p className="mt-2 text-gray-600">Manage Reports of Your Gym</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <Link
              to="/dashboard/subscriptions-report"
              className="flex flex-col items-center bg-[#ffd166] p-6 rounded-lg shadow-lg hover:bg-[#06d6a0] transition duration-300  text-brand-dark"
            >
              <FontAwesomeIcon icon={faReceipt} size="2x" />
              <p className="mt-2">Subscriptions Report</p>
            </Link>
            
           
          </div>
    
          
        </div>
  )
}

export default Reports
