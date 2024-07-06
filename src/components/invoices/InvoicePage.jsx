import React, { useRef } from 'react'
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logger } from '../logging/Logging';

function InvoicePage({
            name,
            setName,
            packagePlan,
            setPackagePlan,
            number,
            setNumber,
            amount,
            setAmount,
            date,
            setDate,
            setViewInvoice,
}) {

    const downloadFileRef = useRef(null)

    const downloadPdf = ()=>{
            html2canvas(downloadFileRef.current)
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF('p', 'mm', 'a4', true);
                const pdfWidth = pdf.internal.pageSize.getWidth()
                const pdfHeight = pdf.internal.pageSize.getHeight()
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
                const imgX = (pdfWidth - imgWidth * ratio) / 2;
                const imgY = 30;
                pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
                pdf.save("invoice.pdf");
          }).catch((err)=>logger.error('error downloading invoice pdf', err))
    }

  return (
    <div className='overflow-auto'>
        <div ref={downloadFileRef} className='relative  w-[500px] p-6 mt-10 mx-auto bg-white'>
        <div className='absolute space-x-2 left-[50%] -translate-x-[50%] -top-7'>
            <button 
            className=' text-brand-secondary bg-brand-neutral  cursor-pointer  px-4 rounded-xl' 
            onClick={()=>downloadPdf()}>
                Download
            </button>
            <FontAwesomeIcon 
                className=' text-brand-primary text-xl cursor-pointer ' 
                icon={faX} 
                onClick={()=>(
                    setName(''),
                    setPackagePlan(false) ,
                    setNumber(''),                              
                    setAmount(''),                              
                    setDate(''),
                    setViewInvoice(false)                              
            )}/>
        </div>
        <h1 className='text-center text-brand-neutral font-semibold text-xl'>Invoice</h1>
        <div className='flex justify-between mt-4'>
                <div>
                    <h1 className='text-base font-bold'>The Gym Manager</h1>
                    <p className='text-sm'>501,Starlink Apartments</p>
                    <p className='text-sm'>Pune, Maharastra (111222)</p>
                    <p className='text-sm font-semibold'>9876543210</p>
                </div>
                <h1>Date: {date.slice(8) + '/' + date.slice(5,7) + '/' + date.slice(0,4)}</h1>
            
        </div>
        <div className=' mt-10'>

            <div className=''>
                <h1 className=' text-gray-800 text-sm'><span className='font-semibold text-black'>Member Name:</span> {name}</h1>
                <h1 className=' text-gray-800 text-sm'><span className='font-semibold text-black'>Mo. No. :</span> {number}</h1>
            </div>
            <table className='mt-1 h-36  w-full'>
                <thead className='text-xs'>
                    <tr>
                        <th className='border border-slate-700 p-1 bg-slate-200'>Sr.</th>
                        <th className='border border-slate-700 p-1 bg-slate-200'>Description</th>
                        <th className='border border-slate-700 p-1 bg-slate-200'>Amount</th>
                    </tr>
                </thead>
                <tbody className='text-center align-top text-gray-600'>
                    <tr>
                        <td className='border border-slate-700'>1.</td>
                        <td className='border border-slate-700'>Membership Plan - {packagePlan}</td>
                        <td className='border border-slate-700'>{amount}</td>
                    </tr>
                </tbody>
            </table>
            <h1 className='text-end'>Total: {amount} </h1>
            <h1 className='text-end mt-5'>Signature</h1>

        </div>
    </div>
    </div>
  )
}

export default InvoicePage
