'use client';
import { Progress } from 'flowbite-react';

export default function LoadFormBusiness({percentaje,modal,message}) {
    let hidden=''
    if (!modal) {
        hidden='hidden'
    }else{
        hidden=''
    }
    return (
        <>
            <div id="large-modal" tabIndex="-1" className={`fixed ${hidden} flex items-center justify-center bottom-10 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full`}>
                <div className="relative w-full max-w-4xl max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-red-300 rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal body --> */}
                        <div className="p-2 space-y-6">
                            <Progress
                                color='red'
                                labelProgress
                                labelText
                                progress={percentaje}
                                progressLabelPosition="outside"
                                size="xl"
                                textLabel={message}
                                textLabelPosition="outside"
                            />
                        </div>
                    </div>
                </div>
                <div 
                    className='fixed inset-0 flex bg-slate-400 bg-opacity-50 items-center justify-center -z-10'
                ></div>
            </div>
        </>
    )
}
