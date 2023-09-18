'use client'
import BusinessSubComponent from "@/components/BusinessSubComponent";
import FileInput from "@/components/Formbussiness/Fileinput";

export default function MyWeb({myBusiness}) {
    return (
        <div>
            <div className="flex m-[1rem]">
                <div>Kuskana</div>
                <div>Botones</div>
            </div>
            <div className="flex w-full">
                <div className="w-full mx-10 hidden lg:block">
                        <FileInput hiddenRemove="hidden" images={myBusiness.images}/>
                </div>
                <div className="w-[8px] max-h-full rounded-sm bg-slate-500 hidden lg:block"></div>
                <div className="w-full h-[100%] mx-2 lg:mx-10">
                    <BusinessSubComponent 
                        inputForm={myBusiness}
                        hiddenRemove="hidden"
                        showButton={false}
                        showButtonPopover={false}
                        aboutBusinessShow={true}
                        heightMap={'16rem'}
                    />
                </div>
            </div>
        </div>
    )
}
