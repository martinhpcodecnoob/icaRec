import React from 'react'
import dynamic from 'next/dynamic'

const WithCustomLoading = dynamic(
  () => import('@/components/Screens/RegisterScreen'),
  {
    loading: () => <p>Loading...</p>,
  }
)

const IndexPage = () => {
  return (
    <div>
      {/* The loading component will be rendered while  <WithCustomLoading/> is loading */}
      <WithCustomLoading />
    </div>
  )
}

export default IndexPage