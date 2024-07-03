import React, { useEffect, useState } from 'react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { imageDb } from '../firebase/Firebase';

function Notifications() {
    const [img, setImg] = useState('')
    const [srcc, setSrcc] = useState('')
    const handleUpload =  ()=>{
      console.log(img);
      const imgRef = ref(imageDb, `images/${img.name + Date.now()}`)
      uploadBytes(imgRef, img).then((imgDoc)=>{
        getDownloadURL(imgDoc.ref).then((url)=>setSrcc(url))
      })
      console.log(srcc);
    }

    useEffect(()=>{
        // getDownloadURL(ref(imageDb, ))
    })
    
  return (
    <div>
      <input type="file" onChange={(e)=>setImg(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Image</button>
      <img src={srcc} alt="img" />
    </div>
  )
}

export default Notifications
