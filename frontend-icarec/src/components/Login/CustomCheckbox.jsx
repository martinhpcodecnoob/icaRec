import React from 'react'

const CustomCheckbox = ({ label, isChecked, onChange }) => {
  return (
    <label className="flex items-center mb-2">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="form-checkbox h-4 w-4 text-indigo-600"
      />
      <span className="block text-gray-500 text-sm ml-2">{label}</span>
    </label>
  )
}

export default CustomCheckbox
