import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const ProtectedRoute = ({ children }) => {

  const { data: session } = useSession()
  const router = useRouter()

  if (session?.user?.isRegistered === true) {
    router.push("/")
    return null
  }

  return children
}

export default ProtectedRoute