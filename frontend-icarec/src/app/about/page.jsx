'use client'

import React from 'react'
import AboutBusiness from '@/components/Formbussiness/AboutBusiness'
import ExtractUsersButton from '@/components/ExtractUsersButton'
import { useSession, signOut } from 'next-auth/react'

const IndexPage = () => {

  {/* <div className='w-[20rem]'>
    <AboutBusiness/>
  </div> */}

  const { data: session, status } = useSession()  

  return (
    <div>
      <button onClick={() => {
        signOut()
      }}>
        SignOut
      </button>
    </div>
  )
}

export default IndexPage