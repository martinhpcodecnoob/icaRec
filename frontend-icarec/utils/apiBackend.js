export const checkIfTokenIsValid = async (token) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth/verifyRecoveryToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
      
      const data = await response.json()
      
      if (response.ok && data.message === "El token es válido para este usuario.") {
        return {isValid: true, userId: data.userId}
      } else {
        return {isValid: false, userId: data.userId}
      }
    } catch (error) {
      console.error("Error al verificar el token:", error)
      return false
    }
  }

  export const changePassword = async (userId, newPassword) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth/changePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          newPassword,
        }),
      })
  
      const data = await response.json()
  
      if (response.ok) {
        return { success: true, data }
      } else {
        return { success: false, error: data.error }
      }
    } catch (error) {
      return { success: false, error: 'Error al cambiar la contraseña.' }
    }
  };
  
  export const forgotMyPassword = async (email) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth/generateRecovery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      const data = await response.json()
      if(response.ok){
        return {message: data.message}
      }else {
        console.error("Error al generar el token de recuperación:", data.error)
        return { error: data.message }
      }
    } catch (error) {
      console.error("Error al generar el token de recuperacion:", error)
      return false
    }
  }