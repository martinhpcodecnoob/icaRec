'use client'
import React, { useState } from 'react';
import { usePopper } from 'react-popper';

export default function Popover({viewPopover=false,title,description='No hay nada que mostrar',titleButton=''}) {
    const [visible, setVisible] = useState(false);
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      placement: 'top', // Puedes ajustar la posición según tus necesidades
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
            className="relative z-10 text-[1rem] focus:outline-none text-[#100E80]  bg-[#f3ba1a] hover:bg-[#FAE3A3] focus:ring-4 focus:ring-blue-400 font-bold rounded-lg text-sm px-5 py-2.5 mt-4"
            onMouseEnter={showPopover} onMouseLeave={hidePopover}
            >
            {titleButton}
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
                <div className="px-3 py-2 bg-[#F3BA1A] border-b border-gray-200 rounded-t-lg">
                <h3 className="font-semibold text-gray-900">{title}</h3>
                </div>
                <div className="px-3 py-2 bg-[#FFF8EE]">
                <p>{description==="" ? "Haz una descripcion y actualiza":description}</p>
                </div>
                <div data-popper-arrow style={styles.arrow}></div>
            </div>
            )}
        </div>
    </div>
    );
}