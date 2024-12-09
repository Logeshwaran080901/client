import React, { useState } from 'react';
import Widget from './Widget'; // Ensure the path to the Widget component is correct

const Dashboard = () => {
  const initialWidgets = [
    { id: 1, type: 'pie', title: 'Pie Chart 1', data: [] },
    { id: 2, type: 'pie', title: 'Pie Chart 2', data: [] },
    { id: 3, type: 'pie', title: 'Pie Chart 3', data: [] },
    { id: 4, type: 'bar', title: 'Bar Chart 1', data: [] },
    { id: 5, type: 'bar', title: 'Bar Chart 2', data: [] },
    { id: 6, type: 'bar', title: 'Bar Chart 3', data: [] }
  ];

  const [widgets, setWidgets] = useState(initialWidgets);

//   const addWidget = (type) => {
//     setWidgets([...widgets, { id: widgets.length + 1, type, title: `${type} Chart ${widgets.length + 1}`, data: [] }]);
//   };

  const updateWidgetData = (id, newTitle, newData) => {
    setWidgets(widgets.map(widget =>
      widget.id === id ? { ...widget, title: newTitle, data: newData } : widget
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Widgets Dashboard</h1>
        {/* <div className="flex space-x-4">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            onClick={() => addWidget('pie')}
          >
            <span className="mr-2">Add Pie Chart</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
          <button 
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
            onClick={() => addWidget('bar')}
          >
            <span className="mr-2">Add Bar Chart</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div> */}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets.map(widget => (
          <Widget
            key={widget.id}
            type={widget.type}
            title={widget.title}
            data={widget.data}
            onUpdateData={(newTitle, newData) => updateWidgetData(widget.id, newTitle, newData)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
