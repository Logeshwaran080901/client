import React from 'react';
import Checkbox from './CheckBox';

const Table = ({ data, view, header, check }) => {
  // let headers = [
  //   {
  //     label: 'Date',
  //     data: 'date',
  //     small: true
  //   },
  //   {
  //     label: 'Broker Name',
  //     data:'brokername',
  //     data1: 'fromlocation',
  //     small: true
  //   },
  //   {
  //     label: 'Company Name',
  //     data: 'companyname',
  //     small: false
  //   },
  //   {
  //     label: 'Labour Name',
  //     data: 'labourname',
  //     small: false
  //   },
  //   {
  //     label: 'Local Weight',
  //     data: 'localweight',
  //     small: false
  //   },
  //   {
  //     label: 'Company Weight',
  //     data: 'companyweight',
  //     small: false
  //   },
  // ]
  return (
    <div className="outlineBorder flex flex-col break-words bg-white w-full mb-6 rounded overflow-x-auto">
      {data.length === 0 ? (
        <p className="text-center text-gray-500">No data found</p>
      ) : (
        <div className='w-full overflow-x-auto'>
          <table className="items-center bg-transparent border-collapse w-full">
            <thead className="bg-[#dedede]  group hover:bg-[#e5ebff]">
              <tr>
                {
                  check ? (
                    <>
                      <th className='py-2 text-text-color text-left px-2 text-[14px]'>
                        <Checkbox
                          onChange={(e) => { check(e, '', 'fullCheck') }}
                        />
                      </th>
                    </>
                  ) : null
                }
                {header.map(v =>
                  <th className={`${v.small ? '' : 'hidden md:table-cell'} + py-2 text-text-color text-left px-2 text-[14px]`}>{v.label}</th>
                )}
                {
                  view ? (
                    <>
                      <th className='block md:hidden py-2 text-text-color text-left px-2 text-[14px]'>view</th>
                    </>
                  ) : null
                }
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id.toString()} className="group hover:bg-[#e5ebff]">
                  {check ? (
                    <td className="text-text-color text-tiny text-left px-2 py-1">
                      <Checkbox
                        disabled={item.disable}
                        onChange={(e) => { check(e, item) }}
                      />
                    </td>
                  ) : null}
                  {header.map(v => (
                    <td className={`${v.small ? '' : 'hidden md:table-cell'} text-text-color text-tiny text-left px-2 py-1`}>
                      {v.onlycheck&&item[v.data] ? v.name : (
                        <>
                          {item[v.data]} {item[v.data1] ? `(${item[v.data1]})` : ''}
                        </>
                      )}
                    </td>))}
                  {view ? (
                    <td className="block md:hidden text-text-color text-tiny text-left px-2 py-1">
                      <button
                        className="text-[#1589ee8c] hover:text-[#000] text-base rounded font-sans"
                        onClick={() => view(item)}
                      >
                        View
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
