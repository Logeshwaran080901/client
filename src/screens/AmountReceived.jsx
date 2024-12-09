import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import CustomDatePicker from '../components/datepicker';
import Dropdown from '../components/dropDown';
import baseUrl from '../utils/config';

const AmountReceivedForm = () => {
    const [businessId, setBusinessId] = useState('');
    const [sender, setSender] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());
    const [businessOption, setBusinessOption] = useState([])
    const [senderOption, setSenderOption] = useState([])
    // const senderOption =  [{id:'1',name:"Fire Woods"}, {id:'2',name:"farming"}]
    useEffect(() => {
        getAllBusiness()
    }, [])
    // const baseUrl = process.env.REACT_APP_BASE_URL;

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
    const handleBusinessChange = (e) => {
        setBusinessId(e.target.value)
        getAllCompanyByBusinessId(e.target.value)

    }
    const getAllCompanyByBusinessId = async (id) => {
        await axios.get(`${baseUrl}/company?businessid=${id}`)
            .then((res) => {
                if (res) {
                    let val = res.data.map(v => ({ id: v._id, name: v.companyname }))
                    setSenderOption(val)
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
    const handleSenderChange = (e) => setSender(e.target.value);
    const handleAmountChange = (e) => {
        if (e.target.value >= 1 || e.target.value === '') {
            setAmount(e.target.value);
        }
    }
    const handleDateChange = (date) => setDate(date);
    const handleSubmit = () => {
        console.log({
            businessId,
            sender,
            amount,
            date: format(date, 'dd/MM/yyyy'),
        });
    };

    return (
        <div className="max-w-lg mx-auto p-4 pt-20">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Amount Received</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Dropdown
                        value={businessId}
                        handleDropdown={handleBusinessChange}
                        label={'Select the Business'}
                        options={businessOption}
                    />
                    <Dropdown
                        value={sender}
                        handleDropdown={handleSenderChange}
                        label={'Select the Sender'}
                        options={senderOption}
                    />
                    {/* <Dropdown value={dropdown2} handleDropdown={handleDropdown2Change} label={'sender'} /> */}

                    <div className="flex flex-col">
                        <label htmlFor="amount" className="mb-2 font-medium">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={handleAmountChange}
                            className="p-2 border border-gray-300 rounded-md"
                            placeholder="Enter amount"
                        />
                    </div>

                    <CustomDatePicker
                        selectedDate={date}
                        onDateChange={handleDateChange}
                        maxDate={new Date()}
                    />

                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AmountReceivedForm;
