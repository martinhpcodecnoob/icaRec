'use client'
import React, { useState } from 'react'
import { FcSearch } from "react-icons/fc";
import PopServices from './Modals/PopServices';
import { useDispatch, useSelector } from 'react-redux';
import { collectionSelectService } from '@/redux/Slices/sliceLandingTwo';

const Searchbar = () => {
    const [inputValue, setInputValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [refInputElement, setRefInputElement] = useState(null)
    const [visible, setVisible] = useState(false);
    const infoServices = useSelector(state => state.landing)
    const dispatch = useDispatch()

    const showPopover = () => {
        setVisible(true);
    }
    const hidePopover = () => {
        setVisible(false);
    };

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

    const btnSearch = () => {
        dispatch(collectionSelectService(infoServices.selectService))
        setInputValue("")
    }
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
                    setInputValue = {setInputValue}
                >
                    <input
                        ref={setRefInputElement}
                        className="border-4 text-[17px] border-[#F3BA1A] focus:border-[#F3BA1A] bg-white h-14 w-full px-5 pr-16 rounded-[2rem] appearance-none focus:ring-0"
                        type="text" 
                        name="search" 
                        placeholder="Buscar servicios"
                        value={inputValue}
                        onChange={handleInputChange}
                        autoComplete="off"
                        onClick={showPopover} onMouseLeave={hidePopover}
                    />
                    <button onClick={btnSearch} className="absolute rounded-[2rem] bg-[#F3BA1A] p-5 right-0 top-0">
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
