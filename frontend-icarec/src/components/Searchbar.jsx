'use client'
import React, { useState } from 'react'
import { FcSearch } from "react-icons/fc";

const Searchbar = () => {
    const [inputValue, setInputValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    
    const availableWords = ['servicio 1', 'servicio 21', 'servicio 22', 'servicio 23', 'servicio 5', 'servicio 6', 'servicio 7']

    const handleInputChange = (event) => {
        const value = event.target.value
        setInputValue(value)

        const filteredSuggestions = availableWords.filter(word =>
            word.toLowerCase().includes(value.toLowerCase()) && word.toLowerCase() !== value.toLowerCase()
        )
        setSuggestions(filteredSuggestions)
    }

    return (
        <div className='flex items-center'>
            <div className="relative mx-auto lg:w-[70%] sm:w-[60%] text-gray-600">
                <input 
                    className="border-4 text-[17px] border-[#F3BA1A] focus:border-[#F3BA1A] bg-white h-14 w-full px-5 pr-16 rounded-[2rem] appearance-none focus:ring-0"
                    type="text" 
                    name="search" 
                    placeholder="Busca un Servicio"
                    value={inputValue}
                    onChange={handleInputChange}
                    autoComplete="off"
                    list="suggestions-list"
                />
                <datalist id="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <option key={index} value={suggestion}/>
                    ))}
                </datalist>
                <button type="submit" className="absolute rounded-[2rem] bg-[#F3BA1A] p-5 right-0 top-0">
                    <FcSearch/>
                </button>
            </div>
        </div>
    )
}

export default Searchbar
