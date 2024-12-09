import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Dropdown from '../components/dropDown';
import baseUrl from '../utils/config';
import { FieldSetLayout } from '../components/feildsetlayout';
import Loader from '../components/Loader';

const NewBroker = () => {
    const [brokername, setBrokerName] = useState('');
    const [businessid, setBusinessId] = useState('');
    const [businessOption, setBusinessOption] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        getAllBusiness()
    }, [])
    const getAllBusiness = async () => {
        await axios.get(`${baseUrl}/business`)
            .then((res) => {
                if (res) {
                    let val = res.data.map(v => ({ id: v._id, name: v.businessname }))
                    setBusinessOption(val)
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    alert(error.response.data);
                } else {
                    alert('Internal Server Error');
                }
            });
    }
    const handleBusinessChange = (e) => setBusinessId(e.target.value);
    const handleSubmit = async () => {
        setLoader(true)
        await axios.post(`${baseUrl}/broker`, { brokername, businessid })
            .then((res) => {
                if (res) {
                    setLoader(false)
                    alert(res.data);
                    setBrokerName('')
                }
            })
            .catch((error) => {
                setLoader(false)
                if (error.response.status === 404) {
                    alert(error.response.data);
                } else {
                    alert('Internal Server Error');
                }
            });
    };

    return (
        <div>
            {loader ? <Loader /> : null}
            <FieldSetLayout title=''>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                    <Dropdown
                        value={businessid}
                        handleDropdown={handleBusinessChange}
                        label={'Select the Business'}
                        options={businessOption}
                    />
                    <div className="flex flex-col w-full sm:w-52">
                        <label htmlFor="name" className="mb-2 font-medium">Broker Name</label>
                        <input
                            type="text"
                            id="name"
                            value={brokername}
                            onChange={(e) => setBrokerName(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white shadow-sm hover:bg-[#0088ffa1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0088ffa1] mx-2 text-xs rounded px-2 py-0.5 sm:px-2 sm:py-0.5"
                        onClick={() => handleSubmit()}
                    >
                        Add Broker
                    </button>

                </div>
            </FieldSetLayout>
        </div>

        // <div className="max-w-md mx-auto p-6 pt-36 bg-white rounded-lg shadow-md">
        //     <h2 className="text-2xl font-bold mb-4">Add New Broker</h2>
        //     <form onSubmit={handleSubmit} className="space-y-4">
        //         <div>
        //             <label htmlFor="name" className="block text-sm font-medium text-gray-700">Broker Name</label>
        //             <input
        //                 type="text"
        //                 id="name"
        //                 value={brokername}
        //                 onChange={(e) => setBrokerName(e.target.value)}
        //                 required
        //                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        //             />
        //         </div>
        //         <Dropdown
        //             value={businessid}
        //             handleDropdown={handleBusinessChange}
        //             label={'Select the Business'}
        //             options={businessOption}
        //         />
        //         <button
        //             type="submit"
        //             className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        //             Add Sender
        //         </button>
        //     </form>
        // </div>
    );
};

export default NewBroker;
