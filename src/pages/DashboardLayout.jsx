// src/components/DashboardLayout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';


const DashboardLayout = () => {
  const { user } = useUser();
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-brand-dark text-white p-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          
        </div>
        <nav>
          <ul>
            {user?.role === 'admin' && (
              <>
                <li className="mb-4">
                  <Link to="/dashboard/overview" className="text-white">Overview</Link>
                </li>
                <li className="mb-4">
                  <Link to="/dashboard/members" className="text-white">Members</Link>
                </li>
                <li className="mb-4">
                  <Link to="/dashboard/trainers" className="text-white">Trainers</Link>
                </li>
                <li className="mb-4">
                  <Link to="/dashboard/reports" className="text-white">Reports</Link>
                </li>
                <li className="mb-4">
                  <Link to="/dashboard/notifications" className="text-white">Notifications</Link>
                </li>
                <li className="mb-4">
                  <Link to="/dashboard/attendance" className="text-white">Attendance</Link>
                </li>
                <li className="mb-4">
                  <Link to="/dashboard/supplements" className="text-white">Supplements Store</Link>
                </li>
                <li className="mb-4">
                  <Link to="/dashboard/diet-plans" className="text-white">Diet Plans</Link>
                </li>
                <li className="mb-4">
                  <Link to="/dashboard/fees-structure" className="text-white">Fees Structure</Link>
                </li>
              </>
            )}
            {user?.role === 'trainer' && (
              <>
                <li className="mb-4">
                  <Link to="/dashboard/members" className="text-white">Members</Link>
                </li>
                <li className="mb-4">
                  <Link to="/dashboard/attendance" className="text-white">Attendance</Link>
                </li>
                <li className="mb-4">
                  <Link to="/dashboard/diet-plans" className="text-white">Diet Plans</Link>
                </li>
              </>
            )}
            {user?.role === 'member' && (
              <>
                <li className="mb-4">
                  <Link to="/dashboard/overview" className="text-white">Overview</Link>
                </li>
                <li className="mb-4">
                  <Link to="/dashboard/diet-plans" className="text-white">Diet Plans</Link>
                </li>
                <li className="mb-4">
                  <Link to="/dashboard/attendance" className="text-white">Attendance</Link>
                </li>
                <li className="mb-4">
                  <Link to="/dashboard/fees-structure" className="text-white">Fees Structure</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
      
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
