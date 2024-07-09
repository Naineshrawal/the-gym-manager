import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useFormData } from 'herotofu-react';

function Contact() {
  const [name, setName]= useState('')
  const [email, setEmail]= useState('')
  const [message, setMessage]= useState('')

  const { formState, getFormSubmitHandler } = useFormData('https://public.herotofu.com/v1/a2a7adb0-3dce-11ef-a0b7-6772a76ef8ef');

  useEffect(()=>{
    if(formState.status == 'success'){

      setName('')
      setEmail('')
      setMessage('')
      toast.success('Form Submission'+ ' ' + formState.status)
    }
  },[formState])
  
  return (
    <div className="contact min-h-screen bg-gray-100">
      
      <main className="container mx-auto p-6">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brand-dark mb-4">Contact Us</h2>
          <p className="text-brand-neutral max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have a question about our software, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="flex flex-col justify-center p-8 bg-white shadow-md rounded">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faPhone} className="text-brand-primary text-2xl mr-4" />
              <div>
                <h4 className="text-xl font-bold text-brand-dark">Phone</h4>
                <p className="text-brand-neutral">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faEnvelope} className="text-brand-primary text-2xl mr-4" />
              <div>
                <h4 className="text-xl font-bold text-brand-dark">Email</h4>
                <p className="text-brand-neutral">info@thegymmanager.com</p>
              </div>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-brand-primary text-2xl mr-4" />
              <div>
                <h4 className="text-xl font-bold text-brand-dark">Address</h4>
                <p className="text-brand-neutral">123 Gym Street, Fit City, GY 12345</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white shadow-md rounded">
            <h3 className="text-2xl font-bold text-brand-dark mb-4">Send Us a Message</h3>
            <form  onSubmit={(getFormSubmitHandler())}>
              <div className="mb-4">
                <label className="block text-brand-neutral mb-2"  htmlFor="name">Name</label>
                <input type="text" value={name} onChange={e=>setName(e.target.value)} name="Name" id="name" className="w-full p-3 border rounded" placeholder="Your Name" />
              </div>
              <div className="mb-4">
                <label className="block text-brand-neutral mb-2" htmlFor="email">Email</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} name='Email' id="email" className="w-full p-3 border rounded" placeholder="Your Email" />
              </div>
              <div className="mb-4">
                <label className="block text-brand-neutral mb-2" htmlFor="message">Message</label>
                <textarea id="message" value={message} onChange={e=>setMessage(e.target.value)} name='Message' className="w-full p-3 border rounded" rows="4" placeholder="Your Message"></textarea>
              </div>
              <button type="submit"  className="w-full bg-brand-primary text-white p-3 rounded hover:bg-brand-dark">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>
      
    </div>
  );
}

export default Contact;
