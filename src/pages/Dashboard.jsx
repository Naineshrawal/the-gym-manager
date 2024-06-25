import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faDumbbell, faCalendarCheck, faSuitcase, faUserFriends, faChevronRight, faReceipt, faBell } from '@fortawesome/free-solid-svg-icons';

import { useUser } from '../context/UserContext';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [asideWidth, setAsideWidth] = useState(10)
  const [hidden, setHidden] = useState("hidden")
  const [rotate, setRotate] = useState('scale-x-100')

  const {user} = useUser()

 
  if (!user) {
    return <div className='flex justify-center text-2xl font-bold text-brand-dark items-center py-10'><img src="/images/loading-icon.svg" width={'48px'} alt="loading-icon" /> <span>Loading...</span> </div>
  }

  const toggleWidth = ()=>{
    if(asideWidth === 64){
      setRotate('scale-x-100')
      setHidden('hidden')
      setAsideWidth(10)
    }else{
      setRotate('-scale-x-100')
      setHidden('inline-block')
      setAsideWidth(64)
    }
  }
  
  
  return (
    <div className="flex  bg-gray-100">
      <aside className={`w-${asideWidth}   top-0  bg-[#12313b] text-white flex flex-col`}>
        <nav className="flex-grow relative">
          {/* close aside icon */}
          <div onClick={toggleWidth} className={`absolute  -right-5 py-4 rounded-r-full pr-3    cursor-pointer top-[50vh] -translate-y-[50%] bg-[#12313b]`}>
            <FontAwesomeIcon  className={`${rotate} duration-700`} icon={faChevronRight} />
          </div>
          
          <div className={`p-4 overflow-hidden ${hidden} text-xl font-bold`}>Gym Management System</div>
          <ul className='overflow-hidden'>
            {user?.role == 'admin' &&
            (<>
              
            <Link to="overview" >
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              <span className={`${hidden}`}>Overview</span>
            </li>
            </Link>
            <Link to="trainers" >
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
              <span className={`${hidden}`}>Trainers</span>
            </li>
            </Link>
            <Link to="packages">
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faSuitcase} className="mr-2" />
              <span className={`${hidden}`}>Packages</span>
            </li>
            </Link>
            <Link to="members">
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <span className={`${hidden}`}>Members</span>
            </li>
            </Link>
            <Link to="attendance">
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
              <span className={`${hidden}`}>Attendance</span>
            </li>
            </Link>
            <Link to="equipments">
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faDumbbell} className="mr-2" />
              <span className={`${hidden}`}>Equipments</span>
            </li>
            </Link>
            <Link to="reports">
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faReceipt} className="mr-2" />
              <span className={`${hidden}`}>Reports</span>
            </li>
            </Link>
            <Link to="notifications">
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faBell} className="mr-2" />
              <span className={`${hidden}`}>Notifications</span>
            </li>
            </Link>
            
            </>)
            }
            {user?.role === 'trainer' &&
            (<>
            <Link to="overview" >
              <li className="px-3 py-4 hover:bg-brand-primary">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                <span className={`${hidden}`}>Overview</span>
              </li>
            </Link>
            <Link to="packages">
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faSuitcase} className="mr-2" />
              <span className={`${hidden}`}>Packages</span>
            </li>
            </Link>
            <Link to="members">
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <span className={`${hidden}`}>Members</span>
            </li>
            </Link>
            <Link to="equipments">
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faDumbbell} className="mr-2" />
              <span className={`${hidden}`}>Equipments</span>
            </li>
            </Link>
            </>)
            }
            {user?.role === 'member' &&
            (<>
            <Link to="overview" >
              <li className="px-3 py-4 hover:bg-brand-primary">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                <span className={`${hidden}`}>Overview</span>
              </li>
            </Link>
            <Link to="packages">
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faSuitcase} className="mr-2" />
              <span className={`${hidden}`}>Packages</span>
            </li>
            </Link>
            
            <Link to="equipments">
            <li className="px-3 py-4 hover:bg-brand-primary">
              <FontAwesomeIcon icon={faDumbbell} className="mr-2" />
              <span className={`${hidden}`}>Equipments</span>
            </li>
            </Link>
            </>)
            }
          </ul>
        </nav>
      </aside>
      <main className="w-full overflow-hidden p-6">
        <Outlet/>
      </main>
    </div>
  );
};

export default Dashboard;
