// src/components/dashboard/Overview.jsx
import React from 'react';
import { useUser } from '../context/UserContext';
import Logout from './Logout';


const Overview = () => {
  const { user } = useUser();

  return (
    <>
        <div className="bg-white flex justify-between p-6 rounded-lg shadow-lg mb-2">
            <h1 className="text-3xl font-bold">Hello {user.name} </h1>
            <Logout/>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-2">
          <h1 className="text-2xl font-bold text-brand-primary mb-4">Dashboard Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
              <div className="bg-brand-primary p-4 rounded-lg text-white">
              <h2 className="text-lg font-bold">Total Members</h2>
              <p className="text-4xl">150</p>
              </div>
              <div className="bg-brand-secondary p-4 rounded-lg text-white">
              <h2 className="text-lg font-bold">Total Trainers</h2>
              <p className="text-4xl">25</p>
              </div>
              <div className="bg-brand-accent p-4 rounded-lg text-white">
              <h2 className="text-lg font-bold">Monthly Revenue</h2>
              <p className="text-4xl">$12,000</p>
              </div>
              <div className="bg-brand-neutral p-4 rounded-lg text-white">
              <h2 className="text-lg font-bold">Active Subscriptions</h2>
              <p className="text-4xl">135</p>
              </div>
          </div>
        </div>
        <div className="bg-white flex grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg shadow-lg mb-2">
          <div className="bg-white p-4 rounded shadow">
              <h2 className="text-2xl font-bold mb-4">Attendance Reports</h2>
              <p>Last Seven Days Report</p>
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {/* Placeholder for the chart */}
                Chart Placeholder
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-2xl font-bold mb-4">Total Reports</h2>
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {/* Placeholder for the pie chart */}
                Pie Chart Placeholder
              </div>
            </div>
        </div>
    </>
  );
};

export default Overview;
