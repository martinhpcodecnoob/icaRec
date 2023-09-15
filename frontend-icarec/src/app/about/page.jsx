'use client'

import React from 'react'
import { useSession, signOut } from 'next-auth/react'

const IndexPage = () => {
  const { data: session, status } = useSession()  
  return (
    <div>
      <button className='items-center' onClick={() => { signOut() }}>
        Session
      </button>
    </div>
  )
}
export default IndexPage