import React from 'react'
import { signOut } from 'next-auth/react'

import { deleteAccount } from '../../../utils/apiBackend'

const DeleteAccountButton = ({userId, accessToken}) => {

  const fetchDeleteAccount = async () => {
    const deleteAccountResponse = await deleteAccount(userId, accessToken)
    if(deleteAccountResponse.status === 200){
      await signOut({ callbackUrl: '/' })
    }
  }
  return (
    <button
      className='absolute left-4 top-4 p-4 font-semibold text-[#100e80]'
      onClick={fetchDeleteAccount}
    >
        Atras
    </button>
  )
}

export default DeleteAccountButton