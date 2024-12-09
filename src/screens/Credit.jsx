import axios from 'axios';
import React, { useEffect, useState } from 'react';
import baseUrl from '../utils/config';
import Dropdown from '../components/dropDown';
import CustomDatePicker from '../components/datepicker';

const CreditedTo = () => {
    const [recipientTo, setRecipientTo] = useState('labour');
    const [selectedRecipient, setSelectedRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());
    const [brokerOption, setBrokerOption] = useState([])
    const [labourOption, setLabourOption] = useState([])
    const paymentOption = [{ id: "Cash", name: 'Cash' }, { id: "Online", name: 'Online' }]
    const [paymentmethod, setPaymentMethod] = useState('Cash')
    const [description, setDescription] = useState('')
    useEffect(() => {
        getAllBroker()
    }, [])
    const getAllBroker = async () => {
        await axios.get(`${baseUrl}/broker?businessid=6755c1d7a5be109678e7102a`)
            .then((res) => {
                if (res) {
                    let val = res.data.map(v => ({ id: v._id, name: v.brokername }))
                    setBrokerOption(val)
                    getAllLabour()
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
    const getAllLabour = async () => {
        await axios.get(`${baseUrl}/labour?businessid=6755c1d7a5be109678e7102a`)
            .then((res) => {
                if (res) {
                    let val = res.data.map(v => ({ id: v._id, name: v.labourname }))
                    setLabourOption(val)
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

    const handleRecipientChange = (e) => {
        setRecipientTo(e.target.value);
        setSelectedRecipient(''); // Reset selected recipient when changing type
    };

    const handleSelectedRecipientChange = (e) => {
        setSelectedRecipient(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };
    const handleDateChange = (date) => setDate(date);


    const handleSubmit = async() => {
        const data = { amount, date, description, paymentmethod }
        if(recipientTo==='broker'){
            data.brokerid=selectedRecipient
        }else{
            data.labourid=selectedRecipient
        }
        await axios.post(`${baseUrl}/amountgiven`, { ...data})
            .then((res) => {
                if (res) {
                    alert(res.data);
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

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
            >
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Amount Given
                </h2>
                <div className="mb-4">
                    <label
                        htmlFor="recipientType"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Select Recipient To
                    </label>
                    <select
                        id="recipientType"
                        value={recipientTo}
                        onChange={handleRecipientChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="labour">Labour</option>
                        <option value="broker">Broker</option>
                    </select>
                </div>

                <Dropdown
                    value={selectedRecipient}
                    handleDropdown={handleSelectedRecipientChange}
                    label={`Select ${recipientTo}`}
                    options={recipientTo === 'labour' ? labourOption : brokerOption}
                />

                <div className="mb-4">
                    <label
                        htmlFor="amount"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="Enter amount"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <Dropdown
                    value={paymentmethod}
                    handleDropdown={(e) => setPaymentMethod(e.target.value)}
                    label={`Select Payment Method`}
                    options={paymentOption}
                />
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                        type="text"
                        id="name"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <CustomDatePicker
                    selectedDate={date}
                    onDateChange={handleDateChange}
                    maxDate={new Date()}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreditedTo;
