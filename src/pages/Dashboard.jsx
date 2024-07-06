import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faDumbbell, faCalendarCheck, faSuitcase, faUserFriends, faChevronRight, faReceipt, faBell } from '@fortawesome/free-solid-svg-icons';

import { useUser } from '../context/UserContext';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [asideWidth, setAsideWidth] = useState('w-12')
  const [hidden, setHidden] = useState("invisible")
  const [rotate, setRotate] = useState('scale-x-100')

  const {user} = useUser()

 
  if (!user) {
    return <div className='flex justify-center text-2xl font-bold text-brand-dark items-center py-10'><img src="/images/loading-icon.svg" width={'48px'} alt="loading-icon" /> <span>Loading...</span> </div>
  }

  const toggleWidth = ()=>{
    if(asideWidth === 'w-64'){
      setRotate('scale-x-100')
      setHidden('invisible')
      setAsideWidth('w-12')
    }else{
      setRotate('-scale-x-100')
      setHidden('visible')
      setAsideWidth('w-64')
    }
  }
  
  
  return (
    <div className="flex  bg-gray-100">
      <aside className={`${asideWidth} duration-500  top-0  bg-[#12313b] text-white flex flex-col`}>
        <nav className="flex-grow relative">
          {/* close aside icon */}
          <div onClick={toggleWidth} className={`absolute  -right-5 py-4 rounded-r-full pr-3    cursor-pointer top-[50vh] z-10 -translate-y-[50%] bg-[#12313b]`}>
            <FontAwesomeIcon  className={`${rotate} duration-700`} icon={faChevronRight} />
          </div>
          
          <ul className='overflow-hidden  text-nowrap '>
          <h1 className={`${hidden} text-center before:block before:absolute relative before:-bottom-1 before:w-36 before:left-[50%] before:rounded-3xl before:-translate-x-[50%] before:h-[1px] before:bg-brand-primary mt-5 text-brand-secondary font-bold text-xl`}>Dashboard</h1>
          {/* conditional rendering for admin role */}
            {user?.role == 'admin' &&
            (<>
              
              <Link to="overview" >
                <li className="px-3 py-4 hover:bg-brand-primary ">
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  <span className={`${hidden} `}>Overview</span>
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
                <li className="px-3 py-4 hover:bg-brand-primary ">
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

            {/* conditional rendering for trainer role */}
            {user?.role === 'trainer' &&
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
                <Link to="members">
                  <li className="px-3 py-4 hover:bg-brand-primary">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    <span className={`${hidden}`}>Members</span>
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
                <Link to="notifications">
                  <li className="px-3 py-4 hover:bg-brand-primary">
                    <FontAwesomeIcon icon={faBell} className="mr-2" />
                    <span className={`${hidden}`}>Notifications</span>
                  </li>
              </Link>
            </>)
            }

            {/* conditional rendering for member role */}
            {user?.role === 'member' &&
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
      <main className="w-full overflow-hidden">
        <Outlet/>
      </main>
    </div>
  );
};

export default Dashboard;
