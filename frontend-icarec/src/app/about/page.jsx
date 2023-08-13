'use client'
import React, { useState,useEffect } from 'react'
import {Cloudinary} from '@cloudinary/url-gen'
import {AdvancedImage} from '@cloudinary/react'
import {sepia} from "@cloudinary/url-gen/actions/effect";
import { signResponseCloudinary } from '../../../utils/apiCloudinary';

const IndexPage = () => {
  console.log("Ejecutando");
  const [imageSelected, setImageSelected] = useState("")
  const [showImage, setShowImage] = useState("")
  const [signData, setSignData] = useState("")
  
  const persBussines={
    nombre:"martin",
    business:'PlazaVEA'
  }

useEffect(() => {
  signResponseCloudinary(persBussines.nombre,persBussines.business)
    .then(data => setSignData(data))
}, [])
  const upload = () => {
    try {
      console.log("Este es la imagen: ",imageSelected);
      const formData = new FormData()
      formData.append("file",imageSelected)
      formData.append("api_key", signData.apiKey);
      formData.append("timestamp", signData.timestamp);
      formData.append("signature", signData.signature);
      formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
      formData.append("folder", `${persBussines.nombre}/${persBussines.business}`);
  
      fetch(`https://api.cloudinary.com/v1_1/${signData.cloudname}/auto/upload`,{
        method:"POST",
        body:formData
      })
      .then(response => response.json())
      .then(data => {
        console.log("Respuesta: ",data);
        setShowImage(data.url)
      })
      .catch(error => {
        console.log("Error: ",error);
      })
    } catch (error) {
      console.log("Este es el error: ",error);
    }
  }


  return (
    <div>
      ola
      {/* <AdvancedImage cldImg={myImage}/> */}
      {showImage !== "" ? 
      <img src={showImage} alt={"image"} /> 
      :
      null}
      
      <input type="file" onChange={(event) => setImageSelected(event.target.files[0])} />
      <button 
        className='bg-red-400 rounded-lg'
        type='button' 
        onClick={upload}
      >
        Upload Image
      </button>
    </div>
  )
}

export default IndexPage