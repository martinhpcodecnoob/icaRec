'use client'
import BusinessSubComponent from "@/components/BusinessSubComponent";
import FileInput from "@/components/Formbussiness/Fileinput";
import { useEffect } from "react";

export default function MyWeb({myBusiness}) {
    useEffect(() => {

    }, [myBusiness])
    
    return (
        <div>
            <div className="flex m-[1rem]">
                <div>Kuskana</div>
                <div>Botones</div>
            </div>
            <div className="flex w-full">
                <div className="w-full mx-10">
                    <FileInput hiddenRemove="hidden" images={myBusiness.images}/>
                </div>
                <div className="w-[8px] max-h-full rounded-sm bg-slate-500"></div>
                <div className="w-full h-[100%] mx-10">
                    <BusinessSubComponent 
                        inputForm={myBusiness}
                        hiddenRemove="hidden"
                        showButton={true}
                        aboutBusinessShow={true}
                    />
                </div>
            </div>
        </div>
    )
}
