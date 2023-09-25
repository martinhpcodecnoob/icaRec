import React from 'react'

const LoginButton = ({ isSubmitting }) => {
    return (
        <button
          type="submit"
          className={`border rounded-full py-1 px-3 bg-[#f3ba1a] text-white w-3/4 mb-2 ${
            isSubmitting ? 'cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex justify-center items-center mb-2">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
            </div>
          ) : (
            'Iniciar Sesion'
          )}
        </button>
      )
}

export default LoginButton