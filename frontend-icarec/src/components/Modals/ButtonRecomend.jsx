import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"

export default function ButtonRecomend() {
    const { data:session,status } = useSession()
    const dispatch = useDispatch()
    
    const handleLiked = () => {
        
    }

    return (
        <>
            <button 
                className={`bg-[#100E80] text-white py-1 px-4 rounded w-2/3`}
                // onClick={}
            >
                Recomiendame
            </button>
        </>
    )
}
