import React, { useState, useEffect } from "react";
import CustomDatePicker from "./datepicker";
import Loader from "./Loader";

const BillingPopup = ({ loader,billingData, setBillData, save,onClose }) => {
    const [totalAmount, setTotalAmount] = useState({ totalSum: 0 });
    const [totalWeight, setTotalWeight] = useState(0);
    const [totalRate, setTotalRate] = useState(0);
    const [date, setDate] = useState(new Date());
    const handleDateChange = (date) => setDate(date);

    useEffect(() => {
        // Calculate total weight on initial render
        const totalWeight = billingData.reduce((acc, item) => acc + item.companyweight, 0);
        setTotalWeight(totalWeight.toFixed(3));
    }, [billingData]);

    useEffect(() => {
        // Calculate total amount whenever the rate or totalRate changes
        const totalSum = billingData.reduce((acc, item) => {
            const itemRate = item.rate || 0;
            const itemTotal = itemRate * item.companyweight;
            return acc + itemTotal;
        }, 0);
        const totalRate1 = billingData.reduce((acc, item) => {
            return Number(acc) + Number(item.rate);
        }, 0);
        setTotalRate(totalRate1 / billingData.length)
        setTotalAmount((prev) => ({ ...prev,totalSum:Math.round(totalSum) }));
    }, [billingData]);

    const handleRateChange = (id, value, index) => {
        if (!Number(value)) {
            value = 0;
        }
        if (value >= 0) {
            const updatedata = billingData.find(v => v._id === id);
            updatedata.rate = value ?? 0;
            updatedata.totalamount = Math.round(updatedata.companyweight * value ?? 0);
            const notiddata = billingData.filter(v => v._id !== id);
            notiddata.splice(index, 0, updatedata);
            setBillData([...notiddata]);
        }
    };

    const handleTotalRateChange = (e) => {
        let value = parseFloat(e.target.value);
        if (!Number(value) || value === '') {
            value = 0;
        }
        setTotalAmount({ totalSum: Math.round(totalWeight * value) });
        setTotalRate(value);
        billingData.forEach((v, index) => {
            handleRateChange(v._id, value ?? 0, index);
        });
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                      {loader ? <Loader /> : null}

            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
                <h2 className="text-lg font-semibold mb-4">Billing Details</h2>
                <CustomDatePicker
                    selectedDate={date}
                    onDateChange={handleDateChange}
                    maxDate={new Date()}
                />
                <div className="overflow-x-auto max-h-96">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Date</th>
                                <th className="py-2 px-4 border-b">Company Weight</th>
                                <th className="py-2 px-4 border-b">Rate</th>
                                <th className="py-2 px-4 border-b">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {billingData.map((item, index) => (
                                <tr key={item._id}>
                                    <td className="py-2 px-4 border-b">{item.date.substring(0, 4)}</td>
                                    <td className="py-2 px-4 border-b">{item.companyweight}</td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="number"
                                            value={item.rate || 0}
                                            onChange={(e) => handleRateChange(item._id, e.target.value, index)}
                                            className="border border-gray-300 rounded px-2 py-1 w-12 sm:w-24 md:w-32 lg:w-40"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {item.totalamount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="py-2 px-4 border-t font-semibold">Total</td>
                                <td className="py-2 px-4 border-t font-semibold">{totalWeight}</td>
                                <td className="py-2 px-4 border-t font-semibold">
                                    <input
                                        type="number"
                                        value={totalRate}
                                        onChange={handleTotalRateChange}
                                        className="border border-gray-300 rounded px-2 py-1 w-12 sm:w-50 md:w-32 lg:w-40"
                                    />
                                </td>
                                <td className="py-2 px-4 border-t font-semibold">
                                    {totalAmount.totalSum || 0}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="flex justify-end mt-4 gap-4">
                    <button
                         onClick={()=>save({date,totalamount:totalAmount.totalSum,totalrate:totalRate})}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BillingPopup;
