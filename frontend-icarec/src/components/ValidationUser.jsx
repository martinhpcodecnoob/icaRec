import Link from "next/link";
import { PiShieldWarningFill } from "react-icons/pi";
export default function ValidationUser({message}) {

    return(
        <div className="flex items-center justify-center h-[90vh]">
            <div className="flex flex-col items-center">
                <span className="text-[1.2rem] md:text-[1.5rem] xl:text-[2vw] text-center mx-3">
                    {message}
                </span>
                <PiShieldWarningFill className="text-[10rem] text-gray-500"/>
                <Link 
                    type="button" 
                    className="text-white text-[1.5rem]
                                bg-gradient-to-r from-red-400 via-red-500 to-red-600 
                                hover:bg-gradient-to-br focus:ring-4 
                                focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 
                                font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    href={'/'}  
                >
                Volver
                </Link>
            </div>
        </div>
    )
}
