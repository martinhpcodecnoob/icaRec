'use client'

import React from 'react'
import AboutBusiness from '@/components/Formbussiness/AboutBusiness'
import ExtractUsersButton from '@/components/ExtractUsersButton'
import { useSession } from 'next-auth/react'

const IndexPage = () => {

  {/* <div className='w-[20rem]'>
    <AboutBusiness/>
  </div> */}

  const { data: session, status } = useSession()  

  return (
    <ExtractUsersButton userId={session?.user?.userId} accessToken={session?.user?.token}/>
  )
}

export default IndexPage