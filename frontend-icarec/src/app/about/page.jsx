'use client'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import ModalDelete from '@/components/Modals/ModalDelete'

const WithCustomLoading = dynamic(
  () => import('@/components/Screens/RegisterScreen'),
  {
    loading: () => <p>Loading...</p>,
  }
)


const IndexPage = () => {
  const [active, setActive] = useState(false)
  return (
    <div>
      {/* The loading component will be rendered while  <WithCustomLoading/> is loading */}
      {/* <WithCustomLoading /> */}
      <button 
        className='bg-red-500 p-2 rounded-[1rem]'
        onClick={() => setActive(active ? false : true)}
      >
        Boton de modal de eliminacion
      </button>
      <ModalDelete activated={active} setActive={setActive}/>
    </div>
  )
}

export default IndexPage