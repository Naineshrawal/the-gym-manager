import React, { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'
import {  deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/Firebase'
import AddPackage from './AddPackage'
import { logger } from '../logging/Logging'

function Packages() {
    const [adding, setAdding]= useState(false)
    const [editing, setEditing]= useState(false)
    const [editData, setEditData]= useState(null)
    const [editId, setEditId]= useState('')
    const {packageList, packageLoading, fetchPackages,user} = useUser()
    const [searchTerm,setSearchTerm] = useState('')

    const filteredPackages = packageList?.filter((packageItem)=>packageItem.data().name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
    
// deleting package
    const deletePackage = async (dltdoc)=>{
        try{
            await deleteDoc(doc(db, 'packages', dltdoc.id))
            fetchPackages()
        }catch(err){
            logger.error("error while deleting package", err)
        }
    }

// fetching package list when component did mount
    useEffect(()=>{
        fetchPackages()
    },[editing, adding, setAdding ])


  return (
    <div className='section-container m-5 min-h-screen' >
        {/* conditional rendering while adding .1 */}
        {!adding  ? 
            <div className='flex flex-col mt-5'>
                <div className='shadow-lg rounded-xl bg-white overflow-hidden '>   
                        <h1 className='text-center font-bold text-brand-neutral text-2xl my-10 '>Packages List</h1>
                        {/* package search box */}
                        <div className='flex mx-auto mb-4 py-2 pr-4 pl-6 justify-center items-center gap-1 sm:gap-4 border-2 rounded-3xl bg-brand-dark border-gray-600 max-w-[300px] sm:max-w-[400px]'>
                            <input className='border-gray-300 rounded border-2 outline-none grow' id='search-trainer' type="text" onChange={(e)=>setSearchTerm(e.target.value)} />
                            <FontAwesomeIcon className='text-white text-xl' icon={faSearch}/>
                        </div>

                    <div className="overflow-x-auto ">
                        {/* table  */}
                        <table className="w-full border-2  border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400" >
                            {/* thead  */}
                            <thead
                                
                                className="text-xs bg-brand-dark">
                                <tr>
                                    <th  scope="col" className="px-2 py-3 text-[white]">
                                    {"S.No"}
                                    </th>
                                    <th  scope="col" className="px-6 py-3 text-[white]">
                                    {"Package Name"}
                                    </th>
                                    <th  scope="col" className="px-6 py-3 text-[white]">
                                    {"Description"}
                                    </th>
                                    <th  scope="col" className="px-6 py-3 text-[white]">
                                    {"Amount"}
                                    </th>
                                    <th  scope="col" className="px-6 py-3 text-[white]">
                                    {"Duration"}
                                    </th>
                                    {user.role==='admin' && 
                                    <th  scope="col" className="px-6 py-3 text-[white]">
                                    {"Edit"}
                                    </th>}
                                    {user.role==='admin' &&
                                    <th  scope="col" className="px-6 py-3 text-[white]">
                                    {"Delete"}
                                    </th>}
                                </tr>
                            </thead>
                            {/* tbody  */}
                            {!packageLoading ?
                            // conditional rendering while package is loading .1
                            <>
                            {searchTerm?
                                <>
                                {/* consitional rendering for search filter .1 */}
                                {filteredPackages.map((doc, index)=>(
                                    <tbody key={index}>
                                            <tr className=" border-b-2">
                                                {/* S.No   */}
                                                <td  className="px-4 py-4">
                                                    {index + 1}.
                                                </td>
                                                {/* Package Name */}
                                                <td  scope="row" className="px-6 py-4 font-medium ">
                                                    {doc?.data().name} 
                                                </td>
                                                {/* Description*/}
                                                <td  className="px-6 py-4">
                                                    {doc?.data().description}
                                                </td>
                                                {/* Amount*/}
                                                <td  className="px-6 py-4">
                                                    {doc?.data().amount}
                                                </td>
                                                {/* duration */}
                                                <td  className="px-6 py-4">
                                                    {doc?.data().duration}
                                                    
                                                </td>
                                                {/* edit  */}
                                                {user.role==='admin' &&
                                                <td  className="px-6 py-4">
                                                    <div >
                                                        <FontAwesomeIcon onClick={()=>(
                                                        setEditing(true), 
                                                        setAdding(true), 
                                                        setEditData(doc?.data()), 
                                                        setEditId(doc.id))}  
                                                        className='text-brand-primary font-bold cursor-pointer text-xl' 
                                                        icon={faEdit} />
                                                    </div>
                                                </td>}
                                                {/* delete */}
                                                {user.role==='admin' &&
                                                <td  className="px-6 py-4">
                                                    <FontAwesomeIcon  
                                                    onClick={()=>{deletePackage(doc)}} 
                                                    className='text-brand-primary font-bold cursor-pointer text-xl' 
                                                    icon={faTrash} />
                                                </td>}
                                            </tr>
                                    </tbody>
                                ))} 
                                </>
                                :
                                <>
                                {/* consitional rendering for search filter .2 */}
                                {packageList.map((doc, index)=>(
                                    <tbody key={index}>
                                            <tr className=" border-b-2">
                                                {/* S.No   */}
                                                <td  className="px-4 py-4">
                                                    {index + 1}.
                                                </td>
                                                {/* Package Name */}
                                                <td  scope="row" className="px-6 py-4 font-medium ">
                                                    {doc?.data().name} 
                                                </td>
                                                {/* Description*/}
                                                <td  className="px-6 py-4">
                                                    {doc?.data().description}
                                                </td>
                                                {/* Amount*/}
                                                <td  className="px-6 py-4">
                                                    {doc?.data().amount}
                                                </td>
                                                {/* duration */}
                                                <td  className="px-6 py-4">
                                                    {doc?.data().duration}
                                                    
                                                </td>
                                                {/* edit  */}
                                                {user.role==='admin' &&
                                                <td  className="px-6 py-4">
                                                    <div >
                                                        <FontAwesomeIcon onClick={()=>(
                                                        setEditing(true), 
                                                        setAdding(true), 
                                                        setEditData(doc?.data()), 
                                                        setEditId(doc.id))}  
                                                        className='text-brand-primary font-bold cursor-pointer text-xl' 
                                                        icon={faEdit} />
                                                    </div>
                                                </td>}
                                                {/* delete */}
                                                {user.role==='admin' &&
                                                <td  className="px-6 py-4">
                                                    <FontAwesomeIcon  
                                                    onClick={()=>{deletePackage(doc)}} 
                                                    className='text-brand-primary font-bold cursor-pointer text-xl' 
                                                    icon={faTrash} />
                                                </td>}
                                            </tr>
                                    </tbody>
                                ))} 
                                </>
                            }
                            </>
                            :
                            // conditional rendering while package is loading showing loading img .2
                            <tbody className=''>
                            <tr ><td className='flex text-base sm:text-xl font-semibold items-center'><img className='rounded-full w-6 sm:w-8'  src="/images/loading-icon.svg" alt="loading icon" />Loading...</td></tr>
                            </tbody>
                            }
                            
                        </table>
                    </div>
                </div>
                {user.role ==='admin' && 
                <button type='button' 
                onClick={()=>setAdding(true)} 
                className='p-2 rounded-lg mt-4 text-white text-xl bg-brand-primary mx-auto hover:bg-brand-accent'
                        >Add New Package
                </button>}
            </div>
        :
            // conditional rendering while adding .2
            <AddPackage 
            setAdding={setAdding}
            setEditing={setEditing}
            editing={editing}
            editData={editData}
            setEditData={setEditData}
            editId={editId}
            setEditId={setEditId}
            />
        }
        
      </div>
  )
}

export default Packages
