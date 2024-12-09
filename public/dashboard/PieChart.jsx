import React, { useState } from 'react';
import { PieChart as RechartPieChart, Pie, Cell, Tooltip, Legend, Label } from 'recharts';
import Modal from './modal'; // Ensure the path to the Modal component is correct

const generateColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const color = `hsl(${Math.floor((i * 360) / numColors)}, 70%, 50%)`;
    colors.push(color);
  }
  return colors;
};

const PieChart = ({ title, data, onUpdateData }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Prepare chart data
  const chartData = data.map((pair) => ({
    name: pair.key,
    value: Number(pair.value),
  }));

  // Calculate total value
  const totalValue = chartData.reduce((total, entry) => total + entry.value, 0);

  // Generate dynamic colors
  const colors = generateColors(chartData.length);

  // Handle modal open and data submission
  const handleAddData = () => {
    setModalOpen(true);
  };

  const handleSubmit = ({ title: newTitle, data: newData }) => {
    onUpdateData(newTitle, newData);
    setModalOpen(false);
  };

  return (
    <div className="relative bg-white p-6 rounded shadow flex flex-col items-center justify-center" style={{ width: '400px', height: '400px' }}>
      {/* Render title only if chartData is available */}
      {chartData.length > 0 && (
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
      )}

      {/* Display pie chart or a message to add data */}
      {chartData.length === 0 ? (
        <div
        className="flex items-center justify-center cursor-pointer text-gray-500 border border-gray-300 rounded"
        style={{ width: '200px', height: '40px' }} // Button dimensions
        onClick={handleAddData}
      >
        <span className="text-lg">+ Add Values</span>
      </div>
      ) : (
        <RechartPieChart width={400} height={400}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
            <Label
              value={`Total: ${totalValue}`}
              position="center"
              fontSize="24px"
              fill="#333"
              fontWeight="bold"
            />
          </Pie>
          <Tooltip />
          <Legend />
        </RechartPieChart>
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

export default PieChart;
