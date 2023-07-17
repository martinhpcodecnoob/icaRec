export async function checkIfFirstLogin(userId) {
    const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI
    const response = await fetch(`${BACKEND_URI}/api/user/getUserById/${userId}`)
    if (!response.ok) {
      throw new Error('Error al obtener los usuarios')
    }
    const data = await response.json()
    return data
  }