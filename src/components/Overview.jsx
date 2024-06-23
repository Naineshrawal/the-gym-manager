// src/components/dashboard/Overview.jsx
import React from 'react';
import { useUser } from '../context/UserContext';
import Logout from './Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell,  faSuitcase, faUser, faUserFriends, faCoins } from '@fortawesome/free-solid-svg-icons';


const Overview = () => {
  const { user } = useUser();

  return (
    <>
        <div className="bg-white flex justify-between p-6 rounded-lg shadow-lg mb-2">
            <h1 className="text-3xl font-bold">Hello, {user.name} <span className='text-sm text-gray-400'>({user.role})</span></h1>
            <Logout/>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-2">
          <h1 className="text-2xl font-bold text-brand-primary mb-4">Dashboard Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
              <div className="bg-brand-primary p-4 rounded-lg text-white">
              <FontAwesomeIcon icon={faUser} className="text-4xl text-brand-dark mb-2" />
              <h2 className="text-lg font-bold">Total Members</h2>
              <p className="text-4xl">150</p>
              </div>
              <div className="bg-brand-secondary p-4 rounded-lg text-white">
              <FontAwesomeIcon icon={faUserFriends} className="text-4xl text-brand-primary mb-2" />
              <h2 className="text-lg font-bold">Total Trainers</h2>
              <p className="text-4xl">25</p>
              </div>
              
              <div className="bg-brand-neutral p-4 rounded-lg text-white">
              <FontAwesomeIcon icon={faDumbbell} className="text-4xl text-brand-secondary mb-2" />
              <h2 className="text-lg font-bold">Total Equipments</h2>
              <p className="text-4xl">26</p>
              </div>
              <div className="bg-brand-accent p-4 rounded-lg text-white">
              <FontAwesomeIcon icon={faCoins} className="text-4xl text-brand-primary mb-2" />
              <h2 className="text-lg font-bold">Monthly Revenue</h2>
              <p className="text-4xl">₹12,000</p>
              </div>
              <div className="bg-brand-dark p-4 rounded-lg text-white">
              <FontAwesomeIcon icon={faSuitcase} className="text-4xl text-brand-primary mb-2" />
              <h2 className="text-lg font-bold">Active Subscriptions</h2>
              <p className="text-4xl">135</p>
              </div>
          </div>
        </div>
        <div className="bg-white  grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg shadow-lg mb-2">
          <div className="bg-white p-4 rounded shadow">
              <h2 className="text-2xl font-bold mb-4">Attendance Reports</h2>
              <p>Last Seven Days Report</p>
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {/* Placeholder for the chart */}
                Chart
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-2xl font-bold mb-4">Total Reports</h2>
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {/* Placeholder for the pie chart */}
                Pie Chart 
              </div>
            </div>
        </div>
    </>
  );
};

export default Overview;
