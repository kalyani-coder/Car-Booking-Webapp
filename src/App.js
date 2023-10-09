// import logo from './logo.svg';
import './App.css';
import CustomerInquiry from './Components/CustomerInquiry';
import ShareDetails from './Components/Sharedetails';
import Startenddetails from './Components/Startenddetails';
import TripDetails from './Components/TripDetails';
import UpdateDuty from './Components/UpdateDuty';
import AddPayment from './Components/AddPayment'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';



function App() {
  return (
    <>
  {/* <CustomerInquiry/>
  <ShareDetails/>
  <Startenddetails /> */}
  <Router>
  <Routes>
    <Route path='/' element={<CustomerInquiry/>}/>
    <Route path='/sharedetails' element={<ShareDetails/>}/>
    <Route path='/startenddetails' element={<Startenddetails/>}/>
    <Route path='/tripdetails' element={<TripDetails/>} />
    <Route path='/updateduty'  element={<UpdateDuty/>}/>
    <Route path='/addpayment'  element={<AddPayment/>}/>
  </Routes>
  </Router>
    </>
    
  );
}

export default App;
