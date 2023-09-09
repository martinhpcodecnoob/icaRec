import React from 'react'

const ForgotPasswordButton = ({ isSubmitting, disable }) => {
    return (
        <button
          type="submit"
          className={`border rounded-full py-1 px-3 ${
            disable ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#100e80] text-white'
          } w-3/4 mb-2`}
          disabled={isSubmitting || disable}
        >
          {isSubmitting ? (
            <div className="flex justify-center items-center mb-2">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
            </div>
          ) : (
            'Enviar Enlace'
          )}
        </button>
      );
}

export default ForgotPasswordButton