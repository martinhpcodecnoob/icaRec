import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const ProtectedRoute = ({ children }) => {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.user?.isRegistered === true) {
      router.push("/")
    }
  }, [session, router])
  
  if (session?.user?.isRegistered === true) {
    return null
  }
  return children
}


export default ProtectedRoute