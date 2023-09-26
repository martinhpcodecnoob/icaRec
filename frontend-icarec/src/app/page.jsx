import LandingPage from './LandingPage'

export async function getAllBusiness(){
  try {
      const response = await fetch(`http://localhost:3004/api/business/getAllBusiness`,{next:{revalidate:2}})
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
