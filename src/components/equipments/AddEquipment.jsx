import React, { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faX } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

function AddEquipment({
    editing, 
    setEditing, 
    setAdding, 
    editData,
    setEditData, 
    editId,
    setEditId,
}) {

    const [equipment, setEquipment] = useState('')
    const [weight, setWeight] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    
    const getToday = ()=>{
        const today = new Date()
        const yyyy = today.getFullYear()
        let mm = today.getMonth() + 1
        let dd = today.getDate()
        
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        
        return dd + '/' + mm + '/' + yyyy;
    }
    const [installedDate, setInstalledDate] = useState(getToday)
    
   
    
    const {addingEquipment} = useUser()
    const navigate = useNavigate()
    

    
    
        useEffect(()=>{
            if(editData){
                setEquipment(editData.equipment)
                setPrice(editData.price)
                setWeight(editData.weight)
                setQuantity(editData.quantity)
                setInstalledDate(editData.installedDate)
                
        }
        },[editData])
        const addNewEquipment = async ()=>{
            // if(!editData){
            //     installedDate = getToday()
            //    console.log('no edit');
            // }
                try{
                    await addingEquipment({
                        equipment,
                        price,
                        weight,
                        quantity,
                        installedDate,
                        editId,})

                    if(editData){
                        toast.success('Edit Package Success !!')
                    }else{
                        toast.success('Package Added Successfully!!')

                    }
                    setInstalledDate(getToday)
                }catch(err){
                console.log(err);
                }
                    setEquipment('')
                    setWeight('')
                    setPrice('')
                    setQuantity('')
                    navigate('/dashboard/equipments')
                    setEditing(false)
                    setAdding(false)
                    setEditData(null)
                    setEditId('')
                }
return (
        <div className='bg-white mx-auto max-w-lg  relative p-6 rounded-lg shadow-lg mt-10'>
            <FontAwesomeIcon className=' text-brand-primary absolute cursor-pointer right-3 top-3' icon={faX} 
            onClick={()=>(
            setEditData(null),
            setAdding(false),
            setEditing(false),
            setEditId('')
            )} />
            <h1 className='text-center font-bold text-brand-neutral text-2xl my-5'>Add Equipment</h1>
            <form className='space-y-8' >
                <div className="mb-2">
                    <label htmlFor="name" className="block text-gray-700">Equipment Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={equipment}
                        onChange={(e) => setEquipment(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        required
                    />
                </div>
                <div className='mb-2 flex flex-col sm:flex-row gap-4'>
                    <div className='w-full'>
                        <label className='text-gray-700' htmlFor="price">Price:</label>
                        <input 
                            required 
                            className="w-full p-2 border border-gray-300 rounded mt-1 " 
                            value={price} 
                            id='price' 
                            type="number" 
                            onChange={(e)=>setPrice(e.target.value)}
                        />
                    </div>
                    <div className='w-full'>
                        <label className='text-gray-700' htmlFor="quantity">Quantity:</label>
                        <input
                        required
                        type='number'
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-1 "/>
                    
                    </div>
                    <div className="mb-2">
                        <label htmlFor="weight" className="block text-gray-700">Weight:</label>
                        <input
                            id="weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value )}
                            className="w-full p-2 border border-gray-300 rounded mt-1 "
                            required
                        />
                    </div>
                </div>
                <button  onClick={addNewEquipment} type='button' className="w-full bg-brand-primary text-white p-2 rounded">{editing? 'Edit':'Add'}</button>
            </form>
        </div>
)
}

export default AddEquipment
