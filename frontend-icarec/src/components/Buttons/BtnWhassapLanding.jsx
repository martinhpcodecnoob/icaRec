import React from 'react'
import { RiWhatsappFill } from "react-icons/ri";

export default function BtnWhassapLanding() {
    const phoneNumber = "51992484056"; // Reemplaza con tu número de teléfono
    const message = "Hola, quiero más información!"; // Reemplaza con tu mensaje
    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
      };
    return (
        <div className="App">
            <div className="App-header">
                <button onClick={handleClick} className="flex justify-center items-center mx-1 bg-[#25D366] rounded-lg p-1">
                    <span className='mdx:hidden'>Contactame</span>
                    <RiWhatsappFill className='text-[2rem] text-neutral-800'/>
                </button>
            </div>
        </div>
    )
}
