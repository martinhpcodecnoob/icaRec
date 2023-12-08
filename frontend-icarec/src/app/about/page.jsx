'use client'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import ModalDelete from '@/components/Modals/ModalDelete'
import BusinessList from '@/components/BusinessGroup/BusinessList'
import { useDispatch } from 'react-redux'
import { getBusinessByUser, getRecommendedBusinesses } from '@/redux/Slices/sliceLandingTwo'
import { useSession } from 'next-auth/react'
import { Spinner } from 'flowbite-react';

const WithCustomLoading = dynamic(
  () => import('@/components/Screens/RegisterScreen'),
  {
    loading: () => <p>Loading...</p>,
  }
)

const IndexPage = () => {
  const [active, setActive] = useState(false)
  const dispatch = useDispatch()
  const { data: session, status } = useSession();
  return (
   //<BusinessList />
    <div>
      {/* The loading component will be rendered while  <WithCustomLoading/> is loading */}
      {/* <WithCustomLoading /> */}
      <button 
        className='bg-red-500 p-2 rounded-[1rem]'
        onClick={() => {
          if (session?.user) {
            const {userId,token} = session?.user
            dispatch(getRecommendedBusinesses({
              userId,
              accessToken:token
            })).then((response) => console.log(response))
          }
        }}
        // onClick={() => setActive(active ? false : true)}
      >
        Boton de modal de eliminacion
      </button>
      <ModalDelete activated={active} setActive={setActive}/>


      <div className='h-[10rem] w-[10rem]'>
        <Spinner
            aria-label="Info spinner example"
            color="warning"
            size={''}
        />
      </div>
    </div>
  )
}

export default IndexPage