import React from 'react'

const CustomCheckbox = ({ label, isChecked, onChange }) => {
  return (
    <label className="flex items-center justify-center w-full mb-4">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="ml-4 form-checkbox h-4 w-4 text-indigo-600"
      />
      <span className="text-gray-500 text-sm ml-4">{label}</span>
    </label>
  )
}

export default CustomCheckbox
