'use client'
import { FaHeart } from "react-icons/fa";
import { useState } from "react";

export default function Card({initialNumber,increment=1}) {
const [emoReaction, setEmoReaction] = useState(false)
const [count, setCount] = useState(initialNumber)

const handleEmoReact = () =>{
    if (emoReaction === true) {
    setEmoReaction(false)
    setCount(prevCount => prevCount + increment)
    } else {
    setEmoReaction(true)
    setCount(prevCount => prevCount + increment)
    }
}

const postionCount = () => {
    if (count < 10) {
    return 'left-[25px]'
    }
    if (count < 100) {
    return 'left-[22px]'
    }
    if (count < 1000) {
    return 'left-[17px]'
    }
    if (count >= 1000 && Number.isInteger(count/1000) && count >=10000) {
    return 'left-[17px]'
    } 
    if (count >= 1000 && Number.isInteger(count/1000)) {
    return 'left-[22px]'
    }else{
    return 'left-[16px]'
    }
}

return (
    <div>
    <button onClick={handleEmoReact}>
        <div className={`relative w-[42px] h-[20px] ${emoReaction ? 'bg-red-600' :'bg-slate-500'} rounded-[4px]`}>
            <div className='absolute left-[3px] top-[3px]'>
            <FaHeart className={emoReaction ? 'text-black text-xs':'text-white text-xs'}/>
            </div>
            <div className={`text-xs absolute ${postionCount()} ${emoReaction?'text-white':'text-black'} top-[2px]`}>
            {count >= 1000 ? `${count/1000}K` : count}
            </div>
            <div className={`
            w-0 h-0 absolute top-[20px] left-[6px]
            border-l-[5px] border-l-transparent
            border-r-[5px] border-r-transparent
            border-t-[10px] ${emoReaction ? 'border-t-red-600':'border-t-slate-500'}
            `}></div>
        </div>
    </button>
    </div>
)
}