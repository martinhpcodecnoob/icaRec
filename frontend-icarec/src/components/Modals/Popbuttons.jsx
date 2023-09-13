'use client'
import React, { useState } from 'react';
import { usePopper } from 'react-popper';

export default function Popbuttons({viewPopover=false, creeateBusinness, closeSession}) {
    const [visible, setVisible] = useState(false);
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      placement: 'bottom', // Puedes ajustar la posición según tus necesidades
    });
  
    const showPopover = () => {
      setVisible(true);
    };
  
    const hidePopover = () => {
      setVisible(false);
    };
  
    return (
    <div className={`${viewPopover?'':"hidden"} flex flex-col justify-center items-center`}>
        <div className="relative">
            <button
            ref={setReferenceElement}
            type="button"
            className="relative z-10 text-[1rem] focus:outline-none text-[#100E80]  bg-[#f3ba1a] hover:bg-[#FAE3A3] focus:ring-4 focus:ring-blue-400 font-bold rounded-lg text-sm px-5 py-2.5"
            onMouseEnter={showPopover} onMouseLeave={hidePopover}
            >
            Opciones
            </button>
            {visible && (
            <div
                ref={setPopperElement}
                style={{ ...styles.popper, zIndex: 20 }} // Ajusta el valor de zIndex aquí
                {...attributes.popper}
                className="absolute z-20 inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 "
                onMouseEnter={showPopover}
                onMouseLeave={hidePopover}
            >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 focus:bg-[#FAE3A3]">Descargar Data</a>
                    </li>
                    <li>
                        <a href="#" onClick={creeateBusinness} className="block px-4 py-2 hover:bg-gray-100 focus:bg-[#FAE3A3]">Crear Negocio</a>
                    </li>
                    <li>
                        <a href="#" onClick={closeSession} className="block px-4 py-2 hover:bg-gray-100 focus:bg-[#FAE3A3]">Cerrar sesion</a>
                    </li>
                </ul>
            </div>
            )}
        </div>
    </div>
    );
}