import React, { useEffect, useState } from 'react';
import Table from '../components/table';
import getdate from '../utils/dateutils';
import { FieldSetLayout } from '../components/feildsetlayout';
import Dropdown from '../components/dropDown';
import axios from 'axios';
import baseUrl from '../utils/config';
import Button from '../components/Button';
import BillingPopup from '../components/billingPopup';
import FullViewHeader from '../headers/FullViewHeader';
import CompanyViewHeader from '../headers/CompanyViewHeader';
import BrokerViewHeader from '../headers/BrokerAndLabourViewHeader';
import Loader from '../components/Loader';

const DataTable = () => {
  const [selected, setSelected] = useState('')
  const option = [{ id: 'labour', name: 'Labour' }, { id: 'broker', name: 'Broker' }, { id: 'company', name: 'Company' }]
  const [dropDown, setDropDown] = useState([])
  const [selectedDrop, setSelectedDrop] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [fulldata, setFullData] = useState([])
  const [billingData, setBillData] = useState([])
  const [filterdata, setFilterData] = useState([])
  const [checked, setChecked] = useState([])
  const [buttonname, setButtonName] = useState('select the type')
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [header, setHeader] = useState(FullViewHeader)
  const [loader, setLoader] = useState(false)

  const openModal = (debt) => {
    setSelectedLoad(debt);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLoad(null);
  };
  const handleChange = (e) => {
    setSelected(e.target.value)
    setSelectedDrop('')
    setBillData([])
    setDropDown([])
    setChecked([])
    getAllBroker(e.target.value)
    setFilterData([])
    if (e.target.value === 'labour') {
      setButtonName('Payed to Labour')
    }
    if (e.target.value === 'broker') {
      setHeader(BrokerViewHeader)
      setButtonName('Payed to Broker')
    }
    if (e.target.value === 'company') {
      setHeader(CompanyViewHeader)
      setButtonName('Billed')
    }
  }
  useEffect(() => {
    getAllLoad()
  }, [])
  const getAllLoad = async (type) => {
    setLoader(true)
    await axios.get(`${baseUrl}/allload`)
      .then((res) => {
        if (res) {
          setLoader(false)
          const data = res.data.sort((a, b) => a.date + b.date);
          data.forEach(v => {
            v.date = getdate(v.date)
            v.rate = 0
            v.totalamount = 0
            v.disable = true
            v.check = false
          })
          setFullData(data)
          setFilterData(data)
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
  }
  const getAllBroker = async (type) => {
    await axios.get(`${baseUrl}/${type}?businessid=6755c1d7a5be109678e7102a`)
      .then((res) => {
        if (res) {
          let val = res.data.map(v => ({ id: v._id, name: v.brokername || v.companyname || v.labourname }))
          setDropDown(val)
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
  const handleDropDownChange = (e) => {
    setSelectedDrop(e.target.value)
    let dummy = JSON.parse(JSON.stringify(fulldata))
    let updateData = dummy.filter(v => v[`${selected}id`] === e.target.value)
    updateData.forEach(v => {
      v.disable = selected === 'labour' || selected === 'broker' ? v[`payedto${selected}`][`payedto${selected}`] : v.billed.billed
    })
    setChecked([])
    setFilterData(updateData)
  }
  const handleCheck = (e, item, type) => {
    if (e.target.checked) {
      if (type === 'fullCheck') {
        let ids = filterdata.filter(v => selected === 'labour' || selected === 'broker' ? !v[`payedto${selected}`][`payedto${selected}`] : !v.billed.billed).map(v => v._id)
        setChecked(ids)
      } else {
        setChecked([...checked, item._id]);
      }
    } else {
      if (type === 'fullCheck') {
        setChecked([])
      } else {
        const updateData = checked.filter(v => v !== item._id)
        setChecked(updateData)
      }
    }
  }
  const handleOpenBilling = () => {
    let datas = JSON.parse(JSON.stringify(fulldata))
    let billdata = datas.filter(v => checked.find(c => c === v._id))
    if (selected === 'company') {
      billdata = Object.values(billdata.reduce((acc, curr) => {
        acc[curr.jointid] = curr;
        return acc;
      }, {}));
    }
    setBillData(billdata)
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const bill = async ({ date, totalamount, totalrate }) => {
    setLoader(true)
    let datas = { date, totalamount, totalrate }
    if (selected === 'labour') {
      datas.labourid = selectedDrop
      datas.ids = billingData.map(v => v._id)
      datas.type = 'payedtolabour'
    }
    if (selected === 'broker') {
      datas.brokerid = selectedDrop
      datas.type = 'payedtobroker'
      datas.ids = billingData.map(v => v._id)
    }
    if (selected === 'company') {
      datas.jointid = billingData.filter(v => v.jointid).map(v => v.jointid)
      datas.ids = billingData.filter(v => !v.jointid).map(v => v._id)
      datas.companyid = selectedDrop
      datas.type = 'billed'
    }
    datas.billingrecord = JSON.stringify(billingData)
    await axios.post(`${baseUrl}/bill`, { ...datas })
      .then((res) => {
        if (res) {
          getAllLoad()
          setIsPopupOpen(false)
          setBillData([])
          setLoader(false)
          alert(res.data);
        }
      })
      .catch((error) => {
        setIsPopupOpen(false)
        setBillData([])
        setLoader(false)
        if (error.response.status === 404) {
          alert(error.response.data);
        } else {
          alert('Internal Server Error');
        }
      });
  }
  return (
    <div className="overflow-x-auto">
      {loader ? <Loader /> : null}

      {/* Add padding-top to ensure content is not hidden */}
      <FieldSetLayout >
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <Dropdown
            value={selected}
            handleDropdown={(e) => handleChange(e)}
            label={'Select the Type'}
            options={option}
          />

          <Dropdown
            value={selectedDrop}
            disabled={!selected}
            handleDropdown={(e) => handleDropDownChange(e)}
            label={`Select the ${selected ? selected.charAt(0).toUpperCase() + selected.slice(1) : 'type'}`}
            options={dropDown}
          />
          <Button name={buttonname} handleSumbit={handleOpenBilling} disabled={selected === '' || selectedDrop === '' || !checked.length} />
        </div>
      </FieldSetLayout>
      <FieldSetLayout >
        <Table
          key='_id'
          data={filterdata}
          header={header}
          view={(e) => openModal(e)}
          check={(e, item, type) => handleCheck(e, item, type)}
        />
      </FieldSetLayout>
      {isModalOpen && selectedLoad && (

        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Load Details</h2>
            <p><strong>Company Name:</strong> {selectedLoad.companyname}</p>
            <p><strong>Broker:</strong> {selectedLoad.brokername}</p>
            <p><strong>Labour:</strong> {selectedLoad.labourname}</p>
            <p><strong>type:</strong> {selectedLoad.type}</p>
            <p><strong>weigth:</strong> {selectedLoad.companyweight}</p>
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition w-full"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isPopupOpen && <BillingPopup loader={loader} billingData={billingData} setBillData={setBillData} onClose={handleClosePopup} save={(data) => bill(data)} />}
    </div>
  );
};

export default DataTable;
