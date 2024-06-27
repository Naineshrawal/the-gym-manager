import React from 'react';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye, faClock } from '@fortawesome/free-solid-svg-icons';


function Members() {
    return (
        <div className="p-8 section-container bg-gray-100 min-h-screen">
          <h2 className="text-3xl font-bold text-gray-800">Hello Admin</h2>
          <p className="mt-2 text-gray-600">Manage Members of Your Gym</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <Link
              to="/dashboard/add-member"
              className="flex flex-col items-center bg-[#ffd166] p-6 rounded-lg shadow-lg hover:bg-[#06d6a0] transition duration-300  text-brand-dark"
            >
              <FontAwesomeIcon icon={faPlus} size="2x" />
              <p className="mt-2">Add Member</p>
            </Link>
            <Link
              to="/dashboard/view-members"
              className="flex flex-col items-center bg-[#ffd166] p-6 rounded-lg shadow-lg hover:bg-[#06d6a0] transition duration-300 text-brand-dark"
            >
              <FontAwesomeIcon icon={faEye} size="2x" />
              <p className="mt-2">View Members</p>
            </Link>
           
          </div>
    
          
        </div>
      );
}

export default Members
