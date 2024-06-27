import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import BackButton from '../BackButton';
import { useUser } from '../../context/UserContext';

const ViewTrainer =  () => {
  const {TrainerLoading,fetchTrainer,trainerList} = useUser()


    useEffect(()=>{
      

      fetchTrainer()
    },[])
  // console.log(trainerList);
  return (
    <>
      <div className=' section-container   mb-5' >
        <BackButton link={'/dashboard/trainers'}/>
          <h1 className='text-center font-bold text-brand-neutral text-2xl mb-5'>Trainer List</h1>
        <div className="overflow-x-auto shadow-md sm:rounded-xl">
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
                        <th  scope="col" className="px-6 py-3 text-[white]">
                          {"Profile"}
                        </th>
                        <th  scope="col" className="px-6 py-3 text-[white]">
                          {"Number"}
                        </th>
                        <th  scope="col" className="px-6 py-3 text-[white]">
                          {"Age"}
                        </th>
                        <th  scope="col" className="px-6 py-3 text-[white]">
                          {"Salary"}
                        </th>
                        <th  scope="col" className="px-6 py-3 text-[white]">
                          {"Joined"}
                        </th>
                        <th  scope="col" className="px-6 py-3 text-[white]">
                          {"Edit"}
                        </th>
                        <th  scope="col" className="px-6 py-3 text-[white]">
                          {"Delete"}
                        </th>
                    </tr>
                </thead>
                {/* tbody  */}
                {!TrainerLoading ?
                <>
                  {trainerList.map((doc, index)=>(
                      <tbody key={index}>
                              <tr className=" border-b-2">
                                  {/* S.No   */}
                                  <td  className="px-6 py-4">
                                      {index + 1}.
                                  </td>
                                  {/* Name */}
                                  <td  scope="row" className="px-6 py-4 font-medium ">
                                      {doc?.name} 
                                  </td>
                                  {/* profile Img */}
                                  <td  className="px-6 py-4">
                                      {"image"}
                                  </td>
                                  {/* Number*/}
                                  <td  className="px-6 py-4">
                                      {"8460068103"}
                                  </td>
                                  <td  className="px-6 py-4">
                                      {doc?.age}
                                  </td>
                                  {/* salary */}
                                  <td  className="px-6 py-4">
                                      {doc?.salary}
                                  </td>
                                  {/* Joinning Date */}
                                  <td  className="px-6 py-4">
                                      {"21/02/2024"}
                                  </td>
                                  {/* edit  */}
                                  <td  className="px-6 py-4">
                                  <FontAwesomeIcon className='text-brand-primary font-bold cursor-pointer text-xl' icon={faEdit} />
                                      {/* <button className=' px-4 py-1 rounded-lg text-[white] font-bold bg-red-500'>
                                        Edit
                                      </button> */}
                                  </td>
                                  {/* delete */}
                                  <td  className="px-6 py-4">
                                      
                                  <FontAwesomeIcon className='text-brand-primary font-bold cursor-pointer text-xl' icon={faTrash} />
                                  </td>
                              </tr>
                      </tbody>
                  ))} 
                </>
                :
                <tbody className=''>
                  <tr ><td className='flex text-base sm:text-xl font-semibold items-center'><img className='rounded-full w-6 sm:w-8'  src="/images/loading-icon.svg" alt="loading icon" />Loading...</td></tr>
                </tbody>
                }
                
            </table>
        </div>
      </div>
    </>
  );
};

export default ViewTrainer;
