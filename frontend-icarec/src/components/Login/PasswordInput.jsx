'use client'

import React, { useState } from 'react'

const PasswordInput = () => {
  const [password, setPassword] = useState('')

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-500 text-sm font-bold mb-2">Password</label>
        <input
          type="password"
          className="border border-black rounded-full py-1 px-3 bg-white w-full"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
  )
}

export default PasswordInput
