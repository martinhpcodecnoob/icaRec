'use client'

import React, { useState } from 'react'

const PasswordInput = () => {
  const [password, setPassword] = useState('')

  return (
    <div className='flex flex-col w-full items-center'>
      <div className="flex w-3/4">
        <label className="text-gray-500 text-sm font-bold text-start mb-2">Password</label>
      </div>
      <input
        type="password"
        className="border border-black rounded-full py-1 px-3 bg-white w-3/4 mb-2"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  )
}

export default PasswordInput
