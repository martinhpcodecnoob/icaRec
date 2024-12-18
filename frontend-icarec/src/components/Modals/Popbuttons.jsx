'use client'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import ExtractUsersButton from '../ExtractUsersButton';
import { changeStateBusinessUser, changeStateRecomend, changeStateSavedUser, getBusinessByUser, getRecommendedBusinesses, getSavedByUser } from '@/redux/Slices/sliceLandingTwo';
import { useDispatch } from 'react-redux';
import { changeTypeBusinessORecomend } from '@/redux/Slices/sliceLandingTree';

export default function Popbuttons({viewPopover=false, creeateBusinness, closeSession}) {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch()
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { data: session, status } = useSession()  
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      placement: 'bottom', // Puedes ajustar la posición según tus necesidades
    });
  
    const showPopover = () => {
      setVisible(true);
    };
  
    const hidePopover = () => {
      setVisible(false);
    };
  
    return (
    <div className={`${viewPopover?'':"hidden"} flex flex-col justify-center items-center`}>
        <div className="relative">
            <button
            ref={setReferenceElement}
            type="button"
            className="relative z-10 text-[1rem] focus:outline-none text-[#100E80]  bg-[#f3ba1a] hover:bg-[#FAE3A3] focus:ring-4 focus:ring-blue-400 font-bold rounded-lg text-sm px-5 py-2.5"
            onMouseEnter={showPopover} onMouseLeave={hidePopover}
            >
            Opciones
            </button>
            {visible && (
            <div
                ref={setPopperElement}
                style={{ ...styles.popper, zIndex: 20 }} // Ajusta el valor de zIndex aquí
                {...attributes.popper}
                className="absolute z-20 inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 "
                onMouseEnter={showPopover}
                onMouseLeave={hidePopover}
            >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    {session.user?.role.includes('admin') ? (
                        <ExtractUsersButton userId={session?.user?.userId} accessToken={session?.user?.token}/>
                        ) : null
                    } 
                    <li>
                        <Link href={'/mybusiness'} onClick={creeateBusinness} className="w-full flex px-4 py-2 hover:bg-gray-100 focus:bg-[#FAE3A3]">Crear Negocio</Link>
                    </li>
                    <li>
                        <button onClick={async() => {
                            if (session?.user) {
                                const {userId,token} = session?.user
                                dispatch(getBusinessByUser({
                                    userId,
                                    accessToken:token
                                }))
                                dispatch(changeTypeBusinessORecomend('business'))
                                dispatch(changeStateRecomend(false))
                                dispatch(changeStateSavedUser(false))
                                dispatch(changeStateBusinessUser(true))
                            }
                        }} className="w-full flex px-4 py-2 hover:bg-gray-100 focus:bg-[#FAE3A3]">Ver mis Negocios</button>
                    </li>
                    <li>
                        <button onClick={() => {
                            if (session?.user) {
                                const {userId,token} = session?.user
                                // console.log('tokennnnnn: ',token);
                                dispatch(getRecommendedBusinesses({
                                    userId,
                                    accessToken:token
                                }))
                                dispatch(changeTypeBusinessORecomend('recomend'))
                                dispatch(changeStateBusinessUser(false))
                                dispatch(changeStateSavedUser(false))
                                dispatch(changeStateRecomend(true))
                            }
                        }} className="w-full flex px-4 py-2 hover:bg-gray-100 focus:bg-[#FAE3A3]">Ver mis Recomendaciones</button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                if (session?.user) {
                                    const {userId,token} = session?.user
                                    dispatch(getSavedByUser({
                                        userId,
                                        accessToken:token
                                    }))
                                    dispatch(changeTypeBusinessORecomend('saveds'))
                                    dispatch(changeStateBusinessUser(false))
                                    dispatch(changeStateRecomend(false))
                                    dispatch(changeStateSavedUser(true))
                                }
                            }}
                            className='w-full flex px-4 py-2 hover:bg-gray-100 focus:bg-[#FAE3A3]'
                        >
                            Guardados
                        </button>
                    </li>
                    <li>
                        <button onClick={closeSession} className="w-full flex px-4 py-2 hover:bg-gray-100 focus:bg-[#FAE3A3]">Cerrar sesion</button>
                    </li>
                </ul>
            </div>
            )}
        </div>
    </div>
    );
}