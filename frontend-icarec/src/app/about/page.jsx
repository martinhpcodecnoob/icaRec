'use client'

import React from 'react'
import { useSession } from 'next-auth/react'

const IndexPage = () => {
  const { data: session, status } = useSession()  
  return (
    <div>
      <button className='items-center' onClick={() => { console.log("Datos de la session: ", session) }}>
        Session
      </button>
    </div>
  )
}
export default IndexPage