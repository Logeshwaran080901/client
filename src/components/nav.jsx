import React, { useState } from 'react';
import {  Route, Routes } from 'react-router-dom';
import LoadEntryScreen from '../screens/LoadScreen';
import DataTable from '../screens/viewLoad';
import AmountReceivedForm from '../screens/AmountReceived';
import NewCompany from '../screens/newCompany';
import NewBroker from '../screens/NewBroker';
import NewLabour from '../screens/NewLabour';
import BusinessForm from '../screens/AddBusiness';
import DebtScreen from '../screens/Debt';
import CreditedTo from '../screens/Credit';
import BilledAndNotBilled from '../screens/BilledAndNotBilledScreen';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-gray-800 w-64`}>
        <div className="flex items-center  h-16 bg-gray-900 text-white">
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none ml-5">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          {/* <h1 className="text-2xl font-semibold">My Navbar</h1> */}
        </div>
        <nav className="mt-10">
        <a href="/" className="block text-white p-2">Load Entry</a>
          <a href="/viewload" className="block text-white p-2">View Load</a>
          <a href="/billed" className="block text-white p-2">billed</a>
          {/* <a href="/amount-received" className="block text-white p-2">Amount Received</a> */}
          {/* <a href="#" className="block text-white p-2">Amount Spent</a> */}
          {/* <a href="/debt" className="block text-white p-2">Debt</a> */}
          {/* <a href="/creditedto" className="block text-white p-2">Amount given</a> */}
          <a href="/sender" className="block text-white p-2">Add Company</a>
          <a href="/broker" className="block text-white p-2">Add Broker</a>
          <a href="/labour" className="block text-white p-2">Add Labour</a>
          {/* <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">Home</a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">About</a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">Services</a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">Contact</a> */}
        </nav>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between h-16 bg-gray-900 text-white px-4">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </header>
        <main 
        className={isOpen ? 'ml-0 sm:ml-64' : 'ml-0'}
        // className="flex-1 p-4"
        >
          
      <Routes>
        {/* <Route path="" element={<Dashboard />} /> */}
        {/* <Route path="/port" element={<Portfolio />} /> */}
        <Route path="/" element={<LoadEntryScreen />} />
        <Route path="/viewload" element={<DataTable />} />
        <Route path="/amount-received" element={<AmountReceivedForm />} />
        <Route path="/billed" element={<BilledAndNotBilled />} />
        <Route path="/sender" element={<NewCompany />} />
        <Route path="/broker" element={<NewBroker />} />
        <Route path="/labour" element={<NewLabour />} />
        <Route path="/business" element={<BusinessForm />} />
        <Route path="/debt" element={<DebtScreen />} />
        <Route path="/creditedto" element={<CreditedTo />} />
      </Routes>
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
