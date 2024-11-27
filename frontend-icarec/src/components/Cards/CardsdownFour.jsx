import { FaAngleDown } from "react-icons/fa";
import { Link as LinkScroll } from 'react-scroll';
import { Spinner } from 'flowbite-react';
import CardSingleTwo from "./CardSingleTwo";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleLeft } from "react-icons/fa";
import { changeStateBusinessUser, changeStateRecomend, changeStateSavedUser } from "@/redux/Slices/sliceLandingTwo";

export default function CardsdownFour({bussinessAll}) {
    const pendingStateRecomendUser = useSelector((state) => state.landingTwo.updateStateSavedUser.loading)
    const dispatch = useDispatch()
    console.log('bussinessAll: ',bussinessAll);
    
    return (
        <div className='flex flex-col justify-center items-center mb-6'>
            <div className="flex justify-between w-full">
                <div className="bg-[#F3BA1A] text-[#100E80] text-[1.5rem] px-4 py-1 font-bold ml-5 smartphone:text-[1rem] flex items-center">
                    <button 
                        className=" active:bg-[#F3BA1A] active:rounded-lg"
                        onClick={() => {
                            dispatch(changeStateRecomend(false))
                            dispatch(changeStateBusinessUser(false))
                            dispatch(changeStateSavedUser(false))
                        }}
                    >
                        <FaAngleLeft className="text-[#100E80] text-3xl"/>
                    </button>
                    Mis Guardados
                </div>
            </div>
            <LinkScroll activeClass="active" to="down" spy={true} smooth={true} offset={-30} duration={500}>
                <FaAngleDown className='text-3xl text-[#F3BA1A]'/>
            </LinkScroll>
            {
                pendingStateRecomendUser ? 
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
                    bussinessAll.fulfilled?.data ? 
                        bussinessAll.fulfilled?.data?.businessWithSaved.length > 0 ?
                        (
                            <div className='grid gap-5 2xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2' id='down'>
                                {
                                    bussinessAll.fulfilled?.data ? 
                                        bussinessAll.fulfilled?.data?.businessWithSaved?.map((e,i) =>
                                        (
                                            <CardSingleTwo 
                                                key={i} 
                                                elementBusiness={e}
                                                elementDeleteBusiness={true}
                                            />
                                        )) 
                                        :
                                        null
                                }
                            </div>
                        )
                        :
                        (
                            <div>
                                No existe guardados por ti
                            </div>
                        )
                    :
                    null
            }
        </div>
    )
}
