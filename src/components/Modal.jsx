// Modal.js
import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onSubmit, initialTitle, initialData }) => {
  const [title, setTitle] = useState(initialTitle || '');
  const [data, setData] = useState(initialData || [{ key: '', value: '' }]);

  if (!isOpen) return null;

  const handleChange = (index, key, value) => {
    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], [key]: value };
    setData(updatedData);
  };

  const addRow = () => {
    setData([...data, { key: '', value: '' }]);
  };

  const removeRow = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSubmit({ title, data });
    setTitle(''); // Reset title
    setData([{ key: '', value: '' }]); // Reset data
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-md">
        <h2 className="text-xl mb-4">Add Chart Data</h2>
        <input
          type="text"
          placeholder="Chart Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        {data.map((entry, index) => (
          <div key={index} className="flex space-x-4 mb-2 items-center">
            <input
              type="text"
              placeholder="Key"
              value={entry.key}
              onChange={(e) => handleChange(index, 'key', e.target.value)}
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              placeholder="Value"
              value={entry.value}
              onChange={(e) => handleChange(index, 'value', e.target.value)}
              className="border p-2 rounded w-full"
            />
            <button
              type="button"
              onClick={() => removeRow(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addRow}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        >
          Add More
        </button>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
