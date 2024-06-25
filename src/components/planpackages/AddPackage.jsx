import React, { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faX } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

function AddPackage({
                        editing, 
                        setEditing, 
                        setAdding, 
                        editData,
                        setEditData, 
                        editId
                    }) {

                        const [packageName, setPackageName] = useState('')
                        const [description, setDescription] = useState('')
                        const [amount, setAmount] = useState('')
                        const [duration, setDuartion] = useState('')
                        
                        const {addingPackage} = useUser()
                        const navigate = useNavigate()
                        

    
                        
    useEffect(()=>{
        if(editData){
            console.log(editData);
            setPackageName(editData.name)
            setAmount(editData.amount)
            setDuartion(editData.duration)
            setDescription(editData.description)
        }
    },[editData])
    const addNewPackage = async ()=>{
        
        try{
            await addingPackage({
                name:packageName,
                amount,
                duration,
                description,
                type:'package',
                editId,
            })
            if(editData){
                toast.success('Edit Package Success !!')
            }else{
                toast.success('Package Added Successfully!!')
                
            }
            
        }catch(err){
            console.log(err);
        }
        
       
        setPackageName('')
        setDescription('')
        setAmount('')
        setDuartion('')
        navigate('/dashboard/packages')
        setEditing(false)
        setAdding(false)
        setEditData(null)
    }
    return (
        <div className='bg-white relative p-6 rounded-lg shadow-lg '>
        <FontAwesomeIcon className=' text-brand-primary absolute cursor-pointer right-3 top-3' icon={faX} 
        onClick={()=>(
            setEditData(null),
            setAdding(false),
            setEditing(false)
        )} />
        <h1 className='text-center font-bold text-brand-neutral text-2xl my-5'>Add Package</h1>
        <form >
        <div className="mb-2">
          <label htmlFor="name" className="block text-gray-700">Package Name:</label>
          <input
            type="text"
            id="name"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
          <div className='mb-2 flex flex-col sm:flex-row gap-4'>
            <div className='w-full'>
                <label className='text-gray-700' htmlFor="amount">Amount:</label>
                <input 
                required 
                className="w-full p-2 border border-gray-300 rounded mt-1 " 
                value={amount} 
                id='amount' 
                type="number" 
                onChange={(e)=>setAmount(e.target.value)}
                />
            </div>
            <div className='w-full'>
                <label className='text-gray-700' htmlFor="duration">Duration:</label>
                <select
                required
                id="duration"
                value={duration}
                onChange={(e) => setDuartion(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 "
                >
                    <option value="1 months">1 months</option>
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="12 months">12 months</option>
                </select>
            </div>
          </div>
        <div className="mb-2">
          <label htmlFor="description" className="block text-gray-700">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 "
            required
          />
        </div>
        <button  onClick={addNewPackage} type='button' className="w-full bg-brand-primary text-white p-2 rounded">{editing? 'Edit':'Add'}</button>
        </form>
    </div>
  )
}

export default AddPackage
