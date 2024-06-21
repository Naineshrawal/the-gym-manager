import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faDumbbell, faCalendarCheck, faSuitcase, faUserFriends, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/Firebase';
import { useUser } from '../context/UserContext';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [asideWidth, setAsideWidth] = useState(10)
  const [hidden, setHidden] = useState("hidden")
  const [rotate, setRotate] = useState('0')

  const {user} = useUser()

  console.log(user);
  if (!user) {
    return <p>Loading...</p>;
  }

  const toggleWidth = ()=>{
    if(asideWidth === 64){
      setRotate('0')
      setHidden('hidden')
      setAsideWidth(10)
    }else{
      setRotate('100')
      setHidden('inline-block')
      setAsideWidth(64)
    }
  }
  
  const logout =  ()=>{
    signOut(auth)
    
    console.log("user sign out");
  }
  return (
    <div className="flex  bg-gray-100">
      <aside className={`w-${asideWidth} duration-500 ease-in-out  top-0  bg-[#12313b] text-white flex flex-col`}>
        <nav className="flex-grow relative">
          {/* close aside icon */}
          <div onClick={toggleWidth} className={`absolute  -right-5 py-4 rounded-r-full pr-3    cursor-pointer md:top-[50%] top-[15%] -translate-y-[50%] bg-[#12313b]`}>
            <FontAwesomeIcon  className={`-scale-x-${rotate} duration-700`} icon={faChevronRight} />
          </div>
          
          <div className={`p-4 overflow-hidden ${hidden} text-xl font-bold`}>Gym Management System</div>
          <ul className='overflow-hidden'>
            <Link to="/dashboard/overview" >
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              <span className={`${hidden}`}>Overview</span>
            </li>
            </Link>
            <Link to="/dashboard/trainers" >
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
              <span className={`${hidden}`}>Trainers</span>
            </li>
            </Link>
            <Link to="/dashboard/packages">
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faSuitcase} className="mr-2" />
              <span className={`${hidden}`}>Packages</span>
            </li>
            </Link>
            <Link to="/dashboard/members">
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <span className={`${hidden}`}>Members</span>
            </li>
            </Link>
            <Link to="/dashboard/attendance">
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
              <span className={`${hidden}`}>Attendance</span>
            </li>
            </Link>
            <Link to="/dashboard/equipments">
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faDumbbell} className="mr-2" />
              <span className={`${hidden}`}>Equipments</span>
            </li>
            </Link>
            <Link to="/dashboard/reports">
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faDumbbell} className="mr-2" />
              <span className={`${hidden}`}>Reports</span>
            </li>
            </Link>
            <Link to="/dashboard/notifications">
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faDumbbell} className="mr-2" />
              <span className={`${hidden}`}>Notifications</span>
            </li>
            </Link>
          </ul>
        </nav>
      </aside>
      <main className="flex-grow p-6">
        <Outlet/>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Hello {user.name} </h1>
          <button onClick={logout} className="bg-brand-primary text-white px-4 py-2 rounded">Logout</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <FontAwesomeIcon icon={faUser} className="text-4xl text-brand-primary mb-2" />
            <h2 className="text-2xl font-bold">Number of Members</h2>
            <p className="text-3xl">2</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <FontAwesomeIcon icon={faUserFriends} className="text-4xl text-brand-primary mb-2" />
            <h2 className="text-2xl font-bold">Number of Trainers</h2>
            <p className="text-3xl">3</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <FontAwesomeIcon icon={faDumbbell} className="text-4xl text-brand-primary mb-2" />
            <h2 className="text-2xl font-bold">Number of Equipments</h2>
            <p className="text-3xl">3</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <FontAwesomeIcon icon={faSuitcase} className="text-4xl text-brand-primary mb-2" />
            <h2 className="text-2xl font-bold">Number of Packages</h2>
            <p className="text-3xl">2</p>
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default Dashboard;
