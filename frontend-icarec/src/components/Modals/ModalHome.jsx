import React from 'react'
import BusinessSubComponent from '../BusinessSubComponent'
import FileInput from '../Formbussiness/Fileinput'

export default function ModalHome({activated=false, closeVisualModal,images,inputForm,children}) {

    return (
        <>
            {/* <!-- Extra Large Modal --> */}
            <div 
                tabIndex="-1" 
                className={`flex items-center justify-center fixed top-0 left-0 right-0 z-50 ${activated ? "":"hidden"} w-full p-2 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full`}
            >
                <div className="relative w-full max-w-7xl max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-2 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                Extra Large modal
                            </h3>
                            <button 
                                type="button" 
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={closeVisualModal}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="flex smartphone:p-0 p-4">
                            <div className='hidden lg:block w-full h-[50rem] lg:mr-1'>
                                <FileInput images={images} hiddenRemove='hidden'/>
                            </div>
                            <div className='lg:w-[70%] h-[50rem] lg:ml-1 sm:w-full smartphone:w-full'>
                                <BusinessSubComponent inputForm={inputForm}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div 
                    className='fixed inset-0 flex bg-slate-400 bg-opacity-50 items-center justify-center -z-10'
                    onClick={closeVisualModal}
                >
                </div>
            </div>
            {children}
        </>
    )
}
