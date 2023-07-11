import React from 'react'
import { FaAngleDown } from "react-icons/fa";
import Card from './CardEmotic';

export default function Cardsdown() {
    const createNumberArray = (num) =>{
        const numberArray=[]
        for (let i = 1; i <= num; i++) {
            numberArray.push(i)
        }
        return numberArray
    }
    const resultTestCards = createNumberArray(30)

    return (
        <div className='flex flex-col justify-center items-center'>
            <FaAngleDown className='text-3xl text-red-600'/>
            <div className='grid gap-5 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
                {
                    resultTestCards.map((e,i) =>(
                        <div key={i} className='w-60 h-40 bg-slate-500'></div>
                    ))  
                }
            </div>
        </div>
    )
}
