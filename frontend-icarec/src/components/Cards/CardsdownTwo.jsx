import { FaAngleDown } from "react-icons/fa";
import { Link as LinkScroll } from 'react-scroll';
import { Spinner } from 'flowbite-react';
import CardSingleTwo from "./CardSingleTwo";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleLeft } from "react-icons/fa";
import { changeStateBusinessUser, changeStateRecomend } from "@/redux/Slices/sliceLandingTwo";

export default function CardsdownTwo({bussinessAll}) {
    const pendingStateBusinessUser = useSelector((state) => state.landingTwo.updateStateBusinessUser.loading)
    const dispatch = useDispatch()
    console.log('Este el fulfillde de negocios: ',bussinessAll.fulfilled);
    console.log("este es el numero length de negocios: ",bussinessAll.fulfilled?.data?.businesses.length > 0);
    return (
        <div className='flex flex-col justify-center items-center mb-6'>
            <div className="flex justify-between w-full">
                <div className="bg-[#F3BA1A] text-[#100E80] text-[1.5rem] px-4 py-1 font-bold ml-5 smartphone:text-[1rem] flex items-center">
                    <button 
                        className=" active:bg-[#F3BA1A] active:rounded-lg"
                        onClick={() => {
                            dispatch(changeStateRecomend(false))
                            dispatch(changeStateBusinessUser(false))
                        }}
                    >
                        <FaAngleLeft className="text-[#100E80] text-3xl"/>
                    </button>
                    Mis Negocios
                </div>
                <div className="mr-5 flex items-center">
                </div>
            </div>
            <LinkScroll activeClass="active" to="down" spy={true} smooth={true} offset={-30} duration={500}>
                <FaAngleDown className='text-3xl text-[#F3BA1A]'/>
            </LinkScroll>
            {
                pendingStateBusinessUser ? 
                    (
                        <div className="h-[9rem] w-[9rem] smartphone:h-[5rem] smartphone:w-[5rem]">
                            <Spinner
                                aria-label="Info spinner example"
                                color="warning"
                                size={''}
                            />
                        </div>
                    )
                    :
                    bussinessAll.fulfilled ? 
                        bussinessAll.fulfilled?.data?.businesses.length > 0 ?
                        (
                            <div className='grid gap-5 2xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2' id='down'>
                                {
                                    bussinessAll.fulfilled ? 
                                        bussinessAll.fulfilled?.data?.businesses.length > 0 ?
                                            bussinessAll.fulfilled?.data?.businesses?.map((e,i) =>(
                                                <CardSingleTwo 
                                                    key={i}
                                                    elementDeleteBusiness = {true}
                                                    elementBusiness={e} 
                                                />
                                            )) 
                                        :
                                        null
                                    :
                                    null
                                }
                            </div>
                        )
                        :
                        (
                            <div>
                                No Existe Negocio creado por ti
                            </div>
                        )
                    :
                    null
            }
        </div>
    )
}
