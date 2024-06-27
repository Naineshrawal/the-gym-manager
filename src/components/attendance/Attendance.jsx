import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, Timestamp, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import { useUser } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faPlus, faSquare } from '@fortawesome/free-solid-svg-icons';
import { set } from 'firebase/database';
import { toast } from 'react-toastify';
import ViewAttendance from './ViewAttendance';



const Attendance = () => {
  const { fetchMembers,membersList, memberLoading } = useUser();
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState('');
  const [view, setView] = useState(false);
  const [showError, setShowError] = useState('hidden');
  
  
  useEffect(()=>{
    fetchMembers()
  },[])


  const fetchAttendanceRecords = async (memberId) => {

    try {
        
        const docRef =collection( doc(db, 'users' ,`${memberId}`), "memberAttendance")
        const snapShot = await getDocs(docRef)
        let attArr = []
        snapShot.docs.map((doc)=>{
                attArr.push({...doc.data(), date:doc.id})
        })
        setAttendance(attArr)

    // console.log(snapShot.docs.map((doc)=>console.log({...doc.data(), date:doc.id})))
    
    } catch (error) {
      console.error('Error fetching attendance records:', error);
    }
    
    
  };
  

    const takeAttendance = async (memberId, status) => {
   
    try {
        
        const docRef = doc(db, `users/${memberId}/memberAttendance`, date)
        await setDoc(docRef, {
            status
        })
        toast.success('Sent Successfully')
    } catch (err) {
        
        console.log(err)
    }
    
  };

  return (
    <>
    {!view?
    <div className="section-container p-8 bg-white rounded-lg shadow-md  mb-5">
        <h3 className="text-2xl text-center font-bold mb-8 text-brand-dark">Attendance</h3>
        <div className=' ' >
          
            <div className="overflow-x-auto shadow-md rounded-xl">
                {/* table  */}
                <table className="w-full border-2  border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400" >
                    {/* thead  */}
                    <thead
                        
                        className="text-xs bg-brand-dark">
                        <tr>
                            <th  scope="col" className="px-6 py-3 text-[white]">
                            {"S.No"}
                            </th>
                            <th  scope="col" className="px-6 py-3 text-[white]">
                            {"Name"}
                            </th>
                            <th  scope="col" className="px-6 py-3 text-[white] text-center">
                            {"Take Attendance"}
                            </th>
                            <th  scope="col" className="px-6 py-3 text-[white] text-center">
                            {"View Attendance"}
                            </th>
                            
                        </tr>
                    </thead>
                    {/* tbody  */}
                    {!memberLoading ?
                    <>
                        <tbody >
                            <tr  className='px-6 py-4 border-b-[2px] border-brand-dark'>
                                <td colSpan={4} align='center' className='px-6 py-2 relative'>
                                    
                                    <form className=''>
                                        <label className=" text-brand-dark font-semibold mr-2">Select Date  </label>
                                        <input
                                                type="date"
                                                value={date}
                                                onChange={(e) => (setDate(e.target.value),setShowError('hidden'))}
                                                className=" bg-brand-neutral py-1 px-2 text-white rounded-md border-gray-300 shadow-sm "
                                                required
                                        />
                                        <label className={`text-[#ff3737] font-bold ${showError} `}>! Please Select Date First </label>
                                    </form>
                                </td>
                            </tr>
                            {membersList.map((member, index)=>(
                                <tr key={member.id} className=" border-b-2">
                                    {/* S.No   */}
                                    <td  className="px-6 py-4">
                                        {index + 1}.
                                    </td>
                                    {/* Name */}
                                    <td  scope="row" className="px-6 py-4 font-medium ">
                                        {member.data()?.name} 
                                    </td>
                                    {/* take attendance */}
                                    <td  scope="row" className="px-6 py-4 font-medium text-center space-x-2">
                                        <div onClick={()=>{
                                            if(date){
                                                takeAttendance(member.id , 'present')
                                            }else{
                                                setShowError('block')
                                            }
                                        }} className="inline-flex items-center bg-brand-accent py-1 px-2 rounded-3xl text-black cursor-pointer">
                                            {/* <FontAwesomeIcon className='cursor-pointer bg-brand-accent  rounded-full text-white w-4 h-4 p-1 ' icon={faPlus} /> */}
                                            <span>Present</span>
                                        </div>
                                        <div onClick={()=>{
                                            if(date){
                                                takeAttendance(member.id , 'absent')
                                            }else{
                                                setShowError('block')
                                            }
                                        }} className="inline-flex items-center bg-brand-primary py-1 px-2 rounded-3xl text-white cursor-pointer">
                                            {/* <FontAwesomeIcon className='cursor-pointer bg-brand-primary  rounded-full text-white w-4 h-4 p-1  ' icon={faPlus} /> */}
                                            <span>Absent</span>
                                        </div>
                                        
                                        
                                    </td>
                                    {/* view attendance */}
                                    <td  scope="row" className="px-6 py-4 font-medium text-center">
                                        <div onClick={()=>(
                                            fetchAttendanceRecords(member.id),
                                            setView(true),
                                            setAttendance([])
                                            )} className="inline-flex items-center bg-brand-primary py-1 px-2 rounded-3xl text-white cursor-pointer">
                                            {/* <FontAwesomeIcon className='cursor-pointer bg-brand-primary  rounded-full text-white w-4 h-4 p-1  ' icon={faPlus} /> */}
                                            <span>View Attendace</span>
                                        </div> 
                                    </td>
                                    
                                </tr>
                            ))} 
                    </tbody>
                    </>
                    :
                    <tbody className=''>
                    <tr ><td className='flex text-base sm:text-xl font-semibold items-center'><img className='rounded-full w-6 sm:w-8'  src="/images/loading-icon.svg" alt="loading icon" />Loading...</td></tr>
                    </tbody>
                    }
                    
                </table>
            </div>
        </div>
    </div>
    :
    // view attendance
    <ViewAttendance 
        attendance={attendance} 
        setAttendance={setAttendance} 
        setView={setView} 
    />
  }
  </>
  )};



export default Attendance;