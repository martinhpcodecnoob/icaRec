'use client'
import { BsSuitHeartFill } from "react-icons/bs";

export default function Card({totalLikes}) {
  return (
    <>
        <div className="flex items-center bg-[#F3BA1A] rounded-[1rem] px-2 py-1 h-6">
            <div className="mx-1">{totalLikes === undefined ? 'N':totalLikes.toLocaleString('en-US')}</div>
            <div><BsSuitHeartFill className="text-[1rem] mx-1"/></div>
        </div>
    </>
  )
}
