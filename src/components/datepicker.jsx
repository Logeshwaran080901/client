// src/components/CustomDatePicker.js

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const CustomDatePicker = ({ selectedDate, onDateChange,maxDate,label }) => {

  return (
       <div className="flex flex-col">
          <label htmlFor="date" className="mb-2 font-medium">{label}</label>
          <DatePicker
            selected={selectedDate}
            onChange={onDateChange}
            maxDate={maxDate}
            className="p-2 border border-gray-300 rounded-md"
            dateFormat="dd/MM/yyyy"
          />
        </div>
  );
};

export default CustomDatePicker;
