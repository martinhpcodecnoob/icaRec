import React from 'react'

const RegistrationButton = ({ isSubmitting }) => {
    return (
        <button
          type="submit"
          className={`bg-[#100e80] text-white w-48 py-2 border rounded-full hover:bg-blue-500 ${
            isSubmitting ? 'cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex justify-center items-center mb-2">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
            </div>
          ) : (
            'Registrarme'
          )}
        </button>
      )
}

export default RegistrationButton