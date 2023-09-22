import BusinessSubComponent from "@/components/BusinessSubComponent";
import FileInput from "@/components/Formbussiness/Fileinput";
import { BsSuitHeartFill } from "react-icons/bs";
import Kuskana from '../../../../public/kuskana_azul.svg'
import Image from "next/image";
import ErrorScreen from "@/components/ErrorScreen";

export default function MyWeb({myBusiness}) {
    if (myBusiness === undefined) {
        return <ErrorScreen/>
    }
    return (
        <div>
            <div className="block sticky top-0 z-10">
                <div className="flex p-[1rem] items-center justify-between bg-[#FFF8EE]">
                    <div className="w-32 h-8">
                        <Image
                            alt="Kuskasna"
                            src={Kuskana}
                            className="w-full h-full"
                        />
                    </div>
                    <button className="bg-[#100E80] px-4 rounded-[1rem] text-white">
                        Editar mi sitio
                    </button>
                </div>
            </div>
            <div className="flex w-full">
                <div className="w-full mx-10 hidden lg:block h-[40rem]">
                        <div className="flex-col h-full">
                            <FileInput hiddenRemove="hidden" images={myBusiness?.images===undefined ? []:myBusiness.images}/>
                            <div className="flex justify-between items-center mt-8 mb-2">
                                <div className="flex items-center bg-[#F3BA1A] rounded-[1rem] px-2 py-1">
                                    <div className="mx-1">{myBusiness.totalLikes === undefined ? 'N':myBusiness.totalLikes.toLocaleString('en-US')}</div>
                                    <div><BsSuitHeartFill className="text-[1.4rem] mx-1"/></div>
                                </div>
                                <div className="bg-[#100E80] px-4 rounded-[1rem] text-white">Recomiendame</div>
                            </div>
                            <div className="bg-slate-500 w-full rounded-sm h-[3px]"></div>
                            <div>

                            </div>
                        </div>
                </div>
                <div className="w-[8px] max-h-full rounded-sm bg-slate-500 hidden lg:block"></div>
                <div className="w-full h-[100%] lg:mx-10">
                    <BusinessSubComponent 
                        inputForm={myBusiness}
                        hiddenRemove="hidden"
                        showButton={false}
                        showButtonPopover={false}
                        aboutBusinessShow={true}
                        heightMap={'16rem'}
                        showRecomend={false}
                        visibleLiked={true}
                        dataLiked={myBusiness.totalLikes}
                    />
                    <div className="w-full hidden lg:block mb-5">
                        <div className="text-[#100E80] font-bold text-[2rem]">
                            Sobre el negocio
                        </div>
                        <div className="text-[#100E80] text-[1rem] mx-4 mt-2">
                            {
                                myBusiness.description === "" || myBusiness.description === undefined ?
                                '(No existe por el momento una descripcion)' :
                                myBusiness.description
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
