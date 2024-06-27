import { faCircleChevronLeft, faSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function ViewAttendance({attendance, setView, setAttendance}) {
    const months = ['JAN','FAB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  
    
  return (
    <>
        <div className="section-container  mb-5 min-h-screen">
                <button onClick={()=>(setView(false),setAttendance([]))} className='bg-black mb-10 text-white px-2 py-1 rounded-3xl'><FontAwesomeIcon fill='red' icon={faCircleChevronLeft}/> Go Back</button>
                <div className='bg-white py-2 rounded-lg max-w-[500px] shadow-md mx-auto'>
                    <h1 className='text-center text-brand-neutral font-bold text-xl py-4'>Attendance Celender</h1>
                    <div className='bg-[#e8e5ec] p-1 gap-1 max-w-[482px] h-[264px] overflow-y-scroll mx-auto flex flex-wrap '>
                        {attendance.map((att, index)=>
                            (<div className={`w-16 h-12 mb-1 flex flex-col items-center rounded justify-center ${att.status == 'present' ? 'bg-green-600': 'bg-red-500'}`} 
                            key={index}>
                                <h1 className='font-bold text-white'>
                                    {parseInt(att.date.slice(8,10))}
                                </h1>
                                <p className='text-[8px] text-gray-800 font-semibold'>
                                    {months[parseInt(att.date.slice(5,7)) - 1]}/
                                    {att.date.slice(0,4)}
                                </p>
                            </div>))}
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
