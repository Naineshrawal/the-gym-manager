import React from 'react';
// import gymEquipment from '../assets/gym-equipment.jpg'; // replace with actual image paths
// import gymLogo from '../assets/gym-logo.jpg'; // replace with actual image paths

function About() {
  return (
    <div className="about min-h-screen bg-gray-100">
      <main className="container mx-auto p-6">
        <section className="text-center mb-12">
          <img src='/images/logo.png' alt="Gym Logo" className="w-32 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-brand-dark">About Us</h2>
          <p className="text-brand-neutral mt-4 max-w-2xl mx-auto">
            The Gym Manager is a comprehensive gym management software designed to streamline your fitness business operations. From billing systems and member management to trainer assignments and dietary plans, our software covers all aspects of your gym's needs.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="flex items-center">
            <img src='/images/gym-equipments.jpg' alt="Gym Equipment" className="rounded shadow-lg w-full" />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-brand-dark mb-4">Why Choose Us?</h3>
            <p className="text-brand-neutral mb-4">
              At The Gym Manager, we are committed to providing the best software solutions for gym management. Our platform offers an array of features designed to enhance the efficiency and effectiveness of gym operations, making it easier for gym owners to manage their business.
            </p>
            <ul className="list-disc list-inside text-brand-neutral">
              <li>Comprehensive Billing Systems</li>
              <li>Member and Trainer Management</li>
              <li>Attendance Tracking</li>
              <li>Diet and Workout Plans</li>
              <li>Supplement Store Management</li>
              <li>Report Exports and Notifications</li>
            </ul>
          </div>
        </section>

        <section className="text-center">
          <h3 className="text-2xl font-bold text-brand-dark mb-4">Our Mission</h3>
          <p className="text-brand-neutral max-w-2xl mx-auto">
            Our mission is to empower gym owners and managers with the tools they need to run their facilities efficiently. We aim to simplify the complexities of gym management so that you can focus on what you do best – helping your members achieve their fitness goals.
          </p>
        </section>
      </main>
    </div>
  );
}

export default About;
