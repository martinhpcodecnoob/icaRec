import Map from '@/components/Map'
import React from 'react'

const IndexPage = () => {
 
  return (
    <div>
      <h1>Hello, About.js!</h1>
      <p>Welcome to my Next.js app.</p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4" >
        Abrir Login
      </button>
      <Map />
    </div>
  )
}

export default IndexPage