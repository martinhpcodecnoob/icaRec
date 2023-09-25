'use client'
import { extractServices } from '@/redux/Slices/sliceLanding';
import { collectionSelectService } from '@/redux/Slices/sliceLandingTwo';
import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import { useDispatch } from 'react-redux';

export default function PopServices({children,referenceElement,showPopover,hidePopover,visible,suggestions,inputValue}) {
    const [popperElement, setPopperElement] = useState(null);
    const dispatch = useDispatch()
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      placement: 'bottom', // Puedes ajustar la posición según tus necesidades
    });

    const captureSelect = (e) => {
        const {textContent} = e.target
        dispatch(extractServices(textContent))
        dispatch(collectionSelectService(textContent))
        hidePopover()
    }
    return (
    <div className={`flex flex-col justify-center items-center`}>
        <div className="relative w-full">
            {children}
            {visible && (
            <div
                ref={setPopperElement}
                style={{ ...styles.popper, zIndex: 20 }} // Ajusta el valor de zIndex aquí
                {...attributes.popper}
                className={`absolute z-20 inline-block w-full text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100`}
                onMouseEnter={showPopover}
                onMouseLeave={hidePopover}
            >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li className={inputValue?'hidden':''}>
                        <button className="w-full flex justify-normal px-4 py-2 hover:bg-gray-100 focus:bg-[#FAE3A3]">Escribe algo</button>
                    </li>
                    {suggestions.map((suggestion, index) =>{
                        if (inputValue) {
                            return(
                                <li key={index}>
                                    <button
                                        onClick={captureSelect}
                                        className="w-full flex justify-normal px-4 py-2 hover:bg-gray-100 focus:bg-[#FAE3A3]"
                                    >
                                        {suggestion}
                                    </button>
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>
            )}
        
        </div>
    </div>
    );
}