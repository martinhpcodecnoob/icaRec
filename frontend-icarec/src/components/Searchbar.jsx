'use client'
import React, { useState } from 'react'
import { FcSearch } from "react-icons/fc";
import PopServices from './Modals/PopServices';
import { useSelector } from 'react-redux';

const Searchbar = () => {
    const [inputValue, setInputValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [refInputElement, setRefInputElement] = useState(null)
    const [visible, setVisible] = useState(false);
    const infoServices = useSelector(state => state.landing)

    const showPopover = () => {
        setVisible(true);
    }
    const hidePopover = () => {
        setVisible(false);
    };
    
    const availableWords = ['servicio 1', 'servicio 21', 'servicio 22', 'servicio 23', 'servicio 5', 'servicio 6', 'servicio 7']

    const handleInputChange = (event) => {
        const value = event.target.value
        setInputValue(value)

        if (infoServices.services.length > 0) {
            const filteredSuggestions = infoServices.services.filter(word =>
                word.toLowerCase().includes(value.toLowerCase()) && word.toLowerCase() !== value.toLowerCase() || word.toLowerCase() === value.toLowerCase()
            )
            setSuggestions(filteredSuggestions)
        }
        showPopover()
    }
    console.log("Este es el inputValue ",inputValue);

    return (
        <div className='flex items-center'>
            <div className="relative mx-auto lg:w-[70%] sm:w-[60%] text-gray-600 z-20">
                <PopServices 
                    referenceElement={refInputElement}
                    visible={visible}
                    showPopover={showPopover}
                    hidePopover={hidePopover}
                    suggestions={suggestions}
                    inputValue={inputValue}
                >
                    <input
                        ref={setRefInputElement}
                        className="border-4 text-[17px] border-[#F3BA1A] focus:border-[#F3BA1A] bg-white h-14 w-full px-5 pr-16 rounded-[2rem] appearance-none focus:ring-0"
                        type="text" 
                        name="search" 
                        placeholder="Busca un Servicio"
                        value={inputValue}
                        onChange={handleInputChange}
                        autoComplete="off"
                        onClick={showPopover} onMouseLeave={hidePopover}
                    />
                    <button type="submit" className="absolute rounded-[2rem] bg-[#F3BA1A] p-5 right-0 top-0">
                        <FcSearch/>
                    </button>
                </PopServices>
            </div>
            <div
                className={`${visible?"":"invisible"} fixed inset-0 flex bg-slate-400 bg-opacity-50 items-center justify-center z-10 backdrop-blur-md`}
            >
            </div>
        </div>
    )
}

export default Searchbar
