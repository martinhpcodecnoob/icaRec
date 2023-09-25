import LandingPage from './LandingPage'

export async function getAllBusiness(){
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/business/getAllBusiness`,{next:{revalidate:2}})
      const business = response.json()
      return business
  } catch (error) {
      return error
  }
}

export default async function page() {
   const dataBusiness = await getAllBusiness() 
  
  return (
    <div>
      <LandingPage dataBusiness={dataBusiness} />
    </div>
  )
}
