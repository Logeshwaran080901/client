import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Dropdown from '../components/dropDown';
import baseUrl from '../utils/config';
import { FieldSetLayout } from '../components/feildsetlayout';
import Loader from '../components/Loader';

const NewCompany = () => {
    const [companyName, setCompanyName] = useState('');
    const [businessId, setBusinessId] = useState('');
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
        await axios.post(`${baseUrl}/company`, { companyname: companyName, businessid: businessId })
            .then((res) => {
                if (res) {
                    setLoader(false)
                    alert(res.data);
                    setCompanyName('')
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
                        value={businessId}
                        handleDropdown={handleBusinessChange}
                        label={'Select the Business'}
                        options={businessOption}
                    />
                    <div className="flex flex-col w-full sm:w-52">
                        <label htmlFor="name" className="mb-2 font-medium">Company Name</label>
                        <input
                            type="text"
                            id="name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white shadow-sm hover:bg-[#0088ffa1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0088ffa1] mx-2 text-xs rounded px-2 py-0.5 sm:px-2 sm:py-0.5"
                        onClick={() => handleSubmit()}
                    >
                        Add Sender
                    </button>

                </div>
            </FieldSetLayout>
        </div>


    );
};

export default NewCompany;
