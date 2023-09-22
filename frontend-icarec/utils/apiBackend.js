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
        return { success: true, userRedirect: {userEmail: data.emailChanged, password: newPassword}, data }
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
      /* const data = await response.json()
      if(response.ok){
        return {message: data.message}
      }else {
        console.error("Error al generar el token de recuperación:", data.error)
        return { error: data.message }
      } */
      const data = await response.json()
  
      return {
        status: response.status, 
        data: data,
      }

    } catch (error) {
      console.error("Error al generar el token de recuperacion:", error)
      return false
    }
  }

  export const updateAccount = async ( userId, newAccount, isRegistered ) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/account/updateAccount`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, newAccount, isRegistered }),
      })
      
      const data = await response.json()
  
      return {
        status: response.status, 
        data: data,
      }
    } catch (error) {
      console.error("Error del servidor al actualizar el la cuenta del usuario:", error)
      return {
        status: 500, 
        error: "Error del servidor al actualizar el la cuenta del usuario",
      }
    }
  }

  export const updateUser = async (userId, cellphone, dni, sex) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/updateUser`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, cellphone, dni, sex }),
      })
  
      const data = await response.json()
  
      return {
        status: response.status, 
        data: data,
      }
    } catch (error) {
      console.error("Error del servidor al actualizar el usuario:", error)
      return {
        status: 500, 
        error: "Error del servidor al actualizar el usuario",
      }
    }
  }

  export const registerUser = async (name, cellphone, dni, email, password, sex) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, cellphone, dni, email, password, sex }),
      })
  
      const data = await response.json()
  
      return {
        status: response.status, 
        data: data,
      }
    } catch (error) {
      console.error("Error del servidor al crear al usuario", error)
      return {
        status: 500, 
        error: "Error del servidor al crear al usuario",
      }
    }
  }

  export const regenerateAccessToken = async (accessToken) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth/renewAccessToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken }),
      })
  
      const data = await response.json()
  
      return {
        status: response.status, 
        data: data,
      }
    } catch (error) {
      console.error("Error del servidor al regenerar el token", error)
      return {
        status: 500, 
        error: "Error del servidor al regenerar el token",
      }
    }
  }

  export const extractUsers = async ( userId, accessToken ) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/user/getUsers/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${accessToken}`
        },
      })

      const data = await response.json()

      return {
        status: response.status, 
        data: data,
      }
    } catch (error) {
      console.error("Error del servidor al extraer los usuarios", error)
      return {
        status: 500, 
        error: "Error del servidor al extraer los usuarios",
      }
    }
  }

  export const deleteAccount = async ( userId, accessToken ) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/auth/deleteAccountAndUser/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${accessToken}`
        },
      })

      const data = await response.json()

      return {
        status: response.status, 
        data: data,
      }
    } catch (error) {
      console.error("Error del servidor al intentar eliminar la cuenta del usuario.", error)
      return {
        status: 500, 
        error: "Error del servidor al intentar eliminar la cuenta del usuario.",
      }
    }
  }