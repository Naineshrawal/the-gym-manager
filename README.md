
# The Gym Manager

Gym Manager is a web application designed to streamline the management of gym operations. It offers a range of features including member management, trainer management, billing, attendance tracking, notifications, and a responsive, elegant dashboard for admins, trainers, and members.

## To Explore The Functionalities

- Here is the some user credentials to login ad check the funcyionalities
  
Admin Login
email: nainesh@gmail.com
password: Admin@123

Member Login
email: member3@member.com
password: Member@123

Trainer Login
email : testtrainer123@gmail.com
password : Trainer@123






## Table of content

Table of Contents
- Features
- Installation
- Usage
- Basic Workflow and Execution
- Folder Structure
- Components
- Firebase Setup
- Logging

## Features

- Trainer Management: Add, view, and manage trainers and their shifts.
- Billing: Generate and send billing notifications.
- Attendance: Track and view member attendance.
- Notifications: Admin can send and receive notifications about member plans.
- Responsive Design: Built with React, Vite, and Tailwind CSS for a responsive and elegant interface.


## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
- Firebase account
Steps

1. Clone the repository
git clone https://github.com/yourusername/gym-manager.git
cd gym-manager

2. Install dependencies
npm install

3. Set up Firebase
- Create a Firebase project and add a web app.
- Copy the Firebase configuration and create a .env file in the root of your project with the following variables:

VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id

4. Start the development server
npm run dev


    
## Usage/Examples

- Admin Dashboard: Manage members, trainers, attendance, notifications, and store.
- Trainer Dashboard: Manage assigned members, view attendance, and track shifts.
- Member Dashboard: View personal details, attendance, and notifications.


## Basic Workflow and Execution
1. User Authentication
- Admin Registration: Admin registers through the software provider
- User Login: Admin, trainers, and members log in through the login form.

2. Dashboard Navigation
- Conditional Rendering: Based on the user's role (admin, trainer, member), different components and functionalities are rendered.
- Admin Dashboard: Access to all management functionalities.
- Trainer Dashboard: Access to member management and attendance tracking.
- Member Dashboard: Access to personal details and attendance view.

3. Member Management
- Add Member: Admin can add new members and store their data in Firestore.
- View Members: Admin and trainers can view member details.
- member bills : admin and trainer can view / create member's bills

4. 4. Trainer Management
- Add Trainer: Admin can add new trainers and store their data in Firestore.
- View Trainers: Member can view and admin can view and manage trainers.

5. Attendance Tracking
- Mark Attendance: Admin and trainer can mark attendance for members.
- View Attendance: Admin  trainers and member can view attendance records.

6. Notifications
- Send Notifications: Admin can send billing and plan renewal notifications.
- Receive Notifications: Admin receives notifications about plan expirations.
- members receives their plan expiry notifications from admin





## Components 

Auth Components
- LoginForm.jsx: Handles user login.


## Dashboard Components

- Overview.jsx: Displays an overview of the gym statistics.
- Trainer.jsx: Manages trainers, including adding trainers and managing shifts.
- Member.jsx: Manages members, including adding new members and viewing details.
- Attendance.jsx: Tracks member attendance.
- packages : manage package plans of the gym 
- Eqipments : manage installed and newly insatsalled equipmetns of the gym 
- Notifications.jsx: Manages notifications for billing and plan renewals.
- Reports : Admin can view the overall reports of the gym
## Firebase Setup

1. Firebase Authentication: Set up email/password authentication.
2. Firestore Database: Create collections for users, attendance, notifications, and store items.
3. Storage: (Optional) Set up Firebase Storage for images and files.
## Logging

Logging is implemented to capture important events and errors using a custom logging service. Logs can be viewed in the console or sent to an external service.
