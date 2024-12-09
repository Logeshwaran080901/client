import React from 'react';
import PieChart from './PieChart'; // Ensure the path to the PieChart component is correct
import BarChart from './BarChart'; // Ensure the path to the BarChart component is correct

const Widget = ({ type, data, title, onUpdateData }) => {
  return (
    <div className="bg-white p-6 rounded shadow flex flex-col items-center justify-center relative">
      {type === 'pie' && <PieChart title={title} data={data} onUpdateData={onUpdateData} />}
      {type === 'bar' && <BarChart title={title} data={data} onUpdateData={onUpdateData} />}
    </div>
  );
};

export default Widget;
