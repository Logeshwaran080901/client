import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/nav';
// import AmountReceivedForm from './screens/AmountReceived';
// import NewCompany from './screens/newCompany';
// import BusinessForm from './screens/AddBusiness';
// import Portfolio from './Portfolio/Portfolio ';
// import DebtScreen from './screens/Debt';
// import LoadEntryScreen from './screens/LoadScreen';
// import NewBroker from './screens/NewBroker';
// import NewLabour from './screens/NewLabour';
// import CreditedTo from './screens/Credit';
// import DataTable from './screens/viewLoad';
// import Dashboard from './screens/dashboard/Dashboard';

function App() {
  return (
    <Router>
    <div className="App">
      <Sidebar />

        {/* <Route path="" element={<Dashboard />} /> */}
        {/* <Route path="/port" element={<Portfolio />} /> */}
      {/* <main className="flex-1 p-4">
      <Routes>
        <Route path="/" element={<LoadEntryScreen />} />
        <Route path="/viewload" element={<DataTable />} />
        <Route path="/amount-received" element={<AmountReceivedForm />} />
        <Route path="/sender" element={<NewCompany />} />
        <Route path="/broker" element={<NewBroker />} />
        <Route path="/labour" element={<NewLabour />} />
        <Route path="/business" element={<BusinessForm />} />
        <Route path="/debt" element={<DebtScreen />} />
        <Route path="/creditedto" element={<CreditedTo />} />
      </Routes>
      </main> */}

    </div>
  </Router>
  );
}

export default App;
