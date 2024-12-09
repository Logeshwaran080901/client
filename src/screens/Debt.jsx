import axios from 'axios';
import React, { useEffect, useState } from 'react';
import baseUrl from '../utils/config';

const DebtScreen = () => {
  const [debts, setDebts] = useState([]);
  const [id, setId] = useState('');
  const [creditername, setCreditername] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState(null);

  useEffect(() => {
    getAllDebt();
  }, []);

  const getAllDebt = async () => {
    await axios.get(`${baseUrl}/debt`)
      .then((res) => {
        if (res) {
          res.data.forEach(v => {
            v.amounts=new Intl.NumberFormat('en-IN').format(v.amount);
          });
          setDebts(res.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert(error.response.data);
        } else {
          alert('Internal Server Error');
        }
      });
  };

  const addDebt = async () => {
    try {
      if (creditername && amount && description) {
        await axios.post(`${baseUrl}/debt`, { creditername, amount, description, id })
          .then((res) => {
            if (res) {
              alert(res.data);
              getAllDebt();
              cancelEditing();
            }
          })
          .catch((error) => {
            cancelEditing();
            if (error.response.status === 404) {
              alert(error.response.data);
            } else {
              alert('Internal Server Error');
            }
          });
      }
    } catch (error) {
      console.error(error);
      alert('catch error');
    }
  };
  const debtPayeed = async (debtid) => {
    try {
        await axios.put(`${baseUrl}/debt?id=${debtid}`)
          .then((res) => {
            if (res) {
              alert(res.data);
              getAllDebt();
              cancelEditing();
            }
          })
          .catch((error) => {
            cancelEditing();
            if (error.response.status === 404) {
              alert(error.response.data);
            } else {
              alert('Internal Server Error');
            }
          });
    } catch (error) {
      console.error(error);
      alert('catch error');
    }
  };
  const startEditing = (index) => {
    setIsEditing(true);
    setId(debts[index]._id);
    setCreditername(debts[index].creditername);
    setDescription(debts[index].description);
    setAmount(debts[index].amount);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setCreditername('');
    setDescription('');
    setId('');
    setAmount('');
  };

  const openModal = (debt) => {
    setSelectedDebt(debt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDebt(null);
  };

  return (
    <div className="container mx-auto p-4 pt-16">
      <h1 className="text-2xl font-bold mb-4 text-center">Debt Management</h1>

      {/* Form */}
      <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? 'Edit Debt' : 'Add New Debt'}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={creditername}
            onChange={(e) => setCreditername(e.target.value)}
            placeholder="e.g., Credit Card"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Credit Card"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 5000"
          />
        </div>
        {isEditing ? (
          <div className="flex justify-between">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
              onClick={addDebt}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
              onClick={cancelEditing}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            onClick={addDebt}
          >
            Add Debt
          </button>
        )}
      </div>

      {/* Debt List */}
      <div className="mt-8 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Your Debts</h2>
        <ul className="bg-white shadow-md rounded-lg p-4">
          {debts.length === 0 ? (
            <p className="text-gray-600">No debts added yet.</p>
          ) : (
            debts.map((debt, index) => (
              <li key={index} className="flex justify-between items-center mb-3 border-b pb-2">
                <div>
                  <span className="font-semibold">{debt.creditername}</span>
                  <span className="ml-2 text-gray-500">₹{debt.amounts}</span>
                </div>
                <div>
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => startEditing(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => openModal(debt)}
                  >
                    View
                  </button>
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => debtPayeed(debt._id)}
                  >
                    Payed
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && selectedDebt && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Debt Details</h2>
            <p><strong>Name:</strong> {selectedDebt.creditername}</p>
            <p><strong>Amount:</strong> ₹{selectedDebt.amounts}</p>
            <p><strong>Description:</strong> {selectedDebt.description}</p>
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition w-full"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebtScreen;
