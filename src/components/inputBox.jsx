import React from "react";

export default function InputBox({ label, value, onChange,type, regex,placeholder }) {
  const handleChange = (e) => {
    // Extract the value from the event
    let inputValue = e.target.value;

    // Match the pattern for two whole numbers and up to three decimal places
    const regex = /^\d{0,2}(\.\d{0,4})?$/;

    // Only update if the value matches the regex pattern
    if (type==='number'&&regex) {
      if(regex.test(inputValue) || inputValue === ''){
        onChange(e); // Pass the entire event object to the onChange function
      }
    }else{
      onChange(e) 
    }
  };

  return (
    <div className="flex flex-col w-full sm:w-52">
      <label htmlFor="name" className="mb-2 font-medium">{label}</label>
      <input
        type={type??'text'}
        id="name"
        value={value}
        onChange={handleChange} // Attach the handleChange function
        required
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
}
