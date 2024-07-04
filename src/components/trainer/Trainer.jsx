// src/components/dashboard/Trainer.jsx
import React from 'react';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye} from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../../context/UserContext';


const Trainer = () => {
  const {user} = useUser();
  
  return (
    <div className="p-8 section-container bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800">Hello Admin</h2>
      <p className="mt-2 text-gray-600">Manage Trainers For Your Gym</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {user.role === 'admin' && 
          <Link
          to="/dashboard/add-trainer"
          className="flex flex-col items-center bg-[#ffd166] p-6 rounded-lg shadow-lg hover:bg-[#06d6a0] transition duration-300 text-[#073b4c]"
        >
          <FontAwesomeIcon icon={faPlus} size="2x" />
          <p className="mt-2">Add Trainer</p>
          </Link>
        }
        <Link
          to="/dashboard/view-trainer"
          className="flex flex-col items-center bg-[#ffd166] p-6 rounded-lg shadow-lg hover:bg-[#06d6a0] transition duration-300 text-[#073b4c]">
          <FontAwesomeIcon icon={faEye} size="2x" />
          <p className="mt-2">View Trainer</p>
        </Link>
        
      </div>

      
    </div>
  );
};

export default Trainer;
