import React, { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf} from '@fortawesome/free-solid-svg-icons'
import InvoicePage from './InvoicePage'
import BackButton from '../BackButton'

function InvoiceList() {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [packagePlan, setPackagePlan] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [viewInvoice, setViewInvoice] = useState(false)

    const {invoiceList, invoiceLoading, getInvoices, invoiceId} = useUser()
    
    useEffect(()=>{
        if(invoiceId)getInvoices(invoiceId)
    },[])



  return(<>
            <div className='relative '>
            {!viewInvoice && 
            <div className='mt-6 ml-6'><BackButton link={'/dashboard/view-members'}/></div>}
                {/* invoice page */}
                    {viewInvoice &&
                        <div className='absolute w-[100%] min-h-screen bg-[#000000d0] '>
                            <InvoicePage
                            name={name}
                            setName={setName}
                            packagePlan={packagePlan}
                            setPackagePlan={setPackagePlan}
                            number={number}
                            setNumber={setNumber}
                            amount={amount}
                            setAmount={setAmount}
                            date={date}
                            setDate={setDate}
                            setViewInvoice={setViewInvoice}
                            />
                        </div>
                    }
                    
                   

                            {/* invoice list */}
                {invoiceLoading?
                    <div>Loading...</div>
                    :
                    <div className=' ml-6'>
                        <h1 className='text-center mb-8 text-xl text-brand-neutral font-semibold'>Invoice list</h1>
                        
                            {/* <p className='text-center text-base text-brand-primary font-medium mt-1'>{invoiceName}</p> */}
                        <div className='flex flex-wrap gap-2 pt-8'>
                            {invoiceList.map((doc, index)=>(
                                
                                <div className='flex flex-col justify-center items-center w-16 h-16 cursor-pointer' 
                                key={index} 
                                onClick={()=>(
                                    setViewInvoice(true),
                                    setName(doc.name),
                                    setAmount(doc.amount),
                                    setNumber(doc.number),
                                    setPackagePlan(doc.packagePlan),
                                    setDate(doc.date)
                                )}
                                >
                                    <FontAwesomeIcon className='text-red-500 text-5xl' icon={faFilePdf} />
                                    <p className='text-[8px] mt-1'>{doc.date.slice(8) + '/' + doc.date.slice(5,7) + '/' + doc.date.slice(0,4)}</p>
                                    
                                </div>
                            ))}
                    </div>
                    </div>
                }
            </div>
            </>
  )
}

export default InvoiceList
