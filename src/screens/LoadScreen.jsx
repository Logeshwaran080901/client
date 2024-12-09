import axios from 'axios';
import React, { useEffect, useState } from 'react';
import baseUrl from '../utils/config';
import Dropdown from '../components/dropDown';
import CustomDatePicker from '../components/datepicker';
import { FieldSetLayout } from '../components/feildsetlayout';
import InputBox from '../components/inputBox';
import Loader from '../components/Loader';
import getdate from '../utils/dateutils';
import Table from '../components/table';
import loadheader from '../headers/loadheader';


const LoadEntryScreen = () => {
  const [brokerid, setBrokerId] = useState('');
  const [fromlocation, setFromLocation] = useState('');
  const [companyid, setCompanyId] = useState('');
  const [tolocation, setToLocation] = useState('');
  const [labourid, setLabourId] = useState('');
  const [companyweight, setCompanyWeight] = useState('');
  const [localweight, setLocalWeight] = useState('');
  const [showJoins, setShowJoins] = useState(false);
  const [joinCount, setJoinCount] = useState(2);
  const [date, setDate] = useState(new Date());
  const [joint, setJoint] = useState();
  const jointOption = [{ id: '2', name: "2" }, { id: '3', name: "3" }, { id: '4', name: "4" }]
  const [brokerOption, setBrokerOption] = useState([])
  const [labourOption, setLabourOption] = useState([])
  const [companyOption, setCompanyOption] = useState([])
  const [transport, setTransport] = useState('')
  const typeOption = [{ id: 'வேலி', name: 'வேலி' }, { id: 'வேலன்', name: 'வேலன்' }, { id: 'வேம்பு', name: 'வேம்பு' }, { id: 'புளியன்', name: 'புளியன்' }, { id: 'other', name: 'other' }]
  const [type, setType] = useState('')
  const [othertype, setOtherType] = useState('')
  const [loader, setLoader] = useState(false)
  const [filterdata, setFilterData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(null);
  useEffect(() => {
    getAllBroker()
    getAllLoad()
  }, [])
  const openModal = (debt) => {
    setSelectedLoad(debt);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLoad(null);
  };
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
        if (error?.response?.status === 404) {
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
          getAllCompany()
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
  const getAllCompany = async () => {
    await axios.get(`${baseUrl}/company?businessid=6755c1d7a5be109678e7102a`)
      .then((res) => {
        if (res) {
          let val = res.data.map(v => ({ id: v._id, name: v.companyname }))
          setCompanyOption(val)
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

  const handleDateChange = (date) => setDate(date);
  const handleJoinButtonClick = () => {
    if (!showJoins) {
      setJoint(Array(joinCount).fill({ brokerid: '', fromlocation: '', labourid: '', localweight: '' }));
    } else {
      setJoint([])
    }
    setShowJoins(!showJoins);
  };

  const handleJoinCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setJoinCount(count);
    setJoint(Array(count).fill({ brokerid: '', fromlocation: '', labourid: '', localweight: '' }));
  };

  const handleJoinChange = (index, field, value) => {
    const updatedJoins = [...joint];
    updatedJoins[index] = { ...updatedJoins[index], [field]: value };
    setJoint(updatedJoins);
  };
  const handleSave = async () => {
    setLoader(true)
    const loadEntryData = {
      brokerid,
      labourid,
      fromlocation,
      companyid,
      tolocation,
      companyweight,
      localweight,
      transport,
      type: type === 'other' ? othertype : type,
      joint,
      date
    };
    await axios.post(`${baseUrl}/load`, { ...loadEntryData })
      .then((res) => {
        setLoader(false)
        if (res) {
          setCompanyWeight('')
          setLocalWeight('')
          setLabourId('')
          setCompanyId('')
          setFromLocation('')
          setToLocation('')
          setTransport('')
          setType('')
          setOtherType('')
          alert(res.data);
          getAllLoad()
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
    <>
      {loader ? <Loader /> : null}
      <div className="overflow-x-auto">
        <FieldSetLayout >
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            {/* <div className="flex sm:flex-col justify-center sm:mt-8">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
              onClick={handleJoinButtonClick}
            >
              {showJoins ? 'Not Joint' : 'Joint'}
            </button>
          </div> */}
            <CustomDatePicker
              label='Load Date'
              selectedDate={date}
              onDateChange={handleDateChange}
              maxDate={new Date()}
            />
          </div>
        </FieldSetLayout>
        <FieldSetLayout >
          {showJoins ? (
            <>
              <Dropdown
                value={joinCount}
                handleDropdown={(e) => handleJoinCountChange(e)}
                label={'How many joins?'}
                options={jointOption}
              />
              {joint.map((joint, index) => (
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <Dropdown
                    value={joint.broker}
                    handleDropdown={(e) => handleJoinChange(index, 'brokerid', e.target.value)}
                    label={`Select  Broker ${index + 1}`}
                    options={brokerOption}
                  />
                  <InputBox
                    label={`From Location ${index + 1}`}
                    value={joint.fromLocation}
                    placeholder="Enter From Location"
                    onChange={(e) => handleJoinChange(index, 'fromlocation', e.target.value)}
                  />
                  <Dropdown
                    value={joint.labour}
                    handleDropdown={(e) => handleJoinChange(index, 'labourid', e.target.value)}
                    label={`Select Labour${index + 1}`}
                    options={labourOption}
                  />
                  <InputBox
                    label={`Local Weight ${index + 1}`}
                    value={joint.localweight}
                    onChange={(e) => handleJoinChange(index, 'localweight', e.target.value)}
                    placeholder="Enter Labour Weight"
                  />
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <Dropdown
                value={brokerid}
                handleDropdown={(e) => setBrokerId(e.target.value)}
                label={'Select  Broker'}
                options={brokerOption}
              />
              <InputBox
                label='From Location'
                value={fromlocation}
                placeholder="Enter From Location"
                onChange={(e) => setFromLocation(e.target.value)}
              />
              <Dropdown
                value={labourid}
                handleDropdown={(e) => setLabourId(e.target.value)}
                label={'Select Labour'}
                options={labourOption}
              />
              <Dropdown
                value={type}
                handleDropdown={(e) => setType(e.target.value)}
                label={`Select  Type`}
                options={typeOption}
              />
              {type === 'other' && <InputBox
                label='Other Type'
                value={othertype}
                placeholder="Enter Other Type"
                onChange={(e) => setOtherType(e.target.value)}
              />}
              {/* <InputBox
              label='Local Weight'
              value={localweight}
              regex
              type='number'
              onChange={(e) => setLocalWeight(e.target.value)}
              placeholder="Enter Labour Weight"
            /> */}
            </div>
          )}
          <div className="pt-0 sm:pt-3 flex flex-col sm:flex-row sm:space-x-4">
            <Dropdown
              value={companyid}
              handleDropdown={(e) => setCompanyId(e.target.value)}
              label={'Select Company'}
              options={companyOption}
            />
            <InputBox
              label='To Location'
              value={tolocation}
              onChange={(e) => setToLocation(e.target.value)}
              placeholder="Enter To Location"
            />
            <InputBox
              label='Weight'
              value={companyweight}
              regex
              type='number'
              onChange={(e) => setCompanyWeight(e.target.value)}
              placeholder="Enter Company Weight"
            />
            <InputBox
              label='Transport By'
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
              placeholder="Transport By"
            />
            <div className="flex sm:flex-col justify-center sm:mt-8">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </FieldSetLayout>
        <FieldSetLayout >
        <Table
          key='_id'
          data={filterdata}
          header={loadheader}
          view={(e) => openModal(e)}
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
      </div>
    </>

  );
};

export default LoadEntryScreen;
