import React, { useState } from 'react';
import axios from 'axios'
import baseUrl from '../utils/config';

const BusinessForm = () => {
    const [businessName, setBusinessName] = useState('');

    const handleSubmit = async () => {
        // Handle form submission logic
        await axios.post(`${baseUrl}/business`, { businessname: businessName })
            .then((res) => {
                if (res) {
                    alert(res.data);
                    setBusinessName('')
                }
            })
            .catch((error) => {
                setBusinessName('')
                if (error.response.status === 404) {
                    alert(error.response.data);
                } else {
                    alert('Internal Server Error');
                }
            });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md pt-40">
            <h2 className="text-2xl font-bold mb-4">Add New Business</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Business Name</label>
                    <input
                        type="text"
                        id="name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Add Business
                </button>
            </form>
        </div>
    );
};

export default BusinessForm;
