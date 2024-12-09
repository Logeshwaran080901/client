import React, { useState } from 'react';
import { BarChart as RechartBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Modal from './modal'; // Ensure the path to the Modal component is correct

const BarChart = ({ title, data, onUpdateData }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Handle modal open and data submission
  const handleAddData = () => {
    setModalOpen(true);
  };

  const handleSubmit = ({ title: newTitle, data: newData }) => {
    onUpdateData(newTitle, newData);
    setModalOpen(false);
  };

  return (
    <div className="relative bg-white p-6 rounded shadow flex flex-col items-center justify-center" style={{ width: '400px', height: '300px' }}>
      {/* Render title only if data is available */}
      {data.length > 0 ? (
        <>
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <RechartBarChart
            width={400}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="key" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </RechartBarChart>
        </>
      ) : (
        <div
          className="flex items-center justify-center cursor-pointer text-gray-500 border border-gray-300 rounded"
          style={{ width: '200px', height: '40px' }} // Button dimensions
          onClick={handleAddData}
        >
          <span className="text-lg">+ Add Values</span>
        </div>
      )}

      {/* Modal for adding or updating data */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialTitle={title}
        initialData={data}
      />
    </div>
  );
};

export default BarChart;
