import React from 'react';

function Dropdown({ value, label, handleDropdown, options,disabled }) {
  return (
    <div className="flex flex-col w-full sm:w-52">
      <label htmlFor={label} className="mb-2 font-medium">{label}</label>
      <select
        id={label}
        value={value}
        disabled={disabled}
        onChange={handleDropdown}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="" disabled>{label}</option>
        {options.map((v,index) => (
          <option key={index}  value={v.id}>{v.name}</option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
