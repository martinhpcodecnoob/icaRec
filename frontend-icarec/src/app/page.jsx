import LandingPage from './LandingPage'

export async function getAllBusiness(){
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/business/getAllBusiness`,{cache:'no-store'})
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
      <LandingPage dataBusiness={dataBusiness}/>
    </div>
  )
}

/* import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const HomePage = () => {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      if (session.user.isRegistered === false && session.user.providerType !== 'credentials') {
        router.push('/newUser')
      } else {
        router.push('/landing') // Redirige a la página de inicio deseada
      }
    }
  }, [session, router])

  return null // No renderiza nada en la página de inicio
}

export default HomePage */