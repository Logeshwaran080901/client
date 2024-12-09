import React from 'react';

const DataTable1 = ({ data }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Local Weight</th> */}
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Broker Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Broker Rate</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Broker Amount</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Labour Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Labour Rate</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Labour Amount</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billed Rate</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billed Amount</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">{new Date(item.date).toLocaleDateString()}</td>

            {/* <td className="px-6 py-4 whitespace-nowrap">{item.localweight}</td> */}
            <td className="px-6 py-4 whitespace-nowrap">{item.companyweight}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.brokername}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.payedtobroker.rate}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.payedtobroker.amount}</td>

            <td className="px-6 py-4 whitespace-nowrap">{item.labourname}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.payedtolabour.rate}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.payedtolabour.amount}</td>

            <td className="px-6 py-4 whitespace-nowrap">{item.companyname}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.billed.rate}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.billed.amount}</td>

          </tr>
        ))}
      </tbody>
    </table>
  );

};


export default DataTable1;
