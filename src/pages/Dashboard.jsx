import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faUsers, faDumbbell, faUserPlus, faFileExport, faBell, faCheckSquare, faStore, faUtensils, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  return (
    <div className="dashboard min-h-screen bg-gray-100">
      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-brand-dark mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow hover:bg-brand-primary transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faDollarSign} className="text-4xl text-brand-secondary mb-4" />
            <h3 className="text-xl font-bold text-brand-dark">Billing Systems</h3>
            <p className="text-brand-neutral mt-2">Manage all billing related tasks.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:bg-brand-primary transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faUsers} className="text-4xl text-brand-secondary mb-4" />
            <h3 className="text-xl font-bold text-brand-dark">Members List</h3>
            <p className="text-brand-neutral mt-2">View and manage gym members.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:bg-brand-primary transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faDumbbell} className="text-4xl text-brand-secondary mb-4" />
            <h3 className="text-xl font-bold text-brand-dark">Trainers List</h3>
            <p className="text-brand-neutral mt-2">View and manage trainers.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:bg-brand-primary transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faUserPlus} className="text-4xl text-brand-secondary mb-4" />
            <h3 className="text-xl font-bold text-brand-dark">Trainer Assigning</h3>
            <p className="text-brand-neutral mt-2">Assign trainers to members.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:bg-brand-primary transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faFileExport} className="text-4xl text-brand-secondary mb-4" />
            <h3 className="text-xl font-bold text-brand-dark">Report Exports</h3>
            <p className="text-brand-neutral mt-2">Export various reports.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:bg-brand-primary transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faBell} className="text-4xl text-brand-secondary mb-4" />
            <h3 className="text-xl font-bold text-brand-dark">Monthly Notifications</h3>
            <p className="text-brand-neutral mt-2">Send monthly notifications to members.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:bg-brand-primary transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faCheckSquare} className="text-4xl text-brand-secondary mb-4" />
            <h3 className="text-xl font-bold text-brand-dark">Attendance System</h3>
            <p className="text-brand-neutral mt-2">Track attendance of members.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:bg-brand-primary transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faStore} className="text-4xl text-brand-secondary mb-4" />
            <h3 className="text-xl font-bold text-brand-dark">Supplements Store</h3>
            <p className="text-brand-neutral mt-2">Manage supplements store.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:bg-brand-primary transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faUtensils} className="text-4xl text-brand-secondary mb-4" />
            <h3 className="text-xl font-bold text-brand-dark">Diet Plans</h3>
            <p className="text-brand-neutral mt-2">Create and manage diet plans.</p>
          </div>
          <div className="bg-white p-6 rounded shadow hover:bg-brand-primary transition-colors cursor-pointer">
            <FontAwesomeIcon icon={faFileInvoiceDollar} className="text-4xl text-brand-secondary mb-4" />
            <h3 className="text-xl font-bold text-brand-dark">Fees Structure Plans</h3>
            <p className="text-brand-neutral mt-2">Manage fees structure plans.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
