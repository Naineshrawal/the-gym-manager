import { faCircleChevronLeft, faSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useUser } from '../../context/UserContext'

function ViewAttendance({attendance, 
    setView, 
    setAttendance,
    setMemberName,
    memberName}) {
        const {user} = useUser()
    const months = ['JAN','FAB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
 
    
  return (
    <>
        <div className="section-container  m-5 min-h-screen">
                {user.role==='admin' && <button onClick={()=>(setView(false),setAttendance([]),setMemberName(''))} className='bg-black mb-10 text-white px-2 py-1 rounded-3xl'><FontAwesomeIcon  icon={faCircleChevronLeft}/> Go Back</button>}
                <div className='bg-white py-2 rounded-lg max-w-[500px] shadow-md mx-auto'>
                    <h1 className='text-center text-brand-neutral font-bold text-xl mt-4'>Attendance Celender</h1>
                    <p className='text-center text-lg font-semibold text-brand-primary'><span className='text-center text-base font-medium text-brand-dark'>Member Name : </span>{memberName}</p>
                    <div className='rounded-lg overflow-hidden mx-auto max-w-[482px] h-[264px]'>
                        
                    {attendance.length?
                    <div className='bg-[#e8e5ec] p-1  gap-1 max-w-[482px] h-[264px] overflow-y-scroll mx-auto flex  flex-wrap '>
                        {attendance.map((att, index)=>(
                            <div className={`w-16 h-12 mb-1 flex flex-col items-center rounded justify-center ${att.status == 'present' ? 'bg-green-600': 'bg-red-500'}`} 
                            key={index}>
                                <h1 className='font-bold text-white'>
                                    {parseInt(att.date.slice(8,10))}
                                </h1>
                                <p className='text-[8px] text-gray-800 font-semibold'>
                                    {months[parseInt(att.date.slice(5,7)) - 1]}/
                                    {att.date.slice(0,4)}
                                </p>
                            </div>
                        ))}
                    </div>
                    :
                    <div className='bg-[#e8e5ec] text-gray-500  flex flex-col items-center justify-center max-w-[482px] h-[264px]  '>
                        <h1 className='text-5xl'>No Data </h1>
                        <p className='tracking-[10px]'>Available</p>
                    </div>
                    }
                    </div>
                    <div className='flex justify-center gap-4'>
                        <div className='flex items-center gap-1'>
                            <FontAwesomeIcon color='#16A34A' icon={faSquare}/>
                            <p>Present</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <FontAwesomeIcon color='#FE4444' icon={faSquare}/>
                            <p>Absent</p>
                        </div>
                    </div>
                    
                </div>
                    
        </div>
        
    </>
  )
}

export default ViewAttendance
