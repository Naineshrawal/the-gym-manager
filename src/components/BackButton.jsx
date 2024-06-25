import { faArrowLeft, faBackward, faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function BackButton({link}) {
  return (
    <Link to={`${link}`} ><button className='bg-black mb-10 text-white px-2 py-1 rounded-3xl'><FontAwesomeIcon fill='red' icon={faCircleChevronLeft}/> Go Back</button></Link>
  )
}

export default BackButton
