import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import BackButton from '../BackButton';
import { useUser } from '../../context/UserContext';

function ViewMembers() {
    const {memberLoading,fetchMembers,membersList} = useUser()

    useEffect(()=>{
      

        fetchMembers()
      },[])
  return (
    <>
      <div className='section-container mb-5' >
        <BackButton link={'/dashboard/members'}/>
          <h1 className='text-center font-bold text-brand-neutral text-2xl mb-5'>Members List</h1>
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
                {!memberLoading ?
                <>
                  {membersList.map((doc, index)=>(
                    
                      <tbody key={doc.id}>
                              <tr className=" border-b-2">
                                  {/* S.No   */}
                                  <td  className="px-6 py-4">
                                      {index + 1}.
                                  </td>
                                  {/* Name */}
                                  <td  scope="row" className="px-6 py-4 font-medium ">
                                      {doc.data()?.name} 
                                  </td>
                                  {/* profile Img */}
                                  <td  className="px-6 py-4">
                                      {"image"}
                                  </td>
                                  {/* Number*/}
                                  <td  className="px-6 py-4">
                                      {doc.data()?.mobile}
                                  </td>
                                  <td  className="px-6 py-4">
                                      {doc.data()?.age}
                                  </td>
                                  {/* Joinning Date */}
                                  <td  className="px-6 py-4">
                                      {doc.data()?.joinningDate}
                                  </td>
                                  {/* edit  */}
                                  <td  className="px-6 py-4">
                                    <FontAwesomeIcon className='text-brand-primary font-bold cursor-pointer text-xl' icon={faEdit} />
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
  )
}

export default ViewMembers
